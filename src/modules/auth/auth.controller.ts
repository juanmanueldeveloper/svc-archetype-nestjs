import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, LoginPayload, RegisterPayload } from './';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { User, UsersService } from './../user';
import { formatResponse } from '../../shared/handler/responseHandler';
import { IResponse } from '../../shared/handler/interfaces/IResponse.interface';
import { JwtUser } from '../../modules/auth/interfaces/jwt-user.interface';

@Controller('api/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful Login' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<IResponse<JwtUser>> {
    const user = await this.authService.validateUser(payload);
    const tokenWithUser = (await this.authService.createToken(user)) as JwtUser;
    return formatResponse<JwtUser>(
      HttpStatus.CREATED,
      '',
      tokenWithUser,
    ) as IResponse<JwtUser>;
  }

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful Login' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async register(
    @Body() payload: RegisterPayload,
  ): Promise<IResponse<JwtUser>> {
    const user = await this.userService.create(payload);
    const tokenWithUser = (await this.authService.createToken(user)) as JwtUser;
    return formatResponse<JwtUser>(
      HttpStatus.CREATED,
      '',
      tokenWithUser,
    ) as IResponse<JwtUser>;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful Login' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<IResponse<User>> {
    return formatResponse<User>(HttpStatus.OK, '', user) as IResponse<User>;
  }
}
