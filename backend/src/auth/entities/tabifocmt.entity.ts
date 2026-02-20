import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tab_ifo_cmt' })
export class TabIfoCmt extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'cmt_cd' })
    cmtCd: string;

    @Column({name: 'cmt_nm'})
    cmtNm: string;

    @Column({name: 'cps_cd'})
    cpsCd: string;
	
	@Column({name: 'del_yn'})
    delYn: string;

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