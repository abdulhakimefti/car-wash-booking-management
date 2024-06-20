import express, { Application } from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorHandler'


const app:Application = express()

app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173/'] }))
app.use('/api',router)
app.use(globalErrorHandler)
app.use(notFound)

export default app;

