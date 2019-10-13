# Glaccy Ice cream shop

[Gllacy website link - https://maz4.github.io/GllacyShop](https://maz4.github.io/GllacyShop/)

Frontend educational project based on the PSD file. Made with the perfect pixel approach.

The project was build with the following technologies and methodologies:
- Semantic HTML5
- CSS
- Sass
- BEM
- Gulp
- NPM
- responsive layout

## Table of contents
1. [How to compile the project](#install)
  1. [Install NPM](#npm)
  2. [Commands to compile the project](#compile)
    - [Build development](#dev)
    - [Build distribution](#dist)
    - [Build distribution and deploy](#deploy)


### How to compile the project <a name="install"></a>
To compile the project you will need node.js and NPM

#### Install NPM<a name="npm"></a>
Installs dependencies.

`$ npm install`

### Commands to compile the project <a name="compile"></a>

- Starts development with browser sync <a name="dev"></a>

`$ npm start`

Builds a temporary development folder (tmp) and launches bowser-sync script to watch the changes made in the html files, sass files, js files, and checks images folder.
___

- Build for production release <a name="dist"></a>

`$ npm build`

Builds distribution folder (dist) into which copies and minifies files which are ready to be send on the server.
____

- Deploys to the gh-pages branch <a name="deploy"></a>

`$ npm deploy`

Runs `$ npm build` command and deploys built website to the GitHub pages.
