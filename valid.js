//First Name
let fullNameInput = document.getElementById("full-name-input");
let fullNameError = document.getElementById("full-name-error");
let emptyFullNameError = document.getElementById("empty-full-name");

//First Name
let firstNameInput = document.getElementById("first-name-input");
let firstNameError = document.getElementById("first-name-error");
let emptyFirstNameError = document.getElementById("empty-first-name");

//Last name
let lastNameInput = document.getElementById("last-name-input");
let lastNameError = document.getElementById("last-name-error");
let emptyLastNameError = document.getElementById("empty-last-name");

//Email
let emailInput = document.getElementById("email");
let emailError = document.getElementById("email-error");
let emptyEmailError = document.getElementById("empty-email");

//Password
let passwordInput = document.getElementById("password");
let passwordError = document.getElementById("password-error");
let emptyPasswordError = document.getElementById("empty-password");

//Verify Password
let verifyPasswordInput = document.getElementById("verify-password");
let verifyPasswordError = document.getElementById("verify-password-error");
let emptyVerifyPasswordError = document.getElementById("empty-verify-password");

//Submit
let submitButton = document.getElementById("submit-button");

//Valid
let validClasses = document.getElementsByClassName("valid");
let invalidClasses = document.getElementsByClassName("error");


//capitalize the words
const capitalizeFirstLetter = (string) => {
  // If the input string contains spaces, split it into an array of words
  if (string.indexOf(" ") !== -1) {
    let words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
      // Capitalize the first letter of each word and convert the rest of the letters to lowercase
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
  } else {
    // Otherwise, simply capitalize the first letter of the input string and convert the rest of the letters to lowercase
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};

//Full Name text varification
const fullNameVerify = (text1) => {
  const regex = /^(?!.*\d.*\d)([A-Za-z0-9]+\.?\s)*[A-Za-z][A-Za-z0-9]*(\s{1}[A-Za-z0-9]+\.?)*$/i;
  if (/\s{2,}/.test(text1)) {
    return false;
  }
  return regex.test(text1);
};
const fullTextVerify = (text) => {
  const fullNameRegex = /^(?!.*(\w)\1\1)([A-Z][a-z]*\.?\s{1,2})*[A-Z][a-z]*$/i;

  if (text.trim().length === 0) {
    return "Full name cannot be empty";
  } else if (text.endsWith(".") || text.endsWith(" ")) {
    return "Full name should not be ending with . or space";
  } else if (/(\s{2,})/.test(text)) {
    return "No two spaces allowed together";
  } else if (!fullNameVerify(text)) {
    if (/(\w)\1\1/.test(text)) {
      return "No character can be used more than 2 times";
    } else if (/[^\w]/.test(text)) {
      return "No special characters allowed";
    } else {
      return "Invalid input";
    }
  } else if (text.split(" ").length > 3) {
    return "Full name should have at most 3 words";
  } else {
    return true;
  }
};

fullNameInput.addEventListener("input", () => {
  fullNameInput.value = capitalizeFirstLetter(fullNameInput.value);

  const verification3 = fullTextVerify(fullNameInput.value);

  if (verification3 === true) {
    fullNameError.classList.add("hide");
    validInput(fullNameInput);
  } else {
    errorUpdate(fullNameInput, fullNameError);
    fullNameError.innerText = verification3;
  };
});


//First Text verification (if input contains only text)
const textVerify = (text) => {
  const regex = /^(?!.*(\w)\1\1)[A-Za-z0-9]{2,15}$/i;

  if (text.length < 2) {
    return "First name should be more than 2 characters";
  } else if (!regex.test(text)) {
    if (/(\w)\1\1/.test(text)) {
      return "No character can be used more than 2 times";
    } else if (/[^\w\s]/.test(text)) {
      return "No special characters allowed";
    } else {
      return "Invalid input";
    }
  } else {
    return true;
  }
};
//First name 
firstNameInput.addEventListener("input", () => {
  // Capitalize the first letter of the input field
  firstNameInput.value = capitalizeFirstLetter(firstNameInput.value);

  const verification = textVerify(firstNameInput.value);

  if (verification === true) {
    // If verification returns true
    firstNameError.classList.add("hide");
    validInput(firstNameInput);
  } else {
    // for false
    errorUpdate(firstNameInput, firstNameError);
    emptyUpdate(firstNameInput, emptyFirstNameError, firstNameError);
    firstNameError.innerText = verification;
  };
});

// last name
const LastTextVerify = (text) => {
  const regex = /^(?!.*([a-zA-Z])\1\1)[a-zA-Z]+$/;
  if (text.trim().length === 0) {
    return "Last name cannot be empty";
  } else if (text === ".") {
    return true;
  } else if (text.endsWith(".")) {
    return "Last name should not be ending with .";
  } else if (!regex.test(text)) {
    return "Last name should only contain alphabetical characters";
  } else {
    return true;
  }
};
//Last name
lastNameInput.addEventListener("input", () => {
  lastNameInput.value = capitalizeFirstLetter(lastNameInput.value);

  const verification2 = LastTextVerify(lastNameInput.value);

  if (verification2 === true) {
    lastNameError.classList.add("hide");
    validInput(lastNameInput);
  } else {
    errorUpdate(lastNameInput, lastNameError);
    lastNameError.innerText = verification2;
  };
  /* concatFullName(); */
});

//Email verification
const emailVerify = (input) => {
  const regex = /^([A-Za-z0-9_]+[-.]?[A-Za-z0-9_]+)+@(?!(?:[A-Za-z0-9_]+\.)?([A-Za-z]{1,3})\.)([A-Za-z0-9_]+[-.]?[A-Za-z0-9_]+)+\.([A-Za-z]{2,4})$/;
  return regex.test(input);
};
//Email
emailInput.addEventListener("input", () => {
  if (emailVerify(emailInput.value)) {
    emailError.classList.add("hide");
    validInput(emailInput);
  } else {
    errorUpdate(emailInput, emailError);
    emptyUpdate(emailInput, emptyEmailError, emailError);
  }
});


//Phone number verification
var countrySelect = document.getElementById('country');
var phoneInput = document.getElementById('phone');
var phonePrefixInput = document.getElementById('phone-prefix');
var phoneError = document.getElementById('phone-error');

function setPhoneMaxLength() {
  var country = countrySelect.value;
  var maxLength = 10;
  var prefix = '';
  if (country === 'US') {
    maxLength = 12;
    prefix = '+1';
    validInput(countrySelect)
  } else if (country === 'CH') {
    maxLength = 11;
    prefix = '+44';
    validInput(countrySelect)
  } else if (country === 'IN') {
    maxLength = 10;
    prefix = '+91';
    validInput(countrySelect)
  }
  phoneInput.maxLength = maxLength;
  phonePrefixInput.value = prefix;
  phoneInput.value = ''; // Reset phone number field
  phoneInput.disabled = (country === ''); // Disable phone number field if no country is selected
}

function validatePhone() {
  var country = countrySelect.value;
  var maxLength = phoneInput.maxLength;
  var phone = phoneInput.value;

  if (!/^[0-9]+$/.test(phone)) { // checks if input only contains digits
    phoneError.textContent = 'Phone number should contain only digits';
    phoneError.classList.remove('hide');
  } else if (phone.startsWith('0')) {
    phoneError.textContent = 'Phone number cannot start with 0';
    phoneError.classList.remove('hide');
  } else if (phone.length < maxLength || (phone.match(/0/g) || []).length > 8) {
    if (country === 'IN') {
      phoneError.textContent = 'Phone number should be 10 digits';
    } else if (country === 'CH') {
      phoneError.textContent = 'Phone number should be 11 digits';
    } else if (country === 'US') {
      phoneError.textContent = 'Phone number should be 12 digits';
    }
    phoneError.classList.remove('hide');
    errorUpdate(phoneInput, phoneError)
  } else {
    phoneError.textContent = '';
    phoneError.classList.add('hide');
    validInput(phoneInput);
  }
}

countrySelect.addEventListener('change', setPhoneMaxLength);
phoneInput.addEventListener('input', validatePhone);
setPhoneMaxLength(); // set initial max length and prefix on page load


//Date not more than current date
const today = new Date().toISOString().split("T")[0];
document.getElementById("dob").setAttribute("max", today);

//For empty input - accepts(input,empty error for that input and other errors)
const emptyUpdate = (
  inputReference,
  emptyErrorReference,
  otherErrorReference
) => {
  if (!inputReference.value) {
    //input is null/empty
    emptyErrorReference.classList.remove("hide");
    otherErrorReference.classList.add("hide");
    inputReference.classList.add("error");
  } else {
    //input has some content
    emptyErrorReference.classList.add("hide");
  }
};

/* function concatFullName() {
  const fullNameSpan = document.getElementById("fullName");
  
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  
  const firstNameValid = textVerify(firstName) === true;
  const lastNameValid = LastTextVerify(lastName) === true;
  
  if (firstNameValid && lastNameValid) {
    const fullName = `${firstName} ${lastName}`.replace(/(\s{1,3})\s+/g, '$1');
    fullNameSpan.innerText = fullName;
    fullNameSpan.classList.remove("hide");
  } else {
    fullNameSpan.classList.add("hide");
  }
} */

// Image upload
const imageInput = document.getElementById('image-input');
const imageError = document.getElementById('image-error');
const documentInput = document.getElementById('document-input');
const documentError = document.getElementById('document-error');

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    imageError.textContent = 'Please upload only JPG, JPEG, or PNG files for the image.';
    imageInput.value = ''; // Clear the input field
    errorUpdate(imageInput, imageError);
  }
  else{
    imageError.classList.add('hide');
    validInput(imageInput);
  }
});

//document upload
documentInput.addEventListener('change', () => {
  const file = documentInput.files[0];
  const allowedTypes = ['application/pdf', 'application/msword', 'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  
  if (!allowedTypes.includes(file.type)) {
    documentError.textContent = 'Please upload only PDF, DOC, CSV, or XLSX files for the document.'
    documentInput.value = ''; // Clear the input field
    errorUpdate(documentInput, documentError);
  }
  else{
    documentError.classList.add('hide');
    validInput(documentInput);
  }
});


//Password Verification
const passwordVerify = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\W).{8,}$/;
  return regex.test(password) && password.length >= 8;
};


//Password
passwordInput.addEventListener("input", () => {
  if (passwordVerify(passwordInput.value)) {
    passwordError.classList.add("hide");
    validInput(passwordInput);
  } else {
    errorUpdate(passwordInput, passwordError);
    emptyUpdate(passwordInput, emptyPasswordError, passwordError);
  }
});

//Verify password
verifyPasswordInput.addEventListener("input", () => {
  if (verifyPasswordInput.value === passwordInput.value) {
    verifyPasswordError.classList.add("hide");
    validInput(verifyPasswordInput);
  } else {
    errorUpdate(verifyPasswordInput, verifyPasswordError);
    emptyUpdate(passwordInput, emptyVerifyPasswordError, verifyPasswordError);
  }
});

// password eye
function togglePasswordVisibility(inputId) {
  var passwordInput = document.getElementById(inputId);
  var toggleIcon = passwordInput.parentElement.querySelector(".toggle-password i");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}

//For error styling and displaying error message
const errorUpdate = (inputReference, errorReference) => {
  errorReference.classList.remove("hide");
  inputReference.classList.remove("valid");
  inputReference.classList.add("error");
};

//For no errors
const validInput = (inputReference) => {
  inputReference.classList.remove("error");
  inputReference.classList.add("valid");
};


//Submit button
submitButton.addEventListener("click", (event) => {
  const validClasses = document.querySelectorAll(".valid");
  const invalidClasses = document.querySelectorAll(".error");
  const form = document.querySelector("#form");

  // Check if there are any invalid inputs
  if (invalidClasses.length > 0) {
    alert("Error! Please correct the invalid inputs.");
    event.preventDefault(); // Prevent the form from resetting
  }
  // Check if all inputs are valid
  else if (validClasses.length === 10) {
    alert("Registration successful!");
    form.reset(); // Reset the form
  }
  // Otherwise, there are still invalid inputs
  else {
    alert("Error! Please enter valid details.");
    event.preventDefault(); // Prevent the form from resetting
  }
});

