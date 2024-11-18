let barChartInstance = null;
let pieChartInstance = null;

// Handle form submission
document.getElementById('marksForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect user input
    const marks = {
        DSA: parseInt(document.getElementById('DSA').value),
        Java: parseInt(document.getElementById('Java').value),
        C: parseInt(document.getElementById('C').value),
        OS: parseInt(document.getElementById('operating-system').value),
        GIT: parseInt(document.getElementById('git').value)
    };

    // Validate marks
    for (const [subject, score] of Object.entries(marks)) {
        if (isNaN(score) || score < 0 || score > 100) {
            alert(`Please enter valid marks for ${subject} (0-100).`);
            return;
        }
    }

    // Create or update the bar and pie charts
    createPerformanceChart(marks);
    createPerformancePieChart(marks);

    // Calculate and display total percentage
    displayTotalPercentage(marks);

    // Generate recommendations based on scores
    generateRecommendations(marks);

    // Display results section and scroll to it
    document.getElementById('resultsContainer').style.display = 'block';
    document.getElementById('studyPlanSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Function to create or update the bar chart
function createPerformanceChart(marks) {
    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Destroy the previous bar chart instance if it exists
    if (barChartInstance) {
        barChartInstance.destroy();
    }

    // Create a new bar chart
    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(marks),
            datasets: [{
                label: 'Scores',
                data: Object.values(marks),
                backgroundColor: 'rgba(44, 62, 80, 0.8)',
                borderColor: '#34495e',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Function to create or update the pie chart
function createPerformancePieChart(marks) {
    const ctx = document.getElementById('performancePieChart').getContext('2d');

    // Destroy the previous pie chart instance if it exists
    if (pieChartInstance) {
        pieChartInstance.destroy();
    }

    // Create a new pie chart
    pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(marks),
            datasets: [{
                data: Object.values(marks),
                backgroundColor: [
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(155, 89, 182, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Function to calculate and display the total percentage
function displayTotalPercentage(marks) {
    const totalMarks = Object.values(marks).reduce((sum, score) => sum + score, 0);
    const numberOfSubjects = Object.keys(marks).length;
    const percentage = (totalMarks / (numberOfSubjects * 100)) * 100;

    document.getElementById('totalPercentage').innerText = `Your total percentage is ${percentage.toFixed(2)}%`;

    // Provide tips based on the overall performance
    let tips = '';
    if (percentage < 50) {
        tips = 'You might need to revisit basic concepts in each subject. Practice more frequently and consider seeking additional resources for each subject.';
    } else if (percentage < 70) {
        tips = 'Good effort! You should aim to solidify your understanding of the subjects where you scored below 70%. Focus on reviewing key topics and practicing regularly.';
    } else {
        tips = 'Great job! Keep up the good work and maintain your study routine. Continue challenging yourself with higher-level questions and explore advanced topics.';
    }

    const recommendationContainer = document.getElementById('recommendationContainer');
    recommendationContainer.innerHTML = `<h3>Overall Tips:</h3><p>${tips}</p>`;
}

// Function to generate recommendations based on scores
function generateRecommendations(marks) {
    const recommendationContainer = document.getElementById('recommendationContainer');
    recommendationContainer.innerHTML = '<h3>Focus Areas:</h3>';

    // Identify subjects below the threshold (70%) and generate recommendations
    const belowThresholdSubjects = Object.entries(marks).filter(([_, score]) => score < 70);

    if (belowThresholdSubjects.length > 0) {
        for (const [subject, score] of belowThresholdSubjects) {
            const recommendationDiv = document.createElement('div');
            recommendationDiv.className = 'subject-recommendation';
            recommendationDiv.innerHTML = `
                <h4>${subject} (Score: ${score}%)</h4>
                <p>Focus on improving problem-solving skills and review key concepts in ${subject}.</p>
            `;
            recommendationContainer.appendChild(recommendationDiv);
        }
    } else {
        // Display a congratulatory message if all scores are above the threshold
        recommendationContainer.innerHTML += `
            <p>Great job! You have scored well in all subjects. Keep up the good work!</p>
        `;
    }
}
