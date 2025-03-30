const express = require('express')
const cors = require('cors')
const app = express()
const student_route = require('./routes/student')
const teacher_route = require('./routes/teacher')
app.use(cors())
app.use(express.json())
app.use('/student',student_route)
app.use('/teacher',teacher_route)

app.post("/api/signup",(req,res)=>{
    const {name,email,branch,roll} = req.body
    console.log(name + email+ branch + roll)
})

app.listen(3000,(req,res)=>{
    console.log(`app is listening on port 3000`)
})
