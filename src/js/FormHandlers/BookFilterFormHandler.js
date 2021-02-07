export default class BookFilterFormHandler {

    constructor(viewManager, bookService) {
        this.viewManager = viewManager;
        this.bookService = bookService;
    }

    LoadBookForm() {
        const bookForm = this.GetForm();
        const submitBtn= this.GetSubmitBtn();
        if(bookForm == null || submitBtn == null) return;
        this.AddCategoriesToForm(bookForm);
        this.BindSubmit(bookForm, submitBtn);
    }

    GetForm() {
        return document.querySelector('#FilterForm');
    }
    
    GetSubmitBtn() {
        return document.querySelector('#FilterSubmitBtn');
    }

    BindSubmit(form, submitBtn) {
        submitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.SuccessSubmitAction(form);
            form.reset();
        });
    }

    AddCategoriesToForm(form) {
        const categories = this.bookService.CategoryNames;
        const categorySelectEl = form.elements.namedItem('bookCategory');
        for(const cat of categories) {
            const catElement = new Option(cat, cat);
            categorySelectEl.appendChild(catElement);
        }
    }

    SuccessSubmitAction(form) {
        const formData = { 
            author : form.elements.namedItem('bookAuthor').value,
            category : form.elements.namedItem('bookCategory').value,
            priority : form.elements.namedItem('bookPriority').value
        };
        const filter = {
            author : formData.author.length > 0 ? formData.author : null,
            categoryName : formData.category.length > 0 ? formData.category : null,
            priority : formData.priority.length > 0 ? formData.priority : null,
        }
        this.viewManager.UpdateList(filter);
    }
}