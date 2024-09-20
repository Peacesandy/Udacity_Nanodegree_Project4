
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener to the form
    document.getElementById('submit-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get the text input value
        const textInput = document.getElementById('name').value;

        try {
            // Send the text input to the server
            const response = await fetch('http://localhost:8080/data', { // Use the appropriate endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textInput }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the response data
            const data = await response.json();

            // Display the results
            displayResults(data);
        } catch (error) {
            console.error('Error:', error);
            displayError('An error occurred while analyzing the text.');
        }
    });
});

// Function to display results
function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `
        <p>Polarity: ${data.polarity}</p>
        <p>Subjectivity: ${data.subjectivity}</p>
        <p>Text snippet: ${data.text}</p>
    `;
}

// Function to display errors
function displayError(message) {
    const errorContainer = document.getElementById('error');
    errorContainer.textContent = message;
}


