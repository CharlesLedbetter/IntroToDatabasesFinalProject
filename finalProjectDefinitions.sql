/*********************************************************************
** Final Project (definitions)
** Author: Charles Ledbetter
** Date: 11/30/2017
** Description: The definitions for 8 tables in a database. Includes
create and insert statements.
*********************************************************************/

-- drop tables if they exist so that a fresh version can be made
DROP TABLE IF EXISTS `tbl_level`;
DROP TABLE IF EXISTS `tbl_powerUp`;
DROP TABLE IF EXISTS `tbl_enemyType`;
DROP TABLE IF EXISTS `tbl_item`;
DROP TABLE IF EXISTS `tbl_specialAbility`;
DROP TABLE IF EXISTS `tbl_powerUpLevel`;
DROP TABLE IF EXISTS `tbl_enemyTypeLevel`;
DROP TABLE IF EXISTS `tbl_enemyTypeSpecialAbility`;


/*********************************************************************
** CREATE TABLE QUERIES
*********************************************************************/

/* table for Level entity */

CREATE TABLE tbl_level(
  ID INTEGER NOT NULL AUTO_INCREMENT,
  Theme VARCHAR(255) NOT NULL,
  Stage INTEGER NOT NULL,
  MaxEnemies INTEGER NOT NULL,
  MinEnemies INTEGER NOT NULL,
  PRIMARY KEY(ID),
  UNIQUE(Stage),
  CONSTRAINT max_min CHECK (MaxEnemies >= MinEnemies)
);

-- table for Power-up entity

CREATE TABLE tbl_powerUp(
  ID INTEGER NOT NULL AUTO_INCREMENT,
  Type VARCHAR(255) NOT NULL,
  Description TEXT,
  PRIMARY KEY(ID),
  UNIQUE(Type)
);

-- table for EnemyType entity

CREATE TABLE tbl_enemyType(
  ID INTEGER NOT NULL AUTO_INCREMENT,
  Type VARCHAR(255) NOT NULL,
  Description TEXT,
  AttackPoints INTEGER,
  DefensePoints INTEGER NOT NULL,
  ItemID INTEGER,
  PRIMARY KEY(ID),
  CONSTRAINT ItemID_Item FOREIGN KEY(ItemID) REFERENCES tbl_item(id) ON DELETE SET NULL ON UPDATE CASCADE,
  UNIQUE(Type)
);

-- table for Item entity

CREATE TABLE tbl_item(
  ID INTEGER NOT NULL AUTO_INCREMENT,
  Type VARCHAR(255) NOT NULL,
  Description TEXT,
  Value INTEGER,
  PRIMARY KEY(ID),
  UNIQUE(Type)
);

-- table for SpecialAbility entity

CREATE TABLE tbl_specialAbility(
  ID INTEGER NOT NULL AUTO_INCREMENT,
  Type VARCHAR(255) NOT NULL,
  Description TEXT,
  Value INTEGER,
  PRIMARY KEY(ID),
  UNIQUE(Type)
);

-- table for 'Power-up Appears-On Level' relationship

CREATE TABLE tbl_powerUpLevel(
  ID INTEGER NOT NULL AUTO_INCREMENT,
  LID INTEGER NOT NULL,
  PUID INTEGER NOT NULL,
  NumberOf INTEGER NOT NULL,
  PRIMARY KEY(ID),
  CONSTRAINT LID_ID FOREIGN KEY(LID) REFERENCES tbl_level(ID) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT PUID_ID FOREIGN KEY(PUID) REFERENCES tbl_powerUp(ID) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(LID, PUID)
);

-- table for 'EnemyType Appears-On Level' relationship

CREATE TABLE tbl_enemyTypeLevel(
  ID INTEGER NOT NULL AUTO_INCREMENT,
  LID INTEGER NOT NULL,
  ETID INTEGER NOT NULL,
  AveOf INTEGER NOT NULL,
  PRIMARY KEY(ID),
  CONSTRAINT LID_IDET FOREIGN KEY(LID) REFERENCES tbl_level(ID) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT ETID_ID FOREIGN KEY(ETID) REFERENCES tbl_enemyType(ID) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(LID, ETID)
);

-- table for 'EnemyType Has SpecialAbility' relationship

CREATE TABLE tbl_enemyTypeSpecialAbility(
  ID INTEGER NOT NULL AUTO_INCREMENT,
  SAID INTEGER NOT NULL,
  ETID INTEGER NOT NULL,
  PRIMARY KEY(ID),
  CONSTRAINT SAID_ID FOREIGN KEY(SAID) REFERENCES tbl_specialAbility(ID) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT ETID_IDSA FOREIGN KEY(ETID) REFERENCES tbl_enemyType(ID) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(SAID, ETID)
);

/*********************************************************************
** INITIAL INSERT VALUES QUERIES
*********************************************************************/

-- insert initial values for properties of Level entity

INSERT INTO tbl_level(Theme, Stage, MaxEnemies, MinEnemies)
VALUES('grasslands', 1, 40, 30),
('desert', 2, 60, 45),
('desert', 3, 70, 60),
('badlands', 4, 70, 60),
('badlands', 5, 90, 75),
('badlands', 6, 110, 95),
('swamp', 7, 130, 115),
('swamp', 8, 160, 145),
('ruins', 9, 190, 175),
('ruins', 10, 225, 200),
('ruins', 11, 260, 245),
('graveyard', 12, 300, 290),
('graveyard', 13, 635, 620),
('graveyard', 14, 450, 400);

-- insert initial values for properties of Power-up entity

INSERT INTO tbl_powerUp(Type, Description)
VALUES('boost shoes', 'Gives the player faster movement speed for 60 seconds.'),
('extra life', 'Gives the player an extra life to use if they die.'),
('attack increase', 'Gives the player a permanent boost of 2 attack points.'),
('defense increase', 'Gives the player a permanent boost of 5 defense points.'),
('health increase', 'Gives the player a permanent boost of 5 health points.'),
('magic increase', 'Gives the player a permanent boost of 3 magic points.'),
('force field', 'Makes the player invincible for 60 seconds');

-- insert initial values for properties of Item entity

INSERT INTO tbl_item(Type, Description, Value)
VALUES('small health potion', 'Heals the player.', 10),
('medium health potion', 'Heals the player.', 50),
('large health potion', 'Heals the player.', 100),
('gold coins', 'used to buy equipment at a shop.', 5),
('gold purse', 'used to buy equipment at a shop.', 25),
('heaping gold purse', 'used to buy equipment at a shop.', 50),
('overflowing gold purse', 'used to buy equipment at a shop.', 75),
('small chest of gold', 'used to buy equipment at a shop.', 100),
('medium chest of gold', 'used to buy equipment at a shop.', 150),
('large chest of gold', 'used to buy equipment at a shop.', 200),
('gold hoard', 'used to buy equipment at a shop.', 500),
('ring of power', 'A ring that gives the bearer near invincibility.', 0);

-- insert initial values for properties of EnemyType entity

INSERT INTO tbl_enemyType(Type, Description, AttackPoints, DefensePoints, ItemID)
VALUES('barbarian cutthroat', 'A scrawny man with dirty hair who looks as if he only eats when he can steal his food.', 4, 6, (SELECT id FROM tbl_item WHERE Type = 'small health potion')),
('barbarian raider', 'A hardened barbarian raider who shows know fear in the face of death.', 7, 8, (SELECT id FROM tbl_item WHERE Type = 'gold coins')),
('barbarian warrior', 'A giant of a man with long braided hair. He looks like a worthy foe.', 12, 10, (SELECT id FROM tbl_item WHERE Type = 'gold coins')),
('barbarian prince', 'A well armored barbarian with two axes. He has seen many battles.', 18, 16, (SELECT id FROM tbl_item WHERE Type = 'gold purse')),
('skeletal hulk', 'A skeleton with many bones missing.', 7, 16, (SELECT id FROM tbl_item WHERE Type = 'small health potion')),
('skeleton warrior', 'A well armored barbarian skeleton with a bow.', 10, 19, (SELECT id FROM tbl_item WHERE Type = 'gold purse')),
('giant skeleton', 'A huge skeleton in bone armor.', 16, 26, (SELECT id FROM tbl_item WHERE Type = 'heaping gold purse')),
('rotting zombie', 'A patchwork of rotting flesh.', 12, 20, (SELECT id FROM tbl_item WHERE Type = 'gold purse')),
('zombie', 'A remnant with glowing red eyes.', 18, 24, (SELECT id FROM tbl_item WHERE Type = 'medium health potion')),
('zombie king', 'A remnant with glowing red eyes and a golden crown.', 24, 30, (SELECT id FROM tbl_item WHERE Type = 'overflowing gold purse')),
('giant lizard', 'a large lizard crawling toward you with menace.', 28, 32, (SELECT id FROM tbl_item WHERE Type = 'large health potion')),
('lizard man', 'a humanoid lizard in leather armor.', 32, 36, (SELECT id FROM tbl_item WHERE Type = 'large health potion')),
('lizard chieftain', 'a lizard man in brightly painted iron armor.', 38, 46, (SELECT id FROM tbl_item WHERE Type = 'small chest of gold')),
('lesser demon', 'a hellish creature from beyond.', 45, 53, (SELECT id FROM tbl_item WHERE Type = 'medium chest of gold')),
('demon', 'a large hellish creature from beyond.', 50, 59, (SELECT id FROM tbl_item WHERE Type = 'large chest of gold')),
('dragon', 'A huge winged beast with lizard like features.', 75, 100, (SELECT id FROM tbl_item WHERE Type = 'gold hoard')),
('lich king', 'The evil mastermind behind all evil in the world.', NULL, 200, (SELECT id FROM tbl_item WHERE Type = 'ring of power'));

-- insert initial values for properties of SpecialAbility entity

INSERT INTO tbl_specialAbility(Type, Description, Value)
VALUES('fire ball', 'A flying ball of flame.', 25),
('lightning ball', 'A sphere of ball lightning.', 50),
('poison', 'Poisons the player.', 10),
('midas touch', 'Turns the player to gold freezing them in place for a given time.', 10),
('heal self', 'Heals the enemy that casts the spell.', 25),
('greater heal self', 'Heals the enemy that casts the spell.', 50),
('lava flow', 'places a tile that damages the player for a set time.', 60),
('heal comrades', 'Heals other enemies near the caster.', 25),
('greater heal comrades', 'Heals other enemies near the caster.', 50),
('soul sear', 'freezes the player in place while heal slowly drains for a given time.', 20);

-- insert initial values for properties of 'Power-up Appears-On Level' relationship

INSERT INTO tbl_powerUpLevel(LID, PUID, NumberOf)
VALUES((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 4), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 4), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 4), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 4), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 4), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 4), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 4), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_powerUp WHERE Type = 'boost shoes'), 6),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_powerUp WHERE Type = 'extra life'), 3),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_powerUp WHERE Type = 'attack increase'), 10),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_powerUp WHERE Type = 'defense increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_powerUp WHERE Type = 'health increase'), 5),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_powerUp WHERE Type = 'magic increase'), 3),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_powerUp WHERE Type = 'force field'), 3);

-- insert initial values for properties of 'EnemyType Appears-On Level' relationship

INSERT INTO tbl_enemyTypeLevel(LID, ETID, AveOf)
VALUES((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian cutthroat'), 30),
((SELECT id FROM tbl_level WHERE Stage = 1), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian raider'), 8),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian cutthroat'), 20),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian raider'), 20),
((SELECT id FROM tbl_level WHERE Stage = 2), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian warrior'), 15),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian raider'), 35),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian warrior'), 25),
((SELECT id FROM tbl_level WHERE Stage = 3), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian prince'), 15),
((SELECT id FROM tbl_level WHERE Stage = 4), (SELECT id FROM tbl_enemyType WHERE Type = 'skeletal hulk'), 65),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_enemyType WHERE Type = 'skeletal hulk'), 50),
((SELECT id FROM tbl_level WHERE Stage = 5), (SELECT id FROM tbl_enemyType WHERE Type = 'skeleton warrior'), 30),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_enemyType WHERE Type = 'skeletal hulk'), 30),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_enemyType WHERE Type = 'skeleton warrior'), 60),
((SELECT id FROM tbl_level WHERE Stage = 6), (SELECT id FROM tbl_enemyType WHERE Type = 'giant skeleton'), 10),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_enemyType WHERE Type = 'rotting zombie'), 90),
((SELECT id FROM tbl_level WHERE Stage = 7), (SELECT id FROM tbl_enemyType WHERE Type = 'giant skeleton'), 20),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_enemyType WHERE Type = 'rotting zombie'), 80),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_enemyType WHERE Type = 'giant skeleton'), 10),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie'), 50),
((SELECT id FROM tbl_level WHERE Stage = 8), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie king'), 10),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie'), 100),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_enemyType WHERE Type = 'giant lizard'), 60),
((SELECT id FROM tbl_level WHERE Stage = 9), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard man'), 20),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie'), 60),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_enemyType WHERE Type = 'giant lizard'), 50),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard man'), 85),
((SELECT id FROM tbl_level WHERE Stage = 10), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard chieftain'), 20),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie king'), 30),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_enemyType WHERE Type = 'giant lizard'), 50),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard man'), 130),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard chieftain'), 40),
((SELECT id FROM tbl_level WHERE Stage = 11), (SELECT id FROM tbl_enemyType WHERE Type = 'dragon'), 1),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian warrior'), 100),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie'), 100),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_enemyType WHERE Type = 'giant skeleton'), 70),
((SELECT id FROM tbl_level WHERE Stage = 12), (SELECT id FROM tbl_enemyType WHERE Type = 'lesser demon'), 25),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian warrior'), 200),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie'), 200),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_enemyType WHERE Type = 'giant skeleton'), 150),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_enemyType WHERE Type = 'lesser demon'), 50),
((SELECT id FROM tbl_level WHERE Stage = 13), (SELECT id FROM tbl_enemyType WHERE Type = 'demon'), 25),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_enemyType WHERE Type = 'lesser demon'), 125),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_enemyType WHERE Type = 'demon'), 75),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_enemyType WHERE Type = 'dragon'), 5),
((SELECT id FROM tbl_level WHERE Stage = 14), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king'), 1);

-- insert initial values for properties of 'EnemyType Has SpecialAbility' relationship

INSERT INTO tbl_enemyTypeSpecialAbility(SAID, ETID)
VALUES((SELECT id FROM tbl_specialAbility WHERE Type = "fire ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'skeleton warrior')),
((SELECT id FROM tbl_specialAbility WHERE Type = "fire ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard chieftain')),
((SELECT id FROM tbl_specialAbility WHERE Type = "fire ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'lesser demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "fire ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "fire ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'dragon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "fire ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "lightning ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'giant skeletal')),
((SELECT id FROM tbl_specialAbility WHERE Type = "lightning ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "lightning ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'dragon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "lightning ball"), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "poison"), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "poison"), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard man')),
((SELECT id FROM tbl_specialAbility WHERE Type = "poison"), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard chieftain')),
((SELECT id FROM tbl_specialAbility WHERE Type = "poison"), (SELECT id FROM tbl_enemyType WHERE Type = 'lesser demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "poison"), (SELECT id FROM tbl_enemyType WHERE Type = 'demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "poison"), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "midas touch"), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "midas touch"), (SELECT id FROM tbl_enemyType WHERE Type = 'dragon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "midas touch"), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "heal self"), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian prince')),
((SELECT id FROM tbl_specialAbility WHERE Type = "heal self"), (SELECT id FROM tbl_enemyType WHERE Type = 'giant skeleton')),
((SELECT id FROM tbl_specialAbility WHERE Type = "heal self"), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard man')),
((SELECT id FROM tbl_specialAbility WHERE Type = "greater heal self"), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard chieftain')),
((SELECT id FROM tbl_specialAbility WHERE Type = "greater heal self"), (SELECT id FROM tbl_enemyType WHERE Type = 'lesser demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "greater heal self"), (SELECT id FROM tbl_enemyType WHERE Type = 'demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "greater heal self"), (SELECT id FROM tbl_enemyType WHERE Type = 'dragon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "greater heal self"), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "lava flow"), (SELECT id FROM tbl_enemyType WHERE Type = 'demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "lava flow"), (SELECT id FROM tbl_enemyType WHERE Type = 'dragon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "lava flow"), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "heal comrades"), (SELECT id FROM tbl_enemyType WHERE Type = 'barbarian prince')),
((SELECT id FROM tbl_specialAbility WHERE Type = "heal comrades"), (SELECT id FROM tbl_enemyType WHERE Type = 'zombie king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "greater heal comrades"), (SELECT id FROM tbl_enemyType WHERE Type = 'lizard chieftain')),
((SELECT id FROM tbl_specialAbility WHERE Type = "greater heal comrades"), (SELECT id FROM tbl_enemyType WHERE Type = 'demon')),
((SELECT id FROM tbl_specialAbility WHERE Type = "greater heal comrades"), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king')),
((SELECT id FROM tbl_specialAbility WHERE Type = "soul sear"), (SELECT id FROM tbl_enemyType WHERE Type = 'lich king'));
