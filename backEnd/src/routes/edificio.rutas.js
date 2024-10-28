import express from 'express'
import { createEdificio, deleteEdificio, getEdificio, updateEdificio } from '../controllers/edificio.controller.js'

const router = express.Router()

router.get('/edificio', getEdificio)

router.put('/edificio', updateEdificio)

router.delete('/edificio/:id', deleteEdificio)

router.post('/edificio/', createEdificio)

export default router