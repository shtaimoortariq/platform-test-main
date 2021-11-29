import express from 'express'
import cors from 'cors'
import multer from 'multer'
import bodyParser from 'body-parser'
import fs from 'fs'
import csv from  'csv-parser'
import probe from 'probe-image-size'

const app = express()
app.use(express.static("./assets"));
app.use(cors())
app.use(bodyParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
  res.send('This is from express.js')
})

app.post('/upload', upload.single('csv'), (req, res) => {
  let results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        let finalResult = [];
        await Promise.all(
          results.map(async obj => {
            try {
              let detail = await probe(obj.url);
              if (detail) {
                finalResult.push({
                  id: obj.id,
                  name: obj.name,
                  picture: {
                    url: obj.url,
                    width: detail.width,
                    height: detail.height
                  }
                })
              }
            } catch (err) {
              throw err
            }
          })
        )
        if (finalResult.length) {
          return res.status(200).send(finalResult)
        }
      } catch (err) {
        return res.status(404).send(err)
      }
    })
})



const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`)
})
