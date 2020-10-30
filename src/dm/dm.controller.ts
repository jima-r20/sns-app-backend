import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DmService } from './dm.service';
import { Dm } from './dm.entity';
import { DmValidationPipe } from './pipes/dm-validation.pipe';
import { CreateDmDto } from './dto/create-dm.dto';
import { User } from '../user/user.entity';
import { GetUser } from '../user/decorators/get-user.decorator';

@Controller('dm')
@UseGuards(AuthGuard())
export class DmController {
  constructor(private dmService: DmService) {}

  @Get('/inbox')
  getDmInbox(@GetUser() user: User): Promise<Dm[]> {
    return this.dmService.getDmInbox(user);
  }

  @Post('/message')
  createDm(
    @Body(DmValidationPipe) createDmDto: CreateDmDto,
    @GetUser() user: User,
  ): Promise<Dm> {
    return this.dmService.createDm(createDmDto, user);
  }
}
