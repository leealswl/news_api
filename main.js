// API호출하고 싶을 때

// const callAPI = async() =>{
//     let url = new URL(`url주소`)
//     let header = new Headers({헤더내용}) // 이건 필요한 경우만
//     let response = await fetch(url,{headers:header})
//     let data = await response.json()
// }
const API_KEY='dfa5549770ab47b7921b3ae0763768df'
let news=[]
const getLatestNews = async() =>{
    const url =new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    const response = await fetch(url)
    const data=await response.json()
    
    news=data.articles
    console.log("ddd",news)

};
getLatestNews()