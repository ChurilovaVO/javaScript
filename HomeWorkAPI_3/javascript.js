const swiper = new Swiper(".mySwiper", {
      speed: 600,
      parallax: true,
    });
const apiKey = '-ft_KxtaW5kkiyExc9ftYM5TX1GBvxshTSeegAqV5Qs';
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}`;

async function getData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const data = await getData(url);
console.log(data);

const body = document.querySelector('body');
let count = localStorage.getItem('count') || 0;
body.insertAdjacentHTML('afterbegin',`
      <div style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" class="swiper mySwiper">
            <div class="parallax-bg" style="
          background-image: url(${data.urls.full});
        " data-swiper-parallax="-23%"></div>
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="title" data-swiper-parallax="-300">Photographer</div>
                    <div class="subtitle" data-swiper-parallax="-200">${data.user.name}</div>
                    <div class="text" data-swiper-parallax="-100">
                        <p>
                            Likes: <span class="current_likes">${data.likes}</span>
                        </p>
                        <button class="button_like">like</button>
                        <button class="button_clear">clear localStorage</button>
                        <p>Мои лайки (количество): <span class="favourity">${count}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `);

const like = document.querySelector('.button_like');
const favour = document.querySelector('.favourity');
const curLikes= document.querySelector('.current_likes');
const clear= document.querySelector('.button_clear');
like.addEventListener('click', () => {
    count++;
    favour.textContent=count;
    let resultLikes=Number(curLikes.textContent);
    resultLikes++;
    curLikes.textContent=resultLikes;
    localStorage.setItem('count', JSON.stringify(count));
})

clear.addEventListener('click', ()=>{
    localStorage.clear();
    favour.textContent=0;
    count=0;
    curLikes.textContent=data.likes;
})

