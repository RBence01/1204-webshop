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

  findOne(sku: number) {
    return this.db.product.findUnique({where: {sku}});
  }

  async update(sku: number, updateProductDto: UpdateProductDto) {
    try {
      return this.db.product.update({where: {sku}, data: updateProductDto});
    } catch {
      return undefined;
    }
  }

  async remove(sku: number) {
    try {
      return await this.db.product.delete({where: {sku}});
    } catch {
      return undefined;
    }
  }
}
