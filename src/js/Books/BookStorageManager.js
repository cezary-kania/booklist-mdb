import Book from './Book';
import BookCategory from './BookCategory';

export default class BookStorageManager {
    
    static SetBooksInStorage(books) {
        BookStorageManager.SetItemsInStorage('Books', books);
    }

    static AreBooksInStorage() {
        return BookStorageManager.AreItemsInStorage('Books');
    }

    static GetBooksFromStorage() {
        return BookStorageManager.GetFromStorage('Books')
            .map((book) => {
                return new Book(
                    book.title,
                    book.author,
                    new BookCategory(book.category.Name),
                    +book.priority
                );
            });
    }

    static SetCatsInStorage(categories) {
        BookStorageManager.SetItemsInStorage('Categories', categories);
    }

    static AreCatsInStorage() {
        return BookStorageManager.AreItemsInStorage('Categories');
    }

    static GetCatsFromStorage() {
        return BookStorageManager.GetFromStorage('Categories')
            .map((cat) => {
                return new BookCategory(cat.Name);
            });
    }

    static DataToJson(data) {
        return JSON.stringify(data);
    }

    static GetFromStorage(itemType) {
        return JSON.parse(localStorage.getItem(itemType));
    }

    static AreItemsInStorage(itemType) {
        return localStorage.getItem(itemType) != null;
    }

    static SetItemsInStorage(itemType, data) {
        localStorage.setItem(itemType, BookStorageManager.DataToJson(data));
    }
}