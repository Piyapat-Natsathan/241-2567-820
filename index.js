const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE';
let selectedId = '';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        mode = 'EDIT';
        selectedId = id;

        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            const user = response.data;

            document.querySelector('input[name=firstname]').value = user.firstname;
            document.querySelector('input[name=lastname]').value = user.lastname;
            document.querySelector('input[name=age]').value = user.age;
            document.querySelector('textarea[name=description]').value = user.description;

            document.querySelectorAll('input[name=gender]').forEach((el) => {
                if (el.value === user.gender) el.checked = true;
            });

            document.querySelectorAll('input[name=interest]').forEach((el) => {
                if (user.interest.includes(el.value)) el.checked = true;
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
};

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstname) errors.push('กรุณากรอกชื่อ');
    if (!userData.lastname) errors.push('กรุณากรอกนามสกุล');
    if (!userData.age) errors.push('กรุณากรอกอายุ');
    if (!userData.gender) errors.push('กรุณากรอกเพศ');
    if (!userData.interest.length) errors.push('กรุณากรอกสิ่งที่สนใจ');
    if (!userData.description) errors.push('กรุณากรอกข้อมูลส่วนตัว');
    return errors;
};

const submitData = async () => {
    let userData = {
        firstname: document.querySelector('input[name=firstname]').value,
        lastname: document.querySelector('input[name=lastname]').value,
        age: document.querySelector('input[name=age]').value,
        gender: document.querySelector('input[name=gender]:checked')?.value || '',
        description: document.querySelector('textarea[name=description]').value,
        interest: Array.from(document.querySelectorAll('input[name=interest]:checked')).map(el => el.value)
    };

    let messageDOM = document.getElementById('message');
    try {
        let errors = validateData(userData);
        if (errors.length > 0) throw { message: 'กรุณากรอกข้อมูลให้ครบถ้วน', errors };

        let message = mode === 'CREATE' ? 'บันทึกข้อมูลเรียบร้อย' : 'แก้ไขข้อมูลเรียบร้อย';
        let response;

        if (mode === 'CREATE') {
            response = await axios.post(`${BASE_URL}/users`, userData);
        } else {
            response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData);
        }

        messageDOM.innerText = message;
        messageDOM.className = 'message success';

    } catch (error) {
        console.error('Error:', error);
        messageDOM.innerHTML = `<div>${error.message}</div><ul>${error.errors.map(e => `<li>${e}</li>`).join('')}</ul>`;
        messageDOM.className = 'message danger';
    }
};
