-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 04, 2025 at 10:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sponsor_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `nama`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', '2025-08-03 23:32:59', '$2y$12$9MakgXKJzV7CgXwygE9b1u/tBniX5e7ws2XZLr55lTTCE8iaZR38i', 'NlUQ1XWZY9', '2025-08-03 23:32:59', '2025-08-03 23:32:59');

-- --------------------------------------------------------

--
-- Table structure for table `benefits`
--

CREATE TABLE `benefits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sponsor_id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `benefits`
--

INSERT INTO `benefits` (`id`, `sponsor_id`, `nama`, `created_at`, `updated_at`) VALUES
(1, 1, 'Logo di poster acara', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(2, 1, 'Nama di closing credit', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(3, 2, 'Banner sponsor di venue', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(4, 2, 'Nama di website komunitas', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(5, 3, 'Post Sosial Media Iklan', '2025-08-03 23:50:18', '2025-08-03 23:50:18'),
(6, 3, 'Dibuatkan Banner Gratis', '2025-08-03 23:50:18', '2025-08-03 23:50:18'),
(7, 3, 'dada', '2025-08-03 23:50:18', '2025-08-03 23:50:18');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_03_29_024357_create_personal_access_tokens_table', 1),
(5, '2025_03_29_024752_create_admins_table', 1),
(6, '2025_03_29_024820_create_sponsors_table', 1),
(7, '2025_03_29_025012_create_benefits_table', 1),
(8, '2025_03_29_025223_create_user_transaksis_table', 1),
(9, '2025_03_29_025619_create_provider_transfers_table', 1),
(10, '2025_03_29_042650_create_pemberitahuans_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pemberitahuans`
--

CREATE TABLE `pemberitahuans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `transaksi_id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` longtext NOT NULL,
  `foto_bukti` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(4, 'App\\Models\\User', 1, 'user_token', '8aaa9d152aa84b1d1174b486884127acc4f427f078aa766ebc0e0a9f7e88802a', '[\"*\"]', '2025-08-04 00:37:12', NULL, '2025-08-04 00:27:45', '2025-08-04 00:37:12'),
(5, 'App\\Models\\Admin', 1, 'admin_token', 'fadc9cabe2639560221deff46cecd1c240c864117070483ee92f895d6f83459e', '[\"*\"]', '2025-08-04 01:20:37', NULL, '2025-08-04 00:38:20', '2025-08-04 01:20:37');

-- --------------------------------------------------------

--
-- Table structure for table `provider_transfers`
--

CREATE TABLE `provider_transfers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sponsor_id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `rekening_transfer` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `provider_transfers`
--

INSERT INTO `provider_transfers` (`id`, `sponsor_id`, `nama`, `rekening_transfer`, `created_at`, `updated_at`) VALUES
(1, 1, 'BCA', '2001234567', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(2, 1, 'Bank Mandiri', '3349842721', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(3, 2, 'BCA', '355213135113', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(4, 2, 'Bank Mandiri', '000987637172', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(5, 2, 'Dana', '41391839183', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(6, 3, 'BCA', '59524961984', '2025-08-03 23:50:18', '2025-08-03 23:50:18');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('4vLsfCkL2OVjHhX1jWY9BJnzYuZ79wqfPwp2IbQa', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMW9hZ3h4RDE2TzFvN3g4WVVjMjhaRWRZUVo3dEhmOTViaFBDY0FmSyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289647),
('65Swub0XaTMemP9SsGqPqdeVMuJ9JtagLgcL0l2b', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiS3JnSks1a1NsbHJ3SDVWaTQ4Y1dlc3lyN2tZSWZtQ1dBV2hZS2ZHViI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289646),
('6tipAyMqizykCRwq8tgpoxuOBOcNopBiezMidixL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVzFHR1pGYmQzUEZxUThYQWFCVDFKNEZ2WU50NnY1MzMwemhmRXdXeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdHJhbnNha3NpP3BhZ2U9MSZzaXplPTEwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289259),
('AWYiUWmgMqfSKW2Y4TyW39TTyhuwY7auOcMfHZzH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiV2ZtRkdublBFOVlGQ21GUWxkNldMTTI4SDdwNzZVN0x1Tk1rejRibiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289647),
('brKQwxGXHZkNC6cSUwbHtFFdFGmakQKL9yE6O0oU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQlozQ2hwNXBwYnBzaE43WFdlZWptQWFoMUlINUt2M2ZCMUkwY0RqdyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289648),
('CiQatftWaWqtscD5nhnzKyMLCy7o3aWcuTA7ol1G', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiRk91YklrSHVaQVVDOWhxQlY3dGpHTERIYXhYNEFWZXJyOTlYalpJNSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289395),
('cVeYtrkrsdRU85ciWvL0C21518XHpuH1MaXskvjx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaUg3U1IycTBlNFR2dXI5cmZ0aU5qa2Y2Q3BsVjBnVTk4VGxFWmtXZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754289181),
('FBIvy1rTHXGtuCZ6Nh61Jk9r6Jch04tIGumAej1i', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoidzBIb1UxaGFKTDNFWWUybXR5Q1R0VWFXRDgxTTV5Wk91WHhsUGY0MyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289644),
('HotEZLyBBQjiklg7h65tzA13AgGa4J8VYe44Dnmg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoieGo2VlVaZ1NLTkZlZUF6alI2Vk1zUVNCeTczQUdzczFuU3Z6Q2pEUSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289308),
('mkrZi2VPu96e1yOmzEPaI14niU6URAPwPwm9Y0a8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUDZyMEVKbTBJMDRDSXU0T0NrbUlTRGcxYXVxc3ZBR2FwZVM1dVBndyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdHJhbnNha3NpP3BhZ2U9MSZzaXplPTEwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289260),
('NMquO9PnKO5HeRX2vZZDBbGgGGXqixTNPzSczrdz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZGNXd204YjM2Tk5UZk0wdTJYQlJGSmw0YWFCVEZNMVZ4Z3J4d1h1RiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289648),
('oC8yTgtvhljgvgQKN0sfpLqqdIUiCL68Exhyy0ke', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoia203dnhZdUw3eDNSV0dBcVF2QzR6OEl0bnhNamhRVXVkTzZ4T1RkQyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289310),
('P5fNngFgoES2YiCbyzBnmx35blCfKQAQTqVoducD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMXNZbTdoNE1HNVBYaGZyMDNzOWFPNmRBVnA5VFY5Mjlhb1hJWXZaMiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289650),
('QHDK1g3SqZP8m7XmUSGfADYaLfhCUvwV8iLdQnm7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiS2tpSkRqWmVqVWdkeU1mc1F1N29PWk01YnRtQkloZE5HZzRvaWtSMyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289649),
('r4aLue95PWSyKb1uOEDGPbtx8dN9akn54nblr6g7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicnFVQWdvTlM4Nmw2STBUc2UxUVNJU1hPaXFjZU5xTDBGWVlDMkg0eiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289649),
('Rjm2chTHiSqVNiZbGwGuiCrxn0Z7NY3VWUGi7GuW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUXc4T0wyZGRubTZmb3dsQkJFcnpNSEt2bTJ4MFhmWTNrb0hkSkhUUSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289648),
('TSVEzYngktiEa8PhrAiUBtNHCut6R3xwmQr2zFhU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiY2h3U0FnM3JiUXZHcFV5T09UaFJEMFdNcHFtMFE4VEt4cktLd25zZyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289283),
('VOmc8CRg5mupyOsLilGYt1zy8I0fLwcpImqYpRDm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiN0pmME8wdVZVWUdRalRvT0xiWExkNndUT2t5YThhYlRwamJ5QmZ0WCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289646),
('YkbSw19UWDf01HudSiHPjMKaYxvXubU8pUCT2e3Q', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQnFnbG5oV1h0RG9pc0VxbXlwUWFFYkhxM1dzVDZzR3FwalFOUjdXeCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1754289649);

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `admin_id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `harga` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sponsors`
--

INSERT INTO `sponsors` (`id`, `admin_id`, `nama`, `harga`, `created_at`, `updated_at`) VALUES
(1, 1, 'Paket Platinum Sponsor', '200000', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(2, 1, 'Paket Gold Sponsor', '150000', '2025-08-03 23:32:59', '2025-08-03 23:32:59'),
(3, 1, 'Paket Diamond Sponsorship', '300000', '2025-08-03 23:50:18', '2025-08-03 23:50:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'user', 'user@gmail.com', '2025-08-03 23:32:58', '$2y$12$9cTpWpF7byVFaegPCPQOSOh9kaLRXae84HKmyhYDcAvCqWZ9vKQPG', 'r3cbUwWlgt', '2025-08-03 23:32:58', '2025-08-03 23:32:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_transaksis`
--

CREATE TABLE `user_transaksis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `sponsor_id` bigint(20) UNSIGNED NOT NULL,
  `rekening_transfer` varchar(255) NOT NULL,
  `nama_bisnis` varchar(255) NOT NULL,
  `provider_transfer` varchar(255) NOT NULL,
  `no_rekening` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `bukti_pembayaran` varchar(255) NOT NULL,
  `status` enum('diterima','menunggu','tidak diterima') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_transaksis`
--

INSERT INTO `user_transaksis` (`id`, `user_id`, `sponsor_id`, `rekening_transfer`, `nama_bisnis`, `provider_transfer`, `no_rekening`, `email`, `bukti_pembayaran`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '355213135113', 'Teh Pucuk Harum', 'BCA', '1039475759183', 'user@gmail.com', 'transaksi/IOy17FZQ3LVEvulsrAOckTXW2Qym6rmWtxejg5sC.png', 'menunggu', '2025-08-04 00:08:41', '2025-08-04 00:08:41'),
(2, 1, 2, '355213135113', 'Teh Pucuk Harum', 'BCA', '1039475759183', 'user@gmail.com', 'transaksi/URbXuSGZgmeyrLTUNaYc5uuQ0oWNbWPiUzRAWoLy.png', 'menunggu', '2025-08-04 00:08:55', '2025-08-04 00:08:55'),
(3, 1, 2, '000987637172', 'Teh Pucuk Harum', 'Bank Mandiri', '38914947558272', 'dimas@gmail.com', 'transaksi/7z0UjeqYsUBEJ90N4lKxYxlpuGeSiKnjvmViOBkL.jpg', 'menunggu', '2025-08-04 00:17:38', '2025-08-04 00:17:38'),
(4, 1, 2, '000987637172', 'Teh Pucuk Harum', 'Bank Mandiri', '38914947558272', 'dimas@gmail.com', 'transaksi/wf4q8O8249JatltOINB6fvBCazbJU7RArHfmyXfi.jpg', 'menunggu', '2025-08-04 00:17:43', '2025-08-04 00:17:43'),
(9, 1, 1, '2001234567', 'Teh Pucuk Harum', 'BCA', '38914947558272', 'pimpinan@gmail.com', 'transaksi/SdzcpPIOq18I5PpU6QxHx7Uf13xfi88MjqBkIkUH.jpg', 'menunggu', '2025-08-04 00:22:20', '2025-08-04 00:22:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `benefits`
--
ALTER TABLE `benefits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `benefits_sponsor_id_foreign` (`sponsor_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pemberitahuans`
--
ALTER TABLE `pemberitahuans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pemberitahuans_user_id_foreign` (`user_id`),
  ADD KEY `pemberitahuans_transaksi_id_foreign` (`transaksi_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `provider_transfers`
--
ALTER TABLE `provider_transfers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provider_transfers_sponsor_id_foreign` (`sponsor_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sponsors_admin_id_foreign` (`admin_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_transaksis`
--
ALTER TABLE `user_transaksis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_transaksis_user_id_foreign` (`user_id`),
  ADD KEY `user_transaksis_sponsor_id_foreign` (`sponsor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `benefits`
--
ALTER TABLE `benefits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pemberitahuans`
--
ALTER TABLE `pemberitahuans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `provider_transfers`
--
ALTER TABLE `provider_transfers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_transaksis`
--
ALTER TABLE `user_transaksis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `benefits`
--
ALTER TABLE `benefits`
  ADD CONSTRAINT `benefits_sponsor_id_foreign` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pemberitahuans`
--
ALTER TABLE `pemberitahuans`
  ADD CONSTRAINT `pemberitahuans_transaksi_id_foreign` FOREIGN KEY (`transaksi_id`) REFERENCES `user_transaksis` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pemberitahuans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `provider_transfers`
--
ALTER TABLE `provider_transfers`
  ADD CONSTRAINT `provider_transfers_sponsor_id_foreign` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD CONSTRAINT `sponsors_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_transaksis`
--
ALTER TABLE `user_transaksis`
  ADD CONSTRAINT `user_transaksis_sponsor_id_foreign` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_transaksis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
