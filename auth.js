// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Mock user database (in a real app, this would be server-side)
let users = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, username: 'admin', email: 'admin@example.com', password: 'password123' }
];

// Login Function
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const user = users.find(u => u.email === email);
        
        if (user && user.password === password) {
            // In a real app, you would use proper session management
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                username: user.username,
                email: user.email
            }));
            
            alert('Login successful!');
            window.location.href = '../index.html';
        } else {
            alert('Invalid email or password');
        }
    });
}

// Register Function
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }
        
        // Create new user
        const newUser = {
            id: users.length + 1,
            username: name,
            email: email,
            password: password
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    });
}

// Check if user is logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userIcon = document.getElementById('user-icon');
    
    if (currentUser && userIcon) {
        userIcon.innerHTML = `<i class="fas fa-user-check"></i>`;
        userIcon.title = `Logged in as ${currentUser.username}`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkAuth);