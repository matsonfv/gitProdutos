// A URL da nossa API
const url = "http://localhost:3000/produtos";

// Referências dos elementos
const formulario = document.getElementById('formulario');
const listaProdutos = document.getElementById('lista-produtos');
const formExibir = document.getElementById('form-exibir');


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
      
      // 3. Itera sobre os dados e cria os cards dinamicamente
      produtos.forEach(produto => {
         const card = document.createElement('div');
         
         card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
            <p>${produto.descricao}</p>
            <button onclick="deletarProduto(${produto.id})">Deletar Produto</button>
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
         throw new Error('Produto não encontrado');
      }
      const produtos = await resposta.json();
      console.log(produtos);
      // Atualiza a interface com os detalhes do produto
      produtos.forEach(produto => {
         const card = document.createElement('div');

         card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
            <p>${produto.descricao}</p>
            <button onclick="deletarProduto(${produto.id})">Deletar Produto</button>
            `;
         formExibir.appendChild(card);
      });
   } catch (erro) {
      console.error('Erro:', erro);
   }
}

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
      // Aqui você pode atualizar a interface para remover o produto da lista
   } catch (erro) {
      console.error('Erro:', erro);
   }
}