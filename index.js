BASE_URL = 'http://localhost:8000';
let mode = 'CREATE';
let selectedId = '';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);

    if (id) {
        mode = 'EDIT';
        selectedId = id;
        //1.ดึงข้อมูล user ที่ต้องการเเก้ไขออกมา
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`)
            const user = response.data;
            console.log('response', response.data)
            let firstNameDOM = document.querySelector('input[name = firstname]');
            let lastNameDOM = document.querySelector('input[name = lastname]');
            let ageDOM = document.querySelector('input[name = age]');
            let descriptionDOM = document.querySelector('textarea[name=description]');

            let genderDOMs = document.querySelectorAll('input[name = gender]');
            let interestDOMs = document.querySelectorAll('input[name = interest]');
            
            firstNameDOM.value = user.firstname;
            lastNameDOM.value = user.lastname;
            ageDOM.value = user.age;
            descriptionDOM.value = user.description;
            console.log('interest', user.interest);
            
            for (let i=0; i<genderDOMs.length; i++) {
                if (genderDOMs[i].value == user.gender) {
                    genderDOMs[i].checked = true;
                }
            }
            for (let i=0; i<interestDOMs.length; i++) {
                if (user.interest.includes(interestDOMs[i].value)) {
                    interestDOMs[i].checked = true;
                }
            }
        } catch (error) {
            console.log('error', error)
        }

        //2.นำข้อมูล user ที่ดึงมาใส่ input


    }
}


const validateData = (userData) => {
    let errors = [];
    if (!userData.firstname) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!userData.lastname) {
        errors.push('กรุณากรอกนามสกุล')
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ')
    }
    if (!userData.gender) {
        errors.push('กรุณากรอกเพศ')
    }
    if (!userData.interest) {
        errors.push('กรุณากรอกสิ่งที่สนใจ')
    }
    if (!userData.description) {
        errors.push('กรุณากรอกข้อมูลส่วนตัว')
    }
    return errors;
}
const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name = firstname]');
    let lastNameDOM = document.querySelector('input[name = lastname]');
    let ageDOM = document.querySelector('input[name = age]');
    let genderDOM = document.querySelector('input[name = gender]:checked');
    let interestDOM = document.querySelectorAll('input[name = interest]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message');

    // เก็บ interest เป็น array แล้วค่อย join
    let interests = [];
    for (let i = 0; i < interestDOM.length; i++) {
        interests.push(interestDOM[i].value);
    }

    let userData = {
        firstname: firstNameDOM.value.trim(),
        lastname: lastNameDOM.value.trim(),
        age: ageDOM.value.trim(),
        gender: genderDOM ? genderDOM.value : '',
        description: descriptionDOM.value.trim(),
        interest: interests.join(',')
    }

    // ✅ ตรวจสอบข้อมูลก่อนส่ง
    const errors = validateData(userData);
    if (errors.length > 0) {
        let htmlData = '<div>';
        htmlData += '<ul>';
        htmlData += `<div>กรุณากรอกข้อมูลให้ครบถ้วน</div>`;
        for (let i = 0; i < errors.length; i++) {
            htmlData += `<li>${errors[i]}</li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
        return; // ❗ ไม่ส่งข้อมูลถ้ายังไม่ครบ
    }

    // ✅ ส่งข้อมูลหลังผ่านการตรวจสอบ
    try {
        let message = 'บันทึกข้อมูลเรียบร้อย';

        if (mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/users`, userData);
            console.log('response', response.data);
        } else {
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData);
            message = 'เเก้ไขข้อมูลเรียบร้อย';
            console.log('response', response.data);
        }
        messageDOM.innerText = message;
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error', error);
        let errorMessage = error.response?.data?.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล';
        messageDOM.innerText = errorMessage;
        messageDOM.className = 'message danger';
    }
}
