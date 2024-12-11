import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor (private readonly db: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.db.product.create({data: createProductDto});
  }

  findAll() {
    return this.db.product.findMany();
  }

  findOne(id: number) {
    return this.db.product.findUnique({where: {id}});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return this.db.product.update({where: {id}, data: updateProductDto});
    } catch {
      return undefined;
    }
  }

  async remove(id: number) {
    try {
      return await this.db.product.delete({where: {id}});
    } catch {
      return undefined;
    }
  }
}
