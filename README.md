# Projet de Programmation Web: MiamMiamEat
## Projet héberger sur Heroku
**Serveur:** https://server-miammiameat.herokuapp.com/

**Client:** https://client-miammiameat.herokuapp.com/

## Répartion des tâches
### Côté serveur
**TOUTAIN Xavier** & **DUMINY Gaétan**
### Côté client
**CHENNOUF Mohamed** & **MEERSMAN Rudy**

## Démarrage des services
### Démarrage du serveur en local
Rendez-vous de le dossier serverSide puis effectuez les commandes suivantes:
- npm i
- node .\MainApp.js

### Démarrage du client en local
Rendez-vous de le dossier clientSide\hello-world puis effectuez les commandes suivantes:
- npm i
- npm run dev

## Technologies utilisées
### Côté serveur
Le serveur est en Node Express car il est léger et facile à mettre en place, ce qui réponds à notre demande. De plus, celui-ci est facilement scalable.
### Côté client
Le client est en React car il permet de créer simplement un site Web. Il a aussi la particularité d'avoir que très peu de fichier afin de permettre une meilleur lisibilité.

## Commande/Message pour manipuler la BD

pour pouvoir upload les fichiers type json:
% mongoimport -h <mongoDB host> -d <DB name> -c <collection> -u <user> -p <password> --file <input file> 
 
Les inputs files type sont présents dans le fichier "filesExemple".
Voici la correspondance file-collection:

| Collection |    file    |  
|------------|:----------:|
|  comments  | commentsDB |
|   france   |  franceDB  |
|  magasin   | magasinDB  |
|    prix    |   prixDB   |
|  recette   | recetteDB  |
|    user    |   userDB   |
