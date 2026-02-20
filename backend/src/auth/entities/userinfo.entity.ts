import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_info' })
export class UserInfo extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'user_no' })
    userNo: number;

    @Column({name: 'tel_no'})
    telNo: string;

    @Column({name: 'cps_cd'})
    cpsCd: string;
	
	@Column({name: 'cmt_cd'})
    cmtCd: string;
	
	@Column({name: 'gar_cd'})
    garCd: string;
	
	@Column({name: 'leaf_cd'})
    leafCd: string;
}