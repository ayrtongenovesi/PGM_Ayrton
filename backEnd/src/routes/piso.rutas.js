import express from 'express'
import { createPiso, deletePiso, getPiso, updatePiso } from '../controllers/piso.controller.js'

const router = express.Router()

router.get('/piso',getPiso)

router.put('/piso/edit/:id', updatePiso)

router.delete('/piso/delete/:id', deletePiso)

router.post('/piso/create', createPiso)

export default router
