-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20-Fev-2023 às 00:59
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `john_john finance`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `broker`
--

CREATE TABLE `broker` (
  `brokerID` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 => Inativo\r\n1 => ativo\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `broker`
--

INSERT INTO `broker` (`brokerID`, `description`, `status`) VALUES
(1, 'xp', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `register`
--

CREATE TABLE `register` (
  `registerID` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `entry` float NOT NULL,
  `output` float NOT NULL DEFAULT 0,
  `date` date DEFAULT NULL,
  `creationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `userID` int(11) NOT NULL,
  `typeInvestimentID` int(11) NOT NULL,
  `brokerID` int(11) NOT NULL,
  `tagID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `register`
--

INSERT INTO `register` (`registerID`, `description`, `entry`, `output`, `date`, `creationDate`, `updateDate`, `userID`, `typeInvestimentID`, `brokerID`, `tagID`) VALUES
(115, 'Aluguel', 500, 0, '2023-02-19', '2023-02-19 23:57:17', '2023-02-19 23:57:17', 4, 0, 0, 0),
(116, 'Divida banco', 0, 781, '2023-02-19', '2023-02-19 23:57:55', '2023-02-19 23:57:55', 4, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `typeinvestiment`
--

CREATE TABLE `typeinvestiment` (
  `typeInvestimentID` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 => Inativo\r\n1 => ativo\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `typeinvestiment`
--

INSERT INTO `typeinvestiment` (`typeInvestimentID`, `description`, `status`) VALUES
(1, 'tres', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birthDate` date NOT NULL,
  `description` varchar(50) NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 => Inativo\r\n1 => Ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`userID`, `name`, `email`, `birthDate`, `description`, `creationDate`, `updateDate`, `status`) VALUES
(4, 'Beatriz', 'Beatriz@gmail.com', '2001-07-28', 'nuloo', '2023-01-29 18:11:12', '2023-01-29 18:11:12', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `broker`
--
ALTER TABLE `broker`
  ADD PRIMARY KEY (`brokerID`);

--
-- Índices para tabela `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`registerID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `typeInvestimentID` (`typeInvestimentID`),
  ADD KEY `brokerID` (`brokerID`);

--
-- Índices para tabela `typeinvestiment`
--
ALTER TABLE `typeinvestiment`
  ADD PRIMARY KEY (`typeInvestimentID`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `broker`
--
ALTER TABLE `broker`
  MODIFY `brokerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `register`
--
ALTER TABLE `register`
  MODIFY `registerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT de tabela `typeinvestiment`
--
ALTER TABLE `typeinvestiment`
  MODIFY `typeInvestimentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `register`
--
ALTER TABLE `register`
  ADD CONSTRAINT `register_ibfk_3` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
