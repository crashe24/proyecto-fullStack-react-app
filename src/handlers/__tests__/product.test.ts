import request from 'supertest'
import server from '../../server';

describe('POST /api/products', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products')
        .send({})
        expect(response.body).toHaveProperty('errors')
        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(4)
        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(3)
    })
    it('should validate that the price is a number and  greater than 0', async () => {
        const response = await request(server).post('/api/products')
        .send({
            name:'monitor curvo',
            price: 0 
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(3)
    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products')
                        .send({
                            name: 'Mouse - testing ',
                            price: 50
                        })

         expect(response.status).toBe(201) 
         expect(response.body).toHaveProperty('data')            
         expect(response.status).not.toBe(400) 
         expect(response.body).not.toHaveProperty('error')            
    })
})

describe('GET all products',() =>{

    it('should check if api/products url exist', async() => {
        const response = await request(server).get('/api/products')    
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with products', async() => {
    const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch('/json')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(400)
    })
})

describe('GET /api/products/:id',() => {
    it('Should return a 404 response for a non-existent product', async() => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('producto no encontrado')

    })
    it('Should return a 404 response for a non-existent product', async() => {
        const response = await request(server).get('/api/products/not-valida-url')
        expect(response.status).toBe(400)
       // console.log('response.body:: -> ', response.body)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no encontrado')
    })
    it('get a JSON response for a single product', async() => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        
    })
})

describe('PUT /api/products/:id', () => {
    it('Should check valid ID in the URL', async() => {
        const response = await request(server).put('/api/products/not-valid-url')
        .send({
            name: 'televisor',
            price: 200,
            availability: true
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        console.log('response.body.error', response.body.error)
        expect(response.body.error).toBe('Error al actualizar el producto')

    })

    it('shoul display validation error messages when updating a product', async() =>{
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400 )
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy() 
        expect(response.body.errors).toHaveLength(5)
        expect(response.status).not.toBe(200)
        expect(response.status).not.toHaveProperty('data')
    })
    it('should display validation error messages when price minus zero', async() =>{
        const response = await request(server).put('/api/products/1').send({
            name:'monitor',
            availability: true,
            price: -250
        })
        expect(response.status).toBe(400 )
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy() 
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El valor debe ser mayor a cero')
        
    })  
    it('should return a 404 response for a non-existent product', async() =>{
        const productId = 2022
        const response = await request(server).put(`/api/products/${productId}`).send({
            name:'monitor',
            availability: true,
            price: 300
        })
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.body.error).not.toHaveProperty('data')
        
    })  
    it('should update an existing product with valid data', async() =>{
        const response = await request(server).put(`/api/products/1`).send({
            name:'monitor',
            availability: true,
            price: 300
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
        
    })  
})

describe('PATCH /api/products/:id', () => {
    it('shoul return a 404 response for a non-existing product', async () => {

        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
        expect(response.status).not.toHaveProperty('data')
    })

    it('should update the product availability', async ()=>{
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)
        expect(response.status).not.toBe(400)
        expect(response.status).not.toHaveProperty('errors')
    })

} )
describe('DELETE /api/product/id', () => {
    it('Should valid id',async()=>{
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Id no valido')      

    })
    it('Should return a 404 response for a non-existent product',async()=>{
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')      
        expect(response.status).not.toBe(200)
    })
    it('Should delete a product ',async()=>{
        const productId = 1
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('producto eliminado')
        expect(response.status).not.toBe(400)
    })
})