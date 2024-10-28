import express from 'express'
import { createSector, deleteSector, getSector, updateSector } from '../controllers/sector.controller.js';

const router = express.Router()

router.get('/sector', getSector);

router.put('/sector', updateSector )

router.delete('/sector/:id', deleteSector )

router.post('/sector/', createSector )

export default router