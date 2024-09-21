-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla dreikyzdb.friends
CREATE TABLE IF NOT EXISTS `friends` (
  `user` varchar(200) DEFAULT NULL,
  `friend` varchar(200) DEFAULT NULL,
  `last_interaction` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla dreikyzdb.friends: ~8 rows (aproximadamente)
INSERT INTO `friends` (`user`, `friend`, `last_interaction`) VALUES
	('16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', NULL),
	('09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', NULL),
	('09ce6d2b-ea2b-11ee-b877-088fc38a7975', '0867e9b1-ea2d-11ee-b877-088fc38a7975', NULL),
	('09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'a78d12df-ead4-11ee-8940-088fc38a7975', NULL),
	('09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'b51710a2-ead4-11ee-8940-088fc38a7975', NULL),
	('b51710a2-ead4-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', NULL),
	('7b03d874-f586-11ee-895a-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', NULL),
	('09ce6d2b-ea2b-11ee-b877-088fc38a7975', '7b03d874-f586-11ee-895a-088fc38a7975', NULL);

-- Volcando estructura para tabla dreikyzdb.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `name` varchar(50) DEFAULT 'Chat Group',
  `members` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`members`)),
  `last_interaction` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla dreikyzdb.groups: ~0 rows (aproximadamente)

-- Volcando estructura para tabla dreikyzdb.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` varchar(100) NOT NULL DEFAULT uuid(),
  `sender` varchar(50) DEFAULT NULL,
  `receiver` varchar(50) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla dreikyzdb.messages: ~114 rows (aproximadamente)
INSERT INTO `messages` (`id`, `sender`, `receiver`, `content`, `timestamp`) VALUES
	('017fc60c-eb6b-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'Pito de monoo', '2024-03-26 13:18:51'),
	('01a9e3a4-ed57-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'puta', '2024-03-29 00:00:44'),
	('03ba022a-eb7e-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'noo', '2024-03-26 15:34:55'),
	('082d96b4-ed57-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'marrana', '2024-03-29 00:00:55'),
	('0b4a1f21-ed57-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'calla', '2024-03-29 00:01:00'),
	('0cd9c1d1-ed57-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'marrana', '2024-03-29 00:01:02'),
	('0ec07948-eb6f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2024-03-26 13:47:51'),
	('11e15411-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'callate', '2024-03-26 15:42:28'),
	('13b4e439-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'no', '2024-03-26 15:42:31'),
	('15ddf828-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'pq no', '2024-03-26 15:42:35'),
	('18669a16-ed57-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'asdasd', '2024-03-29 00:01:22'),
	('19610a5b-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'callateee', '2024-03-26 15:42:41'),
	('1ad7043e-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'tio', '2024-03-28 23:54:16'),
	('1b14e2b7-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'diooooooooooo', '2024-03-26 15:42:44'),
	('1cb4bdb9-ed57-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'a78d12df-ead4-11ee-8940-088fc38a7975', 'puto nacho', '2024-03-29 00:01:29'),
	('1e015575-ed56-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'que', '2024-03-28 23:54:22'),
	('1eaa04bb-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'asdasd', '2024-03-26 15:42:50'),
	('1fb4af3c-ed57-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'puta ', '2024-03-29 00:01:34'),
	('20cf2671-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'soy el puto amo joder', '2024-03-28 23:54:26'),
	('26555dc4-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'a', '2024-03-28 23:47:26'),
	('27dda48b-eb6f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'asdasdadadas', '2024-03-26 13:48:33'),
	('28719d46-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'aaa', '2024-03-28 23:47:30'),
	('340f478a-eba7-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'w', '2024-03-26 20:29:46'),
	('36cf58c3-eba7-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'Puta', '2024-03-26 20:29:50'),
	('38e293d0-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'aa', '2024-03-28 23:47:57'),
	('397733d5-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'asdasdasd', '2024-03-26 15:43:35'),
	('399b0bcb-eba7-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'puto', '2024-03-26 20:29:55'),
	('3a22dadf-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'oyeee', '2024-03-28 23:47:59'),
	('3d1fd299-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'callateeeeeeeeeeeeee', '2024-03-26 15:43:41'),
	('3ecbdc99-eb8a-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'a', '2024-03-26 17:02:28'),
	('400a345c-eba7-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'marrana', '2024-03-26 20:30:06'),
	('41bc8939-eb8a-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'nono', '2024-03-26 17:02:33'),
	('425d684d-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'uwu yamete kudasai', '2024-03-26 15:43:50'),
	('46b59b6c-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'que asco das', '2024-03-26 15:43:57'),
	('49561b76-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'no', '2024-03-26 15:44:01'),
	('4d374a32-ed56-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'dreikyzz', '2024-03-28 23:55:41'),
	('513ba328-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'que', '2024-03-28 23:55:48'),
	('55315029-ed56-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'nada', '2024-03-28 23:55:54'),
	('5859dd89-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'vale', '2024-03-28 23:56:00'),
	('6297990d-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'putaaa', '2024-03-28 23:49:07'),
	('652c5cf7-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'ahora si joder', '2024-03-28 23:49:12'),
	('670ca7b1-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'que chetada', '2024-03-28 23:49:15'),
	('68f6b434-eb7c-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'aasdasd', '2024-03-26 15:23:26'),
	('69d38348-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'puta', '2024-03-28 23:56:29'),
	('6b6a6573-eba7-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'asdasd', '2024-03-26 20:31:18'),
	('6f2883af-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'eh', '2024-03-28 23:56:38'),
	('7229d9ff-eb7c-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'señores, los mensajes se guardan', '2024-03-26 15:23:41'),
	('7245c36b-eba7-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'yamete kudasai', '2024-03-26 20:31:30'),
	('729ac19b-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'ya vess', '2024-03-28 23:49:34'),
	('72dd66cf-ed56-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'que', '2024-03-28 23:56:44'),
	('750d7a2b-eb70-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'b51710a2-ead4-11ee-8940-088fc38a7975', 'JODEEEEER', '2024-03-26 13:57:52'),
	('756b35fa-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'so', '2024-03-28 23:56:48'),
	('75df0956-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'no me jodas', '2024-03-28 23:49:40'),
	('77ad673f-f03b-11ee-8a9c-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'marrana', '2024-04-01 17:21:06'),
	('7801a9a6-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'ostia', '2024-03-28 23:49:43'),
	('78f92ef7-f03b-11ee-8a9c-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'callsese', '2024-04-01 17:21:08'),
	('794b19ed-ed56-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'pesao', '2024-03-28 23:56:55'),
	('81c1bb39-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'puta', '2024-03-28 23:50:00'),
	('81d7fc77-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'ADSASD', '2024-03-26 15:45:36'),
	('86b4b647-f586-11ee-895a-088fc38a7975', '7b03d874-f586-11ee-895a-088fc38a7975', 'chatbotai', 'ª', '2024-04-08 11:00:59'),
	('893b8d67-f586-11ee-895a-088fc38a7975', '7b03d874-f586-11ee-895a-088fc38a7975', 'chatbotai', 'ª', '2024-04-08 11:01:03'),
	('8bd9a3ec-eb86-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'adio', '2024-03-26 16:35:59'),
	('8ca735b6-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'ASDASD', '2024-03-26 15:45:54'),
	('8f884970-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'ASDADS', '2024-03-26 15:45:59'),
	('914858d7-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'ASDASDASDASDASD', '2024-03-26 15:46:02'),
	('914cab57-ed59-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'uwu', '2024-03-29 00:19:04'),
	('94663853-efad-11ee-8a9c-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'hola', '2024-04-01 00:25:29'),
	('96a03f0e-efad-11ee-8a9c-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'warro', '2024-04-01 00:25:33'),
	('974e771f-eb86-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'adio', '2024-03-26 16:36:19'),
	('975c910c-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'BRO', '2024-03-28 23:50:36'),
	('98ff9e02-eb70-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'Uuwuuuuu', '2024-03-26 13:58:53'),
	('998d5614-ed59-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'aaaaaaaa', '2024-03-29 00:19:17'),
	('9a4ba678-eb86-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'adio', '2024-03-26 16:36:24'),
	('9c1b1e5c-eb86-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'adio', '2024-03-26 16:36:27'),
	('9cf2fcb4-ed55-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'nono', '2024-03-28 23:50:45'),
	('9e896d86-eb86-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'adio', '2024-03-26 16:36:31'),
	('a1d55df7-f586-11ee-895a-088fc38a7975', '7b03d874-f586-11ee-895a-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'gay', '2024-04-08 11:01:44'),
	('a3583de1-f586-11ee-895a-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '7b03d874-f586-11ee-895a-088fc38a7975', 'puta', '2024-04-08 11:01:47'),
	('a8543474-ed5a-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'asdasd', '2024-03-29 00:26:52'),
	('abf2d439-eb70-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'yameteeee', '2024-03-26 13:59:24'),
	('ac383e57-f585-11ee-895a-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '0867e9b1-ea2d-11ee-b877-088fc38a7975', 'asdas', '2024-04-08 10:54:52'),
	('ad3f6b97-f585-11ee-895a-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '0867e9b1-ea2d-11ee-b877-088fc38a7975', 'AAAAAAAAAA', '2024-04-08 10:54:54'),
	('b32f657b-f586-11ee-895a-088fc38a7975', '7b03d874-f586-11ee-895a-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '👿', '2024-04-08 11:02:13'),
	('b88593b1-f586-11ee-895a-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '7b03d874-f586-11ee-895a-088fc38a7975', '🤡', '2024-04-08 11:02:22'),
	('bf0b8fae-eb74-11ee-8d15-088fc38a7975', 'b51710a2-ead4-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'Callate coño', '2024-03-26 14:28:34'),
	('c0da7d5c-eb70-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'FUAAAA CARACTEEERRRR', '2024-03-26 13:59:59'),
	('c8ec0274-eb7d-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'el coño tu mama', '2024-03-26 15:33:16'),
	('d02fec80-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'lo recives?', '2024-03-28 23:52:11'),
	('d3bc6c7e-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'ahora?', '2024-03-28 23:52:17'),
	('d6132f98-eb70-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'no', '2024-03-26 14:00:35'),
	('d8489950-eb6e-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'Locooo', '2024-03-26 13:46:20'),
	('dcaa4a47-eb7d-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'puto', '2024-03-26 15:33:50'),
	('df88966c-eb7d-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'no', '2024-03-26 15:33:54'),
	('e23b347f-eb6e-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'Callate Puta', '2024-03-26 13:46:36'),
	('e36c75d5-ed4e-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'a78d12df-ead4-11ee-8940-088fc38a7975', 'uwu', '2024-03-28 23:02:37'),
	('e3fa0861-eb7d-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'nooo', '2024-03-26 15:34:02'),
	('e691f6be-eb7f-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'asdasd', '2024-03-26 15:48:25'),
	('e7c47b25-eb8a-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'no', '2024-03-26 17:07:12'),
	('e83abafb-eb7d-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'shhhh', '2024-03-26 15:34:09'),
	('eb030fc0-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '0867e9b1-ea2d-11ee-b877-088fc38a7975', 'tu', '2024-03-26 15:48:33'),
	('ed6ab90f-eb7d-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'shutup', '2024-03-26 15:34:18'),
	('ee81a04d-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'bro', '2024-03-28 23:53:02'),
	('f05a97fd-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'vamoosss', '2024-03-28 23:53:05'),
	('f14a8215-eb84-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'pla', '2024-03-26 16:24:31'),
	('f2084a0f-eb84-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'ola', '2024-03-26 16:24:32'),
	('f4874012-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'aqui', '2024-03-28 23:53:12'),
	('f53d6bca-ed55-11ee-98ca-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'no', '2024-03-28 23:53:13'),
	('f8e49912-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '0867e9b1-ea2d-11ee-b877-088fc38a7975', 'puto', '2024-03-29 00:00:29'),
	('f92dde85-eb6e-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'Retard', '2024-03-26 13:47:15'),
	('f9624c75-eb8a-11ee-8d15-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'uwu', '2024-03-26 17:07:41'),
	('fbd25f13-f03b-11ee-8a9c-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'chatbotai', 'xD', '2024-04-01 17:24:47'),
	('fc7f7e82-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'callateeeeeeeeeee', '2024-03-26 15:49:02'),
	('fcf65458-eb7d-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'warra', '2024-03-26 15:34:44'),
	('fd9510c2-eb7f-11ee-8d15-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '16548e94-ead3-11ee-8940-088fc38a7975', 'conio', '2024-03-26 15:49:04'),
	('fe0b3e93-ed56-11ee-98ca-088fc38a7975', '09ce6d2b-ea2b-11ee-b877-088fc38a7975', '0867e9b1-ea2d-11ee-b877-088fc38a7975', 'eres un put', '2024-03-29 00:00:38');

-- Volcando estructura para tabla dreikyzdb.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(200) NOT NULL DEFAULT uuid(),
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `avatar` text DEFAULT 'media/img/default.jpg',
  `status` varchar(50) DEFAULT 'Hello! I''m chatting',
  `connected` int(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla dreikyzdb.users: ~6 rows (aproximadamente)
INSERT INTO `users` (`id`, `email`, `username`, `password`, `avatar`, `status`, `connected`) VALUES
	('0867e9b1-ea2d-11ee-b877-088fc38a7975', 'jonialerkoryt@gmail.com', 'Jonialerkor', '$2b$10$hg9o1k9FOKkH/xcVNgOsYORb6NmuN6w3zMZGtLxWk46WbkrIGVan.', 'https://unchainedcrypto.com/wp-content/uploads/2023/07/pfp-nft.png', '24K me quedan 2 balas', 0),
	('09ce6d2b-ea2b-11ee-b877-088fc38a7975', 'gpostigovi@gmail.com', 'Dreikyzz', '$2b$10$jSWRdI0Wd4VGl.t/9nDh4eZF8jBPDx2k1GFjCl2zWZhPoKondJ3DC', 'https://i.seadn.io/gcs/files/3085b3fc65f00b28699b43efb4434eec.png', 'Hello! I\'m chatting', 0),
	('16548e94-ead3-11ee-8940-088fc38a7975', 'kailopi@gmail.com', 'Kailopi', '$2b$10$vMWY.LXF3MUi.RcHuuR3DeqGJbzxIrc6kW5APjS/e03WIDNp4BvIm', 'https://i.pinimg.com/564x/3d/4f/a6/3d4fa6b0a7cfa899ea2ffb1db7017b70.jpg', 'Hello! I\'m chatting', 0),
	('7b03d874-f586-11ee-895a-088fc38a7975', 'sierraalba72@gmail.com', 'efimael', '$2b$10$lPvhFFwOLDx5Cx7bldhiWOm45ISut8XsdszpbPqSalku9YTHiEmtG', 'media/img/default.jpg', 'Hello! I\'m chatting', 0),
	('a78d12df-ead4-11ee-8940-088fc38a7975', 'nachoasd@gmail.com', 'NachoASD', '$2b$10$hn21NbXJPbbqdZ.lZ1N37.jljQ.ZdTUCeCMRpPRCUrvWh8FMeYwNm', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTS-iPtLizJ5yHsC5BRkmhK2AQ5Mrs-_WLmw&usqp=CAU', '💻 Developer de MarbellaRP', 0),
	('b51710a2-ead4-11ee-8940-088fc38a7975', 'manuelprots@gmail.com', 'Manuelprots', '$2b$10$BcIiBbShJrQUvFB7r.KWC.2oz/lxhEmuGMM0X/fbV9NRMVKVnipge', 'https://images.8tracks.com/cover/i/012/803/497/Black-hat-Walter-White-Heisenberg-in-Breaking-Bad-1962.jpg', 'Night Gangwars', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
