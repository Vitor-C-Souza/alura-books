import app from './src/app.js'

const port = process.env.PORT || 50000

app.listen(port, () => {
    console.log(`Servidor escutando em http://Localhost:${port}`)
})