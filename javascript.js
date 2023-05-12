const authorName = document.querySelector('#author-name')
const bookName = document.querySelector('#book-name')
const numberOfPages = document.querySelector('#pages')
const read = document.querySelector('#read-status')
const addBook = document.querySelector('button')
const bookArea = document.querySelector('.books-area')
const statusDisplay = document.querySelector('.status-button')
const removeDisplay = document.querySelector('.remove-button')
const authorError = document.querySelector('.author-error')
const bookError = document.querySelector('.book-error')
const pageError = document.querySelector('.page-error')

let myLibrary = []

addBook.addEventListener('click', addBookToLibrary)
    
function addBookToLibrary(event) {

    event.preventDefault();
    if (authorName.value != '' && bookName.value != '' && numberOfPages.value != '') {
        let myBook = new book(authorName.value, bookName.value, numberOfPages.value)
        myLibrary.push(myBook)

        displayBook();
        document.querySelector('form').reset()
    } else {
        showError()
    }
}

class book{

    constructor(authorName, bookName, numberOfPages) {
        this.authorName = authorName
        this.bookName = bookName
        this.numberOfPages = numberOfPages
        this.read = this.checkRead()
    }

    checkRead() {
         if (read.checked) {
            return 'Read';
        } else {
            return 'Not Read';
        }
    }
}

function displayBook() {

    const bookContainer = document.createElement('div')
    bookContainer.classList.add('book-content')
    bookArea.appendChild(bookContainer)
    
    const authorNameDisplay = document.createElement('div')
    const bookNameDisplay = document.createElement('div')
    const pagesDisplay = document.createElement('div')
    const statusDisplay = document.createElement('button')
    const removeDisplay = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    bookContainer.appendChild(bookNameDisplay)
    bookNameDisplay.classList.add('book-name-display')
    bookNameDisplay.textContent = myLibrary[myLibrary.length - 1]['bookName']

    bookContainer.appendChild(authorNameDisplay)
    authorNameDisplay.textContent = myLibrary[myLibrary.length - 1]['authorName']

    bookContainer.appendChild(pagesDisplay)
    pagesDisplay.textContent = myLibrary[myLibrary.length - 1]['numberOfPages']
    
    bookContainer.appendChild(statusDisplay)
    statusDisplay.classList.add('status-button')
    statusDisplay.textContent = myLibrary[myLibrary.length - 1]['read']

    if (statusDisplay.textContent == 'Read') {
        statusDisplay.classList.add('read')
    } else {
        statusDisplay.classList.add('not-read')
    }

    statusDisplay.addEventListener('click', () => {

        if (statusDisplay.textContent == 'Read') {
            statusDisplay.textContent = 'Not Read'
            statusDisplay.classList.remove('read')
            statusDisplay.classList.add('not-read')
        } else {
            statusDisplay.textContent = 'Read'
            statusDisplay.classList.remove('not-read')
            statusDisplay.classList.add('read')
        }
    })

    removeDisplay.setAttribute('viewBox', '0 0 24 24')
    svgPath.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z')
    removeDisplay.appendChild(svgPath)

    bookContainer.appendChild(removeDisplay)
    removeDisplay.classList.add('remove-button')

    removeDisplay.addEventListener('click', () => {

        bookArea.removeChild(bookContainer)
    })
}

function showError() {
    if (authorName.value == '') {
        authorError.textContent = 'Author name cannot be a empty'
    } else {
        authorError.textContent = ''
    }

    if (bookName.value == '') {
        bookError.textContent = 'Book name cannot be a empty'
    } else {
        bookError.textContent = ' '
    }

    if (numberOfPages.value == '') {
        pageError.textContent = 'Number of pages cannot be a empty'
    } else {
        pageError.textContent = ''
    }
}

authorName.addEventListener('input', showError)
bookName.addEventListener('input', showError)
numberOfPages.addEventListener('input', showError)



