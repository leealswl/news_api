function openNav() {
  document.getElementById("mySidenav").classList.add("active");
}
function closeNav() {
  document.getElementById("mySidenav").classList.remove("active");
}
function toggleSearch() {
  const searchBar = document.getElementById("searchBar");
  searchBar.classList.toggle("hidden");
}

const getNews =async()=> {
  try {
    const response = await fetch(url);
    
    const data=await response.json();
    if(response.status===200){
      if(data.articles.length ===0){
        throw new Error("NO RESULT FOR THIS SEARCH");
      }
      newsList = data.articles;
      render();
    }else {
      throw new Error(data.message)
    }
    
  }catch(error){
    errorRender(error.message)
  }
};

let newsList=[]
let url=new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=20`)

const getLatestNews = async() =>{
    url =new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=20`)
    getNews()  ;
  };
  getLatestNews()

// UI
const render =()=> {
  const newsHTML =newsList.map((news) =>{ 
  let description = news.description || "내용없음";
  let urlToImage = news.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';
  let source = news.source ? news.source.name : "no source";
  let publishedAt = moment(news.publishedAt).fromNow();

  if (description.length >200){
    description = description.substring(0,200) + "..." //substring 문자열 자를때 사용
  }
    return `<div class="row news" >
  <div class="col-lg-4">
      <img class="new-img-size" src="${urlToImage}" onerror="this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';"
      />
  </div>    
  <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>${description}</p>
      <div>${source} * ${publishedAt}</div>
  </div>
</div>`})
.join("");
  document.getElementById('news-board').innerHTML=newsHTML
};

const errorRender =(errorMessage)=> {
  const errorHTML =`<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

document.getElementById("news-board").innerHTML=errorHTML
};

//버튼에 클릭이벤트 만들기 -> 카테고리별 뉴스 가져오기 -> 그 뉴스를 보여주기(render)
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

const sideMenus = document.querySelectorAll(".side-menu-list button") //사이드메뉴 클릭하면 뉴스보여주기
sideMenus.forEach(sideMenu=>sideMenu.addEventListener("click",(event)=>getNewsByCategory(event)))

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url =new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&pageSize=20`
    );
    getNews();
};

//키워드로 검색하기 혼자생각해보기 버튼클릭이벤트 -> 키워드별 뉴스 가져오기 -> 보여주기
const searchKeyword =async()=> {
  const keyword = document.getElementById("searchInput").value;
  url =new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&pageSize=20`
    );
    getNews();
  document.querySelector("input").value = "";     // 입력 필드 비우기
}

