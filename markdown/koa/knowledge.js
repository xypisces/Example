// ## promise
const util = require('util')
util.promisify(fs.readFile)('./package.json')
  .then(JSON.parse)
  .then(data => {
    console.log(data)
  })
  .catch(err =>{
    console.log(err)
  })

// async写法
const readAsync = util.promisify(fs.readFile)
async function init() {
  let data = await readAsync('./package.json')
  data = JSON.parse(data)
  console.log(data)
}

// ## generotor

function makeIterator(arr){
  let nextIndex = 0
  return {
    next: ()=>{
      if(nextIndex < arr.length) {
        return { value: arr[nextIndex], done: false}
      } else {
        return { done: true }
      }
    }
  }
}

const it = makeIterator(['吃饭','睡觉','打豆豆'])
console.log('首先', it.next().value)

// * 写法
function *makesIterator(arr){
  for(let i=0; i<arr.length; i++){
    yield arr[i]
  }
}

const gen = makeIterator(['吃饭','睡觉','打豆豆'])

