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
  const searchBar = document.getElementById("searchBar");
  searchBar.classList.toggle("hidden");
}

let API_KEY='dfa5549770ab47b7921b3ae0763768df'

let newsList=[]
const getLatestNews = async() =>{
    const url =new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`)
    // url = new URL(https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}
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
  const newsHTML =newsList.map((news) =>{ 
  let description = news.description || "내용없음";
  let urlToImage = news.urlToImage || '/image/notlamge.png' ;
  let source = news.source ? news.source.name : "no source";
  let publishedAt = moment(news.publishedAt).fromNow();

  if (description.length >200){
    description = description.substring(0,200) + "..." //substring 문자열 자를때 사용
  }
  
    return `<div class="row news" >
  <div class="col-lg-4">
      <img class="new-img-size" src=${urlToImage} />
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
