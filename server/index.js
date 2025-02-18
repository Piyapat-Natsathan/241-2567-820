const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const mysql = require("mysql2/promise");
const port = 8000;
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
app.post("/users", async (req, res) => {
  let user = req.body;
  const results = await conn.query("INSERT INTO users SET ?", user);
  res.json({
    message: "User created successfully",
    data: results[0],
  });
});

app.put("/user/:id", (req, res) => {
  let id = req.params.id;
  let updatedUser = req.body;
  //หา index ของ user ที่จะ update
  let selectedIndex = users.findIndex((user) => {
    if (user.id == id) {
      return true;
    } else {
      return false;
    }
  });
  // หา user จาก id ที่ส่งมา
  //update user นั้น
  //ส่งข้อมูล user ที่ update กลับไป
  if (updatedUser.firstname) {
    users[selectedIndex].firstname = updatedUser.firstname;
  }
  if (updatedUser.lastname) {
    users[selectedIndex].lastname = updatedUser.lastname;
  }

  res.json({
    message: "User updated successfully",
    data: {
      user: updatedUser,
      indexUpdated: selectedIndex,
    },
  });
});
app.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  let selectedIndex = users.findIndex((user) => user.id == id);

  users.splice(selectedIndex, 1);
  res.json({
    message: "User deleted successfully",
    indexDeleted: selectedIndex,
  });
});
app.listen(port, async (req, res) => {
  await initMySQL();
  console.log(`Server is running on port ${port}`);
});