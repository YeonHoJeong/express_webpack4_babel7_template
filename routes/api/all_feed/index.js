import express from 'express';
import {a} from './controller.js';
let router = express.Router();

router.get('/',a);

module.exports = router;
