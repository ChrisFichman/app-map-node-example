CREATE ROLE us_server WITH NOSUPERUSER NOCREATEDB NOCREATEROLE LOGIN PASSWORD 'appMapFtw';
\connect us_db;

CREATE SCHEMA url
    CREATE TABLE map (
        map_id serial PRIMARY KEY,
        orig_url VARCHAR (2048) UNIQUE NOT NULL,
        short_url VARCHAR (16) NOT NULL,
        created_on TIMESTAMP DEFAULT NOW(),
        accessed_on TIMESTAMP DEFAULT NOW()
    );