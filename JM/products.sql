-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 25, 2025 at 06:12 PM
-- Server version: 8.0.44-0ubuntu0.22.04.1
-- PHP Version: 8.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs2team64_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `notes` varchar(500) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_520_ci,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `brand`, `category`, `notes`, `price`, `description`, `image_url`) VALUES
(1, 'Aurora Oud', 'Luminous Scents', 'Signature Eau de Parfum', 'Oud, Amber, Vanilla', '89.99', 'Warm and deep evening scent with a rich oud base.', 'JM/images/aurora-oud.png'),
(2, 'Midnight Rose', 'Luminous Scents', 'Signature Eau de Parfum', 'Rose, Blackcurrant, Musk', '84.99', 'A romantic floral scent with dark fruity undertones and soft musk.', 'JM/images/midnight-rose.png'),
(3, 'Amber Eclipse', 'Luminous Scents', 'Signature Eau de Parfum', 'Amber, Patchouli, Tonka Bean', '87.50', 'A bold amber fragrance with warm resin and earthy depth.', 'JM/images/amber-eclipse.png'),
(4, 'Citrus Bloom', 'Luminous Scents', 'Signature Eau de Parfum', 'Bergamot, Neroli, Orange Blossom', '79.99', 'Bright and uplifting citrus floral perfect for daytime wear.', 'JM/images/citrus-bloom.png'),
(5, 'Velvet Oud', 'Luminous Scents', 'Signature Eau de Parfum', 'Oud, Saffron, Praline', '92.00', 'A luxurious gourmand oud with velvety sweetness and spice.', 'JM/images/velvet-oud.png'),
(6, 'Ocean Whisper', 'Luminous Scents', 'Signature Eau de Parfum', 'Sea Salt, Driftwood, Aquatic Notes', '82.00', 'Fresh, clean, and airy like a breeze off the ocean.', 'JM/images/ocean-whisper.png'),
(7, 'Lavender Dream', 'Luminous Scents', 'Luxury Eau de Toilette', 'Lavender, Iris, Soft Woods', '54.99', 'A calming lavender blend softened with powdery florals.', 'JM/images/lavender-dream.png'),
(8, 'Golden Sandalwood', 'Luminous Scents', 'Luxury Eau de Toilette', 'Sandalwood, Cardamom, Cream', '59.99', 'Smooth sandalwood enriched with warm spices and creamy undertones.', 'JM/images/golden-sandalwood.png'),
(9, 'Jasmine Veil', 'Luminous Scents', 'Luxury Eau de Toilette', 'Jasmine, Pear, White Musk', '52.50', 'A light, breezy jasmine fragrance wrapped in delicate musk.', 'JM/images/jasmine-veil.png'),
(10, 'Spiced Cedar', 'Luminous Scents', 'Luxury Eau de Toilette', 'Cedarwood, Cinnamon, Clove', '57.00', 'A warm woody scent with aromatic spices for cozy wear.', 'JM/images/spiced-cedar.png'),
(11, 'Fresh Horizon', 'Luminous Scents', 'Luxury Eau de Toilette', 'Mint, Lemon, Green Notes', '49.99', 'Crisp and energizing, perfect for a refreshing start to the day.', 'JM/images/fresh-horizon.png'),
(12, 'Rosewood Candle', 'Luminous Scents', 'Home Fragrance Collection', 'Rosewood, Amber, Floral Woods', '24.00', 'A rich wooden floral candle ideal for elegant home ambience.', 'JM/images/rosewood-candle.png'),
(13, 'Citrus Verbena Diffuser', 'Luminous Scents', 'Home Fragrance Collection', 'Verbena, Lemon Peel, Green Herbs', '27.50', 'Bright citrus aroma that freshens and energises any room.', 'JM/images/citrus-verbena-diffuser.png'),
(14, 'Vanilla Musk Wax Melts', 'Luminous Scents', 'Home Fragrance Collection', 'Vanilla, Musk, Soft Cream', '12.00', 'Sweet and cozy melts that create a warm, comforting atmosphere.', 'JM/images/vanilla-musk-wax-melts.png'),
(15, 'White Tea Linen Spray', 'Luminous Scents', 'Home Fragrance Collection', 'White Tea, Jasmine, Soft Musk', '18.00', 'A gentle and clean aromatic spray for linens and fabrics.', 'JM/images/white-tea-linen-spray.png'),
(16, 'Midnight Garden Incense', 'Luminous Scents', 'Home Fragrance Collection', 'Night-Blooming Jasmine, Patchouli, Earthy Woods', '14.50', 'Deep and aromatic incense reminiscent of a moonlit garden.', 'JM/images/midnight-garden-incense.png'),
(17, 'Discovery Sample Set (5 mini sprays)', 'Luminous Scents', 'Travel & Mini Sets', 'Mixed Notes', '19.99', 'A curated mini collection featuring five signature scents.', NULL),
(18, 'Pocket Perfume Roll-ons', 'Luminous Scents', 'Travel & Mini Sets', 'Various Notes', '14.99', 'Convenient roll-on perfumes ideal for on-the-go fragrance.', 'JM/images/pocket-perfume-roll-ons.png'),
(19, 'Duo Travel Set', 'Luminous Scents', 'Travel & Mini Sets', 'Citrus / Amber', '22.00', 'A balanced pair of bright daytime and warm nighttime scents.', 'JM/images/duo-travel-set.png'),
(20, 'Mini Candle Trio', 'Luminous Scents', 'Travel & Mini Sets', 'Floral / Citrus / Wood', '21.50', 'Three mini candles designed to match any mood or space.', 'JM/images/mini-candle-trio.png'),
(21, 'Refillable Atomizer Kit', 'Luminous Scents', 'Travel & Mini Sets', 'N/A', '16.99', 'A reusable atomizer for carrying your favorite perfume with ease.', 'JM/images/refillable-atomizer-kit.png'),
(22, 'Calming Lavender Mist', 'Luminous Scents', 'Wellness Aromatics', 'Lavender, Chamomile, Soft Woods', '13.50', 'A soothing mist that promotes calm and relaxation.', 'JM/images/calming-lavender-mist.png'),
(23, 'Energizing Citrus Oil Blend', 'Luminous Scents', 'Wellness Aromatics', 'Grapefruit, Lime, Mint', '11.99', 'A stimulating blend designed to boost mood and focus.', 'JM/images/energizing-citrus-oil-blend.png'),
(24, 'Focus Eucalyptus Roller', 'Luminous Scents', 'Wellness Aromatics', 'Eucalyptus, Peppermint, Tea Tree', '9.99', 'A refreshing roller blend ideal for clarity and concentration.', 'JM/images/focus-eucalyptus-roller.png'),
(25, 'Relaxing Chamomile Balm', 'Luminous Scents', 'Wellness Aromatics', 'Chamomile, Vanilla, Powder', '12.50', 'A gentle balm for stress relief and nighttime relaxation.', 'JM/images/relaxing-chamomile-balm.png'),
(26, 'Sleep Serenity Pillow Spray', 'Luminous Scents', 'Wellness Aromatics', 'Lavender, Clary Sage, Soft Musk', '15.00', 'A calming sleep-focused spray for restful nights.', 'JM/images/sleep-serenity-pillow-spray.png'),
(27, 'Aurora Oud', NULL, NULL, NULL, NULL, NULL, 'JM/images/aurora-oud.png'),
(28, 'Midnight Rose', NULL, NULL, NULL, NULL, NULL, 'JM/images/midnight-rose.png'),
(29, 'Amber Eclipse', NULL, NULL, NULL, NULL, NULL, 'JM/images/amber-eclipse.png'),
(30, 'Citrus Bloom', NULL, NULL, NULL, NULL, NULL, 'JM/images/citrus-bloom.png'),
(31, 'Velvet Oud', NULL, NULL, NULL, NULL, NULL, 'JM/images/velvet-oud.png'),
(32, 'Ocean Whisper', NULL, NULL, NULL, NULL, NULL, 'JM/images/ocean-whisper.png'),
(33, 'Lavender Dream', NULL, NULL, NULL, NULL, NULL, 'JM/images/lavender-dream.png'),
(34, 'Golden Sandalwood', NULL, NULL, NULL, NULL, NULL, 'JM/images/golden-sandalwood.png'),
(35, 'Jasmine Veil', NULL, NULL, NULL, NULL, NULL, 'JM/images/jasmine-veil.png'),
(36, 'Spiced Cedar', NULL, NULL, NULL, NULL, NULL, 'JM/images/spiced-cedar.png'),
(37, 'Fresh Horizon', NULL, NULL, NULL, NULL, NULL, 'JM/images/fresh-horizon.png'),
(38, 'Rosewood Candle', NULL, NULL, NULL, NULL, NULL, 'JM/images/rosewood-candle.png'),
(39, 'Citrus Verbena Diffuser', NULL, NULL, NULL, NULL, NULL, 'JM/images/citrus-verbena-diffuser.png'),
(40, 'Vanilla Musk Wax Melts', NULL, NULL, NULL, NULL, NULL, 'JM/images/vanilla-musk-wax-melts.png'),
(41, 'White Tea Linen Spray', NULL, NULL, NULL, NULL, NULL, 'JM/images/white-tea-linen-spray.png'),
(42, 'Midnight Garden Incense', NULL, NULL, NULL, NULL, NULL, 'JM/images/midnight-garden-incense.png'),
(43, 'Discovery Sample Set', NULL, NULL, NULL, NULL, NULL, 'JM/images/discovery-sample-set.png'),
(44, 'Pocket Perfume Roll-Ons', NULL, NULL, NULL, NULL, NULL, 'JM/images/pocket-perfume-roll-ons.png'),
(45, 'Duo Travel Set', NULL, NULL, NULL, NULL, NULL, 'JM/images/duo-travel-set.png'),
(46, 'Mini Candle Trio', NULL, NULL, NULL, NULL, NULL, 'JM/images/mini-candle-trio.png'),
(47, 'Refillable Atomizer Kit', NULL, NULL, NULL, NULL, NULL, 'JM/images/refillable-atomizer-kit.png'),
(48, 'Calming Lavender Mist', NULL, NULL, NULL, NULL, NULL, 'JM/images/calming-lavender-mist.png'),
(49, 'Energizing Citrus Oil Blend', NULL, NULL, NULL, NULL, NULL, 'JM/images/energizing-citrus-oil-blend.png'),
(50, 'Focus Eucalyptus Roller', NULL, NULL, NULL, NULL, NULL, 'JM/images/focus-eucalyptus-roller.png'),
(51, 'Relaxing Chamomile Balm', NULL, NULL, NULL, NULL, NULL, 'JM/images/relaxing-chamomile-balm.png'),
(52, 'Sleep Serenity Pillow Spray', NULL, NULL, NULL, NULL, NULL, 'JM/images/sleep-serenity-pillow-spray.png'),
(53, 'Aurora Oud', NULL, NULL, NULL, NULL, NULL, 'JM/images/aurora-oud.png'),
(54, 'Midnight Rose', NULL, NULL, NULL, NULL, NULL, 'JM/images/midnight-rose.png'),
(55, 'Amber Eclipse', NULL, NULL, NULL, NULL, NULL, 'JM/images/amber-eclipse.png'),
(56, 'Citrus Bloom', NULL, NULL, NULL, NULL, NULL, 'JM/images/citrus-bloom.png'),
(57, 'Velvet Oud', NULL, NULL, NULL, NULL, NULL, 'JM/images/velvet-oud.png'),
(58, 'Ocean Whisper', NULL, NULL, NULL, NULL, NULL, 'JM/images/ocean-whisper.png'),
(59, 'Lavender Dream', NULL, NULL, NULL, NULL, NULL, 'JM/images/lavender-dream.png'),
(60, 'Golden Sandalwood', NULL, NULL, NULL, NULL, NULL, 'JM/images/golden-sandalwood.png'),
(61, 'Jasmine Veil', NULL, NULL, NULL, NULL, NULL, 'JM/images/jasmine-veil.png'),
(62, 'Spiced Cedar', NULL, NULL, NULL, NULL, NULL, 'JM/images/spiced-cedar.png'),
(63, 'Fresh Horizon', NULL, NULL, NULL, NULL, NULL, 'JM/images/fresh-horizon.png'),
(64, 'Rosewood Candle', NULL, NULL, NULL, NULL, NULL, 'JM/images/rosewood-candle.png'),
(65, 'Citrus Verbena Diffuser', NULL, NULL, NULL, NULL, NULL, 'JM/images/citrus-verbena-diffuser.png'),
(66, 'Vanilla Musk Wax Melts', NULL, NULL, NULL, NULL, NULL, 'JM/images/vanilla-musk-wax-melts.png'),
(67, 'White Tea Linen Spray', NULL, NULL, NULL, NULL, NULL, 'JM/images/white-tea-linen-spray.png'),
(68, 'Midnight Garden Incense', NULL, NULL, NULL, NULL, NULL, 'JM/images/midnight-garden-incense.png'),
(69, 'Discovery Sample Set', NULL, NULL, NULL, NULL, NULL, 'JM/images/discovery-sample-set.png'),
(70, 'Pocket Perfume Roll-Ons', NULL, NULL, NULL, NULL, NULL, 'JM/images/pocket-perfume-roll-ons.png'),
(71, 'Duo Travel Set', NULL, NULL, NULL, NULL, NULL, 'JM/images/duo-travel-set.png'),
(72, 'Mini Candle Trio', NULL, NULL, NULL, NULL, NULL, 'JM/images/mini-candle-trio.png'),
(73, 'Refillable Atomizer Kit', NULL, NULL, NULL, NULL, NULL, 'JM/images/refillable-atomizer-kit.png'),
(74, 'Calming Lavender Mist', NULL, NULL, NULL, NULL, NULL, 'JM/images/calming-lavender-mist.png'),
(75, 'Energizing Citrus Oil Blend', NULL, NULL, NULL, NULL, NULL, 'JM/images/energizing-citrus-oil-blend.png'),
(76, 'Focus Eucalyptus Roller', NULL, NULL, NULL, NULL, NULL, 'JM/images/focus-eucalyptus-roller.png'),
(77, 'Relaxing Chamomile Balm', NULL, NULL, NULL, NULL, NULL, 'JM/images/relaxing-chamomile-balm.png'),
(78, 'Sleep Serenity Pillow Spray', NULL, NULL, NULL, NULL, NULL, 'JM/images/sleep-serenity-pillow-spray.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
