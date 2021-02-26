CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    name VARHCAR(30),
    seller_rating REAL,
    customer_id VARCHAR(18)
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
    id VARCHAR(36) PRIMARY KEY,
    seating_area VARCHAR(10) NOT NULL,
    data text,
    picture text
)
    --event_id integer REFERENCES event (id),
    --owner_id integer REFERENCES users (id),
    --auction_id integer REFERENCES auction (id),

CREATE TABLE user_ticket_event_auction (
    user_id VARCHAR(36) REFERENCES users (id) ON DELETE CASCADE,
    ticket_id VARCHAR(36) REFERENCES ticket (id) ON DELETE CASCADE,
    event_id integer REFERENCES event (id) ON DELETE CASCADE,
    auction_id VARCHAR(36) REFERENCES auction (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, ticket_id, event_id, auction_id)
)

CREATE TABLE auction (
    id VARCHAR(36) PRIMARY KEY,
    winning_bid_id integer,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300),
    is_closed boolean NOT NULL,
    expiration_date DATE NOT NULL,
    ask_price money NOT NULL,
    ticket_quantity integer NOT NULL
)
    --ticket_id integer REFERENCES ticket (id),
    --seller_id integer REFERENCES ticket (owner_id),

CREATE TABLE bid (
    id VARCHAR(36) PRIMARY KEY,
    auction_id VARCHAR(36) REFERENCES auction (id),
    bidder_id VARCHAR(36) REFERENCES users (id) ,
    offer money NOT NULL,
    date_placed TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active boolean NOT NULL
)