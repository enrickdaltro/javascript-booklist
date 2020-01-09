// es6 class method
// class for Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class (pass the methods)
class UI {
    addBookToList = book => {
        // Set where the book will be
        const list = document.querySelector('#book-list');
        // Create tr element
        const row = document.createElement('tr');
        // insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete" >X</a></td>
    `;
        // append row to list
        list.appendChild(row);
    };

    deleteBook = target => {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    };

    showAlert = (message, className) => {
        // set where the element will be creating a div
        const div = document.createElement('div');
        // Add a class
        div.className = `alert ${className}`;
        // add text
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.container');
        // get form
        const form = document.querySelector('#book-form');
        // insert alert (div) before the form
        container.insertBefore(div, form);
        // time out after 2 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    };

    clearFields = () => {
        // set all three fields values to none
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    };
}

// local storage class
class Store {
    // get date from storage
    static getBooks = () => {
        // set a variable and check if there is data on local storage
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    };

    // show data on the UI
    static displayBooks = () => {
        // check data
        const books = Store.getBooks();

        books.forEach(book => {
            // instantiate UI class to use the method that add books to UI
            const ui = new UI();
            // add book to UI
            ui.addBookToList(book);
        });
    };

    // add data to storage
    static addBook = book => {
        // check data
        const books = Store.getBooks();
        // add book to local storage
        books.push(book);
        // set local storage
        localStorage.setItem('books', JSON.stringify(books));
    };
    // remove data from storage
    static removeBook = isbn => {
        // check data
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        // set local storage
        localStorage.setItem('books', JSON.stringify(books));
    };
}
// event listeners for add book
document.querySelector('#book-form').addEventListener('submit', e => {
    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // instantiate book (create a new object)
    const book = new Book(title, author, isbn);

    // instantiate ui
    const ui = new UI();

    // validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill the forms', 'error');
    } else {
        //add book to list
        ui.addBookToList(book);
        // add to local storage
        Store.addBook(book);
        // show alert
        ui.showAlert('Book Added', 'success');
        // clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// DOM load events
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// event listener for delete book on table
document.querySelector('#book-list').addEventListener('click', e => {
    // instantiate ui
    const ui = new UI();

    ui.deleteBook(e.target);
    // delete from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show Alert
    ui.showAlert('Book deleted', 'success');
    e.preventDefault();
});
