let myLibrary = [
    new Book ("The Secret", "Author One", 24, true),
    new Book ("harry potter and the chamber of secrets", "JK Rowling", 24, false),
    new Book ("Intelligent Investor", "Benjamin Graham", 24, false),
    new Book ("Book Four", "Author four", 24, false),
    new Book ("Allan Pallan", "Allan P", 24, false),
    new Book ("Fake Book Name", "Fake Author", 24, false)
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.id = title + author + pages
    this.read = read;
}

Book.prototype.changeReadStatus = () => {
    this.read = !this.read;
    itemColor(book);
}

let getInput = () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = parseInt(document.getElementById('pages').value);
    let isRead = document.getElementById('read');
    if (isRead.checked) read = true;
    else read = false;
    console.log(read);
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    addBook(book);
    console.log(myLibrary);
}

let addBook = (book) => {
    let _closeBtn = document.createElement('span');
        _closeBtn.setAttribute('class', 'itemCloseBtn');
        _closeBtn.textContent = "x";
        _closeBtn.addEventListener('click', event=> {
            event.target.parentNode.remove();
            removeFromLibrary(event.target.parentNode.getAttribute('data-id'));
        })
        let _title = document.createElement('div');
        _title.setAttribute('class', 'itemTitle');
        _title.append(book.title);
    
        let _author = document.createElement('div');
        _author.setAttribute('class', 'itemAuthor');
        _author.append(book.author);
        
        let item = document.createElement('div');
        item.setAttribute('class', 'item');
        item.setAttribute('data-id', book.title+book.author+book.pages);

        // Set card color based on book read status.
        item.style.backgroundColor = itemColor(book);

        // Change book color and read status with click to card.
        item.addEventListener('click', card => {
            console.log(item.getAttribute('data-id'));
            toggleReadStatus(item.getAttribute('data-id'));
            item.style.backgroundColor = itemColor(book);
        })

        item.append(_closeBtn, _title, _author);
    
        let container = document.getElementById('container');
        container.prepend(item);
}

let displayBooks = () => {
    myLibrary.forEach(book => {
        addBook(book);
    })
}

let itemColor = (book) => {
    if (book.read == true) {
        return '#24d79e';
    }
    else {
        return '#fcc72e';
    }
}

let toggleReadStatus = (id) => {
    myLibrary.forEach(book => {
        if (book.id == id) {
            book.read = !book.read;
            itemColor(book);
        }
    })
}

let removeFromLibrary = (id) => {
    myLibrary.forEach(book => {
        if (book.id == id) {
            let index = myLibrary.indexOf(book);
            console.log(index);
            myLibrary.splice(index, 1);
        }
    })
}

let displayForm = () => {
    let addBookForm = document.querySelector('.addBookMenu');
    addBookForm.style.display = 'flex';
    let flexContainer = document.querySelector('.flexContainer');
    flexContainer.style.display = 'none';
}

let closeForm = () => {
    let addBookForm = document.querySelector('.addBookMenu');
    addBookForm.style.display = 'none';
    let flexContainer = document.querySelector('.flexContainer');
    flexContainer.style.display = 'flex';
}
document.querySelector('form').addEventListener('submit', getInput);

document.getElementById('addBookBtn').addEventListener('click', displayForm);

document.querySelector('.addBookCloseBtn').addEventListener('click', closeForm);

window.onload = displayBooks();

console.log(myLibrary);
