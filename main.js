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
}

function toggleSearch() {
  var searchBar = document.getElementById('searchBar');  
  var searchInput = document.getElementById('searchInput');
  
  if (searchBar.style.display === "block") {
      searchBar.style.display = "none";  // 검색창이 보이면 숨김
      searchInput.value = '';  // 입력값 초기화 (옵션)
  } else {
      searchBar.style.display = "block";  // 검색창이 숨겨져 있으면 보임
      searchInput.focus();    // 검색창이 나타나면 자동으로 포커스 주기
  }
}

let API_KEY=''

let newsList=[]
const getLatestNews = async() =>{
    const url =new URL('https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&{PAGE_SIZE}')
    // url = new URL(
    //     `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=1`
    //   );
    const response = await fetch(url)
    const data=await response.json()
    
    newsList=data.articles
    render() //뉴스리스트가 확정된다음에 렌더함수를 써줘야 내용이 나옴
    console.log("Ddd",newsList)
    
};
getLatestNews()

// UI
const render =()=> {
  const newsHTML =newsList.map(
    (news) => `<div class="row news" >
  <div class="col-lg-4">
      <img class="new-img-size" src=${news.urlToImage} />
  </div>    
  <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>${news.description}</p>
      <div>${news.source.name}* ${news.publishedAt}</div>
  </div>
</div>`
)
.join("");
  
  
  document.getElementById('news-board').innerHTML=newsHTML
}
