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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('api/v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  async findAll() {
    return this.customerService.findAll();
  }

  @Post()
  async createNew(@Body() body: CreateCustomerDto) {
    const userId = '96dccbbd-dc86-4cd1-9c14-eb72191d84e9';
    return this.customerService.createNew(body, userId);
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customerService.findOneById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCustomerDto,
  ) {
    return this.customerService.updateById(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.customerService.deleteById(id);
  }
}
