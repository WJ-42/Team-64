/**
 * SQL Parser for extracting product data from products.sql file
 * Parses INSERT statements and extracts product information
 */

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
     * Split SQL entry fields properly handling quoted strings
     * @param {string} entry - Product entry string
     * @returns {Array} Array of field values
     */
    splitFields(entry) {
        const fields = [];
        let current = '';
        let inQuotes = false;
        let escapeNext = false;
        let parenDepth = 0;
        
        console.log('Splitting entry:', entry.substring(0, 100) + '...');
        
        for (let i = 0; i < entry.length; i++) {
            const char = entry[i];
            
            if (escapeNext) {
                current += char;
                escapeNext = false;
                continue;
            }
            
            if (char === '\\') {
                escapeNext = true;
                continue;
            }
            
            // Handle parentheses for nested values
            if (char === '(') {
                parenDepth++;
                current += char;
                continue;
            } else if (char === ')') {
                parenDepth--;
                current += char;
                continue;
            }
            
            // Handle quotes
            if (char === "'" && !inQuotes) {
                inQuotes = true;
            } else if (char === "'" && inQuotes) {
                inQuotes = false;
            } else if (char === ',' && !inQuotes && parenDepth === 0) {
                fields.push(current.trim());
                current = '';
                continue;
            }
            
            current += char;
        }
        
        // Add the last field
        if (current.trim()) {
            fields.push(current.trim());
        }
        
        console.log(`Split into ${fields.length} fields`);
        return fields;
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
     * Load and parse products.sql file
     * @returns {Promise<Array>} Promise resolving to product array
     */
    async loadProducts() {
        try {
            console.log('Fetching products.sql file...');
            const response = await fetch('products.sql');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const sqlContent = await response.text();
            console.log('SQL file loaded successfully, size:', sqlContent.length);
            
            const products = this.parseSQL(sqlContent);
            console.log('SQL parsing completed:', products.length, 'products');
            
            return products;
        } catch (error) {
            console.error('Error loading products.sql:', error);
            throw error;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SQLParser;
}