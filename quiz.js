// Quiz data in JSON format
const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Madrid", "Paris"],
        correctAnswer: 3,
        points: 2
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Venus", "Jupiter", "Saturn", "Mars"],
        correctAnswer: 1,
        points: 1
    },
    {
        question: "What is the symbol for Iron in the periodic table?",
        choices: ["Fe", "Ir", "In", "I"],
        correctAnswer: 0,
        points: 3
    }
];

// Global variables
let currentQuestionIndex = 0;
let points = 0;
let playerName = "";

// Elements
const container = document.querySelector(".container");
const startForm = document.getElementById("start-form");
const nameInput = document.getElementById("name");
const playButton = document.getElementById("play-button");
const questionsScreen = document.querySelector(".questions-screen");
const questionElement = document.getElementById("question");
const choicesDiv = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const lastScreen = document.querySelector(".last-screen");
const resultName = document.getElementById("result-name");
const resultPoints = document.getElementById("result-points");
const goHomeButton = document.getElementById("go-home-button");

// Event listeners
startForm.addEventListener("submit", handleStartFormSubmit);
nameInput.addEventListener("input", handleNameInput);
nextButton.addEventListener("click", handleNextButton);
goHomeButton.addEventListener("click", goHome);

// Declare an array to track which questions' points have been added
const questionsAnswered = new Array(quizData.length).fill(false);

// Function to handle name input
function handleNameInput() {
    if (nameInput.value.trim() !== "") {
        playButton.disabled = false;
    } else {
        playButton.disabled = true;
    }
}

// Function to show the main screen with the form
function showMainScreen() {
    hideElement(questionsScreen);
    hideElement(lastScreen);
    showElement(startForm);
}

// Function to handle form submission and start the quiz
function handleStartFormSubmit(event) {
    event.preventDefault();
    playerName = nameInput.value.trim();
    if (playerName) {
        hideElement(startForm);
        showElement(questionsScreen);
        currentQuestionIndex = 0;
        points = 0;
        showQuestion();
    }
}

// Function to show the next question
function showQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const { question, choices } = quizData[currentQuestionIndex];
        questionElement.textContent = question;
        choicesDiv.innerHTML = ""; // Clear previous choices
        choices.forEach((choice, index) => {
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.setAttribute("data-index", index); // Set data-index attribute
            choiceButton.onclick = () => handleChoiceClick(index); // Assign click event handler
            choicesDiv.appendChild(choiceButton);
        });
        nextButton.disabled = true; // Disable the "Next" button until an answer is selected
    } else {
        showResults();
    }
}

function handleChoiceClick(choiceIndex) {
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
    const selectedButton = document.querySelector(`[data-index="${choiceIndex}"]`);

    // Remove "correct" and "incorrect" classes from all choice buttons
    choicesDiv.querySelectorAll("button").forEach(button => {
        button.classList.remove("correct", "incorrect");
    });

    if (!questionsAnswered[currentQuestionIndex]) {
        if (choiceIndex === correctAnswer) {
            points += quizData[currentQuestionIndex].points;
            selectedButton.classList.add("selected");
        } else {
            selectedButton.classList.add("selected");
        }
        questionsAnswered[currentQuestionIndex] = true;
        nextButton.disabled = false; // Enable the "Next" button after an answer is selected
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    showQuestion();
}

// Function to show quiz results
function showResults() {
    hideElement(questionsScreen);
    showElement(lastScreen);
    resultName.textContent = playerName;
    resultPoints.textContent = points;
}

// Function to go back to the main screen
function goHome() {
    hideElement(questionsScreen);
    hideElement(lastScreen);
    showElement(startForm);
    nameInput.value = "";
    playButton.disabled = true;
    currentQuestionIndex = 0;
    points = 0;
    questionsAnswered.fill(false); // Reset the array tracking answered questions
}

// Function to show an element
function showElement(element) {
    element.style.display = "block";
}

// Function to hide an element
function hideElement(element) {
    element.style.display = "none";
}

// Call the function to show the main screen when the page is loaded
showMainScreen();