localStorage.setItem('Apple iPhone 13',JSON.stringify([
             "Отличный телефон! Батарея держится долго.","Камера супер, фото выглядят просто потрясающе."]));
localStorage.setItem('Samsung Galaxy Z Fold 3"',JSON.stringify([
             "Интересный дизайн, но дорогой."]));
localStorage.setItem('Sony PlayStation 5',JSON.stringify([
             "Люблю играть на PS5, графика на высоте."]));
localStorage.setItem('Телефон',JSON.stringify([]));


const container = document.querySelector('.container');

showProducts();

//добавить отзыв
const btn = document.querySelector('.btn');
const model = document.querySelector('.model');
const comment = document.querySelector('.comment');
btn.addEventListener('click', function (e) {
            let inputModel = model.value;
            let inputComment = comment.value;
            let arrayComments=[];
            if (inputComment!=[] && inputModel!=null){
            //проверяем, есть ли данный продукт в localStorage
                if (checkProductInLocalStorage(inputModel)===true){
                    arrayComments = JSON.parse(localStorage.getItem(inputModel));
                    arrayComments.push(inputComment);
                    localStorage.setItem(inputModel,JSON.stringify(arrayComments));
                } else {
                    arrayComments.push(inputComment);
                    localStorage.setItem(inputModel,JSON.stringify(arrayComments));
                }
            } else {
                alert("Введите продукт и ваш отзыв о нем!")
            }
            showProducts();
    })

//удалить отзыв  - Довыдумывала, работает!))))
function removeComment(product,comment)  {
    const arrayComments = JSON.parse(localStorage.getItem(product));
    const resultArrayComments = arrayComments.filter(elemComment => elemComment!==comment);
    localStorage.setItem(product,JSON.stringify(resultArrayComments));
    showProducts();
}

//формирование списка продуктов, по которым есть отзывы
function showProducts() {
    let keys = Object.keys(localStorage);
    container.textContent=null;
    keys.forEach(product => {
        if ((JSON.parse(localStorage.getItem(product))).length>0){
            let divProduct = document.createElement('div');
            divProduct.className='product_show';
            divProduct.textContent = product; 
            container.appendChild(divProduct);
  
            let olComments = document.createElement('ol');
            olComments.className='comments_show';
            divProduct.appendChild(olComments);
            showComments(product,olComments);
        }
    });
}

//формирование блока отзывов под каждым продуктом
function showComments(product, olComments) {
    for (const comment of JSON.parse(localStorage.getItem(product))) {
        let showComment = document.createElement('li');
        let removeButtonComment = document.createElement('button');
        showComment.innerHTML = comment;
        olComments.appendChild(showComment);
        olComments.appendChild(removeButtonComment);
        removeButtonComment.textContent="Удалить";
        removeButtonComment.style.margin = '10px 0px';
        removeButtonComment.className = 'removeButtonComment';
        removeButtonComment.name = product;
        removeButtonComment.value=comment;
        removeButtonComment.setAttribute("onclick","removeComment(name,value)");
        
    }    
        //olComments.style.display = 'none';
}


//проверка, есть ли в localStorage данный продукт
function checkProductInLocalStorage(model) {
    let keys = Object.keys(localStorage);
    return keys.includes(model)?true:false;
}

//очистка хранилища
const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    localStorage.clear();
    showProducts();
})

