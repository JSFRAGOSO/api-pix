const express = require("express")
const QrCodePix = require("qrcode-pix")
const { v4: uuidv4 } = require("uuid")
const cors = require("cors")
const port = process.env.PORT || 3000
const server = express()
server.use(express.json())
//server.use(cors())

// server.options("/pix", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type")
//   res.send(true)
// })

server.post("/pix", async (req, res) => {
  const { key, name, message, city, value } = req.body

  const qrCodePix = QrCodePix.QrCodePix({
    version: "01",
    key,
    name,
    message,
    city,
    transactionId: uuidv4().substring(0, 24), //max 25 characters
    value,
  })

  const payload = qrCodePix.payload()
  const qrcode = await qrCodePix.base64()
  res.json({ payload, qrcode })
})

server.get("/pix", async (req, res) => {
  const { key, name, message, city, value } = req.query

  const qrCodePix = QrCodePix.QrCodePix({
    version: "01",
    key,
    name,
    message,
    city,
    transactionId: uuidv4().substring(0, 24), //max 25 characters
    value: parseFloat(value),
  })

  const payload = qrCodePix.payload()
  const qrcode = await qrCodePix.base64()
  res.setHeader("Access-Control-Allow-Origin", "https://tools.latromi.com.br")
  res.json({ payload, qrcode })
})

server.listen(port)
