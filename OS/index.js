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
// Questions and answers for the quiz
// Questions and answers for the quiz
// Questions and answers for the Operating System quiz
const quizData = [
    {
        question: "Which of the following is the main function of an operating system?",
        options: ["File management", "Memory management", "Process management", "All of the above"],
        correct: 3, // All of the above is the correct answer
    },
    {
        question: "Which of the following is not a type of OS scheduling algorithm?",
        options: ["Round-robin", "First-come, first-served (FCFS)", "Least-recently-used (LRU)", "Shortest Job First (SJF)"],
        correct: 2, // Least-recently-used (LRU) is not a scheduling algorithm, so it is the correct answer
    },
    {
        question: "What is the role of a process control block (PCB) in an operating system?",
        options: ["To manage memory allocation", "To store information about a process", "To control input/output operations", "To manage file systems"],
        correct: 1, // To store information about a process is the correct answer
    },
    {
        question: "Which of the following is an example of a non-preemptive scheduling algorithm?",
        options: ["Shortest Job First (SJF)", "Round-robin", "Priority scheduling", "First Come First Serve (FCFS)"],
        correct: 3, // First Come First Serve (FCFS) is non-preemptive
    },
    {
        question: "Which type of memory is used by an operating system to store system files and programs that are currently running?",
        options: ["Virtual memory", "Cache memory", "RAM", "ROM"],
        correct: 2, // RAM is the correct answer
    },
    {
        question: "Which of the following is true about paging in an operating system?",
        options: ["It uses contiguous memory allocation", "It divides the physical memory into fixed-size blocks", "It eliminates the need for a page table", "It reduces memory fragmentation"],
        correct: 1, // It divides the physical memory into fixed-size blocks is true about paging
    },
    {
        question: "What is the purpose of semaphores in operating systems?",
        options: ["To implement memory management", "To implement process synchronization", "To manage file systems", "To manage CPU scheduling"],
        correct: 1, // To implement process synchronization is the correct answer
    },
    {
        question: "Which of the following is a type of system call in an operating system?",
        options: ["Fork", "exec", "exit", "All of the above"],
        correct: 3, // All of the above is the correct answer
    },
    {
        question: "In a multi-threaded environment, which of the following is true?",
        options: ["Each thread shares the same memory space", "Each thread has its own memory space", "Threads cannot communicate with each other", "Threads are not executed concurrently"],
        correct: 0, // Each thread shares the same memory space is true in a multi-threaded environment
    },
    {
        question: "Which of the following refers to a situation in which a process is waiting for a resource that is held by another process, which in turn is waiting for a resource held by the first process?",
        options: ["Deadlock", "Race condition", "Starvation", "Priority inversion"],
        correct: 0, // Deadlock is the correct answer
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
        0: `The main functions of an operating system include file management, memory management, and process management. It coordinates hardware and software to provide a stable environment for applications. <br><hr><br>`,
        1: `Least-recently-used (LRU) is a page replacement algorithm, not an OS scheduling algorithm. Scheduling algorithms include Round-robin, FCFS, and SJF. <br><hr><br>`,
        2: `The Process Control Block (PCB) stores information about a process, such as process state, process ID, program counter, and memory management information. <br><hr><br>`,
        3: `First Come First Serve (FCFS) is a non-preemptive scheduling algorithm because once a process starts executing, it runs to completion without being preempted. <br><hr><br>`,
        4: `RAM (Random Access Memory) is used to store system files and programs that are currently running. It allows quick access to active data. <br><hr><br>`,
        5: `Paging divides physical memory into fixed-size blocks called pages and uses a page table to map virtual memory to physical memory. It reduces fragmentation. <br><hr><br>`,
        6: `Semaphores are synchronization tools used to manage the access of shared resources by multiple processes, ensuring mutual exclusion and avoiding race conditions. <br><hr><br>`,
        7: `System calls like fork, exec, and exit allow processes to request services from the operating system, such as creating new processes, executing programs, and terminating processes. <br><hr><br>`,
        8: `In a multi-threaded environment, all threads within a process share the same memory space, enabling efficient communication and data sharing between them. <br><hr><br>`,
        9: `A deadlock occurs when two or more processes are waiting for resources that are held by each other, causing a cycle of dependencies that cannot be resolved. <br><hr><br>`
    };
    return explanations[quizItem.correct];
};

// Initialize the quiz by loading the first question
const initializeQuiz = () => {
    loadQuiz();
    submitBtn.addEventListener("click", handleQuiz); // Add event listener to the submit button
};

// Back button functionality to go to the previous question
const backBtn = document.querySelector("#back");

const goBack = () => {
    if (currentQuiz > 0) {
        currentQuiz--; // Go to the previous question
        loadQuiz(); // Load the previous question
    }
};

backBtn.addEventListener("click", goBack); // Add event listener to the back button
initializeQuiz(); // Initialize the quiz
