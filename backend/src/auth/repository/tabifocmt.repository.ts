import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TabIfoCmt } from "../entities/tabifocmt.entity";

@Injectable()
export class TabIfoCmtRepository extends Repository<TabIfoCmt>{
    constructor(dataSource: DataSource) {
        super(TabIfoCmt, dataSource.createEntityManager());
    }

}