// ================================
// DOM element references
// ================================

// Table and book counter
const bookTable = document.getElementById("bookTable");
const bookCountText = document.getElementById("bookCountText");

// Table header HTML structure
const tableHeader = `<tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Actions</th>
                     </tr>`;

// Modals
const addBookModal = document.getElementById("addBookModal");
const editBookModal = document.getElementById("editBookModal");
const deleteBookModal = document.getElementById("deleteBookModal");
const deleteBookByTitleModal = document.getElementById(
  "deleteBookByTitleModal"
);

// Input fields (Add)
const addBookModalBookTitle = document.getElementById("addBookModalBookTitle");
const addBookModalBookAuthor = document.getElementById(
  "addBookModalBookAuthor"
);
const addBookModalBookYear = document.getElementById("addBookModalBookYear");
const addBookModalBookGenre = document.getElementById("addBookModalBookGenre");

// Input fields (Edit)
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

// Input field (Delete by Title)
const deleteBookByTitleModalBookTitle = document.getElementById(
  "deleteBookByTitleModalBookTitle"
);

// Buttons
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

// Error message displays
const addBookErrorMessage = document.getElementById("addBookErrorMessage");
const editBookErrorMessage = document.getElementById("editBookErrorMessage");
const deleteBookByTitleErrorMessage = document.getElementById(
  "deleteBookByTitleErrorMessage"
);

// ================================
// Initial data and error messages
// ================================

// Array of JSON objects to store book records
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

// Predefined error messages
const errorMessages = {
  NO_TITLE: "Please provide a title for the book.",
  NO_AUTHOR: "Please provide an author for the book.",
  NO_YEAR: "Please provide a year for the book.",
  NO_GENRE: "Please provide a genre for the book.",
  INVALID_YEAR: "The year entered is invalid. Please enter a valid value.",
  BOOK_DOES_NOT_EXIST: "The book with the provided title does not exist.",
};

// ================================
// Event listeners
// ================================

// Render table and book count on page load
window.addEventListener("DOMContentLoaded", () => {
  renderTable(books);
  updateBookCount();
});

// Modal open/close handlers
btnShowAddBookModal.addEventListener("click", () => addBookModal.showModal());
btnShowDeleteBookByTitleModal.addEventListener("click", () =>
  deleteBookByTitleModal.showModal()
);

btnCancelAdd.addEventListener("click", () => addBookModal.close());
btnCancelEdit.addEventListener("click", () => editBookModal.close());
btnCancelDelete.addEventListener("click", () => deleteBookModal.close());
btnCancelDeleteByTitle.addEventListener("click", () =>
  deleteBookByTitleModal.close()
);

// Book action handlers
btnAddBook.addEventListener("click", insertBook);
btnSaveEdit.addEventListener("click", saveBook);
btnConfirmDelete.addEventListener("click", deleteBook);
btnConfirmDeleteByTitle.addEventListener("click", deleteBookByTitle);

// Restrict year input fields to numeric values
allowOnlyNumbers(addBookModalBookYear);
allowOnlyNumbers(editBookModalBookYear);

// ================================
// Input validation helper functions
// ================================

// Restricts input to numeric keys only
function allowOnlyNumbers(inputElement) {
  inputElement.addEventListener("keydown", (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if ((e.key >= "0" && e.key <= "9") || allowedKeys.includes(e.key)) return;
    e.preventDefault();
  });
}

// ================================
// UI update functions
// ================================

// Renders the entire book table
function renderTable(bookList) {
  bookTable.innerHTML = tableHeader; // Reset table
  bookList.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.genre}</td>
      <td class="tableActions">
        <button class="btnEdit">Edit</button>
        <button class="btnDelete">Delete</button>
      </td>`;

    // Add listeners to buttons
    const editBtn = row.querySelector(".btnEdit");
    const deleteBtn = row.querySelector(".btnDelete");

    editBtn.addEventListener("click", () => {
      editBookModal.setAttribute("target", index);
      editBookModalBookTitle.value = book.title;
      editBookModalBookAuthor.value = book.author;
      editBookModalBookYear.value = book.year;
      editBookModalBookGenre.value = book.genre;
      editBookModal.showModal();
    });

    deleteBtn.addEventListener("click", () => {
      deleteBookModal.setAttribute("target", index);
      deleteBookModal.showModal();
    });

    bookTable.appendChild(row);
  });
}

// Updates the text showing total book count
function updateBookCount() {
  bookCountText.innerText = "Total books: " + books.length;
}

// ================================
// CRUD FUNCTIONALITY
// ================================

// Adds a new book entry
function insertBook() {
  const titleText = addBookModalBookTitle.value.trim();
  const authorText = addBookModalBookAuthor.value.trim();
  const yearNumber = parseInt(addBookModalBookYear.value);
  const genreText = addBookModalBookGenre.value.trim();

  if (!titleText) return showError(addBookErrorMessage, errorMessages.NO_TITLE);
  if (!authorText)
    return showError(addBookErrorMessage, errorMessages.NO_AUTHOR);
  if (Number.isNaN(yearNumber))
    return showError(addBookErrorMessage, errorMessages.NO_YEAR);
  if (!genreText) return showError(addBookErrorMessage, errorMessages.NO_GENRE);
  if (!(yearNumber > 0 && yearNumber <= new Date().getFullYear()))
    return showError(addBookErrorMessage, errorMessages.INVALID_YEAR);

  addBookErrorMessage.classList.add("hidden");

  books.push({
    title: titleText,
    author: authorText,
    year: yearNumber,
    genre: genreText,
  });
  renderTable(books);
  updateBookCount();
  addBookModal.close();
}

// Saves edited book details
function saveBook() {
  const index = parseInt(editBookModal.getAttribute("target"));
  const titleText = editBookModalBookTitle.value.trim();
  const authorText = editBookModalBookAuthor.value.trim();
  const yearNumber = parseInt(editBookModalBookYear.value);
  const genreText = editBookModalBookGenre.value.trim();

  if (!titleText)
    return showError(editBookErrorMessage, errorMessages.NO_TITLE);
  if (!authorText)
    return showError(editBookErrorMessage, errorMessages.NO_AUTHOR);
  if (Number.isNaN(yearNumber))
    return showError(editBookErrorMessage, errorMessages.NO_YEAR);
  if (!genreText)
    return showError(editBookErrorMessage, errorMessages.NO_GENRE);
  if (!(yearNumber > 0 && yearNumber <= new Date().getFullYear()))
    return showError(editBookErrorMessage, errorMessages.INVALID_YEAR);

  editBookErrorMessage.classList.add("hidden");

  books[index] = {
    title: titleText,
    author: authorText,
    year: yearNumber,
    genre: genreText,
  };
  renderTable(books);
  editBookModal.close();
}

// Deletes a book by index
function deleteBook() {
  const index = parseInt(deleteBookModal.getAttribute("target"));
  books.splice(index, 1);
  renderTable(books);
  updateBookCount();
  deleteBookModal.close();
}

// Deletes a book by matching its title
function deleteBookByTitle() {
  const bookTitle = deleteBookByTitleModalBookTitle.value.trim();
  if (!bookTitle)
    return showError(deleteBookByTitleErrorMessage, errorMessages.NO_TITLE);

  const index = books.findIndex(
    (b) => b.title.toLowerCase() === bookTitle.toLowerCase()
  );

  if (index === -1) {
    return showError(
      deleteBookByTitleErrorMessage,
      errorMessages.BOOK_DOES_NOT_EXIST
    );
  }

  books.splice(index, 1);
  deleteBookByTitleErrorMessage.classList.add("hidden");
  renderTable(books);
  updateBookCount();
  deleteBookByTitleModal.close();
}

// ================================
// Utility functions
// ================================

// Shows error message in a provided element
function showError(element, message) {
  element.classList.remove("hidden");
  element.textContent = message;
}
