import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserInfo } from "../entities/userinfo.entity";

@Injectable()
export class UserInfoRepository extends Repository<UserInfo>{
    constructor(dataSource: DataSource) {
        super(UserInfo, dataSource.createEntityManager());
    }

}