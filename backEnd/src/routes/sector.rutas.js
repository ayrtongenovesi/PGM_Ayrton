import express from 'express'
import { createSector, deleteSector, getSector, updateSector } from '../controllers/sector.controller.js';

const router = express.Router()

router.get('/sector', getSector);

router.put('/sector/edit:id', updateSector )

router.delete('/sector/delete:id', deleteSector )

router.post('/sector/create', createSector )

export default router