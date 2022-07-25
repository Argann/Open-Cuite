# Open Cuite

Open Cuite est un jeu de soirées alcoolisées sous license GNU GPLv3 !

Il se base sur Vuejs 3, et a été entièrement développé via StackBlitz.

## Ajouter des challenges

La liste des challenges se trouve dans le fichier `/src/data/challenges.json`.

Il est formé d'une liste d'objets contenant chacun deux champs :

- `players` (number) : représente le nombre de joueurs qui seront concernés par ce challenge
- `content` (string) : Contenu textuel du challenge. Il est possible d'y insérer des balises afin d'afficher le nom des joueurs concernés. Par exemple, `{{0}}` sera remplacé par le nom du premier joueur participant au challenge, `{{1}}` sera remplacé par le nom du second joueur, etc. Veuillez faire correspondre le nombre de balises différentes dans le texte avec le nombre de joueurs du challenge!
