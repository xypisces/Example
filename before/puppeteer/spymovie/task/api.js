// http://api.douban.com/v2/user/1000001
// http://api.douban.com/v2/movie/subject/1764796
// http://api.douban.com/v2/movie/top250

const rp = require('request-promise-native')

async function fetchMovie(items) {
  const url = `http://api.douban.com/v2/movie/subject/${items.id}`

  const res = await rp(url)
  return res
}

;(async () => {
  const data = await rp('http://api.douban.com/v2/movie/top250')
  let movies;
  if(data){
    movies = JSON.parse(data).subjects.slice(0,5)
  }
  // console.log(movies)
  if(movies.length > 0){
    movies.map(async movie => {
      let movieData = await fetchMovie(movie)
      try{
        movieData = JSON.parse(movieData)
        console.log(movieData.title)
        console.log(movieData.share_url)
        console.log(movieData.summary)
      }catch (e){
        console.error(e)
      }
    })
  }
})()