/*Задание 1
Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

Реализуйте геттер allBooks, который возвращает текущий список книг.

Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.*/

class Library {
    #books=[]
    constructor(arrayBook){
        let setBook = new Set(arrayBook);
        if (setBook.size<arrayBook.length){
            throw new Error("В переданном списке книг есть дубликаты!")
        }
        this.#books=arrayBook;
    }
    get allBooks(){
        return this.#books;
    }
    addBook(title){
        for (const book of this.#books) {
            if (title===book){
                throw new Error('Книга с таким названием уже существует в списке!')
            }
        }
        return this.#books.push(title);
    }
    removeBook(title){
        let booksSize=this.#books.length;
        this.#books = this.#books.filter((book) => {return book != title});
        if (booksSize===this.#books.length){
            throw new Error('Книга с таким названием не существует в списке!')
        }
    }
    hasBook(title){
        return this.#books.includes(title)?true:false;
    }
}

let arBook = new Library(['Горе от ума','Ревизор','Тихий Дон']);
console.log(arBook.allBooks);
arBook.addBook('Мертвые души');
console.log(arBook.allBooks);
arBook.removeBook('Ревизор');
console.log(arBook.allBooks);
console.log(arBook.hasBook('Горе от ума'));

/*Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.*/

const initialData = [
    {
    product: "Apple iPhone 13",
    reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
    product: "Sony PlayStation 5",
    reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

    function printFirstComments(container) {
        for (const item of initialData) {
            for (const comment of item.reviews) {
                let div = document.createElement('div');
                div.innerHTML+=item.product +' '+comment.text;
                container.appendChild(div)
            }
        }
        return container;
    }


    const model = document.querySelector('.model');
    const comment = document.querySelector('.comment');
    const btn = document.querySelector('.btn');
    const container = document.querySelector('.container');
    printFirstComments(container);
    btn.addEventListener('click', function (e) {
            const inputModel = model.value;
            const inputComment = comment.value;
            addComment(inputModel,inputComment);
            let div = document.createElement('div');
            div.innerHTML = inputModel+' '+inputComment;
            container.appendChild(div);
    })

    let lastCommentId = 4;
    function addComment(model, comment) {
        if(comment.length<50){
            throw new Error("Символов меньше 50!")
        } else if(comment.length>100){
            throw new Error("Символов больше 500!")
        } else {
            initialData.forEach(element => {
            if (element.product===model){
                element.reviews.push({
                    id: String(lastCommentId+1),
                    text: comment,
                    })
                }
            });
        }
        lastCommentId++;
    }
