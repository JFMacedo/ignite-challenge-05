<h1 align="center">
	<img src=".github/logo.png" />
</h1>

<p align="center">
	<img alt="Author" src="https://img.shields.io/badge/Author-Jean%20Fernandes%20de%20Macedo-FF57B2?style=flat" />
	<img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JFMacedo/
ignite-challenge-05?color=FF57B2&style=flat" />
	<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JFMacedo/ignite-challenge-05?color=FF57B2&style=flat" />
</p>

<div align="center">
	<img src=".github/home.png" />
</div>

## Sobre

O projeto **Spacetrevaling** é um blog que foi criado como desafio do curso **Ignite** da **Rocketseat** com o intuito de colocar em prática o conteúdo estudado durante o curso.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [date-fns](https://date-fns.org/)
- [Pismic](https://prismic.io/)

## Como baixar o projeto e rodar em ambiente de desenvolvimento

Para rodas o projeto você precisa antes ter instalado:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/pt-br/)
- [Yarn](https://yarnpkg.com/)

```zsh
#No terminal rode o seguinte comando
$ git clone https://github.com/JFMacedo/ignite-challenge-05.git

#Entre na pasta do projeto
$ cd ignite-challenge-05 

#Instale as pedendências
$ yarn
```

Para rodar o projeto também será necessário uma conta no no prismic e confugura-lo de acordo com a aplicação:

```json
{
  "Main" : {
    "uid" : {
      "type" : "UID",
      "config" : {
        "label" : "slug",
        "placeholder" : "Post UID..."
      }
    },
    "title" : {
      "type" : "Text",
      "config" : {
        "label" : "title",
        "placeholder" : "Título do post..."
      }
    },
    "subtitle" : {
      "type" : "Text",
      "config" : {
        "label" : "subtitle",
        "placeholder" : "Subtítulo do post..."
      }
    },
    "author" : {
      "type" : "Text",
      "config" : {
        "label" : "author",
        "placeholder" : "Nome do autor"
      }
    },
    "banner" : {
      "type" : "Image",
      "config" : {
        "constraint" : { },
        "thumbnails" : [ ],
        "label" : "banner"
      }
    },
    "content" : {
      "type" : "Group",
      "config" : {
        "fields" : {
          "heading" : {
            "type" : "Text",
            "config" : {
              "label" : "heading",
              "placeholder" : "Título da secão..."
            }
          },
          "body" : {
            "type" : "StructuredText",
            "config" : {
              "multi" : "paragraph, strong, em, hyperlink, image, embed, list-item, o-list-item, rtl",
              "allowTargetBlank" : true,
              "label" : "body",
              "placeholder" : "Texto da seção..."
            }
          }
        },
        "label" : "content"
      }
    }
  }
}
```

Após configurar o prsimic, adicionar um arquivo .env na raiz do projeto como o .env.exmaple e inserir a chave API.

Agora é só rodar o projeto em ambiente de desenvolvimento:
```zsh
$ yarn dev
```

Desenvolvido por [Jean Fernandes de Macedo](https://github.com/JFMacedo)

[![Linkedin Badge](https://img.shields.io/badge/-Jean%20Fernandes%20de%20Macedo-0077B5?style=plastic&logo=Linkedin&link=https://www.linkedin.com/in/jfmacedo91/)](https://www.linkedin.com/in/jean-fernandes-de-macedo-b843a3194/) 
[![Gmail Badge](https://img.shields.io/badge/-jfmacedo91@gmail.com-c14438?style=plastic&logo=Gmail&logoColor=white&link=mailto:jfmacedo91@gmail.com)](mailto:jfmacedo91@gmail.com)