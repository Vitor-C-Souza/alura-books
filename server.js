const http = require("http")
const port = 50000

const rotas = {
    '/': 'Curso de Node',
    '/livros': 'Entrei na aba livros',
    '/autores': 'Listagem de autores',
    '/editora': 'Pag de editora',
    '/sobre': 'Info sobre o projeto'
}

const server = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(rotas[req.url])
}) 

server.listen(port, () => {
    console.log(`Servidor escutando em http://Localhost:${port}`)
})