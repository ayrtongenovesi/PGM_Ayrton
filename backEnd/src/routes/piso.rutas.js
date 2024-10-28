import express from 'express'
import { createPiso, deletePiso, getPiso, updatePiso } from '../controllers/piso.controller.js'

const router = express.Router()

router.get('/piso',getPiso)

router.put('/piso',updatePiso)

router.delete('/piso/:id',deletePiso)

router.post('/piso/', createPiso)

export default router