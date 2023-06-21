import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }


    async signIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        if (user?.userPassword !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, email: user.userEmail };
        return {
            acces_token: await this.jwtService.signAsync(payload)
        };
    }


}
