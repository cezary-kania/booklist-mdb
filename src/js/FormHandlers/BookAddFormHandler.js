import BookFormHandler from "./BookFormHandler";

export default class BookAddFormHandler extends BookFormHandler {

    GetForm() {
        return document.querySelector('#BookAddForm');
    }
    
    GetSubmitBtn() {
        return document.querySelector('#BookAddSubmitBtn');
    }

    SuccessSubmitAction(form) {
        const bookData = { 
            'title': form.elements.namedItem('bookTitle').value, 
            'author': form.elements.namedItem('bookAuthor').value,
            'category': form.elements.namedItem('bookCategory').value,
            'priority': form.elements.namedItem('bookPriority').value
        };
        this.viewManager.AddBookToList(bookData);
    }
}