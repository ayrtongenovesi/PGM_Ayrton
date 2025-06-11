import express from 'express'
import { createEdificio, deleteEdificio, getEdificio, updateEdificio } from '../controllers/edificio.controller.js'

const router = express.Router()

router.get('/edificio', getEdificio)

router.put('/edificio/edit/:id', updateEdificio)

router.delete('/edificio/delete/:id', deleteEdificio)

router.post('/edificio/create', createEdificio)

export default router
