const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Connect to SQLite database
const db = new sqlite3.Database('./billyDB.db');

// Helper function to save bills into the SQLite database
function saveBillToDatabase(service_name, connection_or_account, bill_number, total_amount, due_date, details) {
    const sql = `INSERT INTO Billing (service_name, connection_or_account, bill_number, total_amount, due_date, details)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [service_name, connection_or_account, bill_number, total_amount, due_date, details], function(err) {
        if (err) {
            console.error('Error saving bill to database:', err.message);
        } else {
            console.log('Bill saved successfully:', service_name, connection_or_account);
        }
    });
}

// Helper function for scraping DEI
async function scrapeDEI(username, password) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--window-size=1920,1080',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled',
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'
            ],
        });
        const page = await browser.newPage();

        // Navigate to DEI login page
        await page.goto('https://mydei.dei.gr/el/login/', { waitUntil: 'networkidle2' });

        // Accept cookies if present
        const acceptCookiesButton = await page.$('#onetrust-accept-btn-handler');
        if (acceptCookiesButton) {
            await acceptCookiesButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for the pop-up to close
        }

        // Login to DEI
        await page.type('#loginModel_Username', username);
        await page.type('#loginModel_Password', password);
        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
        ]);

        // Navigate to dashboard
        await page.goto('https://mydei.dei.gr/el/', { waitUntil: 'networkidle2' });

        // Extract billing information
        const billingInfo = await page.evaluate(() => {
            const accountNumber = document.querySelector('.e-card-type__txt')?.innerText.trim() || 'Not found';
            const address = document.querySelector('.b-card__title')?.innerText.trim() || 'Not found';
            const dueDate = document.querySelectorAll('.b-bill-sum-tiny__dd')[2]?.innerText.trim() || 'Not found';
            const paymentAmount = document.querySelector('.e-card-total__number')?.innerText.trim() || 'Not found';

            return {
                accountNumber,
                address,
                dueDate,
                paymentAmount
            };
        });

        await browser.close();

        // Save to database
        saveBillToDatabase('DEI', billingInfo.accountNumber, null, billingInfo.paymentAmount, billingInfo.dueDate, billingInfo.address);
        return { status: 'success', data: billingInfo };
    } catch (error) {
        console.error('Error during DEI scraping:', error.message);
        return { status: 'error', message: 'DEI scraping failed: ' + error.message };
    }
}

// Helper function for scraping Cosmote
async function scrapeCosmote(username, password) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--window-size=1920,1080',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled',
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'
            ],
        });
        const page = await browser.newPage();

        // Navigate to the Cosmote login page
        await page.goto('https://account.cosmote.gr/el/user-login', { waitUntil: 'networkidle2' });

        // Input username (email or mobile number)
        await page.type('#login', username);
        await page.evaluate(() => {
            document.querySelector('#next').click();
        });

        // Wait for the password field to appear
        await page.waitForSelector('#pwd', { visible: true });
        await page.type('#pwd', password);
        await page.evaluate(() => {
            document.querySelector('#next').click();
        });

        // Wait for navigation to complete after login
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Navigate to dashboard
        await page.goto('https://my.cosmote.gr/selfcare/jsp/dashboard.jsp', { waitUntil: 'networkidle2' });

        // Give the page additional time to fully load all elements
        await new Promise(resolve => setTimeout(resolve, 7000)); 

        // Extract billing information from the dashboard
        const billingInfo = await page.evaluate(() => {
            const bills = [];
            const cardSections = document.querySelectorAll('.cardWhite.withMargin.searchFilterBox');

            cardSections.forEach((card) => {
                const connection = card.querySelector('.cardLabelDropdownEntry div')?.innerText.trim() || 'No connection';
                const billNumber = card.querySelector('.cardLabel div')?.innerText.trim() || 'No bill number';
                const amountUnits = card.querySelector('.amountUnits')?.innerText.trim() || '0';
                const amountCents = card.querySelector('.amountCents')?.innerText.trim() || '00';
                const totalAmount = `${amountUnits},${amountCents}€`;
                const dueDate = card.querySelector('.cardText')?.innerText.trim() || 'No due date';

                bills.push({
                    connection,
                    billNumber,
                    totalAmount,
                    dueDate
                });
            });

            return bills;
        });

        await browser.close();

        // Save each bill to the database
        billingInfo.forEach(bill => {
            saveBillToDatabase('Cosmote', bill.connection, bill.billNumber, bill.totalAmount, bill.dueDate, 'Cosmote bill');
        });

        return { status: 'success', data: billingInfo };
    } catch (error) {
        console.error('Error during Cosmote scraping:', error.message);
        return { status: 'error', message: 'Cosmote scraping failed: ' + error.message };
    }
}

// POST route to handle scraping requests
app.post('/scrape', async (req, res) => {
    const { username, password, service } = req.body;

    if (service === 'dei') {
        const result = await scrapeDEI(username, password);
        return res.json(result);
    } else if (service === 'cosmote') {
        const result = await scrapeCosmote(username, password);
        return res.json(result);
    } else {
        return res.status(400).json({ status: 'error', message: 'Invalid service' });
    }
});

// API endpoint to fetch all bills from the database
app.get('/bills', (req, res) => {
    const sql = `SELECT service_name, connection_or_account, bill_number, total_amount, due_date, details FROM Billing`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});