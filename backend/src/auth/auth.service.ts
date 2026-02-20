import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { KakaoInfo } from './dto/kakaoinfo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private jwtService: JwtService,
    @InjectRepository(UserRepository)
        private userRePository: UserRepository
  ){}

  async KakaoLogin(kakaoInfo:KakaoInfo): Promise<any> {
    // const { code } = options;
    console.log('=================================================================================================================')
    // const kakaoKey = 'ccecd1926b0cbc34014b07b46c03c29f';
    // const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    try {
          // Token 을 가져왔을 경우 사용자 정보 조회
        const headerUserInfo = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: 'Bearer ' + kakaoInfo.token,
        };
        // console.log(`url : ${kakaoTokenUrl}`);
        console.log(`headers : ${JSON.stringify(headerUserInfo)}`);
        const responseUserInfo = await axios({
          method: 'GET',
          url: kakaoUserInfoUrl,
          timeout: 30000,
          headers: headerUserInfo,
        });
        console.log(`responseUserInfo.status : ${responseUserInfo.status}`);
        if (responseUserInfo.status === 200) {
          // console.log(
          //   `kakaoUserInfo : ${JSON.stringify(responseUserInfo.data)}`,
          // );
          const kakaouser = responseUserInfo.data;
          const {
              id,
              kakao_account: {
                email,
                profile: { nickname },
              },
            } = kakaouser;
           

          console.log('Result ==> kakaouser_id:', kakaouser.id, 'type:', typeof kakaouser.id);

          const KakaoId = String(kakaouser.id);
          console.log('Looking up kakaoId:', KakaoId);
          const userinfo = await this.userRePository.findOne({
            where : {
              kakaoId :KakaoId,
            }
        });
        console.log('findOne result ==>', userinfo ? `found user: ${userinfo.userId}` : 'NOT FOUND');

        const userID = userinfo?.userId;
        if (userID == null) {
             // userID가 null 또는 undefined인 경우
           console.log("userID가 존재하지 않습니다.");
        } else {
             // userID가 존재하는 경우
            const result = await this.userRePository.update(
            { userId :userID },
            { lastLoginDate : new Date() });

          if (result.affected && result.affected > 0) {
              // 업데이트 성공
             console.log("로그인 시간이 성공적으로 업데이트되었습니다.");
             } 
          else {
              // 업데이트 실패 (해당 userId를 가진 유저가 없음 등)
             console.log("업데이트 실패: 해당 유저를 찾을 수 없습니다.");
             }

           console.log("userID:", userID);
        }
        const payload = { userID };
        const accessToken = await this.jwtService.sign(payload);

        // console.log('accessToken ==>',accessToken);

        return { accessToken,
                 tokenId: userID
        };

        } else {
          throw new  UnauthorizedException();
        }
     
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}

