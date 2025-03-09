const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const mysql = require("mysql2/promise");
const cors = require("cors");
const port = 8000;

app.use(cors());
let users = [];

// GET /user สำหรับ get users ทั้งหมด
// POST /users สำหรับเพิ่ม user ใหม่เข้าไป
// DELETE /users/:id สำหรับลบ user ที่มี id ตามที่ระบุ
// GET /users/:id สำหรับ get user ที่มี id ตามที่ระบุ
// PUT /users/:id สำหรับ update user ที่มี id ตามที่ระบุ
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "webdb",
    port: 8830,
  });
};

/*
 app.get("/testdb-new", async (req, res) => {
   try {
     const results = await conn.query("SELECT * FROM users");
     res.json(results[0]);
   } catch (error) {
     console.log("error", error.message);
     res.status(500).json({ error: "Error fetching users" });
   }
});
*/

// path = GET /users
app.get("/users", async (req, res) => {
  const results = await conn.query("SELECT * FROM users");
  res.json(results[0]);
});

//path = POST /user
app.post('/users', async (req, res) => { //สร้าง path /users สำหรับ post (สร้างข้อมูลใหม่)
  try {
      let user = req.body; //เก็บข้อมูลที่ส่งมาจาก client ที่อยู่ใน body ไว้ในตัวแปร user
      const errors = validatedata(user);
      if (error.length >0){
          throw{
              message:"กรุณากรอกข้อมูลให้ครบถ้วน",
              errors:error
          }
      }
      const result = await conn.query('INSERT INTO users SET ?', user) //เพิ่มข้อมูลใหม่ลงในตาราง users โดยใช้คำสั่ง SQL
      
      res.json({
          message: 'User created', //ส่งข้อความกลับไปให้ client
          data: result[0] //id ของ user ที่เพิ่มเข้าไปในตาราง users
      })
  } catch (error) {
      console.log('Error updating user:', error.message) //แสดงข้อความ error ใน console
      res.status(500).json({ //บอกว่าเกิด error ในการอัพเดทข้อมูลฝั่ง server รหัสคือ 500
          message: 'Something went wrong',
          errorMessage: error.message
      })
  }
})

// path = GET /users/:id สำหรับ get user รายคนที่ต้องการดู
app.get('/users/:id', async(req, res) => {
  try{
      let id = req.params.id;
      const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
      if (results[0].length == 0) {
          throw {statusCode: 404, message: 'User not found'}
      }
      res.json(results[0][0])
  } catch (error) {
      console.error('errorMessage',error.message)
      let statusCode = error.statusCode || 500
      res.status(statusCode).json({
         message: 'something went wrong',
         errorMessage: error.message
      })
  }
})

// path = PUT /user/:id
app.put("/users/:id", async (req, res) => {
  let id = req.params.id;
  let updatedUser = req.body;
  try{
    let id = req.params.id;
    let updatedUser = req.body;
    const results = await conn.query(
      'UPDATE users SET ? Where ID = ?',
      [updatedUser, id]
    );
    res.json({
      message: "Update user completed",
      data: results[0]
    })
  } catch (error) {
    console.error("errorMessage",error.message)
    res.status(500).json({
       message: "somthing went wrong" ,
       errorMessage: error.message
      });
  }
});

// path = DELETE /user/:id
app.delete("/user/:id", async (req, res) => {
  try{
    let id = req.params.id;
    let updatedUser = req.body;
    const results = await conn.query(
      'DELETE From users SET ? Where ID = ?', [id]);
    res.json({
      message: "DELETE user completed",
      data: results[0]
    })
  } catch (error) {
    console.error("errorMessage",error.message)
    res.status(500).json({
       message: "somthing went wrong" ,
       errorMessage: error.message
      });
  }
});