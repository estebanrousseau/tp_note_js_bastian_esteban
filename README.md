# API utilisée
Api : https://pokeapi.co/api/v2  

# Lancement de l'application
Pour mettre en route l'application, vous devez vous mettre a la racine du projet, puis lancer la commande suivante : 
* `php -S localhost:8000`

Cette commande fera apparaitre une url qui ammenera sur notre application.

# Fonctionnalitées
## Page Home
Lorsque notre application est lancée, elle ammene par défault sur la page **Home**. La page **Home** n'a a l'heure actuel aucune Fonctionnalitées. Afin de naviguer, il faut utiliser la nav-bar.

## Page Pokedex
Sur la page **Pokedex**, vous allez retrouver la liste des differents pokemons disponible sur notre application. 

### Pagination
Sur chaque page, vous aller retrouver un maximum de 20 pokemons. Ce choix a été fait pour simplifier la navigation et eviter de trop surcharger l'écrant.

### Le choix de la génération
Dans pokemon, il existe différentes génération, avec au sein de ces dernière differents pokemon. Grace au menu déroulant de la nav-bar, nous avons la posibilité de choisir la génération dans laquel progresser. La pagination s'adapte bien evidement au nombre de pokemon dans cette génération.

### La barre de recherche
Nous avons également mis en place une barre de recherche. Cette barre fonctionne de deux facon différentes : 
* Recherche grace au nom du pokemon (en anglais) : Vous pouvez rechercher le nom d'un pokemon dans la barre de recherche et différentes possibilitées vous seront proposé au fils des lettres.
* Recherche grace au numéro de pokedex : Vous pouvez rechercher un pokemon grace a son numero de pokedex. Cependant aucun choix vous sera proposé pour ce type de recherche.

#### Notes
* Avec la recherche grace au nom du pokemon, vous ne pouvez acceder seulement aux pokemon de la génération dans laquel vous vous trouvez (Ex : **Ditto** qui est de la premère génération, *kanto*, ne sera pas proposé si vous etes sur la septième génération, *alola*).
* Avec la recherche par numero, vous pouvez accéder a une partie liste de pokemon caché. En effet le pokedex classique va de 1 a 1025. Au dela de 1025 il n'y aura donc aucun résultat. Cependant si vous écrivez un numero entre 10001 et 10325, vous aurez acces a une liste de pokemon qui contient toutes les formes alternatives du jeux.

### Les favoris
Si vous le souhaitez, vous pouvez mettre un ou plusieurs pokemon en favoris. Pour ce faire il suffit de cliquer sur l'étoile en haut a droite de chaque pokemon. Vos pokemon favoris seront donc sauvegardé et resortit a chaques fois que vous relancerez l'application.

## Page détail pokemon
Si vous cliquez sur un pokemon, vous aurez la possibilité de voir sa page de présentation. 

Pour chaques pokemon, vous pourrez voir son nom, ses types, son poid, sa taille ainsi que écouter son cris. Il est également possible d'attribuer a chaque pokemon une note, qui sera elle aussi conservé comme les favoris.

Il y a également a disposition un onglet de présentation des stats du pokemon avec ses differentes valeurs de :
* PV 
* Attaque 
* Défense
* Attaque spécial
* Défense spécial
* Vitesse

Enfin, a droite et a gauche vous avez la possibilité d'aller sur la page du pokémon suivant ou précédent.

## Page objet
Sur la page **Objet** vous allez comme pour le pokedex, retrouver une liste mais cette fois pas de pokemon mais des différents objets quil est possible de donner aux différents pokemons.

Comme pour les pokemons, chaque objet possede une page de présentation, qui contient son nom, prix (en pokedollars), catégorie ainsi qu'une description le concernant.

#### Notes 
A l'heure actuel, il n'est pas possible d'équiper les objets.