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
  const yearText = addBookModalBookYear.value;
  const genreText = addBookModalBookGenre.value;

  if (titleText == "") {
    alert("Please add a book name");
    return;
  } else if (authorText == "") {
    alert("Please add an author name");
    return;
  } else if (yearText == "") {
    alert("Please add a year of publication");
    return;
  } else if (genreText == "") {
    alert("Please add a genre");
    return;
  } else {
    const newBookEntry = {
      title: titleText,
      author: authorText,
      year: yearText,
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
  const yearText = editBookModalBookYear.value;
  const genreText = editBookModalBookGenre.value;

  if (titleText == "") {
    alert("Please add a book name");
    return;
  } else if (authorText == "") {
    alert("Please add an author name");
    return;
  } else if (yearText == "") {
    alert("Please add a year of publication");
    return;
  } else if (genreText == "") {
    alert("Please add a genre");
    return;
  } else {
    const updatedBookEntry = {
      title: titleText,
      author: authorText,
      year: yearText,
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
    alert("Please enter the title of the book to delete");
    return;
  } else {
    for (let i = 0; i < books.length; i++) {
      if (books[i].title.toLowerCase() == bookTitle.toLowerCase()) {
        books.splice(i, 1);
        deleted = true;
        break;
      }
    }

    bookTable.innerHTML = tableHeader;

    renderTable(books);
    updateBookCount();

    if (!deleted) {
      alert("This book doesn't exist");
      return;
    }

    deleteBookByTitleModal.close();
  }
}
