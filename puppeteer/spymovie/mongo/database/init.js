const mongoose = require('mongoose')
const db = 'mongodb://localhost/life-pic'

mongoose.Promise = global.Promise

exports.connect = () => {
  let maxConnect = 0;
  return new Promise((resolve,reject) => {
    if(process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db,{ useNewUrlParser: true })
  
    mongoose.connection.on('disconnected', () => {
      maxConnect++
      if(maxConnect<5){
        mongoose.connect(db)
      }else{
        throw new Error('数据库好像有问题，你要不要去看看~')
      }
    })
  
    mongoose.connection.on('error', err => {
      maxConnect++
      if(maxConnect<5){
        mongoose.connect(db)
      }else{
        throw new Error('数据库好像有问题，你要不要去看看~')
      }
    })
  
    mongoose.connection.once('open', () => {
      // const Dog = mongoose.model('Dog', {name: String})
      // const doga = new Dog({name: '阿尔法'})
      // doga.save().then(()=>{
      //   console.log('doga is save')
      // })
      console.log('mongoDB Connected successfully!')
      resolve()
    })
  })
}

// document,collection,database
//schema,model,entity(实体)