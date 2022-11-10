import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { BillingStatusEnum } from './enum/billing-status.enum';

@Injectable()
export class BillingService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.billing.findMany({
      select: {
        id: true,
        description: true,
        value: true,
        dueDate: true,
        createdAt: true,
      },
      where: { deletedAt: null },
    });
  }

  async createNew(data: CreateBillingDto, userId: string) {
    try {
      const { customerId, ...rest } = data;
      return await this.prismaService.billing.create({
        data: {
          ...rest,
          status: BillingStatusEnum.PENDING,
          user: { connect: { id: userId } },
          customer: { connect: { id: customerId } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.billing.findFirstOrThrow({
        select: {
          id: true,
          description: true,
          value: true,
          dueDate: true,
          createdAt: true,
        },
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.messag);
    }
  }

  async updateById(id: string, data: UpdateBillingDto) {
    await this.findOneById(id);
    return await this.prismaService.billing.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.billing.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
