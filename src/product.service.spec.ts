import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { IProduct } from './Iproduct';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productsController = app.get<ProductsController>(ProductsController);
    productsService = app.get<ProductsService>(ProductsService);
  });

  describe('root', () => {
//se testea que los metodos esten definidos
    it('should be defined', () => {
      expect(productsService.create).toBeDefined();
      expect(productsService.delete).toBeDefined();
      expect(productsService.findAll).toBeDefined();
      expect(productsService.findById).toBeDefined();
      expect(productsService.update).toBeDefined();
    });

//se verifica si la función findAll() del servicio devuelve una lista vacía de productos 
//porque en nuestro caso no contamos con datos almacenados en un archivo .json por ejemplo 
    it('should not be empty ', () => {
      const products = productsService.findAll();
      expect(products).toEqual([]);
    });

//se testea la creacion de un nuevo producto (se pasa un producto para simular la creacion 
//y posteriormente el test)
    it('should create a new product', () => {
      const newProduct: IProduct = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 50,
      };
      const createdProduct = productsService.create(newProduct);
      const foundProduct = productsService.findById('1');
      expect(createdProduct).toEqual(newProduct); //1ro verificamos que lo crea
      expect(foundProduct).toEqual(newProduct); //posteriormente evaluamos si es igual al id pasado como parametro
    });

//se verifica el stock no sea negativo, en caso de que asi sea no se creara el registro
    it('should not allow creation of product with negative stock', () => {
      const productWithNegativeStock: IProduct = {
        id: '8',
        nombre: 'Batería externa Anker PowerCore',
        marca: 'Anker',
        descripcion: 'Batería portátil de 20000mAh para cargar dispositivos móviles',
        precio: 49.99,
        stock: -22,
      };
      const result = productsService.create(productWithNegativeStock);
      expect(result).toBeNull(); //se verifica que el resultado obtenido sea null
    });
  
//se verifica el precio no sea negativo, en caso de que asi sea no se creara el registro
    it('should not allow creation of product with negative price', () => {
      const productWithNegativePrice: IProduct = {
        id: '9',
        nombre: 'Teclado mecánico Corsair K70 RGB',
        marca: 'Corsair',
        descripcion: 'Teclado mecánico para juegos con retroiluminación RGB',
        precio: -159.95,
        stock: 20,
      };
      const result = productsService.create(productWithNegativePrice);
      expect(result).toBeNull(); //se verifica que el resultado obtenido sea null
    });
 
//se testea la actualizacion de un producto existente
    it('should update an existing product', () => {
      const initialProduct: IProduct = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 50,
      };
      productsService.create(initialProduct);
      const updatedProductData: IProduct = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 51,
      };
      const updatedProduct = productsService.update('1', updatedProductData);
      expect(updatedProduct).toEqual(updatedProductData); 
      //verificamos que el id sea el correcto y obtenga los datos modificados
    });

//no permite la actualizacion de un registro que no existe
    it('should not update a non-existing product', () => {
      const updatedProductData: IProduct = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 51,
      };
      const updatedProduct = productsService.update('1', updatedProductData);
      expect(updatedProduct).toBeFalsy(); //verificamos que el resultado sea Falsy
    });

// testear la eliminacion de un registro
    it('should delete an existing product', () => {
      const productToDelete: IProduct = {
        id: '1',
        nombre: 'a24',
        marca: 'Samsung',
        descripcion: 'celular',
        precio: 25,
        stock: 51,
      };
      productsService.create(productToDelete);
      const deletedProduct = productsService.delete('1');
      const foundProduct = productsService.findById('1');
      expect(deletedProduct).toEqual(productToDelete);//verificamos que el producto a eliminar,efectivamente sea el indicado
      expect(foundProduct).toBeFalsy();//verificamos que el resultado sea Falsy
    });

//no permite eliminar un registro inexistente
    it('should not delete a non-existing product', () => {
      const deletedProduct = productsService.delete('1');
      expect(deletedProduct).toBeFalsy();//verificamos que el resultado sea Falsy
    });
  });
});