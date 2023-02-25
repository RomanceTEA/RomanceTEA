const submitBtn = document.querySelector('#submit');

submitBtn.onclick = function name(){
    const inputElement = document.getElementById('from_name');
    const name = inputElement.value;
    localStorage.setItem('name', name);
}

submitBtn.addEventListener("click", function() {
    location.href = "test.html";
  });


