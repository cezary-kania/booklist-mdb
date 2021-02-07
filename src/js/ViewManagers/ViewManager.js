export default class ViewManager {
    constructor(bookService) {
        this.bookService = bookService;
    }

    InitList() {
        this.BindAddBtn();
    }

    BindAddBtn() {
        const btn = document.querySelector('#AddBtn');
        btn.addEventListener('click', e => {
            this.DisableSubmitBtn();
        });
    }

    CreateTableCell(value) {
        const cell = document.createElement('td');
        cell.textContent = value;
        cell.classList.add('px-3', 'tableCell');
        return cell;
    }

    UpdateList() {
        throw new Error('Can not ivoke abstract method.'); 
    }

    DisableSubmitBtn() {
        throw new Error('Can not ivoke abstract method.');
    }
}