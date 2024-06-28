import { Sequelize } from 'sequelize-typescript';
//import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import  dotenv  from 'dotenv';

dotenv.config()
const db = new Sequelize('postgres://rest_api_node_typescript_2dk2_user:KYBgLbwp2gmCOvHFBXT9YoWyJyBJCJ7T@dpg-cpd2mhu3e1ms73a59jvg-a.oregon-postgres.render.com/rest_api_node_typescript_2dk2?ssl=true',
{ models:[__dirname + '/../models/**/*.ts'],
  logging:false

})
//PGPASSWORD=KYBgLbwp2gmCOvHFBXT9YoWyJyBJCJ7T psql -h dpg-cpd2mhu3e1ms73a59jvg-a.oregon-postgres.render.com -U rest_api_node_typescript_2dk2_user rest_api_node_typescript_2dk2
// const db = new Sequelize({
//     dialect: PostgresDialect,
//     database: 'rest_api_node_typescript_2dk2',
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     host: 'dpg-cpd2mhu3e1ms73a59jvg-a.oregon-postgres.render.com',
//     port: 5432,
//     ssl: true,
//     clientMinMessages: 'notice',
//   });

  export default db