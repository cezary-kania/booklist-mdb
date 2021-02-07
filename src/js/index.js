import * as mdb from 'mdb-ui-kit';

import BookService from './Books/BookService';
import BookListVManager from './ViewManagers/BookListVManager';
import CatListVManager from './ViewManagers/CatListVManager';

class App {
  constructor() {
    this.bookService = new BookService();
    const section = window.location.href.split('/').pop();
    if(section === 'book-list.html') {
      this.viewManager = new BookListVManager(this.bookService);
    }
    else if(section === 'categories.html') {
      this.viewManager = new CatListVManager(this.bookService);
    }
  }
}
new App();

export default {
  mdb,
};
