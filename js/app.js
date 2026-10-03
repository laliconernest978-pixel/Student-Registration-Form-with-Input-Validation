/**
 * Part B: Pure Validation Functions for Autograder Compatibility
 * Must not reference document, window, or HTML elements.
 */

// Pure Function 1: Format 24-1234-123
function isValidStudentNumber(value) {
  if (value === null || value === undefined) return false;
  const trimmed = String(value).trim();
  const regex = /^\d{2}-\d{4}-\d{3}$/;
  return regex.test(trimmed);
}

// Pure Function 2: Password rules (>=8 chars, no spaces, >=1 uppercase, >=1 digit, >=1 of @, $, !)
function isValidPassword(value) {
  if (value === null || value === undefined) return false;
  const str = String(value);

  if (str.length < 8) return false;
  if (/\s/.test(str)) return false;
  if (!/[A-Z]/.test(str)) return false;
  if (!/[0-9]/.test(str)) return false;
  if (!/[@$!]/.test(str)) return false;

  return true;
}

// CommonJS Export Guard for Node.js Automated Testing Environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}

/**
 * Parts C, D & E: Event Handling, Feedback, Accessibility, and Summary Display
 * Guarded against Node.js runtime errors.
 */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");

    // Inputs
    const fullNameInput = document.getElementById("fullName");
    const studentNumberInput = document.getElementById("studentNumber");
    const emailInput = document.getElementById("email");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const courseSelect = document.getElementById("course");
    const termsCheckbox = document.getElementById("terms");

    // Error Containers
    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    // Feedback and Output Containers
    const passwordFeedback = document.getElementById("passwordFeedback");
    const successMsg = document.getElementById("successMessage");
    const summaryContainer = document.getElementById("registrationSummary");

    // Summary Text Nodes
    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");

    // Accessibility Helpers
    function showFieldError(inputEl, errorEl, message) {
      if (errorEl) errorEl.textContent = message;
      if (inputEl) inputEl.setAttribute("aria-invalid", "true");
    }

    function clearFieldError(inputEl, errorEl) {
      if (errorEl) errorEl.textContent = "";
      if (inputEl) inputEl.setAttribute("aria-invalid", "false");
    }

    // Field-level Validation Handlers
    function validateFullName() {
      const val = fullNameInput.value.trim();
      if (val.length === 0) {
        showFieldError(fullNameInput, fullNameError, "Full name is required.");
        return false;
      }
      if (val.length < 2) {
        showFieldError(fullNameInput, fullNameError, "Full name must be at least 2 characters long.");
        return false;
      }
      clearFieldError(fullNameInput, fullNameError);
      return true;
    }

    function validateStudentNumber() {
      const val = studentNumberInput.value.trim();
      if (val.length === 0) {
        showFieldError(studentNumberInput, studentNumberError, "Student number is required.");
        return false;
      }
      if (!isValidStudentNumber(val)) {
        showFieldError(studentNumberInput, studentNumberError, "Enter a student number in the format 24-1234-123.");
        return false;
      }
      clearFieldError(studentNumberInput, studentNumberError);
      return true;
    }

    function validateEmail() {
      const val = emailInput.value.trim();
      if (val.length === 0) {
        showFieldError(emailInput, emailError, "Email address is required.");
        return false;
      }
      // Simplified pattern: text before @, domain containing a dot, text after dot; no whitespace
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        showFieldError(emailInput, emailError, "Enter a valid email address.");
        return false;
      }
      clearFieldError(emailInput, emailError);
      return true;
    }

    function validateMobileNumber() {
      const val = mobileNumberInput.value.trim();
      if (val.length === 0) {
        showFieldError(mobileNumberInput, mobileNumberError, "Mobile number is required.");
        return false;
      }
      // Accepts 09XXXXXXXXX or +639XXXXXXXXX; no spaces or hyphens
      const mobileRegex = /^(09\d{9}|\+639\d{9})$/;
      if (!mobileRegex.test(val)) {
        showFieldError(mobileNumberInput, mobileNumberError, "Enter a valid mobile number starting with 09 or +639.");
        return false;
      }
      clearFieldError(mobileNumberInput, mobileNumberError);
      return true;
    }

    function validatePassword() {
      const val = passwordInput.value;
      if (!val || val.length === 0) {
        showFieldError(passwordInput, passwordError, "Password is required.");
        return false;
      }
      if (!isValidPassword(val)) {
        showFieldError(
          passwordInput,
          passwordError,
          "Password must be at least 8 characters long, contain an uppercase letter, a digit, and @, $, or !."
        );
        return false;
      }
      clearFieldError(passwordInput, passwordError);
      return true;
    }

    function validateConfirmPassword() {
      const pass = passwordInput.value;
      const confirmPass = confirmPasswordInput.value;
      if (!confirmPass) {
        showFieldError(confirmPasswordInput, confirmPasswordError, "Please confirm your password.");
        return false;
      }
      if (pass !== confirmPass) {
        showFieldError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
        return false;
      }
      clearFieldError(confirmPasswordInput, confirmPasswordError);
      return true;
    }

    function validateCourse() {
      const val = courseSelect.value;
      if (val !== "BSIT" && val !== "BSCS") {
        showFieldError(courseSelect, courseError, "Please select a valid course (BSIT or BSCS).");
        return false;
      }
      clearFieldError(courseSelect, courseError);
      return true;
    }

    function validateTerms() {
      if (!termsCheckbox.checked) {
        showFieldError(termsCheckbox, termsError, "You must agree to the terms and conditions.");
        return false;
      }
      clearFieldError(termsCheckbox, termsError);
      return true;
    }

    // Event 1: Password 'input' event for dynamic live feedback
    passwordInput.addEventListener("input", () => {
      const val = passwordInput.value;
      if (val.length === 0) {
        passwordFeedback.textContent = "";
        passwordFeedback.className = "feedback-text";
      } else if (isValidPassword(val)) {
        passwordFeedback.textContent = "Password meets all requirements.";
        passwordFeedback.className = "feedback-text valid";
        clearFieldError(passwordInput, passwordError);
      } else {
        passwordFeedback.textContent = "Requires 8+ chars, 1 uppercase, 1 digit, and one of (@, $, !), no whitespace.";
        passwordFeedback.className = "feedback-text invalid";
      }
    });

    // Event 2: Full Name 'blur' event
    fullNameInput.addEventListener("blur", validateFullName);

    // Event 3: Course and Terms 'change' events
    courseSelect.addEventListener("change", validateCourse);
    termsCheckbox.addEventListener("change", validateTerms);

    // Reset Output Container Helper
    function resetOutputState() {
      successMsg.textContent = "";
      summaryContainer.style.display = "none";
      summaryName.textContent = "";
      summaryStudentNumber.textContent = "";
      summaryEmail.textContent = "";
      summaryMobileNumber.textContent = "";
      summaryCourse.textContent = "";
    }

    // Event 4: Reset event
    form.addEventListener("reset", () => {
      const fields = [
        [fullNameInput, fullNameError],
        [studentNumberInput, studentNumberError],
        [emailInput, emailError],
        [mobileNumberInput, mobileNumberError],
        [passwordInput, passwordError],
        [confirmPasswordInput, confirmPasswordError],
        [courseSelect, courseError],
        [termsCheckbox, termsError]
      ];

      fields.forEach(([input, error]) => {
        clearFieldError(input, error);
      });

      passwordFeedback.textContent = "";
      passwordFeedback.className = "feedback-text";

      resetOutputState();
    });

    // Event 5: Form 'submit' event
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      resetOutputState();

      // Check all rules simultaneously so all error messages render together
      const validName = validateFullName();
      const validStudentNumber = validateStudentNumber();
      const validEmail = validateEmail();
      const validMobile = validateMobileNumber();
      const validPass = validatePassword();
      const validConfirm = validateConfirmPassword();
      const validCourse = validateCourse();
      const validTerms = validateTerms();

      const isFormValid =
        validName &&
        validStudentNumber &&
        validEmail &&
        validMobile &&
        validPass &&
        validConfirm &&
        validCourse &&
        validTerms;

      if (isFormValid) {
        successMsg.textContent = "Registration details validated successfully!";

        // Strictly use textContent to inject user inputs safely (no innerHTML)
        summaryName.textContent = fullNameInput.value.trim();
        summaryStudentNumber.textContent = studentNumberInput.value.trim();
        summaryEmail.textContent = emailInput.value.trim();
        summaryMobileNumber.textContent = mobileNumberInput.value.trim();
        summaryCourse.textContent = courseSelect.value;

        summaryContainer.style.display = "block";
      }
    });
  });
}