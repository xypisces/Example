const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PicSchema = new Schema({
  picId: Number,
  link: String,
  word: String,
  href: String,
})

mongoose.model('Pic', PicSchema);