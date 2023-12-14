import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}