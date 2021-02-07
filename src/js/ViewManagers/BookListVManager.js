import ViewManager from "./ViewManager";
import BookAddFormHandler from '../FormHandlers/BookAddFormHandler';
import BookEditFormHandler from '../FormHandlers/BookEditFormHandler';
import BookFilterFormHandler from '../FormHandlers/BookFilterFormHandler';

export default class BookListVManager extends ViewManager {
    constructor(bookService) {
        super(bookService);
        this.bookAddFormHandler = new BookAddFormHandler(this, this.bookService);
        this.bookEditFormHandler = new BookEditFormHandler(this, this.bookService);
        this.bookFilterFormHandler = new BookFilterFormHandler(this, this.bookService);
        
        this.bookAddFormHandler.LoadBookForm();
        this.bookEditFormHandler.LoadBookForm();
        this.bookFilterFormHandler.LoadBookForm();
        this.sortOptions = {
            sortOrder : 'desc',
            sortBy : 'Priority'
        };
        this.InitList();
    }

    InitList() {
        super.InitList();
        const bookTableEl = document.querySelector('#tableBody');
        this.BindDeleteButtons(bookTableEl);
        this.BindEditButtons(bookTableEl);
        this.UpdateList();
        this.BindSortButtons();
        this.BindDownloadBtn();
    }

    UpdateList(filter = null) {
        const books = this.bookService.GetSortedBooks(
            this.sortOptions.sortOrder,
            this.sortOptions.sortBy,
            filter
            );
        this.FillBookList(books);
        this.UpdateBookCounter(books.length);
    }
    
    FillBookList(books) {
        const bookTableEl = document.querySelector('#tableBody');
        bookTableEl.textContent = '';
        for(const book of books) {
            const bookRowEl = this.CreateRowEl(book);
            bookTableEl.appendChild(bookRowEl);
        }
    }

    CreateRowEl(book) {
        const rowEl = document.createElement('tr');
        const header = document.createElement('th');
        header.textContent = book.Title;
        header.setAttribute('scope', 'row');
        header.classList.add('px-3', 'tableCell');
        rowEl.appendChild(header);
        rowEl.dataset.bookId = book.Id;
        rowEl.appendChild(this.CreateTableCell(book.Author));
        rowEl.appendChild(this.CreateTableCell(book.Category.Name));
        rowEl.appendChild(this.CreateTableCell(book.Priority));
        rowEl.appendChild(this.CreateButtonsCell());
        return rowEl;
    }

    CreateButtonsCell() {
        const cell = document.createElement('td');
        cell.classList.add('px-3');
        
        const editBtn = document.createElement('i');
        editBtn.classList.add('far', 'fa-edit', 'p-2', 'editBtn');
        editBtn.setAttribute('data-mdb-toggle','modal');
        editBtn.setAttribute('data-mdb-target','#EditBookModal');
        editBtn.setAttribute('type','button');

        const delBtn = document.createElement('i');
        delBtn.classList.add('fas', 'fa-trash', 'p-2', 'delBtn', 'list__iconBtn');
        cell.appendChild(editBtn);
        cell.appendChild(delBtn);
        return cell;
    }

    BindEditButtons(table) {
        table.addEventListener('click', (e) => {
            const eTarget = e.target;
            if(!eTarget.classList.contains('editBtn')) return;
            const rowEl = eTarget.closest('tr');
            if(rowEl == null) return;
            const bookId = this.GetBookId(rowEl);
            this.LoadEditForm(bookId);
        });
    }

    BindDeleteButtons(table) {
        table.addEventListener('click', (e) => {
            const eTarget = e.target;
            if(!eTarget.classList.contains('delBtn')) return;
            const rowEl = eTarget.closest('tr');
            if(rowEl == null) return;
            this.DeleteBook(rowEl);
        });
    }

    DeleteBook(rowEl) {
        const bookId = this.GetBookId(rowEl);
        this.bookService.DeleteBookById(bookId);
        this.UpdateList();
        
    }

    UpdateBookCounter(booksNum) {
        const bookCounterEl = document.querySelector('#BookCounter');
        bookCounterEl.textContent = booksNum;
    }

    GetBookId(rowEl) {
        const bookId = rowEl.dataset.bookId;
        if(bookId === undefined) throw new Error('Book id is not available.');
        else return bookId;
    }

    AddBookToList(bookData) {
        this.bookService.AddBook(bookData);
        this.UpdateList();
    }

    DisableSubmitBtn() {
        this.bookAddFormHandler.DisableSubmitBtn();
    }

    LoadEditForm(bookId) {
        const book = this.bookService.GetBookById(bookId);
        this.bookEditFormHandler.LoadData(book);
    }

    SaveChangedBook(bookData) {
        this.bookService.UpdateBook(bookData);
        this.UpdateList();
    }

    BindSortButtons() {
        const tableHeader = document.querySelector('#tableHeader');
        tableHeader.addEventListener('click', e => {
            if(!e.target.closest('th').classList.contains('bookProp')) return;
            const headerProp = e.target.closest('th').dataset.property;
            if(headerProp === undefined) return; 
            this.ChangeSortOptions(headerProp);
            this.UpdateSortIcons();
            this.UpdateList();
        }); 
    }

    ChangeSortOptions(property) {
        if(this.sortOptions.sortBy !== property) {
            this.sortOptions.sortBy = property;
            this.sortOptions.sortOrder = 'desc';
            return;
        }
        const currentOrder = this.GetSortOrder();
        this.sortOptions.sortOrder = currentOrder === 'desc' ? 'asc' : 'desc';
    }

    UpdateSortIcons() {
        const headers = document.querySelectorAll('.bookProp');
        for(const h of headers) {
            const property = h.dataset.property;
            const iconElement = h.getElementsByTagName('i')[0]; 
            if(property !== this.sortOptions.sortBy) {
                iconElement.classList.add('bookProp__icon--hidden');
            }
            else {
                iconElement.classList.remove(
                    'bookProp__icon--hidden',
                    'fa-caret-down',
                    'fa-caret-up'
                );
                const currentOrder = this.GetSortOrder();
                const iconNewClass = (currentOrder=== 'desc') ? 
                    'fa-caret-down' : 'fa-caret-up';
                iconElement.classList.add(iconNewClass);
            }
        }
    }

    GetSortOrder() {
        return this.sortOptions.sortOrder;
    }

    BindDownloadBtn() {
        const downloadBtn = document.querySelector('#bookListDownload');
        downloadBtn.addEventListener('click', e =>{
            e.preventDefault();
            const books = this.bookService.GetSortedBooks()
                .map((book) => {
                    delete book.id;
                    return book;
                });
            const jsonStr = JSON.stringify(books);
            const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
            let anchor = document.createElement('a');
            anchor.setAttribute('href', dataUri);
            anchor.setAttribute('download', 'Booklist.json');
            anchor.click();
        });
    }
}