import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {

    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isMatch: boolean = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Password does not match');
        }

        return user;
    }

    async login(user: User) {
        const payload = {
            email: user.email,
            id: user.id
        };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(createUserDto: CreateUserDto) {

        try {
            await this.usersService.create(createUserDto);
            return { message: 'Successfully Registered, Please Login' }
        } catch (e) {
            console.log(e.message);
            throw new BadRequestException('Password does not match');
        }
    }
}
