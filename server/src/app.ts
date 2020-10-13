import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json());
app.use(todoRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sygyh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>{
    console.log('Connecting database....');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )}
  )
  .catch(error => {
    throw error
  })
