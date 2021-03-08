# Backend do desafio técnico do Eyemobile.

## Instruções:
### Clonando o projeto e instalando dependências:
1. Clone o projeto com o comando `git clone https://github.com/Plucks77/desafio-backend.git` e entre em seu diretório com `cd desafio-backend`.
2. Instale as dependências do projeto. O autor recomenda a utilização da ferramenta [Yarn](https://yarnpkg.com/getting-started/install). Basta executar o comando `yarn` no diretório raiz da aplicação.
3. Copie o arquivo **.env.example** para um chamado **.env** com o comando `cp .env.example .env`.

### Banco de dados:
O setup do banco de dados mysql pode ser facilmente feito caso tenha as ferramentas [Docker](https://www.docker.com/get-started) e [Docker-compose](https://docs.docker.com/compose/install/) instaladas, executando o comando `docker-compose up -d --build` no diretório raiz do projeto. Caso o faça, o arquivo **.env** que você copiou do **.env.example** já deve estar configurado e você estará preparado para a próxima etapa (Obs: mesmo que o comando tenha sido executado com sucesso e a instância do banco esteja rodando, o mysql dentro da instância demora alguns minutos (no meu caso, uns 5 min) para realizar seu processo de inicialização pela primeira vez).

Caso você já tenha um servidor mysql ativo, crie um banco de dados novo e informe os dados de conexão no arquivo **.env**.

### Configurando o banco de dados:
Execute o comando `yarn setup` para que as tabelas sejam criadas no banco de dados e para que ele seja populado.

### Execução do projeto:
Inicie o projeto localmente com o comando `yarn dev`.

Caso o projeto não consiga iniciar na porta **3333**,  você deve ir no arquivo **server.js** no diretório **/src** e alterar a parte `app.listen(process.env.PORT || 3333)` para uma porta disponível.
