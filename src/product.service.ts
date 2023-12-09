import { Injectable } from '@nestjs/common';
import { IProduct } from './IProduct';


const url = 'http://localhost:3030/products/';
@Injectable()
export class ProductService {
  async findAll(): Promise<IProduct[]> {
      const res = await fetch(url);
      const products = await res.json();

      const dataProduct = products.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        marca: p.marca,
        descripcion:p.descipcion,
        precio: p.precio,
        stock: p.stock,
      }));
      return dataProduct;
  }
  async findById(id: string): Promise<IProduct | null> {
 
      const res = await fetch(url + id);
     
      const p = await res.json();
      const respData = {
        id: p.id,
       nombre: p.nombre,
        marca: p.marca,
        descripcion:p.descipcion,
        precio: p.precio,
        stock: p.stock,
      };
      return respData;
  }


  async createProduct(product: IProduct) {
   
      if (product.stock <0 || product.precio <0){
        return null
      }{
      const newProduct = { ...product};
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const producData = {
        id: newProduct.id,
        nombre: newProduct.nombre,
         marca: newProduct.marca,
         descripcion:newProduct.descripcion,
         precio: newProduct.precio,
         stock: newProduct.stock,
      };

      return producData;}

  }
  async deleteProduct(id: string): Promise<IProduct | null> {

      const res = await fetch(url + id, {
        method: 'DELETE',
      });
      if (!res.ok) {
      return null;
        }
      return await res.json();
   
  }
 async updateById(
    id: string,
    body: IProduct,
  ): Promise<IProduct | null> {
    
      const existingProduct = await this.findById(id);
      if(!existingProduct){
        return null;
      }
      if (body.stock <0 || body.precio <0){
        return null }
      const upProduct = {
        id: body.id,
        nombre: body.nombre,
         marca: body.marca,
         descripcion:body.descripcion,
         precio: body.precio,
         stock: body.stock,
      };

      const res = await fetch(url + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(upProduct),
      });
      if (res.status === 404) {
        return null;
      }
      if(!res.ok){
      throw new Error();
      }
      return await res.json();
    
  }
}
