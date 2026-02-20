import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TabIfoBldRepository } from './repository/tabifobld.repository';
import { TabIfoBld } from './entities/tabifobld.entity';
import { TabIfoPlcRepository } from './repository/tabifoplc.repository';
import { TabIfoPlc } from './entities/tabifoplc.entity';
import { TabHisRsvtRepository } from './repository/tabhisrsvt.repository';
import { TabHisRsvt } from './entities/tabhisrsvt.entity';
import { UserRepository } from 'src/auth/repository/user.repository';
import { CancelInfoDto } from './dto/cancelinfo.dto';
import { ApproveInfoDto } from './dto/approveinfo.dto';
import { ReservationListDto } from './dto/reservationlist.dto';

@Injectable()
export class PortalService {
  constructor(private dataSource: DataSource,
    private tabIfoBldRepository: TabIfoBldRepository,
    private tabIfoPlcRepository: TabIfoPlcRepository,
    private tabHisRsvtRepository: TabHisRsvtRepository,
    private userRepository: UserRepository
  ) { }

  async findBybuilding(cpsCd): Promise<TabIfoBld[]> {
    const result = await this.tabIfoBldRepository.find({
      where: { cpsCd }, // cps_cd가 주어진 값과 일치하는 데이터 조회
    });

    console.log('building===>', result);
    return result;

  }

  async findByplace(params: { cpsCd?: string; bldCd?: string }): Promise<TabIfoPlc[]> {
    const where: any = {};
    if (params.cpsCd) where.cpsCd = params.cpsCd;
    if (params.bldCd && params.bldCd !== 'undefined' && params.bldCd !== 'all') where.bldCd = params.bldCd;

    // console.log(where);
    const result = await this.tabIfoPlcRepository.find({
      where, // cps_cd와 bldCd가 주어진 값과 일치하는 데이터 조회
    });
    // console.log('leaf===>',result);
    return result;
  }

  async findByreserved({ cpsCd, rsvtDt, startTime, endTime }): Promise<TabHisRsvt[]> {
    const result = await this.tabHisRsvtRepository
      .createQueryBuilder('t')
      .where('t.rsvt_dt = :rsvtDt', { rsvtDt })
      .andWhere('t.cps_cd = :cpsCd', { cpsCd })
      .andWhere('t.stt_cd NOT IN (:...excludedStatus)', {
        excludedStatus: ['cancel', 'reject','request'],
      })
      .andWhere('t.start_time < :endTime', { endTime })
      .andWhere('t.end_time > :startTime', { startTime })
      .getMany();

    // console.log('reserved===>',result);
    return result;
  }

  async findByreservation({ cpsCd, rsvtDt, plcCd }): Promise<TabHisRsvt[]> {
    const result = await this.tabHisRsvtRepository
      .createQueryBuilder('t')
      .where('t.rsvt_dt = :rsvtDt', { rsvtDt })
      .andWhere('t.cps_cd = :cpsCd', { cpsCd })
      .andWhere('t.stt_cd NOT IN (:...excludedStatus)', {
        excludedStatus: ['cancel', 'reject','request'],
      })
      .andWhere('t.plc_cd = :plcCd', { plcCd })
      .getMany();

    // console.log('reserved===>',result);
    return result;
  }

  async findByreservationMonth({ cpsCd, rsvtDt, plcCd }): Promise<TabHisRsvt[]> {
    const query = await this.tabHisRsvtRepository
      .createQueryBuilder('s')
      .leftJoin('tab_ifo_plc', 't', 's.cps_cd = t.cps_cd AND s.plc_cd = t.plc_cd')
      .leftJoin('user', 'u', 's.mbr_id = u.user_id')
      .leftJoin('user_info', 'ui', 'u.user_no = ui.user_no')
      .select([
        's.rsvt_dt as rsvtDt',
        's.rsvt_id as rsvtId',
        's.use_cnts as useCnts',
        's.plc_cd as plcCd',
        't.plc_nm as plcNm',
        's.start_time as startTime',
        's.end_time as endTime',
        's.mbr_id as mbrId',
        'u.user_name as userName',
        's.stt_cd as sttCd',
        'ui.tel_no as telNo',
      ])
      .where('s.rsvt_dt LIKE :rsvtDt', { rsvtDt: `${rsvtDt}%` }) // 예: '202503%'
      .andWhere('s.cps_cd = :cpsCd', { cpsCd })
      .andWhere('s.stt_cd NOT IN (:...excluded)', {
        excluded: ['cancel', 'reject'],
      });


    if (plcCd && plcCd !== 'all') {
      query.andWhere('s.plcCd = :plcCd', { plcCd });
    }
    query.orderBy('s.rsvt_dt', 'ASC')
      .addOrderBy('s.start_time', 'ASC');

    const result = await query.getRawMany();

    // ✅ 날짜 기준으로 group by
    const grouped = result.reduce((acc, cur) => {
      const { rsvtDt, ...rest } = cur; // rsvtDt만 빼고 나머지를 객체로
      if (!acc[rsvtDt]) {
        acc[rsvtDt] = { day: rsvtDt, data: [] };
      }
      acc[rsvtDt].data.push(rest); // rsvtDt 없는 데이터만 push
      return acc;
    }, {} as Record<string, { day: string; data: any[] }>);

    return Object.values(grouped);
  }

  async createReservation(data: Partial<TabHisRsvt>) {
    const user = await this.userRepository.findOne({
      where: { userId: data.mbrId },
    });

    if (!user) {
       throw new Error(`User with ID ${data.mbrId} not found`);
    }
    // console.log(data.startTime, data.endTime);
    // hhmmss 형식 보정 (숫자든 문자열이든 6자리로 변환)
    const startTime = String(data.startTime).padStart(6, '0');
    const endTime = String(data.endTime).padStart(6, '0');


    // 역할에 따른 상태 코드 설정
    const sttCd = user.roleId === 'ADMIN' ? 'approve' : 'request';

    const query = this.tabHisRsvtRepository.create({
      ...data,
      startTime,
      endTime,
      sttCd,
      crtId: String(user.userNo),
      crDt: new Date(),
      updId: String(user.userNo),
      updDt: new Date(),
    });
    return await this.tabHisRsvtRepository.save(query);
  }

  async cancelreservation(cancelInfoDto: CancelInfoDto) {
    console.log("rsvtId====>", cancelInfoDto.rsvtId);
    const result = await this.tabHisRsvtRepository.update(
      { rsvtId: cancelInfoDto.rsvtId },
      {
        sttCd: cancelInfoDto.sttCd,
        updDt: new Date()
      },
    );

    if (result.affected === 0) {
      throw new NotFoundException('ReserVation not found or ReserVation unchanged');
    }

    return cancelInfoDto;
  }

  async approvereservation(approveInfoDto: ApproveInfoDto) {
    console.log("rsvtId====>", approveInfoDto.rsvtId);
    const result = await this.tabHisRsvtRepository.update(
      { rsvtId: approveInfoDto.rsvtId },
      {
        sttCd: approveInfoDto.sttCd,
        updDt: new Date()
      },
    );

    if (result.affected === 0) {
      throw new NotFoundException('ReserVation not found or ReserVation unchanged');
    }

    return approveInfoDto;
  }

  async reservationList(page: number, size: number, reservationListDto: ReservationListDto): Promise<any> {
    const skip = page * size;
    const take = size;
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([
        's.rsvt_id         as rsvtId',
        's.use_cnts        as useCnts',
        's.plc_cd          as plcCd',
        'p.plc_nm          as plcNm',
        's.rsvt_dt         as rsvtDt',
        's.start_time      as startTime',
        's.end_time        as endTime',
        's.mbr_id          as mbrId',
        'u.user_name       as userName',
        's.stt_cd          as sttCd',
        'ui.tel_no         as telNo',
        'ui.cps_cd         as cpsCd',
        'ui.cmt_cd         as cmtCd',
        'c.cmt_nm          as cmtNm',
        'ui.gar_cd         as garCd',
        'g.gar_nm          as garNm',
        'ui.leaf_cd        as leafCd',
      ])
      .from('tab_his_rsvt', 's')
      .leftJoin('tab_ifo_plc', 'p', 's.plc_cd = p.plc_cd')
      .leftJoin('user', 'u', 's.mbr_id = u.user_id')
      .leftJoin('user_info', 'ui', 'u.user_no = ui.user_no')
      .leftJoin('tab_ifo_cmt', 'c', 'ui.cmt_cd = c.cmt_cd')
      .leftJoin('tab_ifo_gar', 'g', 'ui.gar_cd = g.gar_cd')
      .leftJoin('tab_ifo_leaf', 'l', 'ui.leaf_cd = l.leaf_cd')
      .where('s.cps_cd = :cpsCd', { cpsCd: reservationListDto.cpsCd });

    // 'all'이 아닌 경우에만 stt_cd 조건 추가
    if (reservationListDto.sttCd && reservationListDto.sttCd !== 'all') {
      qb.andWhere('s.stt_cd = :sttCd', { sttCd: reservationListDto.sttCd });
    }

    // 'all'이 아닌 경우에만 user_id 조건 추가
    if (reservationListDto.userId && reservationListDto.userId !== 'all') {
      qb.andWhere('u.user_id = :userId', { userId: reservationListDto.userId });
    }

    // fromDate와 toDate가 존재하는 경우
    if (reservationListDto.fromDate && reservationListDto.toDate) {
      qb.andWhere('s.rsvt_dt BETWEEN :fromDate AND :toDate', {
        fromDate: reservationListDto.fromDate,
        toDate: reservationListDto.toDate,
      });
    }

    // plcCd 존재하고 'all'이 아닌 경우
    if (reservationListDto.plcCd && reservationListDto.plcCd !== 'all') {
      qb.andWhere('s.plc_cd = :plcCd', { plcCd: reservationListDto.plcCd });
    }

    qb.orderBy('s.rsvt_dt', 'ASC')
      .addOrderBy('s.start_time', 'ASC')
      .addOrderBy('p.plc_nm', 'ASC')
      .offset(skip)
      .limit(size);

    const result = await qb.getRawMany();
    const total = await qb.getCount();

    return {
      content: result,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
    };
  }

}
