const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadedData();
};

const loadedData = async () => {
    console.log('loaded');

    try {
        // 1. โหลด user ทั้งหมดจาก API
        const response = await axios.get(`${BASE_URL}/users`);
        const users = response.data;

        // 2. แสดงผลในตาราง
        const tableBody = document.getElementById('user-table-body');
        tableBody.innerHTML = ''; // เคลียร์ก่อน

        users.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.gender}</td>
                <td>${user.interest}</td>
                <td>${user.description}</td>
            `;

            // สร้างคอลัมน์สำหรับปุ่มแก้ไขและลบ
            const actionCell = document.createElement('td');
            actionCell.innerHTML = `
                <a href="index.html?id=${user.id}">
                    <button>Edit</button>
                </a>
                <button class="delete" data-id="${user.id}">Delete</button>
            `;
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });

        // 3. ลบ user
        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                if (confirm("คุณต้องการลบข้อมูลผู้ใช้นี้ใช่หรือไม่?")) {
                    try {
                        await axios.delete(`${BASE_URL}/users/${id}`);
                        loadedData(); // โหลดใหม่
                    } catch (error) {
                        console.error('เกิดข้อผิดพลาดในการลบ:', error);
                    }
                }
            });
        });

    } catch (error) {
        console.error('โหลดข้อมูลไม่สำเร็จ:', error);
    }
};
