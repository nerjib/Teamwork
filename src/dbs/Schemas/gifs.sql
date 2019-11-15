CREATE TABLE IF NOT EXISTS
      gifs(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        title VARCHAR(128) NOT NULL,
        gifUrl TEXT NOT NULL,
        createdOn TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )