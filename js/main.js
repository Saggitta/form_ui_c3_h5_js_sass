//questions array

const questions = [
  { question: "Enter Your First Name" },
  { question: "Enter Your Last Name" },
  { question: "Enter Your Email", pattern: /\S+@\S+\.\S+/ },
  { question: "Create A Password", type: "password" }
];

//transition times
const shakeTime = 100; // shale transition time
const switchTime = 200; //Trans between questions

//itin position at first question

let position = 0;

//itin dom elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");

//EVENTS
//question on dom load
document.addEventListener("DOMContentLoaded", getQuestion);

//next btn lcick
nextBtn.addEventListener("click", validate);

//ENTER CLICK

inputField.addEventListener("keyup", e => {
  if (e.keyCode == 13) {
    validate();
  }
});
//functions
//get q from the array and add to the markup
function getQuestion() {
  //get current question
  inputLabel.innerHTML = questions[position].question;

  //get current type

  inputField.type = questions[position].type || "text";

  //get current question

  inputField.value = questions[position].answer || "";
  //focus on element
  inputField.focus();

  //set progress bar width -  variablr to the questions lenght

  progress.style.width = (position * 100) / questions.length + "%";

  //add user icon or back arrow on question

  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}
//Display Question top user

function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

//hide Question from user

function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputGroup.style.border = "none";
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
}

//transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

////validate field

function validate() {
  // make sure patter matcher if there is one

  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

//Field Unput fails

function inputFail() {
  formBox.className = "error";
  //repeat shake otion -set i to num of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

//field input passed

function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);
  //store answer

  questions[position].answer = inputField.value;

  //increment position of questions
  position++;
  //if new question hide current and show next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    //remove if no more question left
    hideQuestion();
    formBox.className = "close";
    progress.style.width = "100%";

    //form complete
    formComplete();
  }
}

function formComplete() {
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(
      `Thanks ${questions[0].answer} registration is competed`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
