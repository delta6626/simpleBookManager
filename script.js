const bookTable = document.getElementById("bookTable");
const bookCountText = document.getElementById("bookCountText");
const addBookModal = document.getElementById("addBookModal");
const editBookModal = document.getElementById("editBookModal");
const deleteBookModal = document.getElementById("deleteBookModal");

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

const btnShowAddBookModal = document.getElementById("btnShowAddBookModal");
const btnAddBook = document.getElementById("btnAddBook");
const btnCancelAdd = document.getElementById("btnCancelAdd");

const btnSaveEdit = document.getElementById("btnSaveEdit");
const btnCancelEdit = document.getElementById("btnCancelEdit");

const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const btnCancelDelete = document.getElementById("btnCancelDelete");

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

window.addEventListener("DOMContentLoaded", () => {
  renderTable(books);
  updateBookCount();
});

btnShowAddBookModal.addEventListener("click", () => {
  addBookModal.showModal();
});

btnAddBook.addEventListener("click", insertBook);
btnCancelAdd.addEventListener("click", () => addBookModal.close());

btnSaveEdit.addEventListener("click", saveBook);
btnCancelEdit.addEventListener("click", () => editBookModal.close());

btnConfirmDelete.addEventListener("click", deleteBook);
btnCancelDelete.addEventListener("click", () => deleteBookModal.close());

function renderTable(bookList) {
  bookList.forEach((book, index) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.innerText = index;

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

function validateData() {}

function saveBook() {}

function insertBook() {}

function deleteBook() {}
