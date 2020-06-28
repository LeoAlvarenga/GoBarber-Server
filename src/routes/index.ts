import { Router } from 'express'
import appointmenteRouter from './appointments.routes'

const routes = Router()

routes.use('/appointments', appointmenteRouter)

export default routes