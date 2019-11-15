CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        fName VARCHAR(100) NOT NULL,
        lName VARCHAR(100) Null,
        username VARCHAR(100) UNIQUE NOT NULL,
        pWord TEXT NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        role VARCHAR(100) Null,
        dept VARCHAR(100) NOT NULL,
        address VARCHAR(255) NULL,
        created_date TIMESTAMP
      )