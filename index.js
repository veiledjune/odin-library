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

function renderBooks() {
  const libraryContainer = document.querySelector('.library__content');
  libraryContainer.textContent = '';
  myLibrary.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    const bookTop = document.createElement('div');
    bookTop.classList.add('book__top');
    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book__title');
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement('span');
    bookAuthor.classList.add('book__author');
    bookAuthor.textContent = book.author;
    bookTop.append(bookTitle, bookAuthor);
    const bookBottom = document.createElement('div');
    bookBottom.classList.add('book__bottom');
    const bookPages = document.createElement('span');
    bookPages.classList.add('book__pages');
    bookPages.textContent = 'Pages ' + book.pages;
    const bookReadContainer = document.createElement('div');
    bookReadContainer.classList.add('book__read');
    const bookReadSpan = document.createElement('span');
    bookReadSpan.classList.add('book__read-span');
    bookReadSpan.textContent = 'Read';
    const bookReadButton = document.createElement('button');
    bookReadButton.classList.add('button__toggle-read');
    const bookReadIcon = document.createElement('img');
    bookReadIcon.classList.add('button__read-icon');
    bookReadIcon.src = `icons/read-${book.read}.svg`;
    bookReadButton.appendChild(bookReadIcon);
    bookReadContainer.append(bookReadSpan, bookReadButton);
    bookBottom.append(bookPages, bookReadContainer);
    bookElement.append(bookTop, bookBottom);
    libraryContainer.appendChild(bookElement);
  });
}

renderBooks();

console.log(myLibrary);
