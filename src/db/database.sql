DROP TABLE IF EXISTS film;

CREATE TABLE film (
	film_id serial PRIMARY KEY,
	source_id VARCHAR(10),
	internal_id VARCHAR(32),
	title VARCHAR (50) UNIQUE NOT NULL,
	image_url VARCHAR(512),
	UNIQUE (source_id, internal_id)
);
