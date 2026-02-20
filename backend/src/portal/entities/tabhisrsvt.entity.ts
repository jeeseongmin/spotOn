import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tab_his_rsvt' })
export class TabHisRsvt extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'rsvt_id' })
    rsvtId: number;

    @Column({name: 'use_cnts'})
    useCnts: string;

    @Column({name: 'cps_cd'})
    cpsCd: string;
	    
	@Column({name: 'bld_cd'})
    bldCd: string;
	
	@Column({name: 'plc_cd'})
    plcCd: string;
	
	@Column({name: 'rsvt_dt'})
    rsvtDt: string;
	
	@Column({name: 'start_time'})
    startTime: string;
	
	@Column({name: 'end_time'})
    endTime: string;
	
	@Column({name: 'mbr_id'})
    mbrId: string;
	
	@Column({ name: 'stt_cd'})
    sttCd: string;
	
	@Column({name: 'crt_id'})
    crtId: string;
	
	@Column({ 
        name: 'cr_dt',
        type: 'datetime', // MySQL용 타입
        default: () => 'CURRENT_TIMESTAMP', // MySQL의 현재 시간
    })
    crDt: Date;
	
	@Column({name: 'upd_id'})
    updId: string;
	
	@Column({
        name: 'upd_dt',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP', // 업데이트 시 자동 갱신
    })
    updDt: Date;
}