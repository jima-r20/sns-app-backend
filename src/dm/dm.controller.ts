import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DmService } from './dm.service';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { DmValidationPipe } from './pipes/dm-validation.pipe';
import { CreateDmDto } from './dto/create-dm.dto';
import { Dm } from './Dm.entity';

@Controller('dm')
@UseGuards(AuthGuard())
export class DmController {
  constructor(private dmService: DmService) {}

  @Post('/message')
  createDm(
    @Body(DmValidationPipe) createDmDto: CreateDmDto,
    @GetUser() user: User,
  ): Promise<Dm> {
    return this.dmService.createDm(createDmDto, user);
  }
}
