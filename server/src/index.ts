import express, { type Application } from 'express'
import cors from 'cors'
import subscriptionRouter from './router'
import path from 'path'

import './scheduledTasks/subscriptionChecker'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../client/dist')))
app.use('/', subscriptionRouter)

let port: string | number | undefined = process.env.PORT

if (port === null || port === '') {
  port = 3000
} else {
  port = Number(port)
  if (isNaN(port) || port < 0 || port > 65535) {
    console.error('Invalid port number, defaulting to 8000')
    port = 3000
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
