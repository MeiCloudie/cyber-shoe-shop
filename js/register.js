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

