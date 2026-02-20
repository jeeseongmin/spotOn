import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TabIfoLeaf } from "../entities/tabifoleaf.entity";

@Injectable()
export class TabIfoLeafRepository extends Repository<TabIfoLeaf>{
    constructor(dataSource: DataSource) {
        super(TabIfoLeaf, dataSource.createEntityManager());
    }

}