import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";

@Injectable()
export class JwtStrategy  extends PassportStrategy(Strategy,'jwt'){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            secretOrKey: 'Secret5678',
            ignoreExpiration: true,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })

    }

    async validate(payload) {
        const {userId} = payload;
        const user = await this.userRepository.findOne({
            where : {
                userId :userId,
            }
        })

        return user;
        
    }
}