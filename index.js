function submitData () {
    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastnameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOM = document.querySelector('input[name=gender]:checked')
    let interestDOM = document.querySelectorAll('input[name=interest]:checked')
    let desciptionDOM = document.querySelector('textarea[name=description]')
    let interest = ''

    for (let i = 0; i < interestDOM.length; i++) {
        interest += interestDOM[i].value
        if (i < interestDOM.length - 1) {
            interest += ','
        }
    }

    let userData = {
        firstName: firstNameDOM.value,
        lastname: lastnameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        desciption: desciptionDOM.value,
        interest: interest
    }

    console.log('submitData', userData)
}