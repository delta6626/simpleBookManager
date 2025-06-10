const bookTable = document.getElementById("bookTable");
const tableHeader = `<tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Actions</th>
                     </tr>`;
const bookCountText = document.getElementById("bookCountText");
const addBookModal = document.getElementById("addBookModal");
const editBookModal = document.getElementById("editBookModal");
const deleteBookModal = document.getElementById("deleteBookModal");
const deleteBookByTitleModal = document.getElementById(
  "deleteBookByTitleModal"
);

const addBookModalBookTitle = document.getElementById("addBookModalBookTitle");
const addBookModalBookAuthor = document.getElementById(
  "addBookModalBookAuthor"
);
const addBookModalBookYear = document.getElementById("addBookModalBookYear");
const addBookModalBookGenre = document.getElementById("addBookModalBookGenre");

const editBookModalBookTitle = document.getElementById(
  "editBookModalBookTitle"
);
const editBookModalBookAuthor = document.getElementById(
  "editBookModalBookAuthor"
);
const editBookModalBookYear = document.getElementById("editBookModalBookYear");

const editBookModalBookGenre = document.getElementById(
  "editBookModalBookGenre"
);

const deleteBookByTitleModalBookTitle = document.getElementById(
  "deleteBookByTitleModalBookTitle"
);

const btnShowAddBookModal = document.getElementById("btnShowAddBookModal");
const btnShowDeleteBookByTitleModal = document.getElementById(
  "btnShowDeleteBookByTitleModal"
);
const btnAddBook = document.getElementById("btnAddBook");
const btnCancelAdd = document.getElementById("btnCancelAdd");

const btnSaveEdit = document.getElementById("btnSaveEdit");
const btnCancelEdit = document.getElementById("btnCancelEdit");

const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const btnCancelDelete = document.getElementById("btnCancelDelete");

const btnConfirmDeleteByTitle = document.getElementById(
  "btnConfirmDeleteByTitle"
);
const btnCancelDeleteByTitle = document.getElementById(
  "btnCancelDeleteByTitle"
);

const addBookErrorMessage = document.getElementById("addBookErrorMessage");
const editBookErrorMessage = document.getElementById("editBookErrorMessage");
const deleteBookByTitleErrorMessage = document.getElementById(
  "deleteBookByTitleErrorMessage"
);

let books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction",
  },
  { title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian" },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    year: 1851,
    genre: "Adventure",
  },
];

const errorMessages = {
  NO_TITLE: "Please provide a title for the book.",
  NO_AUTHOR: "Please provide an author for the book.",
  NO_YEAR: "Please provide a year for the book.",
  NO_GENRE: "Please provide a genre for the book.",
  INVALID_YEAR: "The year entered is invalid. Please enter a valid value.",
  BOOK_DOES_NOT_EXIST: "The book with the provided title does not exist.",
};

window.addEventListener("DOMContentLoaded", () => {
  renderTable(books);
  updateBookCount();
});

btnShowAddBookModal.addEventListener("click", () => {
  addBookModal.showModal();
});

btnShowDeleteBookByTitleModal.addEventListener("click", () => {
  deleteBookByTitleModal.showModal();
});

btnAddBook.addEventListener("click", insertBook);
btnCancelAdd.addEventListener("click", () => addBookModal.close());

btnSaveEdit.addEventListener("click", saveBook);
btnCancelEdit.addEventListener("click", () => editBookModal.close());

btnConfirmDelete.addEventListener("click", deleteBook);
btnCancelDelete.addEventListener("click", () => deleteBookModal.close());

btnConfirmDeleteByTitle.addEventListener("click", deleteBookByTitle);
btnCancelDeleteByTitle.addEventListener("click", () =>
  deleteBookByTitleModal.close()
);

allowOnlyNumbers(addBookModalBookYear);
allowOnlyNumbers(editBookModalBookYear);

function allowOnlyNumbers(inputElement) {
  inputElement.addEventListener("keydown", (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if ((e.key >= "0" && e.key <= "9") || allowedKeys.includes(e.key)) {
      return; // Allow number keys and control keys
    }

    e.preventDefault(); // Block everything else
  });
}

function renderTable(bookList) {
  bookList.forEach((book, index) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.innerText = index + 1;

    const titleCell = document.createElement("td");
    titleCell.innerText = book.title;

    const authorCell = document.createElement("td");
    authorCell.innerText = book.author;

    const yearCell = document.createElement("td");
    yearCell.innerText = book.year;

    const genreCell = document.createElement("td");
    genreCell.innerText = book.genre;

    const actionsCell = document.createElement("td");
    actionsCell.classList.add("tableActions");

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btnEdit");
    editBtn.addEventListener("click", () => {
      editBookModal.setAttribute("target", index);
      editBookModalBookTitle.value = book.title;
      editBookModalBookAuthor.value = book.author;
      editBookModalBookYear.value = book.year;
      editBookModalBookGenre.value = book.genre;
      editBookModal.showModal();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btnDelete");
    deleteBtn.addEventListener("click", () => {
      deleteBookModal.setAttribute("target", index);
      deleteBookModal.showModal();
    });

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(yearCell);
    row.appendChild(genreCell);
    row.appendChild(actionsCell);

    bookTable.appendChild(row);
  });
}

function updateBookCount() {
  bookCountText.innerText = "Total books: " + books.length;
}

function insertBook() {
  const titleText = addBookModalBookTitle.value;
  const authorText = addBookModalBookAuthor.value;
  const yearNumber = parseInt(addBookModalBookYear.value);
  const genreText = addBookModalBookGenre.value;

  if (titleText == "") {
    addBookErrorMessage.classList.remove("hidden");
    addBookErrorMessage.textContent = errorMessages.NO_TITLE;
    return;
  } else if (authorText == "") {
    addBookErrorMessage.classList.remove("hidden");
    addBookErrorMessage.textContent = errorMessages.NO_AUTHOR;
    return;
  } else if (Number.isNaN(yearNumber)) {
    addBookErrorMessage.classList.remove("hidden");
    addBookErrorMessage.textContent = errorMessages.NO_YEAR;
    return;
  } else if (genreText == "") {
    addBookErrorMessage.classList.remove("hidden");
    addBookErrorMessage.textContent = errorMessages.NO_GENRE;
    return;
  } else if (!(yearNumber > 0 && yearNumber <= new Date().getFullYear())) {
    addBookErrorMessage.classList.remove("hidden");
    addBookErrorMessage.textContent = errorMessages.INVALID_YEAR;
    return;
  } else {
    addBookErrorMessage.classList.add("hidden");
    const newBookEntry = {
      title: titleText,
      author: authorText,
      year: yearNumber,
      genre: genreText,
    };

    books.push(newBookEntry);

    bookTable.innerHTML = tableHeader;

    renderTable(books);
    updateBookCount();
    addBookModal.close();
  }
}

function saveBook() {
  const editTarget = parseInt(editBookModal.getAttribute("target"));

  const titleText = editBookModalBookTitle.value;
  const authorText = editBookModalBookAuthor.value;
  const yearNumber = parseInt(editBookModalBookYear.value);
  const genreText = editBookModalBookGenre.value;

  if (titleText == "") {
    editBookErrorMessage.classList.remove("hidden");
    editBookErrorMessage.textContent = errorMessages.NO_TITLE;
    return;
  } else if (authorText == "") {
    editBookErrorMessage.classList.remove("hidden");
    editBookErrorMessage.textContent = errorMessages.NO_AUTHOR;
    return;
  } else if (Number.isNaN(yearNumber)) {
    editBookErrorMessage.classList.remove("hidden");
    editBookErrorMessage.textContent = errorMessages.NO_YEAR;
    return;
  } else if (genreText == "") {
    editBookErrorMessage.classList.remove("hidden");
    editBookErrorMessage.textContent = errorMessages.NO_GENRE;
    return;
  } else if (!(yearNumber > 0 && yearNumber <= new Date().getFullYear())) {
    editBookErrorMessage.classList.remove("hidden");
    editBookErrorMessage.textContent = errorMessages.INVALID_YEAR;
    return;
  } else {
    editBookErrorMessage.classList.add("hidden");
    const updatedBookEntry = {
      title: titleText,
      author: authorText,
      year: yearNumber,
      genre: genreText,
    };

    books[editTarget] = updatedBookEntry;
    bookTable.innerHTML = tableHeader;
    renderTable(books);
    editBookModal.close();
  }
}

function deleteBook() {
  const deleteTarget = parseInt(deleteBookModal.getAttribute("target"));
  books.splice(deleteTarget, 1);
  bookTable.innerHTML = tableHeader;
  renderTable(books);
  updateBookCount();
  deleteBookModal.close();
}

function deleteBookByTitle() {
  const bookTitle = deleteBookByTitleModalBookTitle.value;
  let deleted = false;

  if (bookTitle == "") {
    deleteBookByTitleErrorMessage.classList.remove("hidden");
    deleteBookByTitleErrorMessage.textContent = errorMessages.NO_TITLE;
    return;
  } else {
    for (let i = 0; i < books.length; i++) {
      if (books[i].title.toLowerCase() == bookTitle.toLowerCase()) {
        books.splice(i, 1);
        deleted = true;
        deleteBookByTitleErrorMessage.classList.add("hidden");
        break;
      }
    }

    bookTable.innerHTML = tableHeader;

    renderTable(books);
    updateBookCount();

    if (!deleted) {
      deleteBookByTitleErrorMessage.classList.remove("hidden");
      deleteBookByTitleErrorMessage.textContent =
        errorMessages.BOOK_DOES_NOT_EXIST;
      return;
    }

    deleteBookByTitleModal.close();
  }
}
