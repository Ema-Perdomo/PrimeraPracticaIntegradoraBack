import express from 'express';
import cartRouter from './routes/cartRouter.js';
import productsRouter from './routes/ProductsRouter.js';
import userRouter from './routes/userRouter.js';
import chatRouter from './routes/chatRouter.js';
import upload from './config/multer.js';
import mongoose from 'mongoose';
import messageModel from './models/messages.js';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { __dirname } from './path.js';
import e from 'express';


//Configuraciones.
const app = express()
const PORT = 8080

//Server
const server = app.listen(PORT, () => {    
    console.log(`Server on port: ${PORT}`)
})

const io = new Server(server) //En io declaro un nuevo servidor de socket.io

//Connection DB
//Index es nuestro punto de conexion al servidor en la nube
//(Ojo con poner la password correcta)
mongoose.connect("mongodb+srv://emaperdomo00:coderhouse@cluster0.al9oyst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectado a la base de datos"))
    .catch(error => console.log(error))

//Middlewares (comunicación)
app.use(express.json())//Permite poder ejecutar JSON
app.engine('handlebars', engine())//Implemento handlebars para utilizarlo en mi app
app.set('view engine', 'handlebars') //Voy a utilizar handlebars para las vistas(views) de mi app 
app.set('views', __dirname + '/views') //Las views van a estar en dirname + /views


//socket es un cliente escuchando
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado con socket.io')
    

    socket.on('mensaje', async (mensaje) => {
        try {
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        } catch (error) {
            io.emit('mensajeLogs', error)
        }
        
    })
})

//Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter,  express.static(__dirname + '/public'))
app.use('/api/cart', cartRouter)
app.use('/api/chat', chatRouter, express.static(__dirname + '/public'))
app.use('/api/users', userRouter)
//Carga de imagenes
app.post('/upload', upload.single('product'), (req, res) => {

    try {
        console.log(req.file)
        console.log(req.body)//?
        res.status(200).send('Imagen subida correctamente')
    } catch (error) {
        res.status(500).send('Error al cargar la imagen.')
    }
})