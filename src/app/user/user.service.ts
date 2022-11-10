import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true },
      where: { deletedAt: null },
    });
  }

  async createNew(data: CreateUserDto) {
    try {
      data.password = this.hashPassowrd(data.password);
      const user = await this.prismaService.user.create({ data });
      delete user.password;
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          updatedAt: true,
        },
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.messag);
    }
  }

  async updateById(id: string, data: UpdateUserDto) {
    await this.findOneById(id);
    const user = await this.prismaService.user.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
    delete user.password;
    return user;
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  hashPassowrd(passowrd: string) {
    const salt = genSaltSync(10);
    return hashSync(passowrd, salt);
  }
}
