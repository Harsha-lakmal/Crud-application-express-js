const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'employee_management'
})
app.use(express.json());
connection.connect()
//get all employee
app.get('/employees', (req, res) => {
  connection.query('SELECT * from employee', (error, result) => {
 if (error){
    console.error("fail get employee" , error)
    return res.status(500).json(result)
 }
 res.status(200).json({  
    massage : result
 })
})
})


//get all >> is 


app.get('/employee/:id', (req, res) => {
    const id = req.params.id ;

  connection.query('SELECT * from employee where id = ?', [id] , (error, result) => {
 if (error){
    console.error("fail get employee" , error)
    return res.status(500).json(result)
 }
 res.status(200).json({  
    massage : {result}
 })
})
})




//add employee 
app.post('/employee', (req, res) => {
    const {name,position,salary,age,work_experience } =req.body
 connection.query('INSERT INTO employee (name , position , salary , age , work_experience)  VALUES (?,?,?,?,?)',
    [name,position,salary,age,work_experience] , 
     (error , result) => { 
if (error){
    console.error("fail add employee" , error)
    return res.status(500).json(result)
}
res.status(200).json({
    massage: "add employee is sucsess!!"
})
})
})
//add is ok






//update emp - ok 
app.put('/employee/:id', (req, res) => {
    const id = req.params.id ; 
   connection.query('UPDATE employee SET name = ?, position = ?, salary = ?, age = ?, work_experience = ? WHERE id = ?', 
    [req.body.name,req.body.position,req.body.salary,req.body.age,req.body.work_experience , id] , 
    (error,result) => {
  if (error)  {
    console.error("fail upddate employee" , error)
    return res.status(500).json(result)
  }
  res.status(200).json({
    massage:"employee update succsess...!!"
  })
})
})
//worcking <<<<<


app.delete('/employee/:id', (req, res) => {
    const id = req.params.id ;
   connection.query('delete from employee where id = ?  ',[id],
     (error,result) => {
        if (error){
            console.error("employee not found .. " , error)
            return res.status(500).json(result)
        }
        res.status(201).json({
            massage:"employee deleted "
        })
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





