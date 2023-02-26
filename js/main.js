let name = localStorage.getItem('name');

const questions = [
  {
    question: "Питання 1",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: 1,
  },
  {
    question: "Питання 2",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: 2,
  },
  {
    question: "Питання 3",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: 3,
  },
  {
    question: "Питання 4",
    answer: ["Варіант 1" , "Варіант 2", "Варіант 3", "Варіант 4"],
    correct: 4,
  },
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

function showQuestion(){
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question'])

  headerContainer.innerHTML = title;

  let answerNumber = 1;
  let answerText;

  for (answerText of questions[questionIndex]['answer']) {
    const questionTemplate = 
    `<li>
        <label>
              <input value="%number%" type="radio" class="answer" name="answer" />
              <span>%answer%</span>
        </label>
  </li>`;

  let answerHTML = questionTemplate.replace('%answer%',answerText);
  answerHTML = answerHTML.replace('%number%', answerNumber);

  listContainer.innerHTML += answerHTML;
  answerNumber++;
  }
}

function checkAnswer(){
  const checkRadio = listContainer.querySelector('input[type="radio"]:checked');
   
  if (!checkRadio) {
    submitBtn.blur();
      return
  }

  const userAnswer = parseInt(checkRadio.value);
  
  if (userAnswer === questions[questionIndex]['correct']){
    score++;
  }

  if (questionIndex !== questions.length - 1){
    questionIndex++;
    clearPage();
    showQuestion();
    return
  } else {
    clearPage();
    showResults();
  }
}

function showResults(){
  const resultsTemplate = 
  `<h2 class="title">%title%</h2>
  <h3 class="summary">%message%</h3>
  <p class="result">%result%</p>`;

  let title , message;

  if (score === questions.length){
    title = 'Вітаємо!';
    message = 'Ви відповіли на всі питання правильно';
  } else if ((score * 100) / questions.length >= 50){
    title = 'Непоганий результат';
    message = 'Ви дали більш ніж половину правильних відповідей';
  } else {
    title = 'Поганий результат';
    message = 'Ви дали меньш ніж половину правильних відповідей';
  }

  let result = `${score} / ${questions.length}`;

  let finalMessage = resultsTemplate.replace('%title%', title);
  finalMessage = finalMessage.replace('%message%', message);
  finalMessage = finalMessage.replace('%result%', result);

  headerContainer.innerHTML = finalMessage;

  submitBtn.blur();
  submitBtn.innerText = 'Відправити результат вчителю';
  submitBtn.onclick = function sendMail() {
    
    emailjs.send("21312312312", "template_efgjwme", {
      name: name,
      score: score,
    })
    .then(function(response) {
      alert("Лист успішно відправленно", response.status, response.text);
    }, function(error) {
      alert("Помилка", error);
    });
  }
}