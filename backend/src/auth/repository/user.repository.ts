import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

}