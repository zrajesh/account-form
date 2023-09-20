const username_field = document.querySelector("#username");
const email_field = document.querySelector("#email");
const password_field = document.querySelector("#password");
const conf_password_field = document.querySelector("#conf_password");

let isFormValid = true;

function showErrorMessage(input_field, msg) {
    input_field.style.border = "2px solid red";
    const error_field = input_field.nextElementSibling;
    const sad_face = input_field.nextElementSibling.nextElementSibling;
    error_field.textContent = msg;
    sad_face.classList.remove("fa-face-smile", "happy-face");
    sad_face.classList.add("fa-face-frown", "sad-face");
    sad_face.style.display = "block";
    input_field.classList.add("shake");
    isFormValid = false;
}

function showSuccessField(input_field) {
    input_field.style.border = "2px solid green";
    const error_field = input_field.nextElementSibling;
    const happy_face = input_field.nextElementSibling.nextElementSibling;
    error_field.textContent = "";
    happy_face.classList.remove("fa-face-frown", "sad-face");
    happy_face.classList.add("fa-face-smile", "happy-face");;
    happy_face.style.display = "block";
    input_field.classList.remove("shake");
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

function validateField(input_field, err_msg) {
    const field_value = input_field.value;
    if (!field_value) {
        showErrorMessage(input_field, err_msg);
    } else {
        showSuccessField(input_field);
    }
}

function showSuccess() {
    const form_section = document.querySelector("#form");
    const success_section = document.querySelector(".account-success");
    form_section.classList.add("display-none");
    success_section.classList.remove("display-none");

    const balls = document.querySelectorAll(".ball");
    balls.forEach((ball, index) => {
        const xAxisPosition = `${Math.random() * 80 + 10}%`;
        ball.style.setProperty('--x-axis-position', xAxisPosition);
        ball.style.animation = `moveUp 5s linear ${index * 2}s forwards`;
    });
}

function validateForm(event) {
    event.preventDefault();
    const username = username_field.value;
    const email = email_field.value;
    const password = password_field.value;
    const conf_password = conf_password_field.value;

    isFormValid = true;

    validateField(username_field, "Username is empty");
    validateField(email_field, "Email is empty");
    validateField(password_field, "Password is empty");
    validateField(conf_password_field, "Confirm password is empty");

    if (email) {
        if (isValidEmail(email)) {
            showSuccessField(email_field);
        } else {
            showErrorMessage(email_field, "Inavlid email address");
        }
    }

    if (conf_password) {
        if (password === conf_password) {
            showSuccessField(conf_password_field);
        } else {
            showErrorMessage(conf_password_field, "Both passwords does not match");
        }
    }

    if (isFormValid) {
        showSuccess();
    }
}

