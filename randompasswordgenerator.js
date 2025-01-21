// Password characters
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "@#$%^&*()_+|{}[]<>/-=";

// Generate Random Password
function generateRandomPassword() {
    const includeUpperCase = document.getElementById("includeUpperCase").checked;
    const includeLowerCase = document.getElementById("includeLowerCase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const passwordLength = parseInt(document.getElementById("passwordLength").value, 10);

    let allowedChars = "";
    if (includeUpperCase) allowedChars += upperCase;
    if (includeLowerCase) allowedChars += lowerCase;
    if (includeNumbers) allowedChars += numbers;
    if (includeSymbols) allowedChars += symbols;

    if (!allowedChars) {
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        password += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }
    document.getElementById("password").value = password;

    // Update password strength
    checkPasswordStrength(password);
}

// Copy Password to Clipboard
function copyToClipboard() {
    const passwordField = document.getElementById("password");
    if (passwordField.value) {
        passwordField.select();
        document.execCommand("copy");
        alert("Password copied to clipboard!");
    } else {
        alert("No password to copy!");
    }
}

// Reset Password
function resetPassword() {
    document.getElementById("password").value = "";
    document.getElementById("strengthLabel").textContent = "Weak";
    document.getElementById("strengthIndicator").className = "";
}

// Check Password Strength
function checkPasswordStrength(password) {
    const strengthLabel = document.getElementById("strengthLabel");
    const strengthIndicator = document.getElementById("strengthIndicator");

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[@#$%^&*()_+|{}[\]<>/-=]/.test(password);

    let strength = 0;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSymbols) strength++;

    if (strength === 4) {
        strengthLabel.textContent = "Strong";
        strengthIndicator.className = "strong";
    } else if (strength >= 2) {
        strengthLabel.textContent = "Medium";
        strengthIndicator.className = "medium";
    } else {
        strengthLabel.textContent = "Weak";
        strengthIndicator.className = "weak";
    }
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", this.checked);
});

// Event Listeners
document.getElementById("genpass").addEventListener("click", generateRandomPassword);
document.querySelector(".display img").addEventListener("click", copyToClipboard);
document.getElementById("reset").addEventListener("click", resetPassword);
