import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TabIfoBld } from "../entities/tabifobld.entity";

@Injectable()
export class TabIfoBldRepository extends Repository<TabIfoBld>{
    constructor(dataSource: DataSource) {
        super(TabIfoBld, dataSource.createEntityManager());
    }

}