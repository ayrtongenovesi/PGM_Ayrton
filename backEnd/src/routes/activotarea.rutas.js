import express from 'express'
import { createAT, deleteAT, getAT, updateAT } from '../controllers/activotarea.controller.js'
const router = express.Router()

router.get('/activo', getAT) 

router.put('/activo/edit/:id', updateAT)

router.delete('/activo/delete/:id', deleteAT)

router.post('/activo/create',createAT)

export default router
