# Workshop Electron du Devfest Nantes 2016

Le but du worshop est de construire une application de génération de meme avec le framework Electron.

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

### Etape 01

Le but est de lancer l'application en utilisant le CLI Electron

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
