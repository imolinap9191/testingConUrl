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
// tests para corroborar que los metodos esten definidos
it('should be defined', () => {
  expect(productsService.create).toBeDefined();
  expect(productsService.delete).toBeDefined();
  expect(productsService.findAll).toBeDefined();
  expect(productsService.findById).toBeDefined();
  expect(productsService.update).toBeDefined();
});

// prueba para chequear que el metodo findAll nos devuelva un arreglo de productos
  it('should return listProducts', () => {
// mockeamos datos en un array
    const result: IProduct[] = [
      {
        id: '1',
        nombre: 'Laptop HP Pavilion',
        marca: 'HP',
        descripcion:
          'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
        precio: 899.99,
        stock: 30,
      },
      {
        id: '2',
        nombre: 'Smartphone Samsung Galaxy S21',
        marca: 'Samsung',
        descripcion:
          'Smartphone con pantalla AMOLED de 6.2 pulgadas, 128GB de almacenamiento',
        precio: 999.0,
        stock: 20,
      },
      {
        id: '3',
        nombre: 'Tablet Apple iPad Pro',
        marca: 'Apple',
        descripcion:
          'Tablet con pantalla Retina de 11 pulgadas, 256GB de almacenamiento',
        precio: 1099.99,
        stock: 15,
      },
    ];
//con spyOn simulamos el comportamiento del metodo findAll en el controlador (funcion establecida en el service)
    jest.spyOn(productsService, 'findAll').mockImplementation(() => result);
//esperamos que el resultado del metodo sea igual a los datos mockeados
    expect(productsController.findAll()).toEqual(result);
  });

//test para corroborar que el metodo finById nos devuelva el objeto de 
//un id especifico, pasado como parametro
  it('should return idProducts', () => {
//mockeamos un objeto
    const result: IProduct = {
      id: '1',
      nombre: 'Laptop HP Pavilion',
      marca: 'HP',
      descripcion: 'Laptop con procesador Intel Core i5, 8GB de RAM, y SSD de 256GB',
      precio: 899.99,
      stock: 30,
    };
//con spyOn simulamos el comportamiento del metodo findById en el controlador(funcion establecida en el service)
    jest.spyOn(productsService, 'findById').mockImplementation((id: string) => {
      return id === '1' ? result : null;
    });
//esperamos que el resultado del metodo sea igual a los datos mockeados
    expect(productsController.findById('1')).toEqual(result);
//aqui si pasamos un id distinto al mockeado, verificamos que el resultado sea nulo,
//como establecemos en la ternaria citada mas arriba
    expect(productsController.findById('2')).toBeNull();
  });

//test para corroborar que el metodo create genere un nuevo registro
  it('should create a new product', () => {
//pasamos los datos del nuevo registro, producto
    const newProduct: IProduct = {
      id: '7',
      nombre: 'Auriculares inalámbricos Apple AirPods Pro',
      marca: 'Apple',
      descripcion: 'Auriculares con cancelación de ruido y resistencia al agua',
      precio: 249.0,
      stock: 18,
    };
//con spyOn simulamos el comportamiento del metodo create del controlador
    jest.spyOn(productsService, 'create').mockImplementation((product: IProduct) => {
        return newProduct;
      });
//esperamos que el resultado del metodo sea igual a los datos mockeados
    expect(productsController.create(newProduct)).toEqual(newProduct);
  });

  //test para no poder crear un nuevo registro con stock negativo
  it('should not create product with negative stock', () => {
//mockeamos datos del nuevo registro pero con el stock en negativo
    const productWithNegativeStock: IProduct =  {
      id: '8',
      nombre: 'Batería externa Anker PowerCore',
      marca: 'Anker',
      descripcion: 'Batería portátil de 20000mAh para cargar dispositivos móviles',
      precio: 49.99,
      stock: -22
    };
    jest.spyOn(productsService, 'create').mockImplementation((product: IProduct) => {
      return product.stock >= 0 ? product : null;
    });
//esperamos que si el nuevo registro tiene un stock negativo, la respuesta sea null y no se cree
    expect(productsController.create(productWithNegativeStock)).toBeNull();
  });

  //test para no poder crear un nuevo registro con precio negativo
  it('should not create product with negative price', () => {
     // mockeamos datos del nuevo registro pero con el precio en negativo
    const productWithNegativePrice: IProduct =  {
      id: '9',
      nombre: 'Teclado mecánico Corsair K70 RGB',
      marca: 'Corsair',
      descripcion: 'Teclado mecánico para juegos con retroiluminación RGB',
      precio: -159.95,
      stock: 20
    };
    // con spyOn simulamos el comportamiento del metodo create en el controlador
    jest.spyOn(productsService, 'create').mockImplementation((product: IProduct) => {
      return product.precio >= 0 ? product : null;
    });
     // esperamos que si el nuevo registro tiene un precio negativo, la respuesta sea null y no se cree.
    expect(productsController.create(productWithNegativePrice)).toBeNull();
  });
  
  //test para actualizar un registro existente
  it('should update an existing product', () => {
    //registro actualizado
    const updatedProduct: IProduct = {
      id: '7',
      nombre: 'Auriculares inalámbricos Apple AirPods Pro',
      marca: 'Apple',
      descripcion: 'Auriculares con cancelación de ruido y resistencia al agua',
      precio: 259.0,
      stock: 18,
    };
 //con spyOn simulamos el comportamiento del metodo update en el controlador
    jest.spyOn(productsService, 'update').mockImplementation((id: string, product: IProduct) => {
        return id === '7' ? updatedProduct : null;
      });
    // esperamos que el id y registro actualizado sea igual al objeto mockeado
    expect(productsController.update('7', updatedProduct)).toEqual(updatedProduct);
    // si pasamos una informacion distinta, esperamos que la respuesa sea nula, 
    //por ende que no se actualice
    expect(productsController.update('8', updatedProduct)).toBeNull();
  });

  // test para eliminar un registro existente
  it('should delete an existing product', () => {
    //registro a eliminar
    const deletedProduct: IProduct = {
      id: '7',
      nombre: 'Auriculares inalámbricos Apple AirPods Pro',
      marca: 'Apple',
      descripcion: 'Auriculares con cancelación de ruido y resistencia al agua',
      precio: 259.0,
      stock: 18,
    };
    // con spyOn simulamos el comportamiento del servicio de delete
    jest.spyOn(productsService, 'delete').mockImplementation((id: string) => {
      return id === '7' ? deletedProduct : null;
    });
    // esperamos que el id sea igual al objeto mockeado
    expect(productsController.delete('7')).toEqual(deletedProduct);
    // si pasamos una informacion distinta, esperamos que la respuesa sea nula, 
    //por ende que no se elimine
    expect(productsController.delete('9')).toBeNull();
  });

  

 
});
