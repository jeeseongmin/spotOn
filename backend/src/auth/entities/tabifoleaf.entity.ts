import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tab_ifo_leaf' })
export class TabIfoLeaf extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'leaf_cd' })
    leafCd: string;

    @Column({ name: 'leaf_nm' })
    leafNm: string;
	
	@Column({name: 'cps_cd'})
    cpsCd: string;
	
    @Column({ name: 'cmt_cd' })
    cmtCd: string;
	
	@Column({ name: 'gar_cd' })
    garCd: string;
	
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