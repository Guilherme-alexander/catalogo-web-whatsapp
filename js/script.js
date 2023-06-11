let loja = document.querySelector('.loja')
let produtos = document.querySelector('.produtos')
let ListarCarrinho = document.querySelector('.ListarCarrinho')
let TelaFundoCarrino = document.querySelector('.carinho-wraper')
let containerCarrinho = document.querySelector('.container-carrinho')
let divCarrinho = document.querySelector('.carrinho')
let botaoFinalizarPedido = document.querySelector('.botaoFinalizarPedido')

let itens = [
  {
    id: 0,
    nome: "Álcool",
    preco: 60,
    img: "img/1630791.png",
    quantidade: 0
  },
  {
    id: 1,
    nome: "Caneta Bic Cristal",
    preco: 1.50,
    img: "img/caneta.jpg",
    quantidade: 0
  },
  {
    id: 3,
    nome: "ALCOOL GEL VISION 1 LITRO HIGIENIZADOR DE MÃO",
    preco: 40.25,
    img: "img/7898655632904.png",
    quantidade: 0
  }
]

function iniciarLoja() {

  itens.forEach((value, index) => {

    let createDivProdutos = document.createElement("div")
    // let createH2 = document.createElement("h2") - ID
    let createImg = document.createElement("img")
    let createH3 = document.createElement("h3")
    let createP = document.createElement("p")
    let createButton = document.createElement("button")

    // createH2.innerHTML = itens[index].id
    createImg.src = itens[index].img
    createH3.innerHTML = itens[index].nome.toUpperCase()
    createP.innerHTML = itens[index].preco.toLocaleString('pt-BR',
      { style: 'currency', currency: 'BRL' })

    createButton.innerHTML = 'adicionar &nbsp; <ion-icon name="add-circle-outline"></ion-icon>'
    createButton.classList.add('botao_produto')
    createDivProdutos.classList.add('produtos')

    loja.appendChild(createDivProdutos)
    // createDivProdutos.appendChild(createH2) - ID
    createDivProdutos.appendChild(createImg)
    createDivProdutos.appendChild(createH3)
    createDivProdutos.appendChild(createP)
    createDivProdutos.appendChild(createButton)

    return index

  });//--forEach()

  let BotaoProdutos = document.querySelectorAll('.botao_produto')

  for (let i = 0; i < BotaoProdutos.length; i++)
    BotaoProdutos[i].addEventListener("click", () => {
      itens[i].nome, itens[i].quantidade++
      divCarrinho.innerHTML = ""
      adicionarNoCarrinho()
    })


}//--iniciarLoja()

function adicionarNoCarrinho() {
  itens.map((val) => {
    let valorTotalCarrinho = val.preco * val.quantidade

    if (val.quantidade > 0) {

      let
        createDivIten = document.createElement("div"),
        createImgIten = document.createElement("img"),
        createDivItenIndo = document.createElement("div"),
        createPNome = document.createElement("p"),
        createPQtd = document.createElement("p"),
        createSpanPreco = document.createElement("span"),
        createButtonAddNewItem = document.createElement("button"),
        createIconAddNewItem = document.createElement("ion-icon"),

        createButtonRemoveNewItem = document.createElement("button"),
        createIconRemoveNewItem = document.createElement("ion-icon"),

        createButtonRemoveItem = document.createElement("button"),
        createIconRemoveItem = document.createElement("ion-icon")

      createDivIten.classList.add('carrinho-item')
      createImgIten.src = val.img
      createImgIten.alt = val.nome + " " + val.id
      createDivItenIndo.classList.add("carrinhoInfo")
      createPNome.textContent = val.nome.toUpperCase()
      createPQtd.textContent = "Qtd: " + val.quantidade
      createSpanPreco.textContent = valorTotalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

      createButtonAddNewItem.classList.add('botaoAddNewItemPedido')
      createIconAddNewItem.setAttribute('name', 'add')

      createButtonRemoveNewItem.classList.add('buttonRemoveNewItem')
      createIconRemoveNewItem.setAttribute('name', 'remove')

      createButtonRemoveItem.classList.add('botaoRemoverItemPedido')
      createIconRemoveItem.setAttribute('name', 'trash')

      divCarrinho.appendChild(createDivIten)
      createDivIten.appendChild(createImgIten)
      createDivIten.appendChild(createDivItenIndo)
      createDivItenIndo.appendChild(createPNome)
      createDivItenIndo.appendChild(createPQtd)
      createDivItenIndo.appendChild(createSpanPreco)

      createDivItenIndo.appendChild(createButtonAddNewItem)
      createButtonAddNewItem.appendChild(createIconAddNewItem)

      createDivItenIndo.appendChild(createButtonRemoveNewItem)
      createButtonRemoveNewItem.appendChild(createIconRemoveNewItem)

      createDivItenIndo.appendChild(createButtonRemoveItem)
      createButtonRemoveItem.appendChild(createIconRemoveItem)

      //remove item      
      createButtonRemoveItem.addEventListener('click', () => {
        // console.log(val.nome)
        val.quantidade = 0
        createDivIten.remove()
      })

      // quantidade -
      createButtonRemoveNewItem.addEventListener('click', () => {
        // console.log(val.nome)
        // console.log(val.quantidade)
        val.quantidade--
        createPQtd.textContent = "Qtd: " + val.quantidade
        //if == 0 remove item
        if (val.quantidade == 0) { createDivIten.remove() }
      })

      //quantidade +
      createButtonAddNewItem.addEventListener('click', () => {
        // console.log(val.nome)
        // console.log(val.quantidade)
        val.quantidade++
        createPQtd.textContent = "Qtd: " + val.quantidade
      })

    }
  })
}

ListarCarrinho.addEventListener('click', () => {

  if (containerCarrinho.classList.contains('active')) {
    ListarCarrinho.innerHTML = ` Carrinho &nbsp; <ion-icon name="cart"></ion-icon>`
    ListarCarrinho.style.background = '#007F5F'
    TelaFundoCarrino.classList.remove('active')
    containerCarrinho.classList.remove('active')
  } else {
    ListarCarrinho.innerHTML = ` Carrinho &nbsp; <ion-icon name="close"></ion-icon>`
    ListarCarrinho.style.background = '#d32f2f'
    TelaFundoCarrino.classList.add('active')
    containerCarrinho.classList.add('active')
  }
})

//click tela disable "TelaFundoCarrino"
// TelaFundoCarrino.addEventListener('click', () => {
//   TelaFundoCarrino.classList.remove('active')
//   containerCarrinho.classList.remove('active')
//   ListarCarrinho.innerHTML = ` Carrinho &nbsp; <ion-icon name="cart"></ion-icon>`
//   ListarCarrinho.style.background = '#007F5F'
// })


function finalizarCompra() {
  var listarDeCompra = []
  itens.map((val, index) => {
    if (val.quantidade > 0) {
      listarDeCompra.push(val.nome + ": " + val.quantidade + '%0D')
      listarDeCompra.join(' ')

      console.log(listarDeCompra.join(' '))

      window.location.href = `https://api.whatsapp.com/send?phone=5511974928253&text=${listarDeCompra}`
    }
  })
}

botaoFinalizarPedido.addEventListener("click", () => {
  finalizarCompra()
})

iniciarLoja()
