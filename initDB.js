const sql = require("better-sqlite3");
const db = sql("database.db");

// Create services table with a type field
db.prepare(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    duration INTEGER NOT NULL,
    description TEXT,
    img TEXT,
    type TEXT NOT NULL CHECK(type IN ('service', 'offer'))
  )
`).run();

// Create pending jobs table
db.prepare(`
  CREATE TABLE IF NOT EXISTS pending_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    phone TEXT,
    email TEXT,
    address TEXT,
    gender TEXT,
    past_diseases TEXT,
    notes TEXT,
    service TEXT,
    date_appointed TEXT
  )
`).run();

// Create upcoming jobs table
db.prepare(`
  CREATE TABLE IF NOT EXISTS upcoming_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    phone TEXT,
    email TEXT,
    address TEXT,
    gender TEXT,
    past_diseases TEXT,
    notes TEXT,
    service TEXT,
    date_appointed TEXT,
    date_scheduled TEXT
  )
`).run();

// Create employees table
db.prepare(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    is_admin INTEGER NOT NULL DEFAULT 0
  )
`).run();

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  employee_id TEXT NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
)`);

// Create social media table
db.prepare(`
  CREATE TABLE IF NOT EXISTS social_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    link TEXT NOT NULL
  )
`).run();

// Create addresses table
db.prepare(`
  CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL,
    address TEXT NOT NULL
  )
`).run();

// Create phones table
db.prepare(`
  CREATE TABLE IF NOT EXISTS phones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL
  )
`).run();

// Function to initialize the database with sample data
async function initDB() {
  // Insert sample data into services table
  // db.prepare(`
  //   INSERT INTO services (name, price, duration, description, img, type) VALUES 
  //   ('Cupping', 25.0, 30, 'A professional haircut service', 'cupping.jpg', 'service'),
  //   ('Beard Trim', 15.0, 15, 'Beard trimming and shaping', 'cupping.jpg', 'service'),
  //   ('Hair Coloring', 75.0, 120, 'Full hair coloring service', 'cupping.jpg', 'service'),
  //   ('Manicure', 30.0, 45, 'Complete manicure service', 'cupping.jpg', 'service'),
  //   ('Spring Special', 50.0, 90, 'Discounted package for spring', 'cupping.jpg', 'offer'),
  //   ('Summer Deal', 40.0, 60, 'Special summer discount', 'cupping.jpg', 'offer')
  // `).run();

  // Insert sample data into employees table
  db.prepare(`
    INSERT INTO employees (username, password, email, is_admin) VALUES 
    ('employee1', 'password1', 'employee1@example.com', 0),
    ('admin', '12345678', 'admin@example.com', 1)
  `).run();

  // Insert sample data into social media table
  db.prepare(`
    INSERT INTO social_media (name, link) VALUES 
    ('Facebook', 'https://facebook.com'),
    ('Twitter', 'https://twitter.com')
  `).run();

  // Insert sample data into addresses table
  db.prepare(`
    INSERT INTO addresses (city, address) VALUES 
    ('New York', '123 Main St'),
    ('Los Angeles', '456 Elm St')
  `).run();

  // Insert sample data into phones table
  db.prepare(`
    INSERT INTO phones (name, phone) VALUES 
    ('Home', '123-456-7890'),
    ('Work', '098-765-4321')
  `).run();
}

initDB();
