CREATE TABLE data (
    user_id INT,
    time TIMESTAMP,
    content TEXT(65535)
);

INSERT INTO data 
(
    user_id,
    time,
    content
)
VALUES
(
    0,
    NOW(), 
    'test content'
);