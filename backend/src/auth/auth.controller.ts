import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, Query, Put, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { KakaoInfo } from './dto/kakaoinfo.dto';
import { Response } from 'express';
import { UserService } from './user.service';
import { JoinInfoDto } from './dto/joininfo.dto';
import { RoleChangeDto } from './dto/rolechange.dto';
import { PageInfoDto } from './dto/pageinfo.dto';
import { UserJoinChangeDto } from './dto/userjoinchange.dto';
import { promises } from 'dns';
import { UserinfoChangeDto } from './dto/userinfochage.dto';
import { UserListDto } from './dto/userlist.dts';

@Controller('user-service')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async kakaologin(@Body() kakaoInfo: KakaoInfo): Promise<any> {
    const result = await this.authService.KakaoLogin(kakaoInfo);
    console.log('accessToken ==>', result.accessToken, 'tokenId ==>', result.tokenId)

    if (!result.tokenId) {
      throw new HttpException('User ID is required', HttpStatus.PRECONDITION_FAILED);
    }

    return result;
  }

  @Get('api/v1/users/info/:userId')
  async findOneUserInfo(@Param('userId') userId: string): Promise<any> {
    const result = await this.userService.findOneUserInfo(userId);
    // console.log ('result===>',result);
    return result
  }


  @Put('api/v1/users/info/:userId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateuserinfochage(@Param('userId') userId: string,
    @Body() userinfoChangeDto: UserinfoChangeDto): Promise<any> {
    // console.log("userId =======> ",userId);
    // console.log("userinfoChangeDto =======> ",userinfoChangeDto);
    const result = await this.userService.updateuserinfochage(userId, userinfoChangeDto);
    // console.log ('result===>',result);
    return result
  }

  @Get('api/v1/community/list')
  async findBycommunity(@Query('cpsCd') cpsCd: string): Promise<any> {
    const result = await this.userService.findBycommunity(cpsCd);
    //  console.log('result===>',result);
    return result;
  }

  @Get('api/v1/garret/list')
  async findBygarret(@Query('cpsCd') cpsCd: string,
    @Query('cmtCd') cmtCd: string): Promise<any> {

    const result = await this.userService.findBygarret({ cpsCd, cmtCd });
    //  console.log('result===>',result);
    return result;
  }

  @Get('api/v1/leaf/list')
  async findByleaf(@Query('cpsCd') cpsCd: string,
    @Query('cmtCd') cmtCd: string,
    @Query('garCd') garCd: string): Promise<any> {

    const result = await this.userService.findByleaf({ cpsCd, cmtCd, garCd });
    //  console.log('result===>',result);
    return result;
  }

  @Post('api/v1/users/join')
  async createUser(@Body() joinInfoDto: JoinInfoDto): Promise<any> {
    const result = await this.userService.createUser(joinInfoDto);
    return result;
  }

  @Put('api/vi/users/role/change')
  async updateRoleChange(@Body() roleChangeDto: RoleChangeDto): Promise<any> {
    const result = await this.userService.updateRoleChange(roleChangeDto);
    return result;
  }

  @Post('api/v1/users/list/page')
  async usersList(@Query('page') page: number,
    @Query('size') size: number,
    @Body() userListDto: UserListDto): Promise<any> {
    const result = await this.userService.usersList(page, size, userListDto);
    return result;
  }

  @Put('api/v1/users/state/change')
  async userjoinchange(@Body() userJoinChangeDto: UserJoinChangeDto) {
    const result = await this.userService.userjoinchange(userJoinChangeDto);
    return result;
  }
}