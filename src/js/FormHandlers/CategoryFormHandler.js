export default class CategoryFormHandler {
    constructor(viewManager, bookService) {
        this.viewManager = viewManager;
        this.bookService = bookService;
    }

    Initialize() {
        const categoryForm = this.GetForm();
        const submitBtn= this.GetSubmitBtn();
        if(categoryForm == null || submitBtn == null) return;
        this.BindSubmit(categoryForm, submitBtn);
        this.BindInput();
    }

    BindInput() {
        const form = this.GetForm();
        const categoryInput = form.elements.namedItem('categoryName');
        categoryInput.addEventListener('input', e => {
            const category = categoryInput.value;
            if(category.length < 1) this.DisableSubmitBtn();
            else this.EnableSubmitBtn();
        });
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

    GetForm() {
        return document.querySelector('#CategoryAddForm');
    }

    GetSubmitBtn() {
        return document.querySelector('#categoryAddSubmitBtn');
    }

    SuccessSubmitAction(form) {
        const categoryName = form.elements.namedItem('categoryName').value;
        this.viewManager.AddCategory(categoryName);
    }
}