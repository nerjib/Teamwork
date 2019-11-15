CREATE TABLE IF NOT EXISTS
      comments(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        comment TEXT NOT NULL,
        articleID INTEGER NOT NULL,
        post_date TIMESTAMP,
        FOREIGN KEY (articleid) REFERENCES articles(id)
      )