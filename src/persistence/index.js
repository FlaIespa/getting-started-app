if (process.env.DATABASE_URL) {
    console.log("Using PostgreSQL:", process.env.DATABASE_URL);
    module.exports = require('./postgresql'); // You’ll create this next.
} else if (process.env.MYSQL_HOST) {
    console.log("Using MySQL:", process.env.MYSQL_HOST);
    module.exports = require('./mysql');
} else {
    console.log("Using SQLite as a fallback.");
    module.exports = require('./sqlite');
}
