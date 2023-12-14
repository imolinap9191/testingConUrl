import { Controller, Get, Param, Post,Body,Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from './IProduct';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async findAll(): Promise<IProduct[]> {
    return await this.productService.findAll();
  }
  @Get(':id')
  async findById(@Param(':id') id: string): Promise<IProduct> {
    return await this.productService.findById(id);
  }
  @Post()
  async create(@Body() product:IProduct):Promise<IProduct>{
    return await this.productService.createProduct(product)
  }
  @Delete(':id')
  async delete(@Param(':id')id:string):Promise<IProduct>{
    return await this.productService.deleteProduct(id)
  }
  @Put(':id')
  async update(@Param(':id') id:string,@Body() updateProduct:IProduct):Promise<IProduct>{
    return await this.productService.updateById(id,updateProduct)
  }

}
