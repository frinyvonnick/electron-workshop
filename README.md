[![Electron Logo](http://electron.atom.io/images/electron-logo.svg)](http://electron.atom.io/)

# Workshop Electron du Devfest Nantes 2016

Le but du workshop est de construire une application de génération de meme avec le framework Electron.

Le workshop sera cadencé par des présentations de nouveaux concepts à chaque étape.

Pour pouvoir continuer d'avancer même si une étape est problématique, nous vous fournissons les solutions de chacune des étapes.

## Description des répertoires :
```
solutions // solutions pour les différentes étapes
|-etape-01
|-etape-02
...
src
|-assets            CSS/images/js pour outillage
|-main-process      JS côté main-process
|-renderer-process  JS côté main-process
|-windows           HTML des différents windows
|-main.js         Point d'entrée de l'application
```

## Description des étapes

Afin de mettre en oeuvre les concepts d'electron vus dans le cours, nous vous proposons de développer une application de meme generator.

Nous partirons d'un squelette de projet electron simple, qui sera enrichie au fur et à mesure des étapes. Le résultat final sera une application desktop multi fenêtré, avec des interactions et comportements d'une application desktop moderne.

Le squelette est composé de tous les fichiers de l'application. Vous n'aurez qu'à compléter ces fichiers.

### Etape 01 : Hello world

Nous allons commencer par démarrer notre application electron en affichant une première page statique.

- Ouvrez le fichier `src/main.js`
- Importez les dépendances `app` et `BrowserWindow` depuis electron
- Sur l'évenement `ready` de app, instancier une nouvelle `BrowserWindow`
- Chargez le fichier `index.html` dans votre fenêtre nouvellement créée
- Démarrez votre application en executant `npm start`

Documentation nécéssaire à l'étape :
 - http://electron.atom.io/docs/api/app/
 - http://electron.atom.io/docs/api/browser-window/


### Etape 02

Le but est de découvrir l'API BrowserWindow

### Etape 03

Le but est d'afficher la liste des memes par défaut

### Etape 04

Déplacer la liste des images côté MainProcess et implémenter la communication avec le RendererProcess

### Etape 05

Le but est d'utiliser l'API fileDialog pour aller chercher une image à ajouter dans l'application

### Etape 06

Ajouter un menu contextuel pour pouvoir effacer une image

### Etape 07

Ajouter des notifications

### Etape 08

Ajouter le packaging de l'application

### Etape bonus

Tester le lancement de l'application
