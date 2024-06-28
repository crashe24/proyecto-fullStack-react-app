import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express'
import swaggerSpect, {swaggerUiOption} from './config/swagger'


// connect database
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
       //*/ console.log(colors.bgGreen('Base conectada con exito'))
    } catch (error) {
        //console.log('error', error)
        //console.log(colors.red.bold( 'hubo un erro al conectar a la BD'), error)
        console.log('hubo un erro al conectar a la BD')
    }
}

connectDB()

// instancia de express
const server = express()

// habilitar cors
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        console.log('origin', origin)
        if (origin === process.env.FRONTEND_URL) {
            console.log('permitir')
            callback(null, true)
        } else {
            console.log('denegar')
            callback(new Error('Error de cors'))
        }
    }
}

server.use(cors(corsOptions))
//leer datos de formularios 
server.use(express.json())
server.use(morgan('dev'))
//server.use(morgan('combine'))
//server.use(morgan('common'))
//server.use(morgan('short'))
//server.use(morgan('tiny'))
server.use('/api/products',router)

// docs
server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpect,swaggerUiOption))

// Routing 
// server.get('/', (req, res) => {
//     const datos = [
//         {id:1,nombre:"JORGE"},
//         {id:2,nombre:"GAEL"},
//     ]
//     //res.send(datos)
//     res.json(datos)
// })

export default server