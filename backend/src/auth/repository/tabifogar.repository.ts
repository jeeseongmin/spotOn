import { DataSource, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TabIfoGar } from "../entities/tabifogar.entity";

@Injectable()
export class TabIfoGarRepository extends Repository<TabIfoGar>{
    constructor(dataSource: DataSource) {
        super(TabIfoGar, dataSource.createEntityManager());
    }

}