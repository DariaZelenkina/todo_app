const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const loginButton = document.querySelector(".submitBtn");
const errorMessage = document.querySelector(".error");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users"));

  if (emailInput.value === "" || passwordInput.value === "") {
    errorMessage.textContent = "All fields are required to be filled in";
  } else {
    if (users.find((user) => user.email === emailInput.value)) {
      localStorage.setItem("authorized", true);
      window.open("./index.html", "_self");
    } else {
      errorMessage.textContent = "User is not found";
    }
  }
  emailInput.value = "";
  passwordInput.value = "";
});

window.addEventListener("load", () => {
  if (localStorage.getItem("authorized") === "true") {
    window.open("./index.html", "_self");
  }
});
