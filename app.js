require('dotenv').config()
require('express-async-errors')


const express = require("express");
const app = express();

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/not-found')

const connectDB = require('./db/connect') 
const productsRouter = require('./routes/products')


//middleware
app.use(express.json())


//routes

app.get('/',(req,res)=>{
    res.send(`<h1>Store API</h1> <a href="/api/v1/products"> products route </a>`)
})

app.use('/api/v1/products',productsRouter)


// products route

const port = process.env.PORT || 3000

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,(req,res)=>{
            console.log(`Server running at port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()