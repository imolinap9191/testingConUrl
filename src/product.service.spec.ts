import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { IProduct } from './IProduct';

describe('AppController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
    productService = app.get<ProductService>(ProductService);
  });
  describe('root', () => {
    it('should be defined', () => {
      expect(productService.createProduct).toBeDefined();
      expect(productService.deleteProduct).toBeDefined();
      expect(productService.updateById).toBeDefined();
      expect(productService.findAll).toBeDefined();
      expect(productService.findById).toBeDefined();
    });
    it('should not be empty', async () => {
      const products = await productService.findAll();
      expect(products).not.toEqual([]);
    });
    it('should create a new products', async () => {
      const newProduct: IProduct = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 899.99,
        stock: 30,
      };
      const createProduct = await productService.createProduct(newProduct);
      expect(createProduct).toEqual(newProduct);
      expect(createProduct).not.toBeNull();
    });
    it('should not allow creation of product with negative stock', async () => {
      const productWithNegSt: IProduct = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 899.99,
        stock: -30,
      };
      const result = await productService.createProduct(productWithNegSt);
      expect(result).toBeNull();
    });
    it('should not allow creation of product with negative price', async () => {
      const productWithNegPc: IProduct = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: -899.99,
        stock: 30,
      };
      const result = await productService.createProduct(productWithNegPc);
      expect(result).toBeNull();
    });
    it('should update and existing product', async () => {
      const inicialProduct: IProduct = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 899.99,
        stock: 30,
      };
      await productService.createProduct(inicialProduct);
      const updatedData: IProduct = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: -899.99,
        stock: 35,
      };
      const updateProduct = await productService.updateById('1', updatedData);
      expect(updateProduct).toBeNull();
    });
    it('should not update an non-existing product', async () => {
      const productNotExist: IProduct | null = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 899.99,
        stock: 30,
      };
      const result = await productService.updateById('18', productNotExist);
      expect(result).toBeNull();
    });
    it('should delete an non existing product', async () => {
          const result = await productService.deleteProduct('15');
      expect(result).toBeNull();
    });
    it('should delete an non existing product', async () => {
        const productToDelete: IProduct = {
            id: '16',
            nombre: 'Laptop HP Pavilion',
            marca: 'HP',
            descripcion:
              'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
            precio: 899.99,
            stock: 30,
          };
          await productService.createProduct(productToDelete);
      const productExisting = '16';
      const result = await productService.deleteProduct(productExisting);
      expect(result).not.toBeNull();
    });
  });
});
