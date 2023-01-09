const signupForm = document.querySelector('.sign-up');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const table = document.getElementById('table');

// Initialize list count
let count = 1;

// Function to add a new entry to the table
const handleAddNewUser = (e) => {
    // Disable form default behavior to reload the page 
    e.preventDefault();
    // Get the email value from the input
    const email = emailInput.value;
    // Create a template to add the new entry
    const newEntry = `
        <tr>
            <td>${count}.</td>
            <td>${email}</td>
        </tr>
    `
    // Append new entry to form as html
    table.innerHTML += newEntry;

    // Increment count and reset from
    count++;
    signupForm.reset();
}

// Executes the `handleAddNewUser` function every time the form is submitted
signupForm.addEventListener('submit', handleAddNewUser);
Footer