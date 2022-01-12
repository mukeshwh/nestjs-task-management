import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepositary } from './user.repositary';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepositary)
        private userRepositary: UserRepositary,
        private jwtServiec: JwtService,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.userRepositary.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<{accessToken: string}>{
        const { username, password } = authCredentialsDto;
        const user = await this.userRepositary.findOne({ username });
        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtServiec.sign(payload);
            return { accessToken }
        } else{
            throw new UnauthorizedException('Please Check your Login Credentials');
        }
    }
}
