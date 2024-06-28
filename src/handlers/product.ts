import {Request, Response} from 'express';
//import { validationResult} from 'express-validator';
import Product from '../models/Product.model';

export const createProduct = async ( req: Request,res: Response ) => {
   
    /*
       // VALIDACION EN EL PRODUCT
    await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacio').run(req)
    await check('price')
    .isNumeric().withMessage('Debe ser un numero ')
    .custom( value => value>0).withMessage('El valor debe ser mayor a cero')
     .notEmpty().withMessage('El precio del producto no puede ir vacio').run(req)
       // Sin middleware 
        let errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
     */
  
        const product  = await Product.create(req.body)
        res.status(201).json({data: product})

    // const product  = new Product(req.body)
    // const savedProduct = await product.save()
    //res.json({data: savedProduct})
}

export const getProducts =  async (req:Request, res:Response) => {
    console.log('desde get')
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ], 
        attributes:{ exclude: ['createdAt', 'updatedAt']}
        //limit:2
    })
    res.json({data:products})

}

export const getProductsById =  async (req:Request, res:Response) => {
    try {
        
        const {id} = req.params
        const product = await Product.findByPk(id)
        // const product = await Product.findOne({
        //     where: {
        //         id
        //     }
        // })

        if ( !product ) {
            return res.status(404).json({error: 'producto no encontrado'})
        }
        console.log('product ', product )
        res.json({data: product})
    } catch (error) {
        console.log('error', error)
        res.json({error: 'Error al buscar el producto por id'})
    }
}

export const updatedProduct = async (req: Request, res: Response ) => {
    try {
        const {id} = req.params 
        const product = await Product.findOne({
            where:{
                id
            }
        })

        if (!product ) {
            return res.status(404).json({error: 'Producto no encontrado' })
        }
        await product.update(req.body)
        await product.save()
        res.status(200).json({data: product})
    } catch (error) {
        console.log('error', error)
        res.status(404).json({error: 'Error al actualizar el producto'})
    }
}
export const updatedAvailability = async (req: Request, res: Response ) => {
    try {
        const {id} = req.params 
        const product = await Product.findOne({
            where:{
                id
            }
        })

        if (!product ) {
            return res.status(404).json({error: 'Producto no encontrado' })
        }
       // await product.update(req.body) ya no necesitamos del body
       product.availability = !product.dataValues.availability
        await product.save()
        
        res.json({data: product})
    } catch (error) {
        console.log('error', error)
        res.json({error: 'Error al actualizar el producto'})
    }
}

export const deleteProduct = async (req: Request, res: Response ) => {
    try {
        const {id} = req.params 
        const product = await Product.findOne({
            where:{
                id
            }
        })

        if (!product ) {
            return res.status(404).json({error: 'Producto no encontrado' })
        }

        await product.destroy()
        res.json({data: 'producto eliminado'})
    } catch (error) {
        console.log('error', error)
        res.json({error: 'Error al eliminar el producto'})
    }
}