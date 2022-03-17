CREATE TABLE data (
    id int NOT NULL AUTO_INCREMENT,
    user_id INT,
    time TIMESTAMP,
    image VARCHAR(255),
    title VARCHAR(255),
    content TEXT(65535),
    PRIMARY KEY (id)
);

INSERT INTO data 
(
    user_id,
    time,
    image,
    title,
    content
)
VALUES
(
    0,
    NOW(),
    '0000.jpg',
    '8 WAYS TO EXPERIENCE TAIWAN IN SINGAPORE',
    'Taiwan is one of my all-time favourite places to visit I first took a trip to Taiwan in 2006 and since then have been there several more times, especially in recent years for projects like #TaiwanderingWithScoot and part of my solo career break. I had another trip due for 2020, this time with plans to hit Hualien that I last visited in 2007 and more of Taiwan’s east coast area. Obviously that didnt happen and since it looks like travel is going to take some time to recover again, I ended up working together with the Taiwan Tourism Board in Singapore to explore and see how I could possibly recreate a trip to Taiwan in Singapore.'
);

INSERT INTO data 
(
    user_id,
    time,
    image,
    title,
    content
)
VALUES
(
    1,
    NOW(),
    '0001.jpg',
    'A GUIDE TO SINGAPORE STREET ART IN BUKIT MERAH',
    'I love how Singapore street art is venturing out from the more commercial and touristy districts to the suburban heartland areas where people live like Jurong East to Ang Mo Kio, Bukit Merah is another new addition to residential neighbourhoods in Singapore that have a collection of cool new murals to check out. For my urban explorer readers and street art lovers, here is my guide to street art in Bukit Merah and some recommendations on places to check out in the neighbourhood while you’re there.'
);

DROP TABLE data;