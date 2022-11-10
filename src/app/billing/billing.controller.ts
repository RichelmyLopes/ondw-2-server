import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
@Controller('api/v1/billings')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}
  @Get()
  async findAll() {
    return this.billingService.findAll();
  }

  @Post()
  async createNew(@Body() body: CreateBillingDto) {
    const userId = '96dccbbd-dc86-4cd1-9c14-eb72191d84e9';
    return this.billingService.createNew(body, userId);
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.billingService.findOneById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBillingDto,
  ) {
    return this.billingService.updateById(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.billingService.deleteById(id);
  }
}
