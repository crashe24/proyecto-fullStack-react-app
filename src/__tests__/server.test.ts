import request from 'supertest';
import server, {connectDB} from '../server';
import db from '../config/db';

describe('GET /api', () => {
    it('should serd back a jsonn response', async() => {
        const res  = await request(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('desde api')
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde Api')
    })
})

jest.mock('../config/db')

describe('connectDb',() => {
    it('should handle database connectio error', async() => {
        jest.spyOn(db,'authenticate')
            .mockRejectedValueOnce(new Error('hubo un erro al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('hubo un erro al conectar a la BD')
        )
    })
})

// describe('Nuestro primer test', () => {
//     it('Debe revisar que 1 + 1 sean 2', () =>{
//         expect(1 + 1 ).toBe(2)
//     })
//     it('Debe revisar que 1 + 1 no sean 3', () =>{
//         expect(1 + 1 ).not.toBe(3)
//     })

// })