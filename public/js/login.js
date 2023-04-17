// login form submission
const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    // checks username and password then sends POST request to api
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

    // if success sends user to the dashboard
        if (response.ok) {
            document.location.href=('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#login')
    .addEventListener('click', loginFormHandler);