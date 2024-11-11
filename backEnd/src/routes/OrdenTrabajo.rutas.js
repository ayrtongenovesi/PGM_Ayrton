import express from 'express'
import { createOT, deleteOT, getOT, updateOT } from '../controllers/OrdenTrabajo.controller.js'

const router = express.Router()

router.get('/ot', getOT)

router.put('/ot/edit:id', updateOT)

router.delete('/ot/delete:id', deleteOT)

router.post('/ot/create', createOT)

export default router