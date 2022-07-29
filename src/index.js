const express = require("express")
const QrCodePix = require("qrcode-pix")
const { v4: uuidv4 } = require("uuid")

const server = express()
server.use(express.json())

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
  res.send({ payload, qrcode })
})

server.listen(3333)
