CREATE TABLE IF NOT EXISTS
      articles(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        title VARCHAR(128) NOT NULL,
        article TEXT NOT NULL,
        createdOn TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )