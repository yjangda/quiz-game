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
    if (currentQuestionIndex < quizData.length) {
        const { question, choices } = quizData[currentQuestionIndex];
        questionElement.textContent = question;

        // Get the "choices" div to append the buttons
        const choicesDiv = document.getElementById("choices");
        choicesDiv.innerHTML = ""; // Clear any previous choices

        // Generate buttons for each choice
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

// Function to handle choice selection
function handleChoiceClick(choiceIndex) {
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
    points += (choiceIndex === correctAnswer) ? quizData[currentQuestionIndex].points : 0;

    // Add the "selected" class to the clicked button to change its color
    const selectedButton = document.querySelector(`[data-index="${choiceIndex}"]`);
    if (selectedButton) {
        // Check if the button is already selected, if not, then apply the "selected" class
        if (!selectedButton.classList.contains("selected")) {
            // Remove the "selected" class from any previously selected button
            const previousSelectedButton = document.querySelector(".selected");
            if (previousSelectedButton) {
                previousSelectedButton.classList.remove("selected");
            }

            selectedButton.classList.add("selected");
        }
    }

    // Re-enable the "Next" button after an answer is selected
    nextButton.disabled = false;
}

// Function to handle the "Next" button click
function handleNextButton() {
    nextButton.disabled = true; // Disable the "Next" button until an answer is selected
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