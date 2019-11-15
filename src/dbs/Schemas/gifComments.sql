CREATE TABLE IF NOT EXISTS
      gifComments(
        id SERIAL PRIMARY KEY,
        userid INT NOT NULL,
        comment TEXT NOT NULL,
        gifID INTEGER NOT NULL,
        post_date TIMESTAMP,
        FOREIGN KEY (gifid) REFERENCES gifs(id)
      )