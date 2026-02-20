import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { TabIfoCmtRepository } from './repository/tabifocmt.repository';
import { TabIfoCmt } from './entities/tabifocmt.entity';
import { TabIfoGarRepository } from './repository/tabifogar.repository';
import { TabIfoGar } from './entities/tabifogar.entity';
import { TabIfoLeafRepository } from './repository/tabifoleaf.repository';
import { TabIfoLeaf } from './entities/tabifoleaf.entity';
import { JoinInfoDto } from './dto/joininfo.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { UserRepository } from './repository/user.repository';
import { v4 as uuidv4 } from 'uuid';
import { UserInfoRepository } from './repository/userinfo.repository';
import { RoleChangeDto } from './dto/rolechange.dto';
import { PageInfoDto } from './dto/pageinfo.dto';
import { UserJoinChangeDto } from './dto/userjoinchange.dto';
import { UserinfoChangeDto } from './dto/userinfochage.dto';
import { UserListDto } from './dto/userlist.dts';


@Injectable()
export class UserService {

  constructor(private dataSource: DataSource,
    private tabIfoCmtRepository: TabIfoCmtRepository,
    private tabIfoGarRepository: TabIfoGarRepository,
    private tabIfoLeafRepository: TabIfoLeafRepository,
    private readonly httpService: HttpService,
    private userRepository: UserRepository,
    private userInfoRepository: UserInfoRepository
  ) { }

  async findOneUserInfo(userId): Promise<any> {
    const result = await this.dataSource
      .createQueryBuilder()
      .select([
        's.user_id        AS userId'
        , 's.user_name      AS userName'
        , 's.email_addr     AS email'
        , 's.role_id        AS roleId'
        , 's.user_state_code AS  userStateCode'
        , 't.tel_no         AS telNo'
        , 't.cps_cd         AS cpsCd'
        , 't.cmt_cd         AS cmtCd'
        , 't.gar_cd         AS garCd'
        , 't.leaf_cd        AS leafCd'
      ])
      .from('user', 's')
      .leftJoin('user_info', 't', 's.user_no = t.user_no')
      .where('s.user_id = :userId', { userId })
      .getRawOne();

    return result;

  }

  async findBycommunity(cpsCd): Promise<TabIfoCmt[]> {
    const result = await this.tabIfoCmtRepository.find({
      where: { cpsCd }, // cps_cd가 주어진 값과 일치하는 데이터 조회
    });

    // console.log('commnunity===>',result);
    return result;

  }

  async findBygarret({ cpsCd, cmtCd }): Promise<TabIfoGar[]> {
    const result = await this.tabIfoGarRepository.find({
      where: { cpsCd, cmtCd }, // cps_cd와 cmt_cd가 주어진 값과 일치하는 데이터 조회
    });
    // console.log('garret===>',result);
    return result;
  }

  async findByleaf({ cpsCd, cmtCd, garCd }): Promise<TabIfoLeaf[]> {
    const result = await this.tabIfoLeafRepository.find({
      where: { cpsCd, cmtCd, garCd }, // cps_cd와 cmt_cd, garCd가 주어진 값과 일치하는 데이터 조회
    });
    // console.log('leaf===>',result);
    return result;
  }

  async createUser(joinInfoDto: JoinInfoDto): Promise<any> {
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    try {
      // Token 을 가져왔을 경우 사용자 정보 조회
      const headerUserInfo = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: 'Bearer ' + joinInfoDto.token,
      };
      // console.log(`url : ${kakaoTokenUrl}`);
      console.log(`headers : ${JSON.stringify(headerUserInfo)}`);
      const responseUserInfo = await axios({
        method: 'GET',
        url: kakaoUserInfoUrl,
        timeout: 30000,
        headers: headerUserInfo,
      });
      console.log(`responseUserInfo.status : ${responseUserInfo.status}`);
      if (responseUserInfo.status === 200) {
        // console.log(
        //   `kakaoUserInfo : ${JSON.stringify(responseUserInfo.data)}`,
        // );
        const kakaouser = responseUserInfo.data;
        const {
          id,
          kakao_account: {
            email,
            profile: { nickname },
          },
        } = kakaouser;
        console.log('Result ==> kakaouser_id:', kakaouser.id, 'kakaouser_nickname:', kakaouser.kakao_account.profile.nickname);

        const newUser = this.userRepository.create({
          createdDate: new Date(),
          modifiedDate: new Date(),
          emailAddr: `${kakaouser.id}@kakao.com`,
          roleId: 'USER',
          userId: uuidv4(),
          userName: kakaouser.kakao_account.profile.nickname,
          userStateCode: '00',
          kakaoId: kakaouser.id
        });
        await this.userRepository.save(newUser);

        const user = await this.userRepository.findOne({
          where: { kakaoId: kakaouser.id },
        })

        if (!user) {
          throw new NotFoundException('User not found');
        }
        else {
          const newUserInfo = this.userInfoRepository.create({
            userNo: user.userNo,
            telNo: joinInfoDto.telNo,
            cpsCd: joinInfoDto.cpsCd,
            cmtCd: joinInfoDto.cmtCd,
            garCd: joinInfoDto.garCd,
            leafCd: joinInfoDto.leafCd
          });
          await this.userInfoRepository.save(newUserInfo);
        }

      }

    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return joinInfoDto;
  }

  async updateRoleChange(roleChangeDto: RoleChangeDto): Promise<any> {
    if (!roleChangeDto) {
      throw new BadRequestException('Request body is missing');
    }

    if (!roleChangeDto.userId) {
      throw new BadRequestException('userId is required');
    }

    const result = await this.userRepository.update(
      { userId: roleChangeDto.userId },
      {
        roleId: roleChangeDto.roleId,
        modifiedDate: new Date(),
      },
    )

    if (result.affected === 0) {
      throw new NotFoundException('User not found or role unchanged');
    }

    return roleChangeDto;
  }


  async usersList(page: number, size: number, userListDto: UserListDto): Promise<any> {
    const skip = page * size;
    const take = size;
    const qb = await this.dataSource
      .createQueryBuilder()
      .select([
        's.user_id AS userId',
        's.user_name AS userName',
        's.email_addr AS email',
        's.role_id AS roleId',
        'r.role_name AS roleName',
        's.user_state_code AS userStateCode',
        'c.code_description AS userStateCodeName',
        's.created_date AS createdDate',
        's.last_login_date AS lastLoginDate',
        's.login_fail_count AS loginFailCount',
        'u.tel_no AS telNo',
        'u.cps_cd AS cpsCd',
        'u.cmt_cd AS cmtCd',
        'ic.cmt_nm AS cmtNm',
        'u.gar_cd AS garCd',
        'ig.gar_nm AS garNm',
        'u.leaf_cd AS leafCd',
        'il.leaf_nm AS leafNm',
      ])
      .from('user', 's')
      .leftJoin('role', 'r', 'r.role_id = CONCAT(:prefix, s.role_id)', { prefix: 'ROLE_' })
      .leftJoin('code', 'c', `c.parent_code_id = 'user_state_code' AND s.user_state_code = c.code_id`)
      .leftJoin('user_info', 'u', 's.user_no = u.user_no')
      .leftJoin('tab_ifo_cmt', 'ic', 'u.cmt_cd = ic.cmt_cd')
      .leftJoin('tab_ifo_gar', 'ig', 'u.gar_cd = ig.gar_cd')
      .leftJoin('tab_ifo_leaf', 'il', 'u.leaf_cd = il.leaf_cd')
      .where('u.cps_cd = :cpsCd', { cpsCd: userListDto.cpsCd });

    // stt_cd 조건 추가
    if (userListDto.userStateCode && userListDto.userStateCode.trim() !== '') {
      qb.andWhere('s.user_state_code = :userStateCode', { userStateCode: userListDto.userStateCode });
    }

    qb.orderBy('ic.cmt_nm', 'ASC')
      .addOrderBy('il.leaf_nm', 'ASC')
      .offset(skip)
      .limit(size);

    const users = await qb.getRawMany();
    const total = await qb.getCount();

    return {
      content: users,
      total,
      page,
      size,
      totalPages: Math.ceil(total / size),
    };
  }


  async userjoinchange(userJoinChangeDto: UserJoinChangeDto): Promise<any> {
    const result = await this.userRepository.update(
      { userId: userJoinChangeDto.userId },
      {
        userStateCode: userJoinChangeDto.userStateCode,
        modifiedDate: new Date(),
      }
    )
    if (result.affected === 0) {
      throw new NotFoundException('User not found or role unchanged');
    }

    return userJoinChangeDto.userId;

  }

  async updateuserinfochage(userId: string, userinfoChangeDto: UserinfoChangeDto) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new NotFoundException('해당 사용자가 존재하지 않습니다.');
    }

    const userchage = await this.userRepository.update(
      { userId: userId },
      {
        userName: userinfoChangeDto.userName,
        emailAddr: userinfoChangeDto.email,
        roleId: userinfoChangeDto.roleId,
        lastModifiedBy: userinfoChangeDto.email,
        modifiedDate: new Date(),
      }
    )
    if (userchage.affected === 0) {
      throw new NotFoundException('User not found or User unchanged');
    }

    console.log('userNo====>', user.userNo);

    const result = await this.userInfoRepository.update(
      { userNo: user.userNo },
      {
        telNo: userinfoChangeDto.telNo,
        cpsCd: userinfoChangeDto.cpsCd,
        cmtCd: userinfoChangeDto.cmtCd,
        garCd: userinfoChangeDto.garCd,
        leafCd: userinfoChangeDto.leafCd,
      }
    )
    if (result.affected === 0) {
      throw new NotFoundException('User Info not found or User Info  unchanged');
    }

    return userinfoChangeDto;

  }
}