const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const produtos = [];
const carrinhos = [];
const users = [];

let carrinho = [];

app.post("/", (req, res) => {
  const [{ name, description }] = req.body;

  if (!name) {
    return res.json({ error: "undefined name" });
  } else {
    produtos.push({
      name,
      description,
      id: uuidv4(),
    });
  }
  res.status(201).json(produtos);
});

//fazer a lógica de incrementar um produto e decrementar!
app.post("/addProduto/:id", (req, res) => {
  //pegando id do produto pelo parametro
  const idProduto = req.params.id;
  //verificando se o produto foi encontrado pelo ID|
  const produtoEncontrado = produtos.find((produto) => {
    if (produto.id === idProduto) {
      //se o Produto foi encontrado eu retorno o produto
      return produto;
    }
    // return Object.entries(produtos).id === idProduto
  });

  //if()
  //verificando se o produto encontrado existe no carrinho
  if (produtoEncontrado) {
    let produtoExisteCarrinho = carrinho.find((produto) => {
      if (produto.id === produtoEncontrado.id) {
        return produto;
      }
    });
    //se o produto encontrado Existe no carrinho ira incrementar +1
    if (produtoExisteCarrinho) {
      //variavel esta guardando atualização do carrinho
      const carrinhoupdate = carrinho.map((produto) => {
        if (produto.id == produtoExisteCarrinho.id) {
          if (!produtoExisteCarrinho.quantidade) {
            produtoExisteCarrinho.quantidade = 0;
          }
          produtoExisteCarrinho.quantidade += 1;
          produtoExisteCarrinho;
          return produtoExisteCarrinho;
        }
        //se não existe ele retorna o produto
        else {
          return produto;
        }
      });
      // carrinho está recebendo o carrinho atualizado
      carrinho = carrinhoupdate;
    }
    //cria um produto dentro do carrinho
    else {
      carrinho.push(produtoEncontrado);
    }
  }

  res.json(carrinho);
});

app.post("/removeProduto/:id", (req, res) => {
  //pegando id do produto pelo parametro
  const idProduto = req.params.id;
  //verificando se o produto foi encontrado pelo ID|
  const produtoEncontrado = produtos.find((produto) => {
    if (produto.id === idProduto) {
      //se o Produto foi encontrado eu retorno o produto
      return produto;
    }
    // return Object.entries(produtos).id === idProduto
  });
  //verificando se o produto encontrado existe no carrinho
  if (produtoEncontrado) {
    let produtoExisteCarrinho = carrinho.find((produto) => {
      if (produto.id === produtoEncontrado.id) {
        return produto;
      }
    });
    //se o produto encontrado Existe no carrinho ira incrementar +1
    if (produtoExisteCarrinho) {
      //variavel esta guardando atualização do carrinho
      const carrinhoupdate = carrinho.map((produto) => {
        if (!produtoExisteCarrinho.quantidade) {
          produtoExisteCarrinho.quantidade = 0;
        }
        if (produto.id == produtoExisteCarrinho.id) {
          produtoExisteCarrinho.quantidade -= 1;

          if (produtoExisteCarrinho.quantidade < 0) {
            return res.json({ error: "quantidade não pode ser menor que 0" });
          }
          return produtoExisteCarrinho;
        }
        //se não existe ele retorna o produto
        else {
          return produto;
        }
      });
      // carrinho está recebendo o carrinho atualizado
      carrinho = carrinhoupdate;
    }
    //cria um produto dentro do carrinho
    else {
      carrinho.push(produtoEncontrado);
    }
  }

  res.json(carrinho);
});
app.post("/createUser", (req, res) => {
  const { nome, email } = req.body;
  if (nome && email) {
    const newUser = { nome, email, id: uuidv4() };

    users.push(newUser);

    const newCarrinhoUser = { idUser: newUser.id, id: uuidv4() };
    carrinhos.push(newCarrinhoUser);
    res.json([newUser, newCarrinhoUser]);
  }
  res.json({ error: "preencha os campos" });
});

app.listen(3333);
