import express from 'express';
let router = express.Router();
import all_feed from './all_feed';


router.use('/all_feed', all_feed);

module.exports = router;
