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
      expect(productController).toBeDefined();
    });
    it('should return an array of products', async () => {
      const mockProducts: IProduct[] = [
        {
          id: '1',
          nombre: 'Laptop HP Pavilion',
          marca: 'HP',
          descripcion:
            'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
          precio: 899.99,
          stock: 30,
        },
      ];
      jest.spyOn(productService, 'findAll').mockImplementation(async()=>mockProducts);
      const result = await productController.findAll();
      expect(result).toEqual(mockProducts);
    });
    it('should return a product by ID', async () => {
      const mockProduct: IProduct = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 899.99,
        stock: 30,
      };
      jest
        .spyOn(productService, 'findById')
        .mockImplementation(async (id: string) => {
          if (id === '1') {
            return mockProduct;
          } else {
            return null;
          }
        });
      const result = await productController.findById('1');
      expect(result).toEqual(mockProduct);
      expect(result).not.toBeNull();
    });
    it('should create a product', async () => {
      const newProduct: IProduct = {
        id: '16',
        nombre: 'Laptop HP Morris',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 999.99,
        stock: 5,
      };
      jest
        .spyOn(productService, 'createProduct')
        .mockImplementation(async (product:IProduct) => {
          return newProduct;});
      const result = await productController.create(newProduct);
      expect(result).toEqual(newProduct);
      expect(result).not.toBeNull();
    });
    it('should delete a product by ID', async () => {
      const mockProduct: IProduct = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 899.99,
        stock: 30,
      };
      jest
        .spyOn(productService, 'deleteProduct')
        .mockImplementation(async (id: string) => {
          if (id === '1') {
            return mockProduct;
          } else {
            return null;
          }
        });
      const result = await productController.delete('1');
      expect(result).toEqual(mockProduct);
      expect(result).not.toBeNull();
    });
    it('should update a product by ID', async () => {
      const updateProduct: IProduct = {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 1899.99,
        stock: 30,
      };
      jest
        .spyOn(productService, 'updateById')
        .mockImplementation(async (id:string,body:IProduct) => {
          return id === "1" ? updateProduct:null})
      const result = await productController.update('1',updateProduct);
      expect(result).toEqual(updateProduct);
      expect(result).not.toBeNull();
    });
  });
});
