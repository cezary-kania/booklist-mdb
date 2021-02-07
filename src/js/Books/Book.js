export default class Book {
    title;
    author;
    category;
    priority;
    id;
    constructor(title, author, category, priority){
        this.id = this.GenerateUuidv4();
        this.Title = title;
        this.Author = author;
        this.Category = category;
        this.Priority = priority;
    }

    get Id() {
        return this.id;
    }
    
    set Title(title) {
        this.ValidateString(title, 'Title');
        this.title = title;
    }
    
    get Title() {
        return this.title;
    }
    
    set Author(author) {
        this.ValidateString(author, 'Author');
        this.author = author;
    }
    
    get Author() {
        return this.author;
    }
    
    set Priority(priority) {
        this.ValidateType(priority, 'Priority', 'number');
        if(priority < 0 || priority > 5) throw new Error(`Invalid value for: Priority.`);
        this.priority = priority;
    }
    
    get Priority() {
        return this.priority;
    }
    
    set Category(category) {
        this.ValidateType(category, 'Category', 'object');
        this.category = category;
    }
    
    get Category() {
        return this.category;
    }
    
    ValidateString(value, prop) {
        this.ValidateType(value, prop, 'string');
        if(!value.length > 0) throw new Error(` ${prop} can't be blank.`);
    }
    
    ValidateType(value, prop, type) {
        if(!(typeof(value) === type)) throw new Error(`Invalid type for: ${prop}.`);
    }
    
    // Taken from stackoverflow
    GenerateUuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}