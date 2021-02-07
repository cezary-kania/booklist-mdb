import Book from './Book';
import BookCategory from './BookCategory';
import BookStorageManager from './BookStorageManager';

export default class BookService {
    constructor() {
        this.bookCategories = this.LoadCategories();
        this.books = this.LoadBooks();
    }

    LoadCategories() {
        if(!BookStorageManager.AreCatsInStorage()){
            const bookCategories = [
                new BookCategory('Kryminał'),
                new BookCategory('Sci-fi'),
                new BookCategory('Fantasy'),
                new BookCategory('Poezja'),
                new BookCategory('Dramat'),
                new BookCategory('Nauki ścisłe'),
            ];
            BookStorageManager.SetCatsInStorage(bookCategories);
            return bookCategories;
        }
        return BookStorageManager.GetCatsFromStorage();
    }
    LoadBooks() {
        if(!BookStorageManager.AreBooksInStorage()) {
            const books = [
                new Book('ABSALOM, ABSALOM!', 'WILLIAM FAULKNER', this.bookCategories[0], 3),
                new Book('A TIME TO KILL', 'JOHN GRISHAM', this.bookCategories[1], 1),
                new Book('THE HOUSE', 'EDITH WHARTON', this.bookCategories[4], 2),
            ];
            BookStorageManager.SetBooksInStorage(books);
            return books;
        }
        return BookStorageManager.GetBooksFromStorage();
    }

    get CategoryNames() {
        return this.bookCategories.map((category) => {
            return category.Name;
        });
    }

    get Books() {
        return this.books;
    }

    get BooksAmount() {
        return this.books.length;
    }

    GetCategoryByName(categoryName) {
        this.ValidateCategory(categoryName);
        return this.bookCategories.find(cat => {
            return cat.Name == categoryName;
        });
    }

    GetCategoryByNameOrNull(categoryName) {
        return this.bookCategories.find(cat => {
            return cat.Name == categoryName;
        });
    }

    ValidateCategory(categoryName) {
        if(!this.CategoryNames.includes(categoryName)) {
            throw new Error(`Invalid category: '${categoryName} does not exist.'`);
        }
    }

    AddBook(bookData) {
        const category = this.GetCategoryByName(bookData.category);
        const book = new Book(
            bookData.title, 
            bookData.author,
            category,
            +bookData.priority 
        );
        this.books.push(book);
        this.UpdateBooksInStorage();
    }

    GetBookById(bookId) {
        let book = this.books.find(book => {
            return book.Id == bookId;
        });
        if(book == null) {
            throw new Error(`Invalid book id. Book with id: ${bookId} does not exsit.`);
        }
        return book;
    }

    DeleteBookById(bookId) {
        const book = this.GetBookById(bookId);
        const bookIndex = this.books.indexOf(book);
        if(bookIndex > -1) {
            this.books.splice(bookIndex, 1);
        }
        this.UpdateBooksInStorage();
    }

    UpdateBook(bookData) {
        const book = this.GetBookById(bookData.bookId);
        book.Title = bookData.title;
        book.Author = bookData.author;
        book.Category = this.GetCategoryByName(bookData.category);
        book.Priority = +bookData.priority;
        this.UpdateBooksInStorage();
    }

    static SortBooks(books, order='desc', property='Priority') {
        const orderD = (order === 'desc');
        if(property === 'Category') {
            BookService.SortBooksByCategory(books, orderD);
            return;
        }
        books.sort((a,b) => {
            if (a[property] < b[property]) return orderD ? 1 : -1;
            return  a[property] > b[property] ? (orderD ? -1 : 1) : 0;
        });
    }
    
    static SortBooksByCategory(books, orderD = true, catProperty='Name') {
        books.sort((a,b) => {
            if (a['Category'][catProperty] < b['Category'][catProperty]) {
                return orderD ? 1 : -1;
            }
            return  a['Category'][catProperty] > b['Category'][catProperty] ? 
                (orderD ? -1 : 1) : 0;
        }); 
    }

    static ApplyFilter(books, filter) {
        if(filter.priority != null) {
            books = books.filter(book => {
                return book.Priority === +filter.priority;
            });
        }
        if(filter.author != null) {
            books = books.filter(book => {
                return book.Author.includes(filter.author);
            });
        }
        if(filter.categoryName != null) {
            books = books.filter(book => {
                return book.Category.Name.includes(filter.categoryName);
            });
        }
        return books;
    }
    
    GetSortedBooks(order='desc', property='Priority', filter = null) {
        let books = [];
        if(filter == null) books = [...this.books];
        else books = BookService.ApplyFilter([...this.books], filter);
        BookService.SortBooks(books, order, property);
        return books;
    }

    UpdateBooksInStorage() {
        BookStorageManager.SetBooksInStorage(this.books);
    }

    UpdateCatsInStorage() {
        BookStorageManager.SetCatsInStorage(this.bookCategories);
    }

    AddCategory(categoryName) {
        const catExists = this.GetCategoryByNameOrNull(categoryName) != null;
        if(catExists) throw new Error(`Category: ${categoryName} already exist.`);
        const newcategory = new BookCategory(categoryName);
        this.bookCategories.push(newcategory);
        this.UpdateCatsInStorage();
    }

    get Categories() {
        return this.bookCategories.map((category) => {
            const categoryName = category.Name;
            let books = 0;
            for(const book of this.books) {
                if(book.Category.Name === categoryName) ++books;
            }
            return {
                'Name' : categoryName,
                'Books' : books
            };
        });
    }
    
}