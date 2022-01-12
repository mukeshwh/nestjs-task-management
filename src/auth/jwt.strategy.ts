import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepositary } from './user.repositary';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userRepository: UserRepositary,
    ){
        super({
            secretOrKey: 'topsecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}