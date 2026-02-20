import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TabIfoPlc } from "../entities/tabifoplc.entity";

@Injectable()
export class TabIfoPlcRepository extends Repository<TabIfoPlc>{
    constructor(dataSource: DataSource) {
        super(TabIfoPlc, dataSource.createEntityManager());
    }

}