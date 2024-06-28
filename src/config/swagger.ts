import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';

const options:swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi:'3.0.0',
        tags: [
            {
                name:'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: [
        './src/router.ts'
    ]
}


const swaggerSpect = swaggerJSDoc(options)
const swaggerUiOption: SwaggerUiOptions = {
    customCss : `.topbar-wrapper .link {
        content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
        height: 120px; width: auto;
    }
    .swagger-ui -topbar {
        background-color: #2b3b45
    }    
    `,
    customSiteTitle: 'Documentacion REST API Express/ API'
}


export default swaggerSpect
export { swaggerUiOption }