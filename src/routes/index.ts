import { Router } from 'express'
import appointmenteRouter from './appointments.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/appointments', appointmenteRouter)
routes.use('/users', usersRouter)

export default routes