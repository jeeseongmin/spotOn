"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
exports.typeORMConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 23306,
    username: 'makers',
    password: 'SpotOnMakers',
    database: 'spoton',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false
};
//# sourceMappingURL=typeorm.config.js.map