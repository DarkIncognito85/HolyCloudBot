# Bot Discord HolyCloud

Bienvenue sur le dépot github de notre bot Discord. Je l'ai mit a disposition de tous pour pouvoir faire profiter aux prochains. Le bot a été développé par Martin & Nolan (Un peu) en **Node.js** avec la librairie **Discord.js**. 

- Tickets Support 
- Liaison HolyCloud - Discord
- commandes customs
- Scoreboard [Connecté, Hors-ligne, Membres total]
- Message automatique et ajout de rôle lors de l'arrivé / départ d'un membre
- Monitoring

# MySQL du bot

Pour mettre en place les tables, rendez-vous sur votre console MySQL ou interface grafique et inserez ces lignes:

```SQL
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `bugs_reports` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `current` varchar(255) NOT NULL DEFAULT 'wainting',
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `ticket_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `subject` text NOT NULL,
  `current` varchar(255) NOT NULL DEFAULT 'open',
  `closed_at` varchar(255) DEFAULT NULL,
  `created_at` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `bugs_reports`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `bugs_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
```


Cordialement, Martin (HolyCloud)
