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

Nous partirons d'un squelette de projet electron simple, qui sera enrichie au fur et à mesure des étapes. Le résultat final sera une application desktop multi-fenêtré, avec des interactions et comportements d'une application desktop moderne.

Le squelette est composé de tous les fichiers de l'application. Vous n'aurez qu'à compléter ces fichiers.

### Etape 01 : Hello world

Nous allons commencer par démarrer notre application electron en affichant une première page statique.

- Ouvrir le fichier `src/main.js`
- Importer les dépendances `app` et `BrowserWindow` depuis `electron`
- Sur l'événement `ready` de app, instancier une nouvelle `BrowserWindow`
- Charger le fichier `index.html` dans votre fenêtre nouvellement créée
- Démarrer votre application en executant `./node_modules/.bin/electron .`

Documentation nécessaire à l'étape :
 - http://electron.atom.io/docs/api/app/
 - http://electron.atom.io/docs/api/browser-window/


### Etape 02

Le but est de découvrir l'API BrowserWindow

### Etape 03

Le but est d'afficher la liste des memes par défaut

### Etape 04

Notre application maintenant affiche une liste statique d'images. La prochaine étape va consister à récupérer la liste des memes à afficher depuis un storage. Nous allons utiliser l'IPC pour échanger des informations entre le main-process et le renderer-process.

Dans le fichier `src/renderer-process/grid.js`
- Envoyer un message `get-memes` via le module `ipcRenderer`
- Déplacer le rendu de la galerie dans le callback appelé lors de la réception d'un message `meme-sended`
- Utiliser les images passées en paramètre de ce callback

Dans le fichier `src/main-process/grid.js`
- Mettre en place un handler pour le message `get-memes` avec le module `ipcMain`
- Dans le callback du handler, appeler la fonction `getMemes` qui prend un callback comme paramètre
- Dans le callback de `getMemes`, émettre en retour un message `meme-sended` avec la liste des images fourni en paramètre

Documentation nécessaire à l'étape :
- http://electron.atom.io/docs/api/ipc-renderer/#sending-messages
- http://electron.atom.io/docs/api/ipc-main/#listening-for-messages
- http://electron.atom.io/docs/api/ipc-main/#sending-messages

### Etape 05

Maintenant que nous avons une liste prédéfinie, nous allons donner la possibilité à l'utilisateur de rajouter l'image de son choix via une file dialog.

Dans le fichier `src/renderer-process/grid.js`
- Ajouter un event listener `click` sur l'élément avec l'id `new-meme`
- Dans cet event listener, émettre un événement `open-file-dialog` avec l'IPC

Dans le fichier `src/main-process/grid.js`
- Dans celui-ci, importer le module `dialog` depuis `electron`
- Déclarer l'event handler `open-file-dialog`
- En réponse à cet event, afficher une `dialog` qui va lister seulement les fichiers images (extensions jpg, gif, png)
- Implementer un callback qui va appeler la fonction `newEditWindow` avec le fichier choisi par l'utilisateur
- Gérer l'événement `closed` en renvoyant la liste à jour de meme

Documentation nécessaire à l'étape :
- http://electron.atom.io/docs/api/dialog/

### Etape 06

A cette étape, nous allons rajouter un menu contextuel pour effacer et sauvegarder chacune des images de la galerie de meme. Nous allons utiliser les classes de menu présentes dans electron.

- Ouvrir le fichier `src/renderer-process/grid.js`
- Importer le module `remote` depuis le module `electron` pour pouvoir accéder à l'API du main process
- Importer les classes `Menu` et `MenuItem` depuis `remote`
- Ajouter un event listener `contextmenu` sur chacun des elements de la galerie
- Créer un menu contextuel avec comme items :
 - `Save as` qui enverra un message `save-from-grid` sur l'IPC
 - `Delete` qui enverra un message `deleted-selected-meme` sur l'IPC

Documentation nécessaire à l'étape :
- http://electron.atom.io/docs/api/menu/#render-process
- http://electron.atom.io/docs/api/menu-item/

### Etape 07

Maintenant que nous avons la possibilité de rajouter et d'enlever des memes, nous allons émettre des notifications pour que l'utilisateur ait une confirmation de ses actions. Pour ce faire nous allons utiliser les notifications de l'API HTML5.

- Ouvrir le fichier `src/renderer-process/grid.js`
- Ajouter une notification en utilisant la classe `Notification` après l'effacement d'un meme
- Ajouter une notification après l'enregistrement d'un meme

Documentation nécessaire à l'étape :
- https://notifications.spec.whatwg.org/
- http://electron.atom.io/docs/tutorial/desktop-environment-integration/#notifications-windows-linux-macos



### Etape 08

Nous allons terminer l'atelier en packageant notre application. Pour cela, nous allons utiliser electron-packager qui est maintenu par la communauté.

- Ouvrir le fichier `package.json`
- Ajouter un npm script `package` qui va appeler electron-packager
- Ajouter les options pour :
  - cibler votre plateforme et son architecture
  - ignorer les dépendances de développement
  - pouvoir repackager l'application même si le packaging a déjà été créé

Documentation nécessaire à l'étape :
- https://github.com/electron-userland/electron-packager
- https://github.com/electron-userland/electron-packager/blob/master/usage.txt

### Etape bonus

Tester le lancement de l'application
