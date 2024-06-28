import {Router} from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updatedAvailability, updatedProduct } from './handlers/product';
import {body, param } from 'express-validator';
import { handleInputError } from './middleware';

const router = Router()

/**
 * @swagger
 * components:  
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: monitor
 *                  price:
 *                      type: number
 *                      description: The product proce
 *                      example:  200
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      description: Return a list of products
 *      responses: 
 *          200: 
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 *  /api/products/{id}:
 *   get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Not found
 *          404:
 *              description: Bad Request
 *              
 */
router.get('/:id', 
param('id').isInt().withMessage('ID no encontrado'), 
handleInputError,
getProductsById)


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true 
 *          content:    
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string 
 *                              example: 'Monitor curso de 49 pulgadas'
 *                          price:
 *                              type: number
 *                              example: 299
 *      response:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request 
 */
router.post('/', 
body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
body('price')
    .isNumeric().withMessage('Debe ser un numero ')
    .custom( value => value>0).withMessage('El valor debe ser mayor a cero')
    .notEmpty().withMessage('El precio del producto no puede ir vacio'),
handleInputError,    
createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a new product with user input
 *      tags:
 *          - Products
 *      description: Return the updated product
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer     
 *      requestBody:
 *          required: true 
 *          content:    
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string 
 *                              example: 'Monitor curso de 49 pulgadas'
 *                          price:
 *                              type: number
 *                              example: 299
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      response:
 *          200:
 *              description: Successful response
 *              content:    
 *                  application/json:
 *                    schema:
 *                          items:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or invalid input data 
 *          404:
 *              description: Bad request 
 */
router.put('/:id', 
body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
body('price')
    .isNumeric().withMessage('Debe ser un numero ')
    .custom( value => value>0).withMessage('El valor debe ser mayor a cero')
    .notEmpty().withMessage('El precio del producto no puede ir vacio'),
body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'),
handleInputError,
updatedProduct )

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update a product availability
 *      tags:
 *          - Products
 *      description: Return the updated product availability
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer     
 *      response:
 *          200:
 *              description: Successful response
 *              content:    
 *                  application/json:
 *                    schema:
 *                          items:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or invalid input data 
 *          404:
 *              description: Bad request 
 * 
 */
router.patch('/:id',
param('id').isInt().withMessage('Id no valido'),
handleInputError
,updatedAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product
 *      tags:
 *          - Products
 *      description: Return a confirmation message
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer     
 *      response:
 *          200:
 *              description: Product deleted
 *              content: 
 *                  application/json:
 *                      schena:
 *                          type: string
 *                          value: 'Producto eliminado'
 *          400:    
 *              description: Bad request - Invalid ID or invalid input data 
 *          404:
 *              description: Bad request 
 * 
 */
router.delete('/:id', 
param('id').isInt().withMessage('Id no valido'),
handleInputError,
deleteProduct)

export default router