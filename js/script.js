const signOutButton = document.querySelector(".signOut");
const titleInput = document.querySelector(".title");
const descriptionInput = document.querySelector(".description");
const imageInput = document.querySelector(".image");
const addButton = document.querySelector(".addTodo");
const errorMessage = document.querySelector(".error");

window.addEventListener("load", () => {
  if (localStorage.getItem("authorized") === "false") {
    window.open("./register.html", "_self");
  }
  if (!localStorage.getItem("cards")) {
    localStorage.setItem("cards", JSON.stringify([]));
  } else {
    const cards = JSON.parse(localStorage.getItem("cards"));
    cards.map((card, index) => {
      card["id"] = index;
    });
    localStorage.setItem("cards", JSON.stringify(cards));

    const updatedCards = JSON.parse(localStorage.getItem("cards"));

    addCard(updatedCards);
  }
});

signOutButton.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.setItem("authorized", "false");
  window.open("./auth.html", "_self");
});

addButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    titleInput.value !== "" &&
    descriptionInput.value !== "" &&
    imageInput.value !== ""
  ) {
    const newTodo = {
      title: titleInput.value,
      description: descriptionInput.value,
      image: imageInput.value,
    };

    const existingTodo = JSON.parse(localStorage.getItem("cards"));
    localStorage.setItem("cards", JSON.stringify([...existingTodo, newTodo]));

    window.location.reload();
  } else {
    errorMessage.textContent = "All fields must be filled in";
  }
});

function addCard(cards) {
  const row = document.querySelector(".row");
  const template = document.querySelector("template");

  cards.map((data) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".btn_inline button:nth-child(1)").onclick =
      function () {
        deleteCard(data.id);
      };
    clone.querySelector(".btn_inline button:nth-child(2)").onclick =
      function () {
        editCard(data.id);
      };
    clone.querySelector("h4").textContent = data.title;
    clone.querySelector("p").textContent = data.description;
    clone.querySelector("img").src = data.image;

    row.appendChild(clone);
  });
}

function deleteCard(id) {
  const cards = JSON.parse(localStorage.getItem("cards"));
  const filteredCards = cards.filter((card) => card.id !== id);

  localStorage.setItem("cards", JSON.stringify(filteredCards));

  window.location.reload();
}

function editCard(id) {
  const cards = JSON.parse(localStorage.getItem("cards"));
  cards.find((card) => {
    if (card.id === id) {
      card.title = prompt("Title", card.title);
      card.description = prompt("Description", card.description);
      card.image = prompt("Image", card.image);

      localStorage.setItem("cards", JSON.stringify(cards));
      window.location.reload();
    }
  });
}
