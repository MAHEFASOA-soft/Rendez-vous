# Notre rendez-vous ❤️

Un site romantique en une seule page (3 étapes) pour proposer un rendez-vous :
une question, un formulaire élégant pour choisir la date et le lieu, puis un
récapitulatif avec un message personnalisé et une petite célébration.

## Aperçu du parcours

1. **La demande** — "Est-ce que tu accepterais un petit rendez-vous avec moi ?"
   avec un bouton **Oui** engageant et un bouton **Non** qui esquive le
   curseur (et le doigt, sur mobile) avec humour et tendresse.
2. **La planification** — un formulaire pour choisir une date (sélecteur natif
   stylisé) et un lieu (suggestions en cartes ou saisie libre).
3. **Le récapitulatif** — une carte avec la date et le lieu choisis, un message
   romantique, et une brève animation de célébration.

## Stack technique

- **React 18** + **TypeScript** (strict)
- **Vite** — dev server et bundler
- **Tailwind CSS** — palette et typographie sur-mesure (voir `tailwind.config.ts`)
- **Framer Motion** — toutes les animations et transitions

Aucune dépendance superflue : pas de router (3 étapes gérées par un simple
state), pas de librairie de date picker (l'input natif `type="date"` est
stylisé — il est déjà accessible et testé sur toutes les plateformes).

## Architecture

```
src/
  components/     UI réutilisable (boutons, fond animé, cartes...)
  pages/          Les 3 étapes du parcours
  hooks/          Logique réutilisable (bouton fuyant, reduced-motion, storage)
  utils/          Fonctions pures (géométrie viewport, messages)
  animations/     Variants Framer Motion partagés
  types/          Types TypeScript partagés
  App.tsx         Orchestration des 3 étapes + transitions de page
  main.tsx        Point d'entrée React
```

Le state du parcours (étape actuelle + réponse/date/lieu) est conservé dans
`localStorage` via `useLocalStorage` : si la page est rafraîchie par erreur,
rien n'est perdu. Aucune donnée sensible n'est stockée, et rien n'est envoyé
à un serveur — tout reste dans le navigateur.

Cette architecture est volontairement prête pour une évolution future
(sauvegarde en base de données, envoi d'un email/WhatsApp...) : il suffirait
de brancher un appel réseau dans `handlePlanningSubmit` (dans `App.tsx`) sans
toucher au reste du frontend, puisque `DateProposal` (dans `types/index.ts`)
décrit déjà la forme exacte des données à envoyer.

## Le bouton "Non"

Point technique central du projet, implémenté dans `hooks/useRunawayButton.ts` :

- **Souris** : dès que le curseur entre dans un rayon de ~130px, le bouton se
  déplace (avec un délai anti-rebond pour rester fluide).
- **Tactile** : le premier contact déclenche l'esquive avant que le "tap" ne
  soit reconnu.
- **Clavier** : aucune esquive n'est déclenchée — un utilisateur qui navigue
  au clavier peut toujours atteindre et activer le bouton normalement.
- Le déplacement est **clampé au viewport** (jamais hors écran) et **évite le
  bouton "Oui"** (jamais de superposition).
- Le déplacement utilise une transformation CSS (`x`/`y` de Framer Motion),
  pas un changement de `position` : l'espace du bouton dans la mise en page
  reste réservé, donc aucun saut de layout ne se produit.
- Avec `prefers-reduced-motion: reduce`, l'esquive est **désactivée** : le
  bouton reste cliquable et affiche simplement un message taquin.

## Accessibilité

- Contraste vérifié sur tous les textes (fond ivoire clair + textes foncés).
- Cibles tactiles ≥ 44px sur tous les boutons.
- `:focus-visible` avec un anneau bien visible pour la navigation clavier.
- `aria-live="polite"` sur les messages du bouton "Non" pour les lecteurs
  d'écran.
- `prefers-reduced-motion` respecté partout (fond, hearts, célébration,
  bouton "Non").
- Formulaire de l'étape 2 entièrement navigable au clavier, avec validation
  et message d'erreur explicite (`role="alert"`).

## Installation

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```

Le site est servi sur `http://localhost:5173`.

## Build de production

```bash
npm run build
```

Génère un dossier `dist/` optimisé (~88 Ko gzippés au total pour le JS).

Pour prévisualiser le build localement :

```bash
npm run preview
```

## Vérification des types

```bash
npm run lint
```

(Exécute `tsc --noEmit` — le projet est en TypeScript strict, sans erreur.)

## Déploiement

Le projet est 100% statique après build (`dist/`), donc déployable n'importe
où :

- **Vercel** : importer le repo, aucune configuration nécessaire (Vite est
  détecté automatiquement).
- **Netlify** : build command `npm run build`, publish directory `dist`.
- **GitHub Pages / Cloudflare Pages** : servir le contenu de `dist/` après
  `npm run build`.

## Personnaliser le contenu

- **Textes** : `src/components/QuestionCard.tsx`, `PlanningPage.tsx`,
  `LoveMessage.tsx`.
- **Couleurs / typographies** : `tailwind.config.ts`.
- **Suggestions de lieux** : `src/components/LocationSelector.tsx`.
- **Messages taquins du bouton "Non"** : `src/utils/messages.ts`.

## Pistes d'amélioration futures

- Brancher un vrai backend (email, webhook, base de données) au moment de la
  soumission du formulaire.
- Ajouter une photo ou une illustration personnalisée en arrière-plan de
  l'étape 3.
- Ajouter un mode sombre (les tokens de couleur sont déjà centralisés dans
  `tailwind.config.ts`, ce qui rend l'ajout simple).
