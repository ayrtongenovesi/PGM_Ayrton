import express from 'express'
import { createTarea, deleteTarea, getTarea, updateTarea } from '../controllers/tareas.controller.js'

const router = express.Router()

router.get('/tareas', getTarea)

router.put('/tareas/edit/:id', updateTarea)

router.delete('/tareas/delete/:id', deleteTarea)

router.post('/tareas/create', createTarea)

export default router
