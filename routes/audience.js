const express = require('express');

const router = express.Router();
const appservices = require('../services/audience')

router.get('/health-check',(req,res)=>{res.send("hello")});
router.get('/list',appservices.getAudience);
router.post('/save',appservices.saveAudience);

module.exports = router;
