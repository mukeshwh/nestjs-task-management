import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepositary } from './user.repositary';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepositary)
        private userRepositary: UserRepositary,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.userRepositary.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<string>{
        const { username, password } = authCredentialsDto;
        const user = await this.userRepositary.findOne({ username });
        if(user && (await bcrypt.compare(password, user.password))){
            return 'Success!';
        } else{
            throw new UnauthorizedException('Please Check your Login Credentials');
        }
    }
}
