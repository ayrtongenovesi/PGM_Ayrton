import express from 'express'
import { createAT, deleteAT, getAT, updateAT } from '../controllers/activotarea.controller.js'
//ActivoSOLO
const router = express.Router()

router.get('/activo', getAT) 

router.put('/activo', updateAT)

router.delete('/activo/:id',deleteAT)

router.post('/activo/',createAT)

export default router