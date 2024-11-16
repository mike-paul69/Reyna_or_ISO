// Dark-Light Mode theme toggle functionality
var icon = document.getElementById("icon");

// Function to handle dark mode toggle
icon.onclick = function () {
    document.body.classList.toggle("dark-mode"); // Toggle dark mode class on body

    // Select header and nav links to apply dark theme styles
    var header = document.querySelector("header");
    var navLinks = document.querySelectorAll(".nav-links li a");

    // Check if the dark-mode class is added
    if (document.body.classList.contains("dark-mode")) {
        icon.src = "/images/haha.png"; // Change icon to sun
        header.classList.add("dark-mode"); // Add dark mode to header
        navLinks.forEach(link => link.classList.add("dark-mode")); // Apply dark mode to nav links
    } else {
        icon.src = "/images/moon.png"; // Change icon to moon
        header.classList.remove("dark-mode"); // Remove dark mode from header
        navLinks.forEach(link => link.classList.remove("dark-mode")); // Remove dark mode from nav links
    }
};


// Questions and answers for the quiz
const quizData = [
    {
        question: "Which of the following is used to declare a constant in Java?",
        options: ["final", "const", "constant", "static"],
        correct: 0,
    },
    {
        question: "What is the default value of a boolean variable in Java?",
        options: ["true", "false", "0", "null"],
        correct: 1,
    },
    {
        question: "Which method is used to start a thread in Java?",
        options: ["run()", "start()", "execute()", "begin()"],
        correct: 1,
    },
    {
        question: "Which of the following is not a valid access modifier in Java?",
        options: ["private", "protected", "public", "restricted"],
        correct: 3,
    },
    {
        question: "What is the size of a float in Java?",
        options: ["32 bits", "64 bits", "16 bits", "8 bits"],
        correct: 0,
    },
    {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["this", "extends", "super", "implements"],
        correct: 1,
    },
    {
        question: "Which of the following is true about the 'String' class in Java?",
        options: [
            "Strings are mutable",
            "Strings are immutable",
            "Strings are thread-unsafe",
            "String objects can be null",
        ],
        correct: 1,
    },
    {
        question: "Which of the following methods can be used to handle exceptions in Java?",
        options: ["throw", "try-catch", "break", "continue"],
        correct: 1,
    },
    {
        question: "Which collection class in Java allows duplicate elements?",
        options: ["HashSet", "TreeSet", "LinkedHashSet", "ArrayList"],
        correct: 3,
    },
    {
        question: "What will the following code print in Java? \nint x = 5; int y = 10;",
        options: ["5", "10", "15", "Error"],
        correct: 2,
    },
];

// Select necessary DOM elements for the quiz
const questionELM = document.querySelector("#question");
const optionsELMs = document.querySelectorAll(".option label");
const submitBtn = document.querySelector("#submit");

let currentQuiz = 0; // Track the current quiz question
let score = 0; // Track the score

// Function to load the quiz question and options
const loadQuiz = () => {
    const { question, options } = quizData[currentQuiz]; // Get the current question and options
    questionELM.innerText = question; // Set the question text
    options.forEach((option, index) => {
        optionsELMs[index].innerText = option; // Set the options
        optionsELMs[index].previousElementSibling.checked = false; // Uncheck radio buttons
    });
};

// Function to handle quiz submission
const handleQuiz = () => {
    const selectedOption = document.querySelector("input[type='radio']:checked"); // Get selected option
    if (selectedOption) {
        const answer = parseInt(selectedOption.value); // Get the answer value (index)
        if (answer === quizData[currentQuiz].correct) { // Check if the answer is correct
            score++; // Increment score if correct
        }
        currentQuiz++; // Move to the next question
        if (currentQuiz < quizData.length) { // If there are more questions, load the next one
            loadQuiz();
        } else {
            // If the quiz is finished, show the result and detailed answers
            let resultHTML = `
                <div id="quiz-result">
                    <h2>Quiz Completed!</h2>
                    <p>Your score: ${score}/${quizData.length}</p>
                    <button id="restart">Restart Quiz</button>
                </div>
                <div id="detailed-answers">
                    <h3>Detailed Answers:</h3>
            `;

            // Loop through the quiz data to show detailed answers
            quizData.forEach((quizItem, index) => {
                const correctText = quizItem.options[quizItem.correct]; // Get the correct answer text
                const explanation = getExplanation(quizItem); // Get the explanation for the question
                resultHTML += `
                    <div class="answer-detail">
                        <p><strong>Question ${index + 1}: </strong>${quizItem.question}</p>
                        <p><strong>Correct answer:</strong> ${correctText}</p>
                        <p><strong>Explanation:</strong> ${explanation}</p>
                    </div>
                `;
            });

            resultHTML += `</div>`;
            document.querySelector("#quiz-container").innerHTML = resultHTML; // Display the result HTML

            const restartBtn = document.querySelector("#restart"); // Restart button
            restartBtn.addEventListener("click", () => {
                currentQuiz = 0; // Reset the quiz
                score = 0; // Reset the score
                location.reload(); // Reload the page to restart the quiz
            });
        }
    } else {
        alert("Please select an option before submitting!"); // Show an alert if no option is selected
    }
};

// Function to provide explanation for each question
const getExplanation = (quizItem) => {
    const explanations = {
        0: `The 'final' keyword is used to declare constants in Java, ensuring that their value cannot be changed once assigned. For more details, refer to <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" target="_blank">MDN: const</a>.`,
        1: `The default value of a boolean variable in Java is 'false'. For more information, check the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank">MDN: Boolean</a>.`,
        2: `The 'start()' method is used to begin the execution of a thread in Java. Learn more about it on <a href="https://docs.oracle.com/javase/7/docs/api/java/lang/Thread.html" target="_blank">Thread In Java</a>.`,
        3: `'restricted' is not a valid access modifier in Java; valid ones are 'private', 'protected', and 'public'. For more about access modifiers, see <a href="https://www.geeksforgeeks.org/access-modifiers-java/" target="_blank">Access-Modifier-in-java</a>.`,
        4: `In Java, a float is 32 bits in size, as per the IEEE 754 standard for floating-point representation. For more details, see <a href="https://www.w3schools.com/java/ref_keyword_float.asp" target="_blank">Float In Java</a>.`,
        5: `The 'extends' keyword is used to inherit from a class in Java. Check out more about inheritance on <a href="https://www.w3schools.com/java/java_inheritance.asp" target="_blank">Inheritance</a>.`,
        6: `Strings in Java are immutable, meaning once created, their values cannot be changed. Learn more about string immutability on <a href="https://www.geeksforgeeks.org/string-class-in-java/" target="_blank">String in Java</a>.`,
        7: `To handle exceptions in Java, the 'try-catch' block is used. For more information, see <a href="https://www.geeksforgeeks.org/exception-handling-java/" target="_blank">Exception Handling in Java</a>.`,
        8: `The 'ArrayList' class in Java allows duplicate elements, whereas 'HashSet' and 'TreeSet' do not. Learn more about collection types in Java on <a href="https://www.geeksforgeeks.org/classes-objects-java/" target="_blank">Classes and Objects in Java</a>.`,
        9: `The code would print '15' because x + y = 5 + 10 = 15.`
    };
    return explanations[quizItem.correct];
};

// Initialize the quiz by loading the first question
const initializeQuiz = () => {
    loadQuiz();
    submitBtn.addEventListener("click", handleQuiz); // Add event listener to the submit button
};

// Back button functionality to go to previous question
const backBtn = document.querySelector("#back");

const goBack = () => {
    if (currentQuiz > 0) {
        currentQuiz--; // Go to the previous question
        loadQuiz(); // Load the previous question
    }
};

backBtn.addEventListener("click", goBack); // Add event listener to the back button
initializeQuiz(); // Initialize the quiz
