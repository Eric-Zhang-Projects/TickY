CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    payment_info_id integer UNIQUE,
    detailed_info_id integer UNIQUE
)

CREATE TABLE payment_info (
    user_id integer PRIMARY KEY REFERENCES user (id),
)

CREATE TABLE detailed_info (
    user_id integer PRIMARY KEY REFERENCES user (id),
)

CREATE TABLE venue (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(300) NOT NULL,
    location VARCHAR(50) NOT NULL,
    state VARCHAR(15) NOT NULL
);

CREATE TABLE artist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(200)
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    venue_id integer REFERENCES venue (id),
    description VARCHAR(300),
    date VARCHAR(10) NOT NULL
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE
);

CREATE TABLE event_artist (
    id SERIAL PRIMARY KEY,
    event_id integer REFERENCES event (id) ON DELETE CASCADE,
    artist_id integer REFERENCES artist (id)
);

CREATE TABLE ticket (
    id SERIAL PRIMARY KEY,
    event_id integer REFERENCES event (id),
    owner_id integer REFERENCES user (id),
    auction_id integer REFERENCES auction (id),
    seating_area VARCHAR(10) NOT NULL
    data text,
)

CREATE TABLE auction (
    id SERIAL PRIMARY KEY,
    ticket_id integer REFERENCES ticket (id),
    seller_id integer REFERENCES ticket (owner_id),
    winning_bid_id integer REFERENCES bid (id),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300),
    is_closed boolean NOT NULL,
    expiration_date DATE NOT NULL,
    ask_price money NOT_NULL,
    ticket_quantity integer NOT_NULL
)

CREATE TABLE bid (
    id SERIAL PRIMARY KEY,
    auction_id integer REFERENCES auction (id),
    bidder_id integer REFERENCES user (id) ,
    offer money NOT_NULL,
    date_placed TIMESTAMP NOT_NULL,
    is_active boolean NOT_NULL
)