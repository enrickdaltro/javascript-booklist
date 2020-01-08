// book contructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

// UI addBookToList prototype
UI.prototype.addBookToList = book => {
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

// UI show alert prototype
UI.prototype.showAlert = (message, className) => {
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
// Delete Book
UI.prototype.deleteBook = target => {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};
// UI create fields prototype
UI.prototype.clearFields = () => {
    // set all three fields values to none
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
};

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
        // show alert
        ui.showAlert('Book Added', 'success');
        // clear fields
        ui.clearFields();
    }

    //add book to list
    ui.addBookToList(book);

    // clear fields
    ui.clearFields();

    e.preventDefault();
});

// event listener for delete book on table
document.querySelector('#book-list').addEventListener('click', e => {
    // instantiate ui
    const ui = new UI();

    ui.deleteBook(e.target);

    //show Alert
    ui.showAlert('Book deleted', 'success');
    e.preventDefault();
});
