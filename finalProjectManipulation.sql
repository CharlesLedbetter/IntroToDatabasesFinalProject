/*********************************************************************
** Final Project (manipulation)
** Author: Charles Ledbetter
** Date: 11/30/2017
** Description: The manipulation queries for 8 tables in a database.
*********************************************************************/


/*********************************************************************
** SELECTION QUERIES used by '/select' express handler
*********************************************************************/

-- show basic Level data (1)
SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level ORDER BY Stage;

SELECT Stage FROM tbl_level ORDER BY Stage;

-- show basic Power-up data (2)
SELECT Type, Description FROM tbl_powerUp ORDER BY ID;

-- show basic EnemyType data (3)
SELECT tet.Type, tet.Description, tet.AttackPoints, tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet LEFT JOIN tbl_item ti On tet.ItemId = ti.ID ORDER BY tet.ID;

-- show EnemyType attack, defense, special abilities, Stages ,and item drops (4)
SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage;

-- show basic Item data (5)
SELECT Type, Description, Value FROM tbl_item ORDER BY ID;

-- show basic SpecialAbility data (6)
SELECT Type, Description, Value FROM tbl_specialAbility ORDER BY ID;

-- show which enemies are on which Levels and their averages (7)
SELECT tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID JOIN tbl_enemyType tet ON tetl.ETID = tet.ID ORDER BY tl.Stage;

SELECT tetl.ID, tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID JOIN tbl_enemyType tet ON tetl.ETID = tet.ID GROUP BY tl.Stage, tet.Type ORDER BY tet.Type

-- show number of each type of Power-up on each Level (8)
SELECT tl.Stage, tpu.Type, tpul.NumberOf FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID ORDER BY tl.Stage;

SELECT tetl.ID, tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID JOIN tbl_enemyType tet ON tetl.ETID = tet.ID GROUP BY tl.Stage, tet.Type ORDER BY tet.Type;

SELECT tpul.ID, tl.Stage, tpu.Type, tpul.NumberOf FROM tbl_level tl LEFT JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID LEFT JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID ORDER BY tl.Stage;

-- show how many special abilities does each enemyType have (9)
SELECT tet.Type, COUNT(tsa.Type) AS NumberOfSA FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID GROUP BY tet.ID ORDER BY tet.ID;

-- show how many enemies drop an item (10)
SELECT ti.Type, COUNT(tet.Type) AS EnemyCount FROM tbl_item ti LEFT JOIN tbl_enemyType tet ON ti.ID = tet.ItemID GROUP BY ti.ID ORDER BY ti.ID;

-- show how many stages each enemy appears on (11)
SELECT tet.Type, COUNT(tl.Stage) AS StageCount FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeLevel tetl ON tet.ID = tetl.ETID LEFT JOIN tbl_level tl ON tetl.LID = tl.ID GROUP BY tet.ID ORDER BY tet.ID;

-- show the average time an enemy type appears in the entire game (12)
SELECT tet.Type, SUM(tetl.AveOf) As AveInGame FROM tbl_enemyType tet JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl ON tl.ID = tetl.LID GROUP BY tet.ID ORDER BY tet.ID;

-- show the abilities for a given enemy (13)
SELECT tetsa.ID, tet.Type AS EnemyType, tsa.Type AS SpecialType FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID ORDER BY tet.Type;

/*********************************************************************
** SEARCH QUERIES used by '/search' express handler //FIXME redo section with updated queries
*********************************************************************/

SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE Stage >= ? ORDER BY Stage;

SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE Stage <= ? ORDER BY Stage;

SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE MinEnemies >= ? ORDER BY Stage;

SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE MinEnemies <= ? ORDER BY Stage;

SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE MaxEnemies >= ? ORDER BY Stage;

SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE MaxEnemies <= ? ORDER BY Stage;

-- basic EnemyType data searches (3)
SELECT tet.Type, tet.Description, tet.AttackPoints, tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet JOIN tbl_item ti On tet.ItemId = ti.ID WHERE tet.AttackPoints >= ? ORDER BY tet.ID;

SELECT tet.Type, tet.Description, tet.AttackPoints, tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet JOIN tbl_item ti On tet.ItemId = ti.ID WHERE tet.AttackPoints <= ? ORDER BY tet.ID;

SELECT tet.Type, tet.Description, tet.AttackPoints, tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet JOIN tbl_item ti On tet.ItemId = ti.ID WHERE tet.DefensePoints >= ? ORDER BY tet.ID;

SELECT tet.Type, tet.Description, tet.AttackPoints, tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet JOIN tbl_item ti On tet.ItemId = ti.ID WHERE tet.DefensePoints <= ? ORDER BY tet.ID;

-- search EnemyType attack, defense, special abilities, Stages ,and item drops  (4)
SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID WHERE tet.AttackPoints >= ? GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage;

SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID WHERE tet.AttackPoints <= ? GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage;

SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID WHERE tet.DefensePoints >= ? GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage;

SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID WHERE tet.DefensePoints <= ? GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage;

SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID WHERE tl.Stage >= ? GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage;

SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID WHERE tl.Stage <= ? GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage;

-- show which enemies are on which Levels and their averages (7)
SELECT tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID JOIN tbl_enemyType tet ON tetl.ETID = tet.ID WHERE tetl.AveOf >= ? ORDER BY tl.Stage;

SELECT tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID JOIN tbl_enemyType tet ON tetl.ETID = tet.ID WHERE tetl.AveOf <= ? ORDER BY tl.Stage;

-- show number of each type of Power-up on each Level (8)
SELECT tl.Stage, tpu.Type, tpul.NumberOf FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID WHERE tl.Stage >= ? ORDER BY tl.Stage;

SELECT tl.Stage, tpu.Type, tpul.NumberOf FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID WHERE tl.Stage <= ? ORDER BY tl.Stage;

SELECT tl.Stage, tpu.Type, tpul.NumberOf FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID WHERE tpul.NumberOf >= ? ORDER BY tl.Stage;

SELECT tl.Stage, tpu.Type, tpul.NumberOf FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID WHERE tpul.NumberOf <= ? ORDER BY tl.Stage;

/*********************************************************************
** INSERT QUERIES used by '/insert' express handler
*********************************************************************/
-- basic Level data searches (1)
INSERT INTO tbl_level (`Theme`, `Stage`, `MinEnemies`, `MaxEnemies`) VALUES (?, ?, ?, ?);

-- show basic Power-up data (2)
INSERT INTO tbl_powerUp (`Type`, `Description`) VALUES (?, ?);

-- show basic EnemyType data (3)
INSERT INTO tbl_enemyType (`Type`, `Description`, `AttackPoints`, `DefensePoints`, `ItemID`) VALUES (?, ?, ?, ?, ?);

-- show basic Item data (5)
INSERT INTO tbl_item (`Type`, `Description`, `Value`) VALUES (?, ?, ?);

-- show basic SpecialAbility data (6)
INSERT INTO tbl_specialAbility (`Type`, `Description`, `Value`) VALUES (?, ?, ?);

-- show which enemies are on which Levels and their averages (7)
INSERT INTO tbl_enemyTypeLevel (`LID`, `ETID`, `AveOf`) VALUES (?, ?, ?);

-- show number of each type of Power-up on each Level (8)
INSERT INTO tbl_powerUpLevel (`PUID`, `LID`, `NumberOf`) VALUES (?, ?, ?);

-- show the abilities for a given enemy (13)
INSERT INTO tbl_enemyTypeSpecialAbility (`ETID`, `SAID`) VALUES (?, ?);

/*********************************************************************
** DELETE QUERIES used by '/delete' express handler
*********************************************************************/
-- basic Level data searches (1)
DELETE FROM tbl_level WHERE ID=?;

-- show basic Power-up data (2)
DELETE FROM tbl_powerUp WHERE ID=?;

-- show basic EnemyType data (3)
DELETE FROM tbl_enemyType WHERE ID=?;

-- show basic Item data (5)
DELETE FROM tbl_item WHERE ID=?;

-- show basic SpecialAbility data (6)
DELETE FROM tbl_specialAbility WHERE ID=?;

-- show which enemies are on which Levels and their averages (7)
DELETE FROM tbl_enemyTypeLevel WHERE ID=?;

-- show number of each type of Power-up on each Level (8)
DELETE FROM tbl_powerUpLevel WHERE ID=?;

-- show the abilities for a given enemy (13)
DELETE FROM tbl_enemyTypeSpecialAbility WHERE ID=?

/*********************************************************************
** UPDATE QUERIES used by '/update' express handler
*********************************************************************/
-- basic Level data searches (1)
UPDATE tbl_level SET Theme=?, Stage=?, MinEnemies=?, MaxEnemies=? WHERE ID=?;

-- show basic Power-up data (2)
UPDATE tbl_powerUp SET Type=?, Description=? WHERE ID=?;

-- show basic EnemyType data (3)
UPDATE tbl_enemyType SET Type=?, Description=?, AttackPoints=?, DefensePoints=?, ItemID=? WHERE ID=?;

-- show basic Item data (5)
UPDATE tbl_item SET Type=?, Description=?, Value=? WHERE ID=?;

-- show basic SpecialAbility data (6)
UPDATE tbl_specialAbility SET Type=?, Description=?, Value=? WHERE ID=?;

-- show which enemies are on which Levels and their averages (7)
UPDATE tbl_enemyTypeLevel SET AveOf=? WHERE ID=?;

-- show number of each type of Power-up on each Level (8)
UPDATE tbl_powerUpLevel SET NumberOf=? WHERE ID=?;
