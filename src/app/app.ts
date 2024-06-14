import express, { Application } from 'express'
import cors from 'cors'
import router from './routes'

const app:Application = express()

app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'] }))
app.use('',router)

export default app;

