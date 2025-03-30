const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("STUDENT ROUTE")
})


module.exports = router