import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TabHisRsvt } from "../entities/tabhisrsvt.entity";

@Injectable()
export class TabHisRsvtRepository extends Repository<TabHisRsvt>{
    constructor(dataSource: DataSource) {
        super(TabHisRsvt, dataSource.createEntityManager());
    }

}