import { Module } from '@nestjs/common';
import { PortalController } from './portal.controller';
import { PortalService } from './portal.service';
import { AuthModule } from 'src/auth/auth.module';
import { TabIfoBldRepository } from './repository/tabifobld.repository';
import { TabIfoPlcRepository } from './repository/tabifoplc.repository';
import { TabHisRsvtRepository } from './repository/tabhisrsvt.repository';

@Module({
  imports:[AuthModule],
  controllers: [PortalController],
  providers: [PortalService,TabIfoBldRepository,TabIfoPlcRepository,TabHisRsvtRepository],
  exports: [TabIfoBldRepository,TabIfoPlcRepository,TabHisRsvtRepository]
})
export class PortalModule {}
