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


let totalResults = 0;
let page=1;
const pageSize=10;
const groupSize=5;

let newsList=[]
let url=new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${pageSize}`
  );

const getNews =async()=> {
  try {
    url.searchParams.set("page",page) //&page=page
    url.searchParams.set("pagesize",pageSize)

    const response = await fetch(url);
    const data=await response.json();

    if(response.status===200){
      if(data.articles.length ===0){
        throw new Error("NO RESULT FOR THIS SEARCH");
      }
      newsList = data.articles;
      totalResults=data.totalResults
      render();
      paginationRender();
    }else {
      throw new Error(data.message);
    }
  }catch(error){
    errorRender(error.message);
  }
};


const getLatestNews = async() =>{
    url =new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`)
    getNews()  ;
  };
 

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
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
    );
    getNews();
};

//키워드로 검색하기 혼자생각해보기 버튼클릭이벤트 -> 키워드별 뉴스 가져오기 -> 보여주기
const searchKeyword =async()=> {
  const keyword = document.getElementById("searchInput").value;
  url =new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
    );
  document.querySelector("input").value = "";     // 입력 필드 비우기
  getNews();
}


// const paginationRender=()=> {
//   //totalResult, page, pageSize, pageGroup, firstPage
//   const totalPages=Math.ceil(totalResults/pageSize);
//   const pageGroup =Math.ceil(page/groupSize);
//   let lastPage= pageGroup * groupSize; //마지막 페이지 그룹이 그룹사이즈보다 작으면 lastpage = totalpage
    
//   if (lastPage>totalPages){
//       lastPage=totalPages
//     }
//   const firstPage = lastPage-(groupSize -1 )<=0? 1: lastPage-(groupSize -1);
 
//   let paginationHTML = `
//   <li class="page-item ${page === 1 ? "disabled" : ""}">
//     <a class="page-link" href="#" onclick="moveToPage(1)">&laquo;</a> 
//   </li>
//   <li class="page-item ${page === 1 ? "disabled" : ""}">
//     <a class="page-link" href="#" onclick="moveToPage(${page - 1})">&lt;</a>
//   </li>
// `;

//   for (let i=firstPage; i<=lastPage; i++) {
//     paginationHTML += `
//       <li class="page-item ${i === page ? "active" : ""}" data-page="${i}">
//         <a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a>
//       </li>
//     `;
//   }
//   paginationHTML += `
//   <li class="page-item ${page === totalPages ? "disabled" : ""}">
//     <a class="page-link" href="#" onclick="moveToPage(${page + 1})">&gt;</a>
//   </li>
//   <li class="page-item ${page === totalPages ? "disabled" : ""}">
//     <a class="page-link" href="#" onclick="moveToPage(${totalPages})">&raquo;</a> 
//   </li>
// `;
//   document.querySelector(".pagination").innerHTML=paginationHTML
//   const activePageItem = document.querySelector(`.page-item[data-page="${page}"]`);
//   if (activePageItem) {
//     activePageItem.classList.add("active");
//   }
// };

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);

  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  //  전체 페이지가 5 이하일 경우 -> 첫 3개 페이지만 보이도록 고정
  if (totalPages <= 5) {
    firstPage = 1;
    lastPage = Math.min(3, totalPages); // 최대 3개만 보이게 조정
  }

  //  마지막 페이지 그룹이 5개로 딱 안 떨어질 경우 -> 남은 페이지만큼 보이게 조정
  const remainingPages = totalPages % groupSize;
  if (remainingPages > 0 && lastPage === totalPages) {
    firstPage = totalPages - remainingPages + 1;
  }

  let paginationHTML = "";

  //  첫 번째 페이지 그룹이 아닐 때만 '처음' 및 '이전' 버튼 표시
  if (firstPage > 1) {
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(1)">&laquo;</a> 
      </li>
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${page - 1})">&lt;</a>
      </li>
    `;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
      <li class="page-item ${i === page ? "active" : ""}" data-page="${i}">
        <a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a>
      </li>
    `;
  }

  //  마지막 페이지 그룹이 아닐 때만 '다음' 및 '끝' 버튼 표시
  if (lastPage < totalPages) {
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${page + 1})">&gt;</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${totalPages})">&raquo;</a> 
      </li>
    `;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
  
  const activePageItem = document.querySelector(`.page-item[data-page="${page}"]`);
  if (activePageItem) {
    activePageItem.classList.add("active");
  }
};





const moveToPage=(pageNum)=> {
page=pageNum;
getNews()
};

getLatestNews();