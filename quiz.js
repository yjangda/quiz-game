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
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; // Clear any previous choices

    if (currentQuestionIndex < quizData.length) {
        const { question, choices } = quizData[currentQuestionIndex];
        questionElement.textContent = question;

        // Generate buttons for each choice
        choices.forEach((choice, index) => {
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.setAttribute("data-index", index);
            choiceButton.onclick = () => handleChoiceClick(index);
            choicesDiv.appendChild(choiceButton);
        });

        nextButton.disabled = true;
        answeredCurrentQuestion = false;
    }

}
let answeredCurrentQuestion = false; // Add this variable to track whether the current question has been answered
let selectedChoiceIndex = -1; // Initialize the selectedChoiceIndex to -1

// ...

// Function to handle choice selection
function handleChoiceClick(choiceIndex) {
    if (!answeredCurrentQuestion) {
        // If a choice has been selected before, remove the "selected" class
        if (selectedChoiceIndex !== -1) {
            const previousSelectedButton = document.querySelector(`[data-index="${selectedChoiceIndex}"]`);
            if (previousSelectedButton) {
                previousSelectedButton.classList.remove("selected");
            }
        }

        const selectedButton = document.querySelector(`[data-index="${choiceIndex}"]`);
        if (selectedButton) {
            if (!selectedButton.classList.contains("selected")) {
                selectedButton.classList.add("selected");
            }
        }

        selectedChoiceIndex = choiceIndex; // Update the selectedChoiceIndex
        nextButton.disabled = false;
    }
}

// Function to handle the "Next" button click

function handleNextButton() {
    if (selectedChoiceIndex !== -1) {
        const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
        points += (selectedChoiceIndex === correctAnswer) ? quizData[currentQuestionIndex].points : 0;

        selectedChoiceIndex = -1;
        currentQuestionIndex++;
        console.log(currentQuestionIndex);

        if (currentQuestionIndex < quizData.length) {
            nextButton.disabled = true;
            answeredCurrentQuestion = false;
            showQuestion();
        } 
        else {
            showResults();
        }
    }
}
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