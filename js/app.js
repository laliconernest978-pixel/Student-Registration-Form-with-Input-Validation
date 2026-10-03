```javascript
// ======================================================
// PURE VALIDATION FUNCTIONS
// These functions do not access document or window.
// ======================================================

function isValidStudentNumber(value) {
    const trimmedValue = String(value).trim();

    // Required format: 24-1234-123
    return /^\d{2}-\d{4}-\d{3}$/.test(trimmedValue);
}

function isValidPassword(value) {
    // Do NOT trim the password.
    // Password must:
    // - have at least 8 characters
    // - contain one uppercase letter
    // - contain one digit
    // - contain @, $, or !
    // - contain no whitespace

    const password = String(value);

    return (
        password.length >= 8 &&
        /^[^\s]*$/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[@$!]/.test(password)
    );
}


// ======================================================
// COMMONJS EXPORT FOR AUTOGRADER / NODE
// ======================================================

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}


// ======================================================
// BROWSER CODE
// ======================================================

if (typeof document !== "undefined") {

    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    const passwordFeedback = document.getElementById("passwordFeedback");

    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");

    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber =
        document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber =
        document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");


    // ==================================================
    // HELPER FUNCTIONS
    // ==================================================

    function setError(field, errorElement, message) {
        errorElement.textContent = message;

        if (message) {
            field.setAttribute("aria-invalid", "true");
        } else {
            field.setAttribute("aria-invalid", "false");
        }
    }


    function validateFullName() {
        const value = fullName.value.trim();

        if (value.length === 0) {
            setError(
                fullName,
                fullNameError,
                "Full name is required."
            );
            return false;
        }

        if (value.length < 2) {
            setError(
                fullName,
                fullNameError,
                "Full name must contain at least two characters."
            );
            return false;
        }

        setError(fullName, fullNameError, "");
        return true;
    }


    function validateStudentNumber() {
        const value = studentNumber.value.trim();

        if (value === "") {
            setError(
                studentNumber,
                studentNumberError,
                "Student number is required."
            );
            return false;
        }

        if (!isValidStudentNumber(value)) {
            setError(
                studentNumber,
                studentNumberError,
                "Enter a student number in the format 24-1234-123."
            );
            return false;
        }

        setError(studentNumber, studentNumberError, "");
        return true;
    }


    function validateEmail() {
        const value = email.value.trim();

        if (value === "") {
            setError(
                email,
                emailError,
                "Email address is required."
            );
            return false;
        }

        // Simplified email rule:
        // text before @
        // domain containing a dot
        // text after the dot
        // no whitespace
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
            setError(
                email,
                emailError,
                "Enter a valid email address."
            );
            return false;
        }

        setError(email, emailError, "");
        return true;
    }


    function validateMobileNumber() {
        const value = mobileNumber.value.trim();

        if (value === "") {
            setError(
                mobileNumber,
                mobileNumberError,
                "Mobile number is required."
            );
            return false;
        }

        // Accept:
        // 09171234567
        // +639171234567
        const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

        if (!mobilePattern.test(value)) {
            setError(
                mobileNumber,
                mobileNumberError,
                "Enter a mobile number starting with 09 or +639, with no spaces or hyphens."
            );
            return false;
        }

        setError(mobileNumber, mobileNumberError, "");
        return true;
    }


    function validatePassword() {
        const value = password.value;

        if (value === "") {
            setError(
                password,
                passwordError,
                "Password is required."
            );
            return false;
        }

        if (!isValidPassword(value)) {
            setError(
                password,
                passwordError,
                "Password must be at least 8 characters, contain one uppercase letter, one digit, one of @, $, or !, and no spaces."
            );
            return false;
        }

        setError(password, passwordError, "");
        return true;
    }


    function updatePasswordFeedback() {
        const value = password.value;

        if (value === "") {
            passwordFeedback.textContent = "";
            return;
        }

        if (isValidPassword(value)) {
            passwordFeedback.textContent =
                "Password meets all requirements.";
        } else {
            passwordFeedback.textContent =
                "Password must have at least 8 characters, one uppercase letter, one digit, one of @, $, or !, and no spaces.";
        }
    }


    function validateConfirmPassword() {
        const value = confirmPassword.value;

        if (value === "") {
            setError(
                confirmPassword,
                confirmPasswordError,
                "Please confirm your password."
            );
            return false;
        }

        if (value !== password.value) {
            setError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );
            return false;
        }

        setError(confirmPassword, confirmPasswordError, "");
        return true;
    }


    function validateCourse() {
        if (course.value !== "BSIT" && course.value !== "BSCS") {
            setError(
                course,
                courseError,
                "Please select BSIT or BSCS."
            );
            return false;
        }

        setError(course, courseError, "");
        return true;
    }


    function validateTerms() {
        if (!terms.checked) {
            setError(
                terms,
                termsError,
                "You must agree to the terms and conditions."
            );
            return false;
        }

        setError(terms, termsError, "");
        return true;
    }


    function clearSummary() {
        successMessage.textContent = "";
        registrationSummary.hidden = true;

        summaryName.textContent = "";
        summaryStudentNumber.textContent = "";
        summaryEmail.textContent = "";
        summaryMobileNumber.textContent = "";
        summaryCourse.textContent = "";
    }


    function displayRegistrationSummary() {
        // Use textContent for all user-entered values.
        summaryName.textContent = fullName.value.trim();
        summaryStudentNumber.textContent = studentNumber.value.trim();
        summaryEmail.textContent = email.value.trim();
        summaryMobileNumber.textContent = mobileNumber.value.trim();
        summaryCourse.textContent = course.value;

        successMessage.textContent =
            "Registration details validated successfully!";

        registrationSummary.hidden = false;
    }


    // ==================================================
    // FORM SUBMISSION
    // ==================================================

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullNameValid = validateFullName();
        const studentNumberValid = validateStudentNumber();
        const emailValid = validateEmail();
        const mobileValid = validateMobileNumber();
        const passwordValid = validatePassword();
        const confirmPasswordValid = validateConfirmPassword();
        const courseValid = validateCourse();
        const termsValid = validateTerms();

        if (
            fullNameValid &&
            studentNumberValid &&
            emailValid &&
            mobileValid &&
            passwordValid &&
            confirmPasswordValid &&
            courseValid &&
            termsValid
        ) {
            displayRegistrationSummary();
        } else {
            clearSummary();
        }
    });


    // ==================================================
    // PASSWORD INPUT EVENT
    // ==================================================

    password.addEventListener("input", function () {
        updatePasswordFeedback();

        if (password.value !== "") {
            validatePassword();
        }

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });


    // ==================================================
    // FULL NAME BLUR EVENT
    // ==================================================

    fullName.addEventListener("blur", function () {
        validateFullName();
    });


    // ==================================================
    // COURSE CHANGE EVENT
    // ==================================================

    course.addEventListener("change", function () {
        validateCourse();
    });


    // ==================================================
    // TERMS CHANGE EVENT
    // ==================================================

    terms.addEventListener("change", function () {
        validateTerms();
    });


    // ==================================================
    // OPTIONAL LIVE VALIDATION WHEN FIELDS ARE EDITED
    // ==================================================

    studentNumber.addEventListener("input", function () {
        if (studentNumber.value !== "") {
            validateStudentNumber();
        }
    });

    email.addEventListener("input", function () {
        if (email.value !== "") {
            validateEmail();
        }
    });

    mobileNumber.addEventListener("input", function () {
        if (mobileNumber.value !== "") {
            validateMobileNumber();
        }
    });

    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });


    // ==================================================
    // RESET EVENT
    // ==================================================

    form.addEventListener("reset", function () {
        // Wait until browser restores the controls
        // to their initial values.
        setTimeout(function () {

            setError(fullName, fullNameError, "");
            setError(studentNumber, studentNumberError, "");
            setError(email, emailError, "");
            setError(mobileNumber, mobileNumberError, "");
            setError(password, passwordError, "");
            setError(confirmPassword, confirmPasswordError, "");
            setError(course, courseError, "");
            setError(terms, termsError, "");

            passwordFeedback.textContent = "";

            clearSummary();

        }, 0);
    });

}
```