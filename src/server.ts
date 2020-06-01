import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({ hello: 'word' })
})

app.listen(3333)
