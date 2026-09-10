// A URL da nossa API
const url = "http://localhost:3000/produtos";

// Referências dos elementos
const formulario = document.getElementById('formulario');
const listaProdutos = document.getElementById('lista-produtos');
const formExibir = document.getElementById('form-exibir');
<<<<<<< HEAD
=======
const exibirProduto = document.getElementById('exibir-produto');
>>>>>>> ebae5196edb9677166b9e968bbd158f4f821c2da


/**
 * 1. BUSCAR PRODUTOS (GET)
 */
async function buscarProdutos() {
   
   try{
      // 1. Faz a requisição GET para a API
      const resposta = await fetch(url);
      // 2. Converte a resposta para JSON
      const produtos = await resposta.json();
      console.log(produtos);
      
      listaProdutos.innerHTML = '';

      // 3. Itera sobre os dados e cria os cards dinamicamente
      produtos.forEach(produto => {
         const card = document.createElement('div');
         
         card.innerHTML = `
<<<<<<< HEAD
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
            <p>${produto.descricao}</p>
            <button onclick="deletarProduto(${produto.id})">Deletar Produto</button>
=======
            <div class="produto-card">
               <h3>${produto.nome}</h3>
               <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
               <p>${produto.descricao}</p>
               <button class="btn-excluir" onclick="deletarProduto(${produto.id})">Deletar</button>
            </div>
>>>>>>> ebae5196edb9677166b9e968bbd158f4f821c2da
            `;
            listaProdutos.appendChild(card);
      });
   } catch(erro){
      console.error('Erro:', erro);
      listaProdutos.innerHTML = '<p> Erro ao carregar os produtos.</p>';
   };
   
};

buscarProdutos(); // Chama a função para buscar os produtos ao carregar a página

/**
 * 2. SALVAR NOVO PRODUTO (POST)
 */

formulario.addEventListener("submit", async function(evento) {
   // 1. Evita que a página recarregue ao submeter o formulário
   evento.preventDefault();
   
   // 2. Coleta os valores digitados pelo usuário
   const novoProduto = {
      nome: document.getElementById('nome').value,
      preco: document.getElementById('preco').value,
      descricao: document.getElementById('descricao').value
   };

   try {
      // 3. Faz a requisição POST enviando os dados em JSON
      const resposta = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(novoProduto)

      });
      // 4. Valida se a inserção ocorreu corretamente
      if (!resposta.ok) {
            throw new Error('Falha ao cadastrar produto');
      };
      // 5. Limpa o formulário e atualiza a listagem na tela
      formulario.reset();
      await buscarProdutos();

      alert('Produto adicionado com sucesso :)');

   } catch(erro) {
      console.error('Erro: ', erro);
      alert('Erro ao tentar cadastrar o produto.');
   }

});

/**
 * 3. BUSCAR PRODUTOS POR ID (GET)
 */

async function buscarProdutoPorId() {
   const id = document.getElementById('id-produto').value;

   try {
      const resposta = await fetch(`${url}/${id}`);
      if (!resposta.ok) {
<<<<<<< HEAD
=======
         alert('Produto não encontrado');
>>>>>>> ebae5196edb9677166b9e968bbd158f4f821c2da
         throw new Error('Produto não encontrado');
      }
      const produtos = await resposta.json();
      console.log(produtos);
<<<<<<< HEAD
=======

      exibirProduto.innerHTML = '';

>>>>>>> ebae5196edb9677166b9e968bbd158f4f821c2da
      // Atualiza a interface com os detalhes do produto
      produtos.forEach(produto => {
         const card = document.createElement('div');

         card.innerHTML = `
<<<<<<< HEAD
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
            <p>${produto.descricao}</p>
            <button onclick="deletarProduto(${produto.id})">Deletar Produto</button>
            `;
         formExibir.appendChild(card);
=======
            <div class="produto-card">
               <h3>${produto.nome}</h3>
               <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
               <p>${produto.descricao}</p>
            </div>
            `;
         exibirProduto.appendChild(card);
>>>>>>> ebae5196edb9677166b9e968bbd158f4f821c2da
      });
   } catch (erro) {
      console.error('Erro:', erro);
   }
}

<<<<<<< HEAD
=======
formExibir.addEventListener("submit", async function(evento) {
   // Previne o recarregamento da página
   evento.preventDefault();

   
   // Chama a função que busca o produto
   await buscarProdutoPorId();

   
});

>>>>>>> ebae5196edb9677166b9e968bbd158f4f821c2da
/**
 * 4. DELETAR PRODUTOS (DELETE)
 */

async function deletarProduto(id) {
   try {
      const resposta = await fetch(`${url}/${id}`, {
         method: 'DELETE'
      });
      if (!resposta.ok) {
         throw new Error('Erro ao deletar produto');
      }
      console.log('Produto deletado com sucesso :)');
      alert('Produto deletado com sucesso :)');
<<<<<<< HEAD
=======

      await buscarProdutos();
      await buscarProdutoPorId();
>>>>>>> ebae5196edb9677166b9e968bbd158f4f821c2da
      // Aqui você pode atualizar a interface para remover o produto da lista
   } catch (erro) {
      console.error('Erro:', erro);
   }
}