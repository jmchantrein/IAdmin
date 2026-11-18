# TODO

Liste active et historique. Les tâches s'ajoutent en bas de leur thématique ; une tâche
terminée est cochée, datée et déplacée sous « Fait ». Le plan d'ensemble (jalons J1 à J9)
est résumé ici au fil de l'eau.

## À faire

### J4 — Parcours Fondements complet

- [ ] Envoyer au propriétaire les captures de chaque lot terminé (il ne voit le rendu qu'après fusion).
- [ ] Lot 2 : `donnees/addition-binaire`, `donnees/texte-code`, `donnees/hash`. Écrites ; relecture et corrections en cours.
- [ ] Lot 3 : `logique/vrai-faux`, `logique/non-et-ou`, `logique/table-de-verite`, avec le widget `porte`. Écrites ; relecture en cours.
- [ ] Lot 4 : `logique/portes-logiques`, `logique/additionneur`. Le widget `porte` avec deux portes sur les mêmes entrées (`ou-exclusif` pour la somme, `et` pour la retenue) montre le demi-additionneur sans éditeur de circuit ; l'additionneur complet est reporté s'il demande un vrai circuit.
- [ ] Fin de J4 : une seule demande de fusion, puis contrôle du job `deployer` et `npm run e2e:live`.

### J5 à J9

- [ ] J5 — Terminal intégré : type d'exercice `terminal`, trois briques `shell/`. Reprendre `spike/terminal` (image Debian 12, `machine.mjs`, `control-agent`), puis supprimer le dossier `spike/` et son workflow.
- [ ] J5 — Vérifier le terminal sur le site réellement servi par GitHub Pages (le spike l'a mesuré sur un serveur local sans en-tête spécial).
- [ ] J5 — Créer un compte apprenant sans privilèges dans l'image ; le spike travaille en `root`.
- [ ] J5 — Publier avec l'image la liste des paquets et un lien vers leurs sources (noyau, outils GNU).
- [ ] J6 — Ligne de commande complète, `shell/empreinte` réutilisant `donnees/hash`, cursus `debuter` qui inclut les deux parcours.
- [ ] J7 — Test de positionnement par bissection du graphe ; accueil à trois portes (bas, moyen, haut niveau).
- [ ] J8 — Assistant LLM optionnel : tuteur socratique et juge, type d'exercice `libre`, réglages.
- [ ] J9 — Carte du graphe en SVG, niveau en axe vertical.

### Pédagogie

- [ ] Ouvrir les liens DOI de `docs/pedagogie.md` : les références ont été recoupées par recherche web, les liens n'ont pas pu être ouverts depuis la session.
- [ ] Faire essayer les trois premières briques par un vrai débutant et noter où il bute.

### Dettes et portes à garder ouvertes

- [ ] Terminal : l'émulateur v86 ne sait émuler que le 32 bits, et Debian 13 ne fournit plus de noyau 32 bits (constaté le 2026-11-17). L'image reste donc sur Debian 12, maintenue jusqu'en 2028 environ (date non vérifiée). Alpine + outils GNU, mesurée et conforme, est le repli prêt à l'emploi.
- [ ] Terminal : chaque machine ouverte réserve 256 Mo dans le navigateur de l'apprenant. Un disque de démarrage réduit (`MODULES=list`) permettrait peut-être 128 Mo : non essayé.
- [ ] Terminal : la première consultation d'une page de manuel prend 6 à 11 s sous Debian (0,6 à 1 s sous Alpine).
- [ ] Terminal : `/etc/hosts` et `/etc/hostname` sont vides dans l'image Debian exportée depuis Docker ; le nom d'hôte vient de la ligne de commande du noyau.
- [ ] Images 32 bits sous Docker : la résolution de noms échoue dans un conteneur Debian 32 bits avec le profil seccomp par défaut des runners GitHub (constaté) ; l'appel système bloqué n'est pas identifié. `spike/terminal/build.sh` lance donc le conteneur avec `seccomp=unconfined`.
- [ ] Deuxième langue : décider comment partager la structure d'une brique (prérequis, exercices) entre langues.
- [ ] Origine `jmchantrein.github.io` partagée avec les autres sites du compte (stockage du navigateur commun) : envisager un domaine dédié avant d'y stocker une clé d'API (J8).
- [ ] La progression d'une brique en cours (exercices réussis) vit en mémoire : un rechargement la remet à zéro.
- [ ] Le widget `pas-a-pas` montre une seule rangée de cases : un flux entre deux commandes ou un arbre demanderont une autre forme, à proposer ici avant de l'écrire.
- [ ] L'import fusionne toujours ; remplacer sa progression par un fichier demande d'effacer d'abord.
- [ ] Un exercice `saisie` n'a qu'un seul `retour`, commun à toutes les mauvaises réponses : un retour par contre-exemple nommerait mieux chaque erreur (relevé par la relecture adverse).
- [ ] Les distracteurs et contre-exemples sont jugés « typiques » par des LLM, sans essai par un débutant.
- [ ] Aucune étude trouvée sur l'effet d'une infobulle qui rappelle un prérequis, ni sur la fréquence d'ouverture des notes et des sections repliées : à observer avec de vrais apprenants.
- [ ] Le widget de la manipulation reste utilisable pendant les exercices : dans `donnees/octet`, il permet encore de lire la réponse de l'exercice sur 5 bits. Accepté pour l'instant ; le masquer ou le replier après la manipulation serait une réponse générale. Le cas se répète : dans `texte-code`, `bascule-bits` avec `caractere` lit n'importe quel code de 32 à 126 ; dans `hash`, `empreinte` calcule toute empreinte. Les exercices sont écrits pour ne pas en dépendre (table fictive, question qui se raisonne).
- [ ] Écarts mineurs laissés après relecture du lot 1 : deux acquis d'`octet` contiennent un « et » ; trois exercices de `binaire-ecrire` donnent encore la liste des poids ; la première étape de son animation ne suit pas le même découpage que les suivantes.
- [ ] Typographie française : le site pose l'espace insécable dans le contenu (`src/core/typography.ts`), mais les textes d'interface de `src/i18n/fr.ts` la portent à la main, et le texte des schémas SVG n'est pas traité.
- [ ] L'ordre des options d'un exercice `choix` est tiré de sa consigne : toute retouche de la consigne, même typographique, change l'ordre affiché.
- [ ] Après une modification du plugin Markdown, supprimer `node_modules/.astro/data-store.json` en local : Astro garde le corps compilé d'une brique tant que son fichier ne change pas. La CI part d'un dossier propre.
- [ ] Les paramètres `colonnes` (`pas-a-pas`) et `caractere` (`bascule-bits`) n'ont que des tests unitaires : ajouter leur scénario de bout en bout avec la première brique qui les emploie.
- [ ] Sur une brique qui a un prérequis, le bloc « Ce que cette brique suppose » et l'infobulle du lien affichent le même résumé : rappel doublé, accepté pour l'instant.
- [ ] La lampe allumée est bleue dans le schéma de `bit` et jaune dans le widget : la charte des schémas n'a pas de jaune.
- [ ] `tenir` a deux sens dans le parcours : « tient sur un bit, sur un octet » (suffit pour noter) et « le poids tient dans ce qui reste » (`binaire-ecrire`).
- [ ] `combinaisons`, exercice 3 : les sept combinaisons données se comparent à l'arbre du schéma. Gardé : comparer à une liste ordonnée est la méthode enseignée.
- [ ] Dans `variable`, le widget `pas-a-pas` montre la variable comme une case de plus dans la rangée des cartes : une seule rangée ne sait pas séparer les données de la variable.
- [ ] L'article original de Shannon (1948) n'a pas été ouvert : ses affirmations reposent sur Wikipédia, source secondaire.
- [ ] Écarts mineurs laissés après relecture du lot 5 : `condition`, exercice 4, refuse « frais. » avec un point ; les mots écrits par un algorithme (« écris le mot chaud ») n'ont pas de marque propre.
- [ ] Widget `empreinte` : les empreintes publiées sont figées par un test ; changer la fonction de `src/core/fingerprint.ts` casserait les solutions des briques. Le texte n'est pas normalisé (un « é » composé et un « é » décomposé n'ont pas la même empreinte). `node scripts/empreinte.mjs "texte"` donne l'empreinte d'un texte aux auteurs.
- [ ] Widget `porte` : 2 entrées et 2 portes au plus, branchées sur les mêmes entrées. Un additionneur complet demandera un vrai circuit.
- [ ] `pas-a-pas` en grille ne distingue pas une retenue d'un chiffre, et encadre un signe « + » comme une valeur. Proposition : un paramètre par étape (par exemple `discrets`) qui affiche des cases en petit ou en couleur douce.
- [ ] Le widget `porte` ne combine pas NON avec ET et OU, n'enchaîne pas deux opérations (NON (A ET B)) et liste les lignes de sa table dans l'ordre où l'apprenant les trouve, pas dans l'ordre 00, 01, 10, 11.
- [ ] Écarts mineurs laissés après relecture du lot 6 : dans les deux recherches, la boucle sort aussi quand la valeur est trouvée, alors que `boucle` n'enseigne que la sortie par sa question ; `recherche-lineaire`, exercice 3, applique presque telle quelle une phrase de l'explication.
- [ ] Zod est chargé dans le navigateur pour valider la progression et les paramètres de widget : mesurer son poids si les pages ralentissent.
- [ ] Infobulles et schémas sont remplis au rendu de la page (`expandMechanisms`), pas par le plugin Markdown : Astro garde en cache le corps compilé d'une brique tant que son fichier ne change pas, et un résumé ou un schéma modifié ailleurs resterait périmé en local. La page lit donc `entry.rendered.html` au lieu de `<Content />`.
- [ ] Infobulles en CSS seul : la touche Échap ne les ferme pas (WCAG 1.4.13) ; une infobulle ouverte couvre les lignes du dessous ; un lien de brique touché sur téléphone ouvre la brique sans montrer le rappel ; le toucher d'une note n'est testé que sous Chromium.

## Fait

### Recadrage du propriétaire sur le lot 1 (2026-11-18)

- [x] Le fond du lot 1 convient. Quatre demandes : orchestration et implémentation séparées ; lien et rappel au survol pour chaque notion requise ; raison de chaque convention (dans le texte, en note ou dans « Pour aller plus loin ») ; schémas et dessins à la place du texte verbeux.
- [x] Décisions : schémas en SVG écrits selon une charte ; une seule demande de fusion à la fin de J4 ; lots 5 et 6 avant les lots à widgets.
- [x] `docs/fabrique/orchestrer.md` (rôles), `docs/fabrique/dessiner.md` (charte des schémas), procédures de rédaction et de relecture complétées.
- [x] `docs/pedagogie.md` amendé, toujours 15 règles : « montrer, avec le texte sur le dessin » (preuve robuste pour le schéma explicatif, mince pour la bande dessinée), « dire pourquoi » (modérée), rappel d'un prérequis par lien (débattue : la recherche sur l'hypertexte montre aussi des liens qui distraient, d'où un seul lien par notion, à sa première mention). Références contrôlées sur notices et résumés, sans lecture du texte intégral.
- [x] Mécanismes de contenu (`src/markdown/`) : lien `[bit](brique:donnees/bit)` avec infobulle « titre + résumé », note de survol `[mot](note "…")` (40 mots), champ `plus_loin` (3 entrées de 80 mots, `source` en https), schémas `![alt](schema:nom)` intégrés à la page et contrôlés selon la charte. Démonstration dans `donnees/bit`. Notes et textes alternatifs hors du budget de 150 mots.
- [x] Reprise des 7 briques existantes : première mention de chaque notion requise liée, raison de chaque convention (dans le texte, en note ou dans « Pour aller plus loin »), un schéma par brique là où il remplace du texte. Deux relectures adverses : aucun écart bloquant, corrections appliquées (entre autres : « la plus petite unité d'information » retiré de `bit`, raison des 8 bits réécrite dans `octet`, étape de résultat ajoutée à `algorithme`).
- [x] Schémas lisibles sur téléphone : corps 22 à 32 (le cadre de 640 s'y affiche à moitié taille), largeur plafonnée à 520 px sur grand écran, les 10 schémas redessinés. `scripts/apercu-schema.mjs` rend un schéma sans construire le site ; `tests/e2e/briques.spec.ts` capture chaque explication à 360 px en thème sombre.
- [x] Leçons des relectures inscrites dans `rediger-brique.md`, `relire-brique.md` et `dessiner.md` : raison non circulaire et qui ne fait pas croire à un minimum faux, mot défini avant son emploi, exemple dessiné dont l'ordre compte, mots du widget dans le schéma, source ouverte et non simple extrait.
- [x] Lot 5 : `algo/variable`, `algo/condition`, `algo/boucle`, avec `pas-a-pas`. Relecture adverse : 3 écarts bloquants levés (condition proposée sous forme d'affirmation, exercice de boucle recopiable depuis la manipulation, raison circulaire). Conventions fixées pour la suite : un nom de variable entre guillemets, « vaut moins de », « les étapes du oui ».
- [x] Sources ouvertes et confirmées sur les pages (Académie française, Wikipédia anglophone, IBM) ; l'adresse de l'article de Shannon, qui redirigeait ailleurs, est remplacée ; une phrase attribuée à Shannon, confirmée nulle part, est retirée. L'environnement cloud « IAdmin » autorise désormais ces hôtes.
- [x] Captures des 10 briques envoyées au propriétaire.
- [x] Espaces insécables posées par le site avant « : ; ? ! » » et après « « », dans l'explication et dans les textes du frontmatter ; `pas-a-pas` range ses cases en grille (`colonnes`) ; `bascule-bits` affiche le caractère du code écrit (`caractere`).
- [x] Widgets `porte` (une ou deux portes logiques, table de vérité à remplir) et `empreinte` (texte et empreinte de 5 chiffres), avec leur logique pure dans `src/core` et leurs pilotes de test.
- [x] Lot 6 : `algo/recherche-lineaire`, `algo/recherche-dichotomique`, `algo/defi-compter` (premier `genre: defi`). Relecture adverse sans écart bloquant ; corrections appliquées (la boucle nomme sa question, le schéma reprend le codage du widget, le prix du tri est dit).

### Mise en ligne (2026-11-17)

- [x] Demande de fusion `jmchantrein/IAdmin#1` (J1 à J3 et première étape de J4) fusionnée dans `main`.
- [x] Site publié sur https://jmchantrein.github.io/IAdmin/. Les deux premiers déploiements ont échoué (erreur 404) tant que GitHub Pages n'était pas réglé sur la source « GitHub Actions » ; le troisième a réussi.
- [x] `npm run e2e:live` joue les mêmes scénarios contre le site en ligne : 19 sur 19 le jour de la mise en ligne.
- [x] Environnement cloud « IAdmin » : il autorise `jmchantrein.github.io` et installe les dépendances au démarrage d'une session (script non éprouvé tant qu'aucune session neuve n'a démarré dessus).

### J4 — Parcours Fondements, première étape (2026-11-17)

- [x] Test `tests/e2e/briques.spec.ts` : chaque brique est jouée comme par un apprenant (une mauvaise réponse et son retour, puis la solution) jusqu'à sa validation. Il suit le contenu sans retouche.
- [x] Relecture adverse des trois briques de J1 (aucun écart bloquant, 16 à corriger, 13 mineurs), puis réécriture : exercices sur des cas nouveaux au lieu de réponses recopiables, questions de manipulation à réponse déterminée, vocabulaire resserré.
- [x] Une saisie qui porte une unité (« 3 bits ») reçoit le message « écris seulement le nombre » au lieu du retour d'erreur.
- [x] Le suivi de `bascule-bits` liste les combinaisons trouvées sans annoncer leur total.
- [x] Paramètre `poids` de `bascule-bits` : poids sous chaque bit et total ; la rangée tient sur une ligne jusqu'à 8 bits, en mobile aussi.
- [x] Lot 1 : `donnees/binaire-lire`, `donnees/binaire-ecrire`, `donnees/octet`, écrites, jouées par le test, relues par un agent neuf (1 écart bloquant, 10 à corriger, une vingtaine de mineurs) puis corrigées.
- [x] Les options d'un `choix` s'affichent dans un ordre mélangé et stable : la bonne réponse était la première option de tous les QCM du site.
- [x] Deux défauts révélés par un échec de la CI puis par la répétition des tests, corrigés avec un test de non-régression chacun : la validation d'une brique s'enregistrait après l'affichage de « Brique validée » (quitter la page aussitôt la perdait) ; une réponse tapée avant la fin du chargement était effacée au démarrage du script. Le bouton « Valider » reste inactif tant que la page n'est pas interactive.
- [x] Les deux procédures de la fabrique intègrent les leçons de ces relectures : forme de réponse explicite, valeurs sans palindrome, valeurs hors de portée du widget de la page, un seul sens par mot.

### J3 — Export/import, « pas à pas », fabrique (2026-11-17)

- [x] Page « Ma progression » : export en fichier JSON, import avec validation puis fusion (l'état le plus fort gagne, la date départage, rien n'est perdu), effacement après confirmation.
- [x] Une progression illisible est déplacée de côté une seule fois ; la page permet d'en télécharger la copie puis de la supprimer. Un navigateur sans stockage est signalé.
- [x] Widget générique `pas-a-pas` : étapes déclarées dans la brique (cases, cases mises en avant ou écartées, étiquettes, légende), avance et recul par bouton.
- [x] Brique `algo/algorithme`, première entrée de haut niveau et premier usage de `pas-a-pas`.
- [x] Procédures `docs/fabrique/rediger-brique.md` et `relire-brique.md`, skills de renvoi.
- [x] Épreuve de la fabrique : `algo/algorithme` écrite selon la première procédure, relue par un agent neuf selon la seconde (1 écart bloquant, 7 à corriger, 5 mineurs), puis corrigée ; les deux procédures ont été complétées d'après ses remarques.
- [x] Une réponse attendue en nombre est annoncée « en chiffres » dans le champ de saisie ; le widget `pas-a-pas` dit aussi par le texte ce que ses couleurs montrent.

### J2 — Spike terminal Linux (2026-11-17)

- [x] Deux images construites et mesurées dans GitHub Actions (`.github/workflows/spike-vm.yml`, code jetable sous `spike/terminal`).
- [x] Canal de contrôle sur le second port série : l'hôte exécute une commande, lit sa sortie et son code de retour, sans rien écrire dans le terminal de l'apprenant.
- [x] Remise à zéro d'un exercice par restauration de l'instantané : un fichier créé par l'apprenant disparaît.
- [x] Le même pilote fonctionne sous Node (pour rejouer les solutions en CI) et dans Chromium.
- [x] **Décision : Debian 12 minimale, avec 256 Mo de mémoire.** Elle tient les trois seuils fixés et apporte un environnement courant et 222 pages de manuel en français. Alpine + outils GNU reste le repli.

Mesures (run 3 du workflow, commit `67f6914` ; reproduites par les runs 4 et 5, ce dernier vert pour les deux images) :

| Mesure                                    | Seuil   | Debian 12 (256 Mo)                | Alpine 3.21 + GNU (128 Mo)        |
| ----------------------------------------- | ------- | --------------------------------- | --------------------------------- |
| Téléchargé avant machine prête (Chromium) | ≤ 30 Mo | 20,6 Mo                           | 14,1 Mo                           |
| Délai jusqu'à machine prête (Chromium)    | ≤ 5 s   | 2,0 s                             | 2,1 s                             |
| Remise à zéro                             | ≤ 1 s   | 0,2 s                             | 0,1 s                             |
| Canal de contrôle (`exit 3` rend 3)       | Réussi  | Réussi, 0 octet sur le terminal   | Réussi, 0 octet sur le terminal   |
| Racine compressée dans le site            | ≤ 1 Go  | 149,9 Mo, 10 889 fichiers         | 40,7 Mo, 2 909 fichiers           |
| Instantané compressé                      | —       | 17,4 Mo (70,7 Mo brut)            | 11,4 Mo (36,9 Mo brut)            |
| Démarrage à froid sous Node               | —       | 47 s                              | 38 s                              |
| `ls`, `man ls`, `grep` (à la demande)     | —       | 1,9 Mo ; 3,3 Mo en 6,5 s ; 0,1 Mo | 4,5 Mo ; 2,8 Mo en 0,6 s ; 0,7 Mo |
| Total téléchargé après ces commandes      | —       | 25,8 Mo                           | 22,1 Mo                           |
| Pages de manuel en français               | —       | 222                               | aucune                            |
| Avec 128 Mo de mémoire                    | —       | panique du noyau au démarrage     | fonctionne                        |

Constats annexes : Debian 13 en 32 bits propose `manpages-fr` mais aucun noyau (`linux-image-686` inconnu du dépôt, `linux-image-686-pae` sans candidat). Les délais Chromium sont mesurés sur un runner GitHub, serveur local : un téléchargement réel de 20 Mo prendra plus de 2 s selon la connexion.

### J1 — Tranche verticale (2026-11-17)

- [x] Socle Astro 7, îlots Preact 11, TypeScript 6 strict, Zod 4, Vitest 5, Playwright.
- [x] Format des briques et des parcours (`src/core/schema.ts`) : budgets, manipulation obligatoire, retour explicatif, solution et contre-exemples vérifiés au build.
- [x] Graphe de prérequis : route d'un parcours, détection de boucle et de lien orphelin, parcours qui en incluent d'autres.
- [x] Chaîne de vérification des réponses : filtres puis prédicat.
- [x] Progression dans le navigateur : seuls les faits sont stockés, la disponibilité se déduit du graphe.
- [x] Types d'exercice `choix`, `saisie`, `widget` ; widgets `bascule-bits` et `devinette`.
- [x] Rappels des prérequis avec « Me tester », verrou indicatif, navigation libre.
- [x] Briques `donnees/information`, `donnees/bit`, `donnees/combinaisons` ; parcours `fondements`.
- [x] Internationalisation préparée : contenu et URL par langue, dictionnaire d'interface.
- [x] Socle pédagogique `docs/pedagogie.md` : 15 règles sourcées.
- [x] `AGENTS.md` (source des consignes), `CLAUDE.md` qui y renvoie, `README.md`.
- [x] Tests : unitaires, contenu, bout en bout avec captures ; CI GitHub Actions et déploiement Pages depuis `main`.

### One-shots

- [x] 2026-11-17 — Plan d'ensemble du projet, validé après neuf remarques du propriétaire.
