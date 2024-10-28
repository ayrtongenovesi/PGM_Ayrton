import express from 'express'
import { createTarea, deleteTarea, getTarea, updateTarea } from '../controllers/tareas.controller'

const router = express.Router()

router.get('/tareas', getTarea)

router.put('/tareas', updateTarea)

router.delete('/tareas/:id', deleteTarea)

router.post('/tareas/', createTarea)

export default router