document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const gender = document.getElementById("gender").value;
  const phone = document.getElementById("phone").value;

  // Clear previous error messages
  clearErrors();

  // Validate inputs
  const errors = validateInputs(name, email, password, phone);

  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
  } else {
    // Make API request
    axios({
      url: "https://shop.cyberlearn.vn/api/Users/signup",
      method: "POST",
      data: {
        email: email,
        password: password,
        name: name,
        gender: gender === "true",
        phone: phone,
      },
    })
      .then((response) => {
        alert(
          "You have successfully registered! Go to the home page. Let's go!"
        );
        window.location.href = "/index.html";
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          if (error.response.data.message === "Email đã được sử dụng!") {
            displayErrors({ email: error.response.data.message });
          } else {
            displayErrors({ apiError: error.response.data.message });
          }
        } else {
          displayErrors({
            apiError: "An unexpected error occurred. Please try again later.",
          });
        }
      });
  }
});
function validateInputs(name, email, password, phone) {
  const errors = {};

  // Name validation
  if (!name || name.length > 20) {
    errors.name = "Name is required and must be less than 20 characters.";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "A valid email is required.";
  }

  // Password validation
  if (!password || password.length < 8) {
    errors.password = "Password is required and must be at least 8 characters.";
  }

  // Phone validation
  const phoneRegex =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.phone = "A valid phone number is required.";
  }

  return errors;
}
function displayErrors(errors) {
  Object.keys(errors).forEach((key) => {
    const errorElement = document.createElement("div");
    errorElement.className = "text-danger mt-1";
    errorElement.innerText = errors[key];
    const inputElement = document.getElementById(key);
    inputElement.parentNode.appendChild(errorElement);
  });

  if (errors.apiError) {
    const apiErrorElement = document.createElement("div");
    apiErrorElement.className = "text-danger mt-1";
    apiErrorElement.innerText = errors.apiError;
    document.getElementById("signup-form").prepend(apiErrorElement);
  }
}
function clearErrors() {
  const errorElements = document.querySelectorAll(".text-danger");
  errorElements.forEach((el) => el.remove());
}
