const API_KEY = "017dcbbb7d584d0eb23308397fc5d9aa";
const url = "https://newsapi.org/v2/everything?q=";

const loadingScreen = document.querySelector(".loading-screen");
const mainContainer = document.querySelector("#main-section");

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    
    const result = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await result.json();
    heroSection(data.articles);
    bindData(data.articles);

}

function reload(){
    window.location.reload();
}

let currSelectedNavItem=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNavItem?.classList.remove('active');
    currSelectedNavItem=navItem;
    currSelectedNavItem.classList.add('active');
}


function heroSection(articles) {
    const heroImg = document.querySelector("#hero-left-img");
    const heroNewsTitle = document.querySelector("#hero-news-title");
    const heroNewsSource = document.querySelector("#hero-news-source");
    const heroNewsDesc = document.querySelector("#hero-news-desc");
    const searchbtn = document.querySelector("#search-btn");
    let heroImgSrc="";
    searchbtn.addEventListener("click", () => { window.open(articles.url, "_blank")});
    
    articles.every(article => {
        
        if (articles.urlToImage) {
           
            return false;
        }
            heroImg.src = article.urlToImage;
            heroNewsTitle.innerHTML = article.title;
            heroNewsDesc.innerHTML = article.description;

            const herodate = new Date(article.publishedAt).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta",
            });
            heroNewsSource.innerHTML = `${article.source.name} · ${herodate}`;
    });
}
function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const cardTemplete = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = cardTemplete.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });

}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('input-text');

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNavItem.classList.remove('active');
    currSelectedNavItem=null;
})