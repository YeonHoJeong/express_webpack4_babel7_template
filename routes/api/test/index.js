import express from 'express';
import {connectCall,transactionCall} from './controller.js';
let router = express.Router();

router.get('/con',connectCall);
router.get('/trans', transactionCall);

module.exports = router;
