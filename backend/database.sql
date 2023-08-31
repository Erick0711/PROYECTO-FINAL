CREATE TABLE person (select * from users
    id INT PRIMARY KEY IDENTITY(1,1),select * from users
    name VARCHAR(100),
    lastname VARCHAR(100),
    ci INT,
    phone INT,
    state TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO person (name, lastname, ci, phone) VALUES ('John', 'Doe', 7512512, 1354411);

CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_person INT FOREIGN KEY REFERENCES person(id),
    username VARCHAR(50),
    password VARCHAR(50),
    image VARCHAR(255),
    state TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE rol (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(30),
    state TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permission (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_user INT FOREIGN KEY REFERENCES user(id),
    id_rol INT FOREIGN KEY REFERENCES rol(id),
    state TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    
);