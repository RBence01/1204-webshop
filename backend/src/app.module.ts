import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}
