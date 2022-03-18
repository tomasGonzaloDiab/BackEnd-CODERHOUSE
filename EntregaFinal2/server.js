import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.js'
dotenv.config()

const app = express()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.use(cors(`${process.env.PORT}`));

routes(app)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`servidor prendido en http://localhost:${PORT}`);
});
