import { UsersService } from './entities/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: string): Promise<UserResponseDto>;
    update(req: any, id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(req: any, id: string): Promise<void>;
    getProfile(req: any): Promise<UserResponseDto>;
}
