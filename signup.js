'use strict';
const fullName = document.getElementById('fullname');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const course = document.getElementById('course');
const univ = document.getElementById('university');
const password = document.getElementById('password');
const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.input')

const setError = function (element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    const inputError = inputControl.querySelector('.input');
    const labelError = inputControl.querySelector('.label');
    
    if (errorDisplay && inputError && labelError) {
        inputError.classList.add('input-error');
        labelError.classList.add('label-error');
        errorDisplay.innerText = message;
    }
};

const setSuccess = function (element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    const inputError = inputControl.querySelector('.input');
    const labelError = inputControl.querySelector('.label');
    
    if (errorDisplay && inputError && labelError) {
        inputError.classList.remove('input-error');
        labelError.classList.remove('label-error');
        errorDisplay.innerText = '';
    }
};

const inputValidation = function () {
    const values = {
        fullName: fullName.value.trim(),
        userName: userName.value.trim(),
        email: email.value.trim(),
        course: course.value.trim(),
        univ: univ.value.trim(),
        password: password.value.trim(),
    };

    let isValid = true;

    if (values.fullName === '') {
        setError(fullName, 'Enter your Full Name');
        isValid = false;
    } else {
        setSuccess(fullName);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email === '') {
        setError(email, 'Enter your email address');
        isValid = false;
    } else if (!emailRegex.test(values.email)) {
        setError(email, 'Enter a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (values.userName === '') {
        setError(userName, 'Enter your Username');
        isValid = false;
    } else {
        setSuccess(userName);
    }

    if (values.univ === '') {
        setError(univ, 'Enter your University');
        isValid = false;
    } else {
        setSuccess(univ);
    }

    if (values.course === '') {
        setError(course, 'Enter your Course of Study');
        isValid = false;
    } else {
        setSuccess(course);
    }

    if (values.password === '') {
        setError(password, 'Enter your password');
        isValid = false;
    } else if (values.password.length < 8) {
        setError(password, 'Password must be at least 8 characters long');
        isValid = false;
    } else {
        setSuccess(password);
    }

    return isValid;
};

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    if (inputValidation()) {
        console.log('Form submitted successfully!');
    }
});



const focusEffect = function(input){
    const focusControl  = input.parentElement;
    const changeInput = focusControl.querySelector('.input')
    const changeLabel = focusControl.querySelector('.label')

     changeInput.classList.add('inputColor');
     changeLabel.classList.add('label-change')

}
inputs.forEach(input=> {
    input.addEventListener('focus', ()=> {

// input.classList.add('inputColor')

focusEffect(input);

    })
})