const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE' 
let selecttedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);

    if(id){
        mode = 'EDIT';
        selecttedId = id;
        //1. เราจะดึวข้อมูล user ที่ต้องการเเก้ไขออกมา
        try{
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            console.log('response', response.data);

        let firstNameDOM = document.querySelector('input[name=firstname]');
        let lastNameDOM = document.querySelector('input[name=lastname]');
        let ageDOM = document.querySelector('input[name=age]');
        let descriptionDOM = document.querySelector('textarea[name=description]');
        
        let genderDOM = document.querySelector('input[name=gender]');
        let interestDOM = document.querySelectorAll('input[name=interest]');
        console.log('interrest', user.interests);

        for (let i = 0; i < genderDOM.length; i++) {
            if (genderDOM[i].value == user.gender) {
                genderDOM[i].checked = true
            };
        }

        for (let i = 0; i < interestDOM.length; i++) {
            if (user.interests.includes(interestDOM[i].value)) {
                interestDOM[i].checked = true
            }
        }
        

        firstNameDOM.value = user.firstname
        lastNameDOM.value = user.lastname
        ageDOM.value = user.age
        descriptionDOM.value = user.description

        }   catch (error) {

        }
        //2. นำข้อมูล user ที่ดึงออกมาไปเเสดงผลใน input
    }
}        

const validateData = (userData) => {
          let errors = []
          if(!userData.firstname ) {
              errors.push('กรุณากรอกชื่อ')
          }
          if(!userData.firstname ) {
              errors.push('กรุณากรอกนามสกุล')
          }
          if(!userData.firstname ) {
              errors.push('กรุณากรอกอายุ')
          }
          if(!userData.firstname ) {
              errors.push('กรุณากรอกเพศ')
          }
          if(!userData.firstname ) {
              errors.push('กรุณากรอกความสนใจ')
          }
          if(!userData.firstname ) {
              errors.push('กรุณากรอกข้อมูลตัวเอง')
          }
          return errors
}
const submitData = async () => {
          let firstNameDOM = document.querySelector('input[name=firstname]');
          let lastNameDOM = document.querySelector('input[name=lastname]');
          let ageDOM = document.querySelector('input[name=age]');
          let genderDOM = document.querySelector('input[name=gender]:checked') || {}
          let interestDOM = document.querySelectorAll('input[name=interest]:checked') || {}
          let descriptionDOM = document.querySelector('textarea[name=description]');
      
          let messageDOM = document.getElementById('message')

          try{
          let interest = ''
      
          for(let i = 0; i < interestDOM.length; i++){
              interest += interestDOM[i].value
              if(i < interestDOM.length - 1){
                   interest += ','
              }
          }
      
          let userData = {
              firstname: firstNameDOM.value,
              lastname: lastNameDOM.value,
              age: ageDOM.value,
              gender: genderDOM.value,
              description: descriptionDOM.value,
              interests: interest
          }
         
          console.log('submitData',userData)

          const errors = validateData(userData)

          // if(errors.length > 0){
                    //มี error
          //         throw {
          //                 message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          //               errors: errors
          //   }
          //}

          let message = 'บันทึกข้อมูลเรียบร้อย'
              
          if(mode === 'CREATE'){
            const response = await axios.post(`${BASE_URL}/users`,userData)
            console.log('response',response.data)
          
          } else {
            const response = await axios.put(`${BASE_URL}/users/${selecttedId}`,userData)
            message = 'เเก้ใขข้อมูลเรียบร้อย'
            console.log('response',response.data)
          }
         
              messageDOM.innerText = message
              messageDOM.className = 'message-success'

          } catch (error) {
                  console.log('error message', error.message)
                  console.log('error', error.errors)
              if(error.response){                  
                  console.log(error.response)
                  error.message = error.response.data.message
                  error.errors = error.response.data.errors
              }

             let htmlData = '<div>'
             htmlData += `<div>${error.message}</div>`
             htmlData += '<ul>'
             for (let i = 0; i < error.errors.length; i++) {
                 htmlData += `<li>${error.errors[i]}</li>`
             }
             htmlData += '</ul>'
             htmlData += '</div>'   
              messageDOM.innerHTML = htmlData
              messageDOM.className = 'message danger'
          }
      }