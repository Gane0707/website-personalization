const express = require('express');

const router = express.Router();
const appservices = require('../services/audience')

res.setHeader('Access-Control-Allow-Origin', '*');

router.get('/health-check',(req,res)=>{res.send("hello")});
router.get('/lists',appservices.getAudience);
router.post('/createAudience',appservices.saveAudience);
router.get('/personalisation',appservices.personalisation)

module.exports = router;
