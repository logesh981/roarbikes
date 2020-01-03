function hahah(){

const email=document.getElementById('email').value
const password=document.getElementById('password').value
const password1=document.getElementById('password1').value
if(password.length<8){
    alert('Password should contain atleast 8 characters')
    document.getElementById('password').focus()
    return false
}
if(email===""){
    alert('Please enter an email')
    return false
}
if(password!=password1){
    alert('Passwords must be equal')
    return false
}
}
