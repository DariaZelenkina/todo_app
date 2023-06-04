const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const submitButton = document.querySelector(".submitBtn");
const errorMessage = document.querySelector(".error");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users"));

  if (emailInput.value === "" || passwordInput.value === "") {
    errorMessage.textContent = "All fields must be filled in";
  } else {
    if (users.find(({ email }) => email === emailInput.value)) {
      errorMessage.textContent =
        "A user registered with this email already exists";
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          ...users,
          {
            email: emailInput.value,
            password: passwordInput.value,
          },
        ])
      );
      window.open("./auth.html", "_self");
    }
  }

  emailInput.value = "";
  passwordInput.value = "";
});

window.addEventListener("load", () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
});
