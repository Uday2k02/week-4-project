let currentQuestion = 0;
let score = 0;
let questions = [
	{
		question: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Rome"],
		answer: "Paris"
	},
	{
		question: "What is the largest planet in our solar system?",
		options: ["Earth", "Saturn", "Jupiter", "Uranus"],
		answer: "Jupiter"
	},
	{
		question: "What is the smallest country in the world?",
		options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
		answer: "Vatican City"
	},
	{
		question: "What is the largest living species of lizard?",
		options: ["Komodo dragon", "Saltwater crocodile", "Black mamba", "Green anaconda"],
		answer: "Komodo dragon"
	},
	{
		question: "What is the highest mountain peak in the solar system?",
		options: ["Mount Everest", "Olympus Mons", "Mauna Kea", "Denali"],
		answer: "Olympus Mons"
	}
];

let time = 90;
let timerInterval;

document.addEventListener("DOMContentLoaded", function() {
	loadQuestion();
	startTimer();
});

document.getElementById("submit-btn").addEventListener("click", function() {
	let userAnswer = getSelectedAnswer();
	let correctAnswer = questions[currentQuestion].answer;
	if (userAnswer === correctAnswer) {
		score++;
	}
	currentQuestion++;
	if (currentQuestion < questions.length) {
		loadQuestion();
	} else {
		displayResult();
	}
});

function loadQuestion() {
	let questionText = questions[currentQuestion].question;
	let optionsHTML = "";
	questions[currentQuestion].options.forEach(function(option) {
		optionsHTML += `<li><input type="radio" name="answer" value="${option}"> ${option}</li>`;
	});
	document.getElementById("question-text").innerHTML = questionText;
	document.getElementById("options").innerHTML = optionsHTML;
	updateScore();
}

function getSelectedAnswer() {
	let radios = document.getElementsByName("answer");
	for (let i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			return radios[i].value;
		}
	}
	return null;
}

function startTimer() {
	timerInterval = setInterval(function() {
		time--;
		document.getElementById("time").innerHTML = time;
		if (time <= 0) {
			displayResult();
		}
	}, 1000);
}

function updateScore() {
	document.getElementById("score-value").innerHTML = score;
}

function displayResult() {
	clearInterval(timerInterval);
	let resultText = `You scored ${score} out of ${questions.length}!`;
	document.getElementById("result-text").innerHTML = resultText;
}

function highlightCorrectAnswer(userAnswer, correctAnswer) {
	let options = document.getElementById("options").children;
	for (let i = 0; i < options.length; i++) {
		let option = options[i];
		let input = option.children[0];
		if (input.value === correctAnswer) {
			option.style.backgroundColor = "green";
		} else if (input.value === userAnswer && userAnswer !== correctAnswer) {
			option.style.backgroundColor = "red";
		} else {
			option.style.backgroundColor = "white";
		}
	}
}