const signupFormHandler = async (event) => {
event.preventDefault();



const name = document.querySelector('#fullName').value.trim();
const email = document.querySelector('#email').value.trim();
const password = document.querySelector('#password').value.trim();

if (name && email && password) {
    const response = await fetch('/api/users/', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/profileMatching');
    } else {
        alert(response.statusText);
    }
}
};


const generatePassword = require('generate-password');

const button = document.getElementById('generate-password-button');

button.addEventListener('click', () => {
  const password = generatePassword.generate({
    length: 12,
    numbers: true,
    symbols: true,
    uppercase: true,
    excludeSimilarCharacters: true,
  });

  console.log(password); // e.g. "1G$5hK#7P9@X"
  // you can also display the generated password on the screen or use it for other purposes
});


document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);