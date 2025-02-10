/*
// import http module เพื่อสร้าง server
const http = require('http')

const host = 'localhost'//กำหนด host ที่ server จะรอรับ request
const port = 8000 //กำหนด port ที่ server จะรอรับ request

// กำหนดค่าเิร่มต้นของ server
const requestListener = function (req, res) {
    res.writeHead(200) // ส่ง status code 200 กลับไปให้ client
    res.end('My first server!') // ส่ง response กลับไปให้ client
}

const server = http.createServer(requestListener) //สร้าง server ด้วย http.createServer โดยใช้ requestListener ที่เราสร้างไว้
server.listen(port, host, () => { // กำหนดให้ server รอรับ request ที่ port 8000 และ host เราที่กำหนดไว้
    console.log(`Server is running on http://${host}:${port}`) // แสดงข้อความว่า server กำลังทำงานอยู่ที่ http://localhost:8000
})
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
const port = 8000;

// เก็บ user 
let users = [];
let counter = 1;

/*
GET /users สำหรับ get users ทั้งหมด
POST /user สำหรับ create user ใหม่บันทึกเข้าไป
*/

// path = GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

//patg = POST /user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter;
    counter += 1;
    users.push(user);
    res.json({
        message: 'User created',
        user: user
    })
});
    
// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;

    // หา index ของ user ที่ต้องการ update
    let selectIndex = users.findIndex(user => user.id == id); 
    // update ข้อมูล user 
    if (updateUser.fristname) {
        users[selectIndex].fristname = updateUser.fristname;
    }

    if (updateUser.lastname) {
        users[selectIndex].lastname = updateUser.lastname;
    }

    res.json({
            message: 'User updated',
        data: {
            user: updateUser,
            indexUpdate: selectIndex
        }
    });
});

// path = DELETE /user/:id
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    // หา index ของ user ที่ต้องการลบ
    let selectIndex = users.findIndex(user => user.id == id);

    users.splice(selectIndex, 1);
    res.json({
        message: 'User deleted',
        indexDeleted: selectIndex
    });
});

app.listen(port, (req, res) => {
    console.log('Server is running on port' + port);
});