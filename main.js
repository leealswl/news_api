// API호출하고 싶을 때
// const callAPI = async() =>{
//     let url = new URL(`url주소`)
//     let header = new Headers({헤더내용}) // 이건 필요한 경우만
//     let response = await fetch(url,{headers:header})
//     let data = await response.json()
// }

function openNav() {
  document.getElementById("mySidenav").classList.add("active");
}

function closeNav() {
  document.getElementById("mySidenav").classList.remove("active");
  console.log("닫히?",closeNav)
}

function toggleSearch() {
  const searchBar = document.getElementById("searchBar");
  searchBar.classList.toggle("hidden");
}
let API_KEY='dfa5549770ab47b7921b3ae0763768df'
let newsList=[]
const getLatestNews = async() =>{
    const url =new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=20`)
    // url = new URL(https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}}
    // https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=20  );
    const response = await fetch(url)
    const data=await response.json()
    
    newsList=data.articles
    render() //뉴스리스트가 확정된다음에 렌더함수를 써줘야 내용이 나옴
    console.log("뉴스리스트",newsList)
    
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
</div>`
})
.join("");
  
  
  document.getElementById('news-board').innerHTML=newsHTML
}

//버튼에 클릭이벤트 만들기 -> 카테고리별 뉴스 가져오기 -> 그 뉴스를 보여주기(render)
const menus = document.querySelectorAll(".menus button")

menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("카테고리",category)
  const url =new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&pageSize=20`
    );
    const response = await fetch(url);
    const data=await response.json();
    console.log("data",data);
    newsList = data.articles;
    render()
    
};

//키워드로 검색하기 혼자생각해보기 버튼클릭이벤트 -> 키워드별 뉴스 가져오기 -> 보여주기

const searchKeyword =async()=> {
  const keyword = document.getElementById("searchInput").value;
  console.log("키워드",keyword)
  const url =new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&pageSize=20`
    );
    const response = await fetch(url);
    const data=await response.json();
    console.log("keyword-data",data);
    newsList = data.articles;
    render()

    // 입력 필드 비우기
  document.querySelector("input").value = "";
}