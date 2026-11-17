# Spike J2 — terminal Linux dans le navigateur

Code jetable. Il mesure si un vrai GNU/Linux tient dans le site avec l'émulateur
[v86](https://github.com/copy/v86), pour deux images : Debian minimale et Alpine + outils GNU.

Tout s'exécute dans GitHub Actions (`.github/workflows/spike-vm.yml`) ; les mesures se
lisent dans le résumé du job. La décision est consignée dans `TODO.md`.

| Fichier               | Rôle                                                               |
| --------------------- | ------------------------------------------------------------------ |
| `<image>/Dockerfile`  | Système minimal en console série                                   |
| `control-agent`       | Shell piloté par l'hôte sur le second port série                   |
| `build.sh`            | Exporte la racine en fichiers adressés par contenu (9p)            |
| `machine.mjs`         | Pilote commun : démarrer, exécuter une commande, lire son code     |
| `measure.mjs`         | Mesures sous Node : démarrage, instantané, remise à zéro           |
| `browser.mjs`, `page` | Mesures dans Chromium : délai jusqu'à l'invite, octets téléchargés |
