require('dotenv').config()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')

const productsRoute = require('./routes/products')


const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000


//routes
app.get('/', (req, res) => {
    res.send("<h1>Store Api</h1>")
})

app.use('/api/products', productsRoute)

// middlewares
app.use(errorHandlerMiddleware)
app.use(notFound)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("DB connected")
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()



