
import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { PortalService } from './portal.service';
import { TabHisRsvt } from './entities/tabhisrsvt.entity';
import { CancelInfoDto } from './dto/cancelinfo.dto';
import { ApproveInfoDto } from './dto/approveinfo.dto';
import { ReservationListDto } from './dto/reservationlist.dto';

@Controller('portal-service')
export class PortalController {
   constructor(private readonly portalService: PortalService,
   ) { }

   @Get('api/v1/building/list')
   async findBybuilding(@Query('cpsCd') cpsCd: string): Promise<any> {
      const result = await this.portalService.findBybuilding(cpsCd);
      //    console.log('result===>',result);
      return result;
   }

   @Get('api/v1/place/list')
   async findByplace(@Query('cpsCd') cpsCd: string,
      @Query('bldCd') bldCd: string): Promise<any> {
      const result = await this.portalService.findByplace({ cpsCd, bldCd });
      //    console.log('result===>',result);
      return result;
   }

   @Get('api/v1/place/reserved/list')
   async findByreserved(@Query('cpsCd') cpsCd: string,
      @Query('rsvtDt') rsvtDt: string,
      @Query('startTime') startTime: string,
      @Query('endTime') endTime: string): Promise<any> {
      const result = await this.portalService.findByreserved({ cpsCd, rsvtDt, startTime, endTime });
      //    console.log('result===>',result);
      return result;
   }

   @Get('api/v1/reservation/list')
   async findByreservation(@Query('cpsCd') cpsCd: string,
      @Query('rsvtDt') rsvtDt: string,
      @Query('plcCd') plcCd: string): Promise<any> {
      const result = await this.portalService.findByreservation({ cpsCd, rsvtDt, plcCd });
      //    console.log('result===>',result);
      return result;
   }

   @Get('api/v1/reservation/list/month')
   async findByreservationMonth(@Query('cpsCd') cpsCd: string,
      @Query('rsvtDt') rsvtDt: string,
      @Query('plcCd') plcCd: string): Promise<any> {
      const result = await this.portalService.findByreservationMonth({ cpsCd, rsvtDt, plcCd });
      //  console.log('findByreservationMonth===>',result);
      return result;
   }

   @Post('api/v1/reservation/insert')
   async create(@Body() body: Partial<TabHisRsvt>) {
      return this.portalService.createReservation(body);
   }

   @Put('api/v1/reservation/cancel')
   async cancelreservation(@Body() cancelInfoDto: CancelInfoDto) {
      console.log("rsvtId====>", cancelInfoDto.rsvtId);
      return this.portalService.cancelreservation(cancelInfoDto);
   }

   @Put('api/v1/reservation/approve')
   async approvereservation(@Body() approveInfoDto: ApproveInfoDto) {
      console.log("rsvtId====>", approveInfoDto.rsvtId);
      return this.portalService.approvereservation(approveInfoDto);
   }

   @Post('api/v1/reservation/list/page')
   async reservationList(@Query('page') page: number,
      @Query('size') size: number,
      @Body() reservationListDto: ReservationListDto): Promise<any> {
      // console.log('reservationListDto====>', reservationListDto);
      const result = await this.portalService.reservationList(page, size, reservationListDto);
      // console.log('reservationList==>',result);
      return result;
   }

}
