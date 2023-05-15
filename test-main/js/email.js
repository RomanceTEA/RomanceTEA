const submitBtn = document.querySelector('#submit');

submitBtn.onclick = function() {
    const nameInputElement = document.getElementById('from_name');
    const name = nameInputElement.value;
    localStorage.setItem('name', name);
  
    const emailInputElement = document.getElementById('email');
    const email = emailInputElement.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
  
    if (isValidEmail) {
        localStorage.setItem('email', email);
        location.href = "test.html";
    } else {
        alert("Не правильний email");
    }
}
