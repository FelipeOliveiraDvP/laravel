# Laravel + Vue JS ❤

Exemplo de projeto utilizando Laravel como como backend e uma aplicação em
VueJS para consumir a API.

## Requistos mínimos

-   **Versão do PHP:** 7.4
-   **Versão do MySQL:** 5.4
-   **Versão do Composer:** 1.10.13
-   **Versão do Node:** 12.18.4
-   **Versão do NPM:** 6.14.6

## Como executar o projeto

Após fazer o download do projeto, instale as dependências do composer e do npm.

`composer install`
`npm install`

No arquivo de configuração `.env`, adicione as linhas a seguir:

```
SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost    
SANCTUM_STATEFUL_DOMAINS=localhost:8080
```
Certifique-se de criar um novo banco de dados e atualizar o arquivo `.env`
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
Execute o comando `php artisan:migrate --seed` para criar as tabelas no banco de dados e poular com as informações iniciais.

Execute o comando `php artisan serve` e em outro terminal aberto no mesmo diretório execute o comando
`npm run dev` para executar a aplicação front end.

Para abrir o projeto no navegador acesse [http://localhost:8000/](http://localhost:8000/).

## Funcionalidades disponíveis
- Registro de usuários
- Login
- Autenticação das rotas públicas
- Cadastro de grupos
- Indicador de carregamento

## Oportunidades de melhorias
- Adicionar permissões por nível de usuário
- Melhorar a apresentação das mensagens de erro
