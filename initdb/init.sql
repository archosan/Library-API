CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score DECIMAL(3, 1) NULL
);

CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    loan_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO users (name) VALUES
('John Doe'),
('Jane Smith'),
('Alice Johnson'),
('Bob Brown'),
('Charlie Davis'),
('Daisy Evans'),
('Ethan Hill'),
('Grace Lee'),
('Henry White'),
('Isabel Clark');

INSERT INTO books (name, score) VALUES
('To Kill a Mockingbird', 9.0),
('Pride and Prejudice', 8.5),
('The Catcher in the Rye', 8.7),
('Gone with the Wind',0.5),
('The Great Gatsby', 8.7),
('One Hundred Years of Solitude', 9.3),
('A Passage to India', 8.5),
('Invisible Man', 8.6),
('Don Quixote', 8.9),
('Beloved', 9.2),
('Mrs. Dalloway', 7.8),
('Things Fall Apart', 8.4);