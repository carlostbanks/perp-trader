export declare class UserResponseDto {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    reputation: number;
    createdAt: Date;
    constructor(partial: Partial<UserResponseDto>);
}
