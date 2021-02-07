import ViewManager from "./ViewManager";
import CategoryFormHandler from '../FormHandlers/CategoryFormHandler';

export default class CatListVManager extends ViewManager {
    constructor(bookService) {
        super(bookService);
        this.catFormHandler = new CategoryFormHandler(this, this.bookService);
        this.catFormHandler.Initialize();
        this.InitList();
    }

    InitList() {
        super.InitList();
        this.UpdateList();
    }

    UpdateList() {
        const TableBodyEl = document.querySelector('#tableBody');
        const categories = this.bookService.Categories;
        TableBodyEl.textContent = '';
        for(const category of categories) {
            const categoryRowEl = this.CreateRowEl(category);
            TableBodyEl.appendChild(categoryRowEl);
        }
    }

    DisableSubmitBtn() {
        this.catFormHandler.DisableSubmitBtn();
    }

    CreateRowEl(category) {
        const rowEl = document.createElement('tr');
        const header = document.createElement('th');
        header.textContent = category.Name;
        header.setAttribute('scope', 'row');
        header.classList.add('px-3', 'tableCell');
        rowEl.appendChild(header);
        rowEl.appendChild(this.CreateTableCell(category.Books));
        return rowEl;
    }

    AddCategory(categoryName) {
        try {
            this.bookService.AddCategory(categoryName);
            this.UpdateList();
        }
        catch (err) {
            alert(err); // I'd use alert or toast but it's not available in free mbd kit.
        }

        
    }
}