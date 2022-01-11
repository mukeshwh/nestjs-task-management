import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepositary extends Repository<User>{
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{

        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const user = this.create({username, password: hashPassword});
        try{
            await this.save(user);
        } catch(error){
            if(error.code === 'ER_DUP_ENTRY'){ 
                // duplicate user name
                throw new ConflictException('Username already exist');
            } else {
                throw new InternalServerErrorException();
            }
            
        }

    }
}
