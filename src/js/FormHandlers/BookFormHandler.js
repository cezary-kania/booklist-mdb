export default class BookFormHandler {
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
        this.BindInputs();
    }

    BindInputs() {
        const form = this.GetForm();
        const titleInput = form.elements.namedItem('bookTitle');
        const authorInput = form.elements.namedItem('bookAuthor');
        titleInput.addEventListener('input', e => {
            this.ValidateTextInputs(form);
        });
        authorInput.addEventListener('input', e => {
            this.ValidateTextInputs(form);
        });
    }

    ValidateTextInputs(form) {
        const titleInputValue = form.elements.namedItem('bookTitle').value;
        const authorInputValue = form.elements.namedItem('bookAuthor').value;
        if(titleInputValue.length < 1 || authorInputValue.length < 1)
        {
            this.DisableSubmitBtn();
        }
        else {
            this.EnableSubmitBtn();
        }
    }

    BindSubmit(form, submitBtn) {
        submitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.SuccessSubmitAction(form);
            form.reset();
        });
    }

    DisableSubmitBtn() {
        const btn = this.GetSubmitBtn();
        if(btn.hasAttribute('disabled')) return;
        btn.setAttribute('disabled', 'true');
    }

    EnableSubmitBtn() {
        const btn = this.GetSubmitBtn();
        if(!btn.hasAttribute('disabled')) return;
        btn.removeAttribute('disabled');
    }

    AddCategoriesToForm(form) {
        const categories = this.bookService.CategoryNames;
        const categorySelectEl = form.elements.namedItem('bookCategory');
        for(const cat of categories) {
            const catElement = new Option(cat, cat);
            categorySelectEl.appendChild(catElement);
        }
    }

    GetForm() {
        throw new Error('Can not ivoke abstract method.');
    }

    GetSubmitBtn() {
        throw new Error('Can not ivoke abstract method.');
    }

    SuccessSubmitAction(form) {
        throw new Error('Can not ivoke abstract method.');
    }
}