  
DROP DATABASE DESKLIT;
create DATABASE DESKLIT;
USE DESKLIT;

CREATE TABLE USER(
    ID int NOT NULL AUTO_INCREMENT,
    EMAIL varchar(255) NOT NULL,
    PASSWORD varchar(255) NOT NULL,
    ROLE varchar(255) NOT NULL,
    PRIMARY KEY (ID),
    UNIQUE KEY unique_email (EMAIL)
);


CREATE TABLE CLIENT(
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL,
    COLOR varchar(255) NOT NULL,
    DESCRIPTION varchar(255) NOT NULL,
    UNIQUE KEY unique_client_name (NAME),
    PRIMARY KEY (ID)
);

CREATE TABLE DOMAIN(
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL,
    CLIENT_ID int NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (CLIENT_ID) REFERENCES CLIENT(ID)
);

CREATE TABLE TAG(
    ID int NOT NULL AUTO_INCREMENT,
    NAME varchar(255) NOT NULL,
    UNIQUE KEY unique_tag_name (NAME),
    PRIMARY KEY (ID)
);

CREATE TABLE ARTICLE(
    ID int NOT NULL AUTO_INCREMENT,
    TITLE varchar(255) NOT NULL,
    CONTENT varchar(2000) NOT NULL,
    CREATOR_ID int NOT NULL,
    CLIENT_ID int NOT NULL,
    UNIQUE KEY unique_article_title_per_client (TITLE,CLIENT_ID),
    PRIMARY KEY (ID),
    FOREIGN KEY (CREATOR_ID) REFERENCES USER(ID),
    FOREIGN KEY (CLIENT_ID) REFERENCES CLIENT(ID)
);

CREATE TABLE TICKET(
    ID int NOT NULL AUTO_INCREMENT,
    TITLE varchar(255) NOT NULL,
    DESCRIPTION varchar(2000) NOT NULL,
    STATUS varchar(255) NOT NULL,
    CREATOR_ID int NOT NULL,
    ASSIGNEE_ID int NOT NULL,
    CLIENT_ID int NOT NULL,
    PRIORITY varchar(255) NOT NULL,
    CREATION_DATE datetime NOT NULL,
    RESOLVED_DATE datetime,
    UNIQUE KEY unique_ticket_title_per_client (TITLE,CLIENT_ID),
    PRIMARY KEY (ID),
    FOREIGN KEY (CREATOR_ID) REFERENCES USER(ID),
    FOREIGN KEY (ASSIGNEE_ID) REFERENCES USER(ID),
    FOREIGN KEY (CLIENT_ID) REFERENCES CLIENT(ID)
);