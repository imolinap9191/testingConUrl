import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { IProduct } from './Iproduct';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
//devuelve todos los productos existentes usando el metodo findAll del servicio
  findAll(): IProduct[] {
    return this.productsService.findAll();
  }

  @Get(':id')
//devuelve los datos del producto que corresponde con el id proporcionado, utiliza el metodo findById del servicio
  findById(@Param('id') id: string): IProduct {
    return this.productsService.findById(id);
  }

  @Post()
//crea un nuevo producto con la información que se pasa en el body 
  create(@Body() product: IProduct): IProduct {
    return this.productsService.create(product);
  }

  @Put(':id')
//se actualiza un producto existente basado en el ID que se pasa como parámetro mas 
//la información que se proporciona en el body, usando el método update del servicio ProductsService
  update(@Param('id') id: string, @Body() updatedProducts: IProduct): IProduct {
    return this.productsService.update(id, updatedProducts);
  }

  @Delete(':id')
//elimina un producto específico de acuerdo al id  pasado como parametro, usando el método delete del servicio ProductsService
  delete(@Param(':id') id: string): IProduct {
    return this.productsService.delete(id);
  }
}