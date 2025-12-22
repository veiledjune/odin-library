const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(
  new Book('The Fellowship of the Ring', 'J.R.R Tolkien', 300, true)
);

addBookToLibrary(
  new Book('The Fellowship of the Ring', 'J.R.R Tolkien', 300, true)
);

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
    const bookReadIcon = createElement('img', 'button__read-icon');
    bookReadIcon.src = `icons/read-${book.read}.svg`;
    bookReadButton.appendChild(bookReadIcon);
    bookReadContainer.append(bookReadSpan, bookReadButton);
    bookBottom.append(bookPages, bookReadContainer);
    bookElement.append(bookTop, bookBottom);
    libraryContainer.appendChild(bookElement);
  });
}

function events() {
  const addBookButton = document.querySelector('.library__new-book-btn');
  const dialog = document.querySelector('.book-form-dialog');
  addBookButton.addEventListener('click', () => {
    dialog.showModal();
  });
}

renderBooks();
events();
