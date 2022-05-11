const dotenv =require("dotenv") 
dotenv.config()
const MONGO_DB = process.env.MONGO_DB_URI



const mongodb={conexion : MONGO_DB} 
module.exports={mongodb}