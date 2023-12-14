import { Injectable } from '@nestjs/common';
import { IProduct } from './Iproduct';

@Injectable()
export class ProductsService {
  private products: IProduct[] = [];

  findAll(): IProduct[] {
//retorna un array de productos en donde estan todos los productos almacenados en la propiedad products.
    return this.products;
  }

  findById(id: string): IProduct {
//se pasa un id como argumento y busca un producto en el array products que coincida con ese id.
//se retorna el producto encontrado
    return this.products.find((product) => product.id === id);
  }

  create(product: IProduct): IProduct {
//se pasa un objeto product como argumento.
//antes de pushearlo al array, chequemos que el precio o el stock sea mayor que 0
//si es menor se retorna nulo
    if (product.stock < 0 || product.precio < 0) {
      return null;
    }
//si es mayor se agrega y se retorna el producto agregado
   this.products.push(product);
    return product;
  }

  update(id: string, updatedProduct: IProduct): IProduct {
//se pasa un id como argumento del producto que se va a actualizar,
//y en un objeto se pasan los datos actualizados del producto.
    const nroIndice = this.products.findIndex((p) => p.id === id);
//se busca el índice del producto con el id proporcionado en el array products.
//si se encuentra el producto, actualiza sus campos con los valores proporcionados 
    if (nroIndice !== -1) {
      this.products[nroIndice] = {
        ...this.products[nroIndice],
        ...updatedProduct,
      };
//retorna el producto actualizado.
      return this.products[nroIndice];
    }
  }

  delete(id: string): IProduct {
//se pasa un id como argumento del producto que se desea eliminar
    const nroIndice = this.products.findIndex((p) => p.id === id);
//se busca el índice del producto con el id proporcionado en el array products
//si se encuentra, se lo elimina del array usando splice
    if (nroIndice !== -1) {
      const deleteProduct = this.products[nroIndice];
      this.products.splice(nroIndice, 1);
//se retorna el producto eliminado
      return deleteProduct;
    }
  }
}