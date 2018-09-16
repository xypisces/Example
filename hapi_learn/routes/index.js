module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req,res) => {
      res({
        code: 200,
        value: 'hello hapi'
      })
    }
  }
]