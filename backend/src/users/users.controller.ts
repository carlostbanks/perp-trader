// backend/src/users/users.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    ForbiddenException,
    ClassSerializerInterceptor,
    UseInterceptors,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { UsersService } from './entities/users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { UserResponseDto } from './dto/user-response.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @ApiTags('users')
  @Controller('users')
  @UseInterceptors(ClassSerializerInterceptor)
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 409, description: 'Username or email already exists' })
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
      const user = await this.usersService.create(createUserDto);
      return new UserResponseDto(user);
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users', type: [UserResponseDto] })
    async findAll(): Promise<UserResponseDto[]> {
      const users = await this.usersService.findAll();
      return users.map(user => new UserResponseDto(user));
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'Return the user', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
      const user = await this.usersService.findOne(id);
      return new UserResponseDto(user);
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async update(
      @Request() req,
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserResponseDto> {
      // Only allow users to update their own profile unless they're an admin
      if (req.user.id !== id && req.user.role !== 'admin') {
        throw new ForbiddenException('You can only update your own profile');
      }
      
      const user = await this.usersService.update(id, updateUserDto);
      return new UserResponseDto(user);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async remove(@Request() req, @Param('id') id: string): Promise<void> {
      // Only allow users to delete their own account unless they're an admin
      if (req.user.id !== id && req.user.role !== 'admin') {
        throw new ForbiddenException('You can only delete your own account');
      }
      
      return this.usersService.remove(id);
    }
  
    @Get('profile/me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'Return the user profile', type: UserResponseDto })
    async getProfile(@Request() req): Promise<UserResponseDto> {
      const user = await this.usersService.findOne(req.user.id);
      return new UserResponseDto(user);
    }
  }