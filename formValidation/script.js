const form = document.querySelector('#form');   
const user = document.querySelector('#user');
const email = document.querySelector('#email');
const address = document.querySelector('#address');
const password = document.querySelector('#password');


form.addEventListener('submit', function (e) {
    e.preventDefault();

    validatingInput();
});

function validatingInput() {
   const   usernamevalue=   username.value.trim();
   const  emailvalue=     email.value.trim();
   const  addressvalue=   address.value.trim();
    const passwordvalue = password.value.trim();
    
    if (usernamevalue === '') {
        //display error message;
        setErrorFor(username, 'Username cannot be blank');
    }else {
        setSuccessFor(username);
    }

    if (emailvalue === '') {
        setErrorFor(email, 'Email cannot be empty');
    } else if (!isEmail(emailvalue)) {
        setErrorFor(email, 'Email is not valid');
    } else {
        setSuccessFor(email);
    }

    if (passwordvalue === '') {
        setErrorFor(password,'Please Enter a Password')
    } else if (passwordvalue.length < 8) {
        setErrorFor(password,'Password must be alleast 8 character long')
    } else {
        setSuccessFor(password);
    }
    if (addressvalue === '') {
        setErrorFor(address, 'Address cannot be empty');
    } else {
        setSuccessFor(address);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')     

    formControl.classList.add('error');
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');

}

function isEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        return (true)
    }
    return (false)
}