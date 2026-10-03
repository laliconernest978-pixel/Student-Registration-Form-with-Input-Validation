
function isValidStudentNumber(value) {
  if (value === null || value === undefined) return false;
  const trimmed = String(value).trim();
  // Format: 24-1234-123 (2 digits, hyphen, 4 digits, hyphen, 3 digits)
  const regex = /^\d{2}-\d{4}-\d{3}$/;
  return regex.test(trimmed);
}

// Pure Validation Function for Password
function isValidPassword(value) {
  if (value === null || value === undefined) return false;
  const str = String(value);
  
  // Must be at least 8 characters long
  if (str.length < 8) return false;
  // Must contain no whitespace
  if (/\s/.test(str)) return false;
  // Must contain at least one uppercase letter
  if (!/[A-Z]/.test(str)) return false;
  // Must contain at least one digit
  if (!/[0-9]/.test(str)) return false;
  // Must contain at least one of @, $, or !
  if (!/[@$!]/.test(str)) return false;

  return true;
}

// Node.js CommonJS export guard for automated testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}

// Browser DOM Interaction Logic (Guarded for Node compatibility)
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    // Form & Summary Elements
    const form = document.getElementById("registrationForm");
    const successMsg = document.getElementById("successMessage");
    const summaryContainer = document.getElementById("registrationSummary");

    // Inputs
    const fullNameInput = document.getElementById("fullName");
    const studentNumberInput = document.getElementById("studentNumber");
    const emailInput = document.getElementById("email");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const courseSelect = document.getElementById("course");
    const termsCheckbox = document.getElementById("terms");

    // Errors
    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    // Feedback
    const passwordFeedback = document.getElementById("passwordFeedback");

    // Summary Elements
    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");

    // Helper: Set Field Error State
    function setError(inputElement, errorElement, message) {
      if (errorElement) errorElement.textContent = message;
      if (inputElement) inputElement.setAttribute("aria-invalid", "true");
    }

    // Helper: Clear Field Error State
    function clearError(inputElement, errorElement) {
      if (errorElement) errorElement.textContent = "";
      if (inputElement) inputElement.setAttribute("aria-invalid", "false");
    }

    // Individual Validation Rules
    function validateFullName() {
      const val = fullNameInput.value.trim();
      if (val.length === 0) {
        setError(fullNameInput, fullNameError, "Full name is required.");
        return false;
      }
      if (val.length < 2) {
        setError(fullNameInput, fullNameError, "Full name must be at least 2 characters long.");
        return false;
      }
      clearError(fullNameInput, fullNameError);
      return true;
    }

    function validateStudentNumber() {
      const val = studentNumberInput.value;
      if (!val || val.trim().length === 0) {
        setError(studentNumberInput, studentNumberError, "Student number is required.");
        return false;
      }
      if (!isValidStudentNumber(val)) {
        setError(studentNumberInput, studentNumberError, "Enter a student number in the format 24-1234-123.");
        return false;
      }
      clearError(studentNumberInput, studentNumberError);
      return true;
    }

    function validateEmail() {
      const val = emailInput.value.trim();
      if (val.length === 0) {
        setError(emailInput, emailError, "Email address is required.");
        return false;
      }
      // Simplified pattern: text before @, domain containing a dot, text after dot; no whitespace
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setError(emailInput, emailError, "Enter a valid email address (e.g. user@domain.com).");
        return false;
      }
      clearError(emailInput, emailError);
      return true;
    }

    function validateMobileNumber() {
      const val = mobileNumberInput.value.trim();
      if (val.length === 0) {
        setError(mobileNumberInput, mobileNumberError, "Mobile number is required.");
        return false;
      }
      // Accepts 09XXXXXXXXX or +639XXXXXXXXX; no spaces or hyphens
      const mobileRegex = /^(09\d{9}|\+639\d{9})$/;
      if (!mobileRegex.test(val)) {
        setError(mobileNumberInput, mobileNumberError, "Enter a valid mobile number starting with 09 or +639.");
        return false;
      }
      clearError(mobileNumberInput, mobileNumberError);
      return true;
    }

    function validatePassword() {
      const val = passwordInput.value;
      if (!val || val.length === 0) {
        setError(passwordInput, passwordError, "Password is required.");
        return false;
      }
      if (!isValidPassword(val)) {
        setError(
          passwordInput,
          passwordError,
          "Password must be at least 8 characters long, contain an uppercase letter, a digit, and @, $, or !."
        );
        return false;
      }
      clearError(passwordInput, passwordError);
      return true;
    }

    function validateConfirmPassword() {
      const pass = passwordInput.value;
      const confirmPass = confirmPasswordInput.value;
      if (!confirmPass) {
        setError(confirmPasswordInput, confirmPasswordError, "Please confirm your password.");
        return false;
      }
      if (pass !== confirmPass) {
        setError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
        return false;
      }
      clearError(confirmPasswordInput, confirmPasswordError);
      return true;
    }

    function validateCourse() {
      const val = courseSelect.value;
      if (val !== "BSIT" && val !== "BSCS") {
        setError(courseSelect, courseError, "Please select a valid course (BSIT or BSCS).");
        return false;
      }
      clearError(courseSelect, courseError);
      return true;
    }

    function validateTerms() {
      if (!termsCheckbox.checked) {
        setError(termsCheckbox, termsError, "You must agree to the terms and conditions.");
        return false;
      }
      clearError(termsCheckbox, termsError);
      return true;
    }

    // Dynamic Live Feedback for Password Input
    passwordInput.addEventListener("input", () => {
      const val = passwordInput.value;
      if (val.length === 0) {
        passwordFeedback.textContent = "";
        passwordFeedback.className = "info-feedback";
      } else if (isValidPassword(val)) {
        passwordFeedback.textContent = "Password meets all requirements.";
        passwordFeedback.className = "info-feedback valid";
        clearError(passwordInput, passwordError);
      } else {
        passwordFeedback.textContent = "Password must be at least 8 chars, contain 1 uppercase letter, 1 digit, and one of @, $, ! with no spaces.";
        passwordFeedback.className = "info-feedback invalid";
      }
    });

    // Event Handling: blur on Full Name
    fullNameInput.addEventListener("blur", validateFullName);

    // Event Handling: change on Course and Terms
    courseSelect.addEventListener("change", validateCourse);
    termsCheckbox.addEventListener("change", validateTerms);

    // Form Reset Handler
    form.addEventListener("reset", () => {
      // Clear errors
      const errors = [
        fullNameError,
        studentNumberError,
        emailError,
        mobileNumberError,
        passwordError,
        confirmPasswordError,
        courseError,
        termsError
      ];
      errors.forEach((err) => {
        if (err) err.textContent = "";
      });

      // Clear aria-invalid attributes
      const inputs = [
        fullNameInput,
        studentNumberInput,
        emailInput,
        mobileNumberInput,
        passwordInput,
        confirmPasswordInput,
        courseSelect,
        termsCheckbox
      ];
      inputs.forEach((input) => {
        if (input) input.setAttribute("aria-invalid", "false");
      });

      // Clear password feedback
      passwordFeedback.textContent = "";
      passwordFeedback.className = "info-feedback";

      // Clear success and summary elements
      successMsg.textContent = "";
      summaryContainer.hidden = true;
      summaryName.textContent = "";
      summaryStudentNumber.textContent = "";
      summaryEmail.textContent = "";
      summaryMobileNumber.textContent = "";
      summaryCourse.textContent = "";
    });

    // Form Submission Handler
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Reset outcome containers prior to re-validation
      successMsg.textContent = "";
      summaryContainer.hidden = true;

      // Run all validations
      const isNameValid = validateFullName();
      const isStudentNumberValid = validateStudentNumber();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobileNumber();
      const isPasswordValid = validatePassword();
      const isConfirmValid = validateConfirmPassword();
      const isCourseValid = validateCourse();
      const isTermsValid = validateTerms();

      const isFormValid =
        isNameValid &&
        isStudentNumberValid &&
        isEmailValid &&
        isMobileValid &&
        isPasswordValid &&
        isConfirmValid &&
        isCourseValid &&
        isTermsValid;

      if (isFormValid) {
        // Display Success Message
        successMsg.textContent = "Registration details validated successfully!";

        // Populate Summary using textContent (safely excluding passwords)
        summaryName.textContent = fullNameInput.value.trim();
        summaryStudentNumber.textContent = studentNumberInput.value.trim();
        summaryEmail.textContent = emailInput.value.trim();
        summaryMobileNumber.textContent = mobileNumberInput.value.trim();
        summaryCourse.textContent = courseSelect.value;

        // Show Summary
        summaryContainer.hidden = false;
      }
    });
  });
}