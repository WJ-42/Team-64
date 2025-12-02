/**
 * SQL Parser for extracting product data from embedded products.sql content
 * Parses INSERT statements and extracts product information
 */

const EMBEDDED_SQL_DATA = `-- phpMyAdmin SQL Dump
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
-- Database: \`cs2team64_db\`
--

-- --------------------------------------------------------

--
-- Table structure for table \`products\`
--

CREATE TABLE \`products\` (
  \`id\` int NOT NULL,
  \`product_name\` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  \`brand\` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  \`category\` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  \`notes\` varchar(500) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  \`price\` decimal(10,2) DEFAULT NULL,
  \`description\` text COLLATE utf8mb4_unicode_520_ci,
  \`image_url\` varchar(500) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table \`products\`
--

INSERT INTO \`products\` (\`id\`, \`product_name\`, \`brand\`, \`category\`, \`notes\`, \`price\`, \`description\`, \`image_url\`) VALUES
(1, 'Aurora Oud', 'Luminous Scents', 'Signature Eau de Parfum', 'Oud, Amber, Vanilla', '89.99', 'Warm and deep evening scent with a rich oud base.', 'images/aurora-oud.png'),
(2, 'Midnight Rose', 'Luminous Scents', 'Signature Eau de Parfum', 'Rose, Blackcurrant, Musk', '84.99', 'A romantic floral scent with dark fruity undertones and soft musk.', 'images/midnight-rose.png'),
(3, 'Amber Eclipse', 'Luminous Scents', 'Signature Eau de Parfum', 'Amber, Patchouli, Tonka Bean', '87.50', 'A bold amber fragrance with warm resin and earthy depth.', 'images/amber-eclipse.png'),
(4, 'Citrus Bloom', 'Luminous Scents', 'Signature Eau de Parfum', 'Bergamot, Neroli, Orange Blossom', '79.99', 'Bright and uplifting citrus floral perfect for daytime wear.', 'images/citrus-bloom.png'),
(5, 'Velvet Oud', 'Luminous Scents', 'Signature Eau de Parfum', 'Oud, Saffron, Praline', '92.00', 'A luxurious gourmand oud with velvety sweetness and spice.', 'images/velvet-oud.png'),
(6, 'Ocean Whisper', 'Luminous Scents', 'Signature Eau de Parfum', 'Sea Salt, Driftwood, Aquatic Notes', '82.00', 'Fresh, clean, and airy like a breeze off the ocean.', 'images/ocean-whisper.png'),
(7, 'Lavender Dream', 'Luminous Scents', 'Luxury Eau de Toilette', 'Lavender, Iris, Soft Woods', '54.99', 'A calming lavender blend softened with powdery florals.', 'images/lavender-dream.png'),
(8, 'Golden Sandalwood', 'Luminous Scents', 'Luxury Eau de Toilette', 'Sandalwood, Cardamom, Cream', '59.99', 'Smooth sandalwood enriched with warm spices and creamy undertones.', 'images/golden-sandalwood.png'),
(9, 'Jasmine Veil', 'Luminous Scents', 'Luxury Eau de Toilette', 'Jasmine, Pear, White Musk', '52.50', 'A light, breezy jasmine fragrance wrapped in delicate musk.', 'images/jasmine-veil.png'),
(10, 'Spiced Cedar', 'Luminous Scents', 'Luxury Eau de Toilette', 'Cedarwood, Cinnamon, Clove', '57.00', 'A warm woody scent with aromatic spices for cozy wear.', 'images/spiced-cedar.png'),
(11, 'Fresh Horizon', 'Luminous Scents', 'Luxury Eau de Toilette', 'Mint, Lemon, Green Notes', '49.99', 'Crisp and energizing, perfect for a refreshing start to the day.', 'images/fresh-horizon.png'),
(12, 'Rosewood Candle', 'Luminous Scents', 'Home Fragrance Collection', 'Rosewood, Amber, Floral Woods', '24.00', 'A rich wooden floral candle ideal for elegant home ambience.', 'images/rosewood-candle.png'),
(13, 'Citrus Verbena Diffuser', 'Luminous Scents', 'Home Fragrance Collection', 'Verbena, Lemon Peel, Green Herbs', '27.50', 'Bright citrus aroma that freshens and energises any room.', 'images/citrus-verbena-diffuser.png'),
(14, 'Vanilla Musk Wax Melts', 'Luminous Scents', 'Home Fragrance Collection', 'Vanilla, Musk, Soft Cream', '12.00', 'Sweet and cozy melts that create a warm, comforting atmosphere.', 'images/vanilla-musk-wax-melts.png'),
(15, 'White Tea Linen Spray', 'Luminous Scents', 'Home Fragrance Collection', 'White Tea, Jasmine, Soft Musk', '18.00', 'A gentle and clean aromatic spray for linens and fabrics.', 'images/white-tea-linen-spray.png'),
(16, 'Midnight Garden Incense', 'Luminous Scents', 'Home Fragrance Collection', 'Night-Blooming Jasmine, Patchouli, Earthy Woods', '14.50', 'Deep and aromatic incense reminiscent of a moonlit garden.', 'images/midnight-garden-incense.png'),
(17, 'Discovery Sample Set (5 mini sprays)', 'Luminous Scents', 'Travel & Mini Sets', 'Mixed Notes', '19.99', 'A curated mini collection featuring five signature scents.', 'images/discovery-sample-set.png'),
(18, 'Pocket Perfume Roll-ons', 'Luminous Scents', 'Travel & Mini Sets', 'Various Notes', '14.99', 'Convenient roll-on perfumes ideal for on-the-go fragrance.', 'images/pocket-perfume-roll-ons.png'),
(19, 'Duo Travel Set', 'Luminous Scents', 'Travel & Mini Sets', 'Citrus / Amber', '22.00', 'A balanced pair of bright daytime and warm nighttime scents.', 'images/duo-travel-set.png'),
(20, 'Mini Candle Trio', 'Luminous Scents', 'Travel & Mini Sets', 'Floral / Citrus / Wood', '21.50', 'Three mini candles designed to match any mood or space.', 'images/mini-candle-trio.png'),
(21, 'Refillable Atomizer Kit', 'Luminous Scents', 'Travel & Mini Sets', 'N/A', '16.99', 'A reusable atomizer for carrying your favorite perfume with ease.', 'images/refillable-atomizer-kit.png'),
(22, 'Calming Lavender Mist', 'Luminous Scents', 'Wellness Aromatics', 'Lavender, Chamomile, Soft Woods', '13.50', 'A soothing mist that promotes calm and relaxation.', 'images/calming-lavender-mist.png'),
(23, 'Energizing Citrus Oil Blend', 'Luminous Scents', 'Wellness Aromatics', 'Grapefruit, Lime, Mint', '11.99', 'A stimulating blend designed to boost mood and focus.', 'images/energizing-citrus-oil-blend.png'),
(24, 'Focus Eucalyptus Roller', 'Luminous Scents', 'Wellness Aromatics', 'Eucalyptus, Peppermint, Tea Tree', '9.99', 'A refreshing roller blend ideal for clarity and concentration.', 'images/focus-eucalyptus-roller.png'),
(25, 'Relaxing Chamomile Balm', 'Luminous Scents', 'Wellness Aromatics', 'Chamomile, Vanilla, Powder', '12.50', 'A gentle balm for stress relief and nighttime relaxation.', 'images/relaxing-chamomile-balm.png'),
(26, 'Sleep Serenity Pillow Spray', 'Luminous Scents', 'Wellness Aromatics', 'Lavender, Clary Sage, Soft Musk', '15.00', 'A calming sleep-focused spray for restful nights.', 'images/sleep-serenity-pillow-spray.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table \`products\`
--
ALTER TABLE \`products\`
  ADD PRIMARY KEY (\`id\`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table \`products\`
--
ALTER TABLE \`products\`
  MODIFY \`id\` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;`;

class SQLParser {
    constructor() {
        this.products = [];
    }

    /**
     * Parse SQL content and extract product data
     * @param {string} sqlContent - The raw SQL content
     * @returns {Array} Array of product objects
     */
    parseSQL(sqlContent) {
        console.log('Starting SQL parsing...');
        
        // Extract INSERT statement values
        const insertMatch = sqlContent.match(/INSERT INTO `products`[^;]*VALUES\s*([\s\S]*?);\n/);
        
        if (!insertMatch) {
            console.error('No INSERT statement found');
            return [];
        }

        const valuesSection = insertMatch[1];
        console.log('Found VALUES section, extracting product entries...');
        
        // Split by product entries - each entry is separated by '),\n('
        const productEntries = valuesSection.split(/'\),\s*\n\s*\(/);
        
        // Clean up the first and last entries (they have extra characters)
        if (productEntries.length > 0) {
            productEntries[0] = productEntries[0].replace(/^[\s\n]*\(/, '');
        }
        if (productEntries[productEntries.length - 1]) {
            productEntries[productEntries.length - 1] = productEntries[productEntries.length - 1].replace(/\)\s*;\s*[\s\S]*$/, '');
        }
        
        console.log(`Found ${productEntries.length} product entries`);
        console.log('Sample entry:', productEntries[0]?.substring(0, 200) + '...');
        
        this.products = [];
        
        productEntries.forEach((entry, index) => {
            try {
                const product = this.parseProductEntry(entry, index);
                if (product) {
                    this.products.push(product);
                }
            } catch (error) {
                console.error(`Error parsing product entry ${index + 1}:`, error, 'Entry:', entry);
            }
        });
        
        console.log(`Successfully parsed ${this.products.length} products`);
        return this.products;
    }

    /**
     * Parse a single product entry from SQL
     * @param {string} entry - Raw product entry string
     * @param {number} index - Entry index for error reporting
     * @returns {Object|null} Product object or null if parsing fails
     */
    parseProductEntry(entry, index) {
        console.log(`Raw entry ${index + 1}:`, entry.substring(0, 200) + '...');
        
        // Clean up the entry first
        let cleanEntry = entry.trim();
        if (cleanEntry.startsWith('(') && cleanEntry.endsWith(')')) {
            cleanEntry = cleanEntry.slice(1, -1);
        }
        
        // Parse using a more robust approach - split by comma but handle quotes
        const fields = [];
        let current = '';
        let inSingleQuotes = false;
        let inDoubleQuotes = false;
        
        for (let i = 0; i < cleanEntry.length; i++) {
            const char = cleanEntry[i];
            
            if (char === "'" && !inDoubleQuotes) {
                inSingleQuotes = !inSingleQuotes;
                current += char;
            } else if (char === '"' && !inSingleQuotes) {
                inDoubleQuotes = !inDoubleQuotes;
                current += char;
            } else if (char === ',' && !inSingleQuotes && !inDoubleQuotes) {
                fields.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        // Add the last field
        if (current.trim()) {
            fields.push(current.trim());
        }
        
        console.log(`Split into ${fields.length} fields:`, fields.map(f => f.substring(0, 30) + '...'));
        
        // Extract fields
        const id = this.parseIntField(fields[0]);
        const productName = this.parseStringField(fields[1]);
        const brand = this.parseStringField(fields[2]);
        const category = this.parseStringField(fields[3]);
        const notes = this.parseStringField(fields[4]);
        const price = this.parseDecimalField(fields[5]);
        const description = this.parseStringField(fields[6]);
        let imageUrl = this.parseStringField(fields[7]) || '';
        
        // ULTRA-AGGRESSIVE cleanup for image URL
        if (imageUrl) {
            // Handle NULL values first
            if (imageUrl.toUpperCase() === 'NULL' || !imageUrl) {
                imageUrl = '';
            } else {
                // Remove ALL quotes from start/end and anywhere they might be
                imageUrl = imageUrl.replace(/^['"]+/, '').replace(/['"]+$/, '');
                imageUrl = imageUrl.replace(/^JM\/images\//, 'images/');
                
                // Remove any trailing SQL artifacts like '), ), etc.
                imageUrl = imageUrl.replace(/['"]\s*\)?\s*$/, '');
                
                // Fix the spice cedar typo
                if (imageUrl.includes('spice-cedar.png')) {
                    imageUrl = imageUrl.replace('spice-cedar.png', 'spiced-cedar.png');
                }
            }
            
            console.log(`Final image URL for ${productName}: "${imageUrl}"`);
        }
        
        const product = {
            id,
            product_name: productName,
            brand,
            category,
            notes,
            price,
            description,
            image_url: imageUrl
        };
        
        console.log(`Parsed product ${index + 1}: ${productName} (Image: "${imageUrl}")`);
        return product;
    }

    /**
     * Parse integer field
     * @param {string} value - Field value
     * @returns {number} Parsed integer
     */
    parseIntField(value) {
        const cleanValue = value.replace(/[\s'"]/g, '');
        return parseInt(cleanValue, 10) || 0;
    }

    /**
     * Parse string field (removes quotes and unescapes)
     * @param {string} value - Field value
     * @returns {string} Cleaned string
     */
    parseStringField(value) {
        if (!value || value.toUpperCase() === 'NULL') {
            return '';
        }
        
        let cleanValue = value.trim();
        // Remove surrounding quotes
        if ((cleanValue.startsWith("'") && cleanValue.endsWith("'")) ||
            (cleanValue.startsWith('"') && cleanValue.endsWith('"'))) {
            cleanValue = cleanValue.slice(1, -1);
        }
        
        // Unescape SQL strings
        cleanValue = cleanValue.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        
        return cleanValue;
    }

    /**
     * Parse decimal field
     * @param {string} value - Field value
     * @returns {number} Parsed decimal
     */
    parseDecimalField(value) {
        const cleanValue = value.replace(/[\s'"]/g, '');
        const parsed = parseFloat(cleanValue);
        return isNaN(parsed) ? 0 : parsed;
    }

    /**
     * Load and parse embedded SQL data
     * @returns {Promise<Array>} Promise resolving to product array
     */
    async loadProducts() {
        try {
            console.log('Loading embedded SQL data...');
            
            const sqlContent = EMBEDDED_SQL_DATA;
            console.log('Embedded SQL data loaded, size:', sqlContent.length);
            
            const products = this.parseSQL(sqlContent);
            console.log('SQL parsing completed:', products.length, 'products');
            
            return products;
        } catch (error) {
            console.error('Error loading embedded SQL data:', error);
            throw error;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SQLParser;
}