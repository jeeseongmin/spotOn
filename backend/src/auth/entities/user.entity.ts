import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'user_no' })
    userNo: number;

    @Column({ 
        name: 'created_date',
        type: 'datetime', // MySQL용 타입
        default: () => 'CURRENT_TIMESTAMP', // MySQL의 현재 시간
    })
    createdDate: Date;

    @Column({
        name: 'modified_date',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP', // 업데이트 시 자동 갱신
      })
      modifiedDate: Date;

    @Column({name: 'created_by'})
    createdBy: string;

    @Column({name: 'last_modified_by'})
    lastModifiedBy: string;

    @Column({ name: 'email_addr', type: 'varchar' })
    @IsEmail({}, { message: '유효한 이메일 형식이 아닙니다.' }) //  이메일 형식 검증
    emailAddr: string;

    @Column({name: 'encrypted_password'})
    encryptePassword: string;

    @Column({name: 'role_id'})
    roleId: string;

    @Column({
        name: 'user_id',
        type: 'char',
        default: () => 'UUID()', //  DB에서 자동 생성
        unique: true,
      })
      userId: string;
    
    @Column({name: 'user_name'})
    userName: string;

    @Column({name: 'refresh_token'})
    refreshToken: string;

    @Column({name: 'user_state_code'})
    userStateCode: string;

    @Column({name: 'last_login_date'})
    lastLoginDate: Date;

    @Column({name: 'login_fail_count'})
    loginFailCount: number;

    @Column({name: 'google_id'})
    googleId: string;

    @Column({name: 'kakao_id'})
    kakaoId: string;

    @Column({name: 'naver_id'})
    naverId: string;
}