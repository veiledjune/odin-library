const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleRead = () => {
    this.read = !this.read;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createElement(type, className, textContent) {
  const element = document.createElement(type);
  element.classList.add(className);
  element.textContent = textContent;
  return element;
}

function renderBooks() {
  const libraryContainer = document.querySelector('.library__content');
  libraryContainer.textContent = '';
  myLibrary.forEach((book) => {
    const bookElement = createElement('div', 'book');
    const bookTop = createElement('div', 'book_top');
    const bookTitle = createElement('h3', 'book__title', book.title);
    const bookAuthor = createElement('span', 'book__author', book.author);
    bookTop.append(bookTitle, bookAuthor);
    const bookBottom = createElement('div', 'book__bottom');
    const bookPages = createElement(
      'span',
      'book__pages',
      'Pages ' + book.pages
    );
    const bookReadContainer = createElement('div', 'book__read');
    const bookReadSpan = createElement('span', 'book__read-span', 'Read');
    const bookReadButton = createElement('button', 'button__toggle-read');
    bookReadButton.addEventListener('click', () => {
      book.toggleRead();
      renderBooks();
    });
    const bookReadIcon = createElement('img', 'button__read-icon');
    bookReadIcon.src = `icons/read-${book.read}.svg`;
    bookReadButton.appendChild(bookReadIcon);
    bookReadContainer.append(bookReadSpan, bookReadButton);
    bookBottom.append(bookPages, bookReadContainer);
    const bookDeleteButton = createElement(
      'button',
      'button__delete-book',
      'Delete'
    );
    bookDeleteButton.dataset.id = book.id;
    bookDeleteButton.addEventListener('click', () =>
      deleteBook(bookDeleteButton)
    );
    bookElement.append(bookTop, bookBottom, bookDeleteButton);
    libraryContainer.appendChild(bookElement);
  });
}

function events() {
  const dialog = document.querySelector('.book-form-dialog');
  const form = document.querySelector('.book-form');

  const addBookButton = document.querySelector('.library__new-book-btn');
  addBookButton.addEventListener('click', () => {
    dialog.showModal();
  });

  const formCloseButton = document.querySelector('.book-form__close-btn');
  formCloseButton.addEventListener('click', () => {
    dialog.close();
    form.reset();
  });

  const submitButton = document.querySelector('.book-form__add-btn');
  submitButton.addEventListener('click', (event) => {
    const bookTitleInput = document.getElementById('book-title');
    const bookAuthorInput = document.getElementById('book-author');
    const bookPagesInput = document.getElementById('book-pages');
    const bookSelectedReadInput = document.querySelector(
      'input[name="read"]:checked'
    );
    const bookRead = bookSelectedReadInput.value === 'false' ? false : true;
    event.preventDefault();
    const isValid = form.checkValidity();
    if (!isValid) {
      form.reportValidity();
      return;
    } else {
      addBookToLibrary(
        new Book(
          bookTitleInput.value,
          bookAuthorInput.value,
          bookPagesInput.value,
          bookRead
        )
      );
      form.reset();
      renderBooks();
    }
  });
}

function deleteBook(button) {
  const id = button.dataset.id;
  const index = myLibrary.findIndex((book) => id === book.id);
  myLibrary.splice(index, 1);
  renderBooks();
}

events();
