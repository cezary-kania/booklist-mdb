import BookFormHandler from "./BookFormHandler";

export default class BookEditFormHandler extends BookFormHandler {

    GetForm() {
        return document.querySelector('#BookEditForm');
    }
    
    GetSubmitBtn() {
        return document.querySelector('#BookEditSubmitBtn');
    }

    SuccessSubmitAction(form) {
        const bookData = { 
            'bookId': form.elements.namedItem('bookId').value, 
            'title': form.elements.namedItem('bookTitle').value, 
            'author': form.elements.namedItem('bookAuthor').value,
            'category': form.elements.namedItem('bookCategory').value,
            'priority': form.elements.namedItem('bookPriority').value
        };
        this.viewManager.SaveChangedBook(bookData);
    }

    LoadData(book) {
        const form = this.GetForm();
        this.FillFormItem(form, 'bookId', book.Id);
        this.FillFormItem(form, 'bookTitle', book.Title);
        this.FillFormItem(form, 'bookAuthor', book.Author);
        this.FillFormItem(form, 'bookCategory', book.Category.Name);
        this.FillFormItem(form, 'bookPriority', book.Priority);
        
    }
    FillFormItem(form, formItem, value) {
        form.elements.namedItem(formItem).value = value;
    }
}