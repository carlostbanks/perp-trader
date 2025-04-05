export declare class UserDto {
    id: string;
    email: string;
    username: string;
}
export declare class TokenResponseDto {
    access_token: string;
    user: UserDto;
}
