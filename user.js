const BASE_URL = 'http://localhost:8000';
window.onload = async () => {
          await loadData();
}
const loadData = async () => {
          console.log("load");
          //1. load user ทั้งหมดออกมาจาก api
          const response = axios.get(`${BASE_URL}/users`);
          console.log =(response.data);

          //2. นำ user ที่โหลดมาเเสดงผลใส่เข้าไปใน html
          const userDOM = document.getElementById('users');
          let htmlData = '<div>'
          for (let i = 0; i < response.data.length; i++) {
                    let user = response.data[i];
                    htmlData += `<div>
                    ${user.id} ${user.firstname} ${user.lastname} 
                    <a href='index.html?id=${user.id}'><button>Edit</button></a>
                    <button class='delete' data-id='${user.id}')">Delete</button>
                    </div>`          
          }
          htmlData += '</div>'
          userDOM.innerHTML = htmlData

          //3 ลบ user
          const deleteDOMs = document.getElementsByClassName('delete');
          for (let i = 0; i < deleteDOMs.length; i++) {
                    deleteDOMs[i].addEventListener('click', async (event) => {
                              const id = event.target.dataset.id;
                              try{
                                        await axios.delete(`${BASE_URL}/users/${id}`);
                                        loadData(); // recursive function = เรียกใช้ฟังก์ชันตัวเอง
                              } catch {
                                        console.err('error', error);
                              }
                    });          
          }
}