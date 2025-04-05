import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/entities/users.service';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(loginDto: LoginDto): Promise<TokenResponseDto>;
    register(registerDto: RegisterDto): Promise<TokenResponseDto>;
}
