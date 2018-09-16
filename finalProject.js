/*********************************************************************
** Final Project (server-side implementation)
** Author: Charles Ledbetter
** Date: 11/30/2017
** Description: This is all the server-side JavaScript functions used in
the website.
*********************************************************************/
var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4000);
app.use(express.static('public'));


/*********************************************************************
** HOME PAGE HANDLER: loads main page
*********************************************************************/
app.get('/',function(req,res,next){
  res.render('home');
});


/*********************************************************************
** VIEW PAGES NAVIGATION HANDLER: loads the tables for viewing
*********************************************************************/
app.get('/select',function(req,res,next){
  //for displaying context in html format
  var context = {};

  //for receiving and parsing get request
  var switchHelper = Number(req.query.s);
  //console.log(switchHelper);

  //for preparing sql query to database based on user choices
  var sql = "";
  switch (switchHelper) {
    case 1: sql = "SELECT Theme, Stage, MinEnemies, MaxEnemies " +
    "FROM tbl_level ORDER BY Stage";
      break;
    case 2: sql = "SELECT Type, Description FROM tbl_powerUp ORDER BY ID";
      break;
    case 3: sql = "SELECT tet.Type, tet.Description, tet.AttackPoints, " +
    "tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_item ti On tet.ItemId = ti.ID ORDER BY tet.ID";
      break;
    case 4: sql = "SELECT tet.Type, tet.AttackPoints, tet.DefensePoints," +
    " ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID " +
    "LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti " +
    "ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl " +
    "ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID " +
    "GROUP BY tet.ID, tsa.Type, tl.Stage ORDER BY tet.ID, tl.Stage, tsa.Type";
      break;
    case 5: sql = "SELECT Type, Description, Value FROM tbl_item ORDER BY ID";
      break;
    case 6: sql = "SELECT Type, Description, Value FROM tbl_specialAbility " +
    "ORDER BY ID";
      break;
    case 7: sql = "SELECT tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID " +
    "JOIN tbl_enemyType tet ON tetl.ETID = tet.ID ORDER BY tl.Stage";
      break;
    case 8: sql = "SELECT tl.Stage, tpu.Type, tpul.NumberOf " +
    "FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID " +
    "JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID ORDER BY tl.Stage";
      break;
    case 9: sql = "SELECT tet.Type, COUNT(tsa.Type) AS NumberOfSA " +
    "FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeSpecialAbility tetsa " +
    "ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa " +
    "ON tetsa.SAID = tsa.ID GROUP BY tet.ID ORDER BY tet.ID";
      break;
    case 10: sql = "SELECT ti.Type, COUNT(tet.Type) AS EnemyCount " +
    "FROM tbl_item ti LEFT JOIN tbl_enemyType tet ON ti.ID = tet.ItemID " +
    "GROUP BY ti.ID ORDER BY ti.ID";
      break;
    case 11: sql = "SELECT tet.Type, COUNT(tl.Stage) AS StageCount " +
    "FROM tbl_enemyType tet LEFT JOIN tbl_enemyTypeLevel tetl " +
    "ON tet.ID = tetl.ETID LEFT JOIN tbl_level tl ON tetl.LID = tl.ID " +
    "GROUP BY tet.ID ORDER BY tet.ID";
      break;
    case 12: sql = "SELECT tet.Type, SUM(tetl.AveOf) As AveInGame " +
    "FROM tbl_enemyType tet JOIN tbl_enemyTypeLevel tetl " +
    "ON tetl.ETID = tet.ID JOIN tbl_level tl ON tl.ID = tetl.LID " +
    "GROUP BY tet.ID ORDER BY tet.ID";
      break;
    case 13: sql = "SELECT tetsa.ID, tet.Type AS EnemyType, tsa.Type " +
    "AS SpecialType FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa " +
    "ON tetsa.ETID = tet.ID LEFT JOIN tbl_specialAbility tsa " +
    "ON tetsa.SAID = tsa.ID ORDER BY tet.Type";
      break;
    default: sql = 0;
  }

  //query to database
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    //parse rows into printable array
    var rParams = [];
    for (var x in rows){
      rParams.push(rows[x]);
    }
    context.print = rParams;

    //depending on user selection render results
    if(sql === 0){
      res.render('problemPage', context);
    }
    else {
      switch (switchHelper) {
        case 1: res.render('basicLevel', context);
          break;
        case 2: res.render('basicPowerUp', context);
          break;
        case 3: res.render('basicEnemyType', context);
          break;
        case 4: var aetParams = [];
                var tester = [];
                tester.push(rParams[0]);
                aetParams.push(rParams[0]);
                var test = true;

                for(var i = 1; i < rParams.length; i++){
                  tester.push(rParams[i]);
                  if(tester[i-1].Type == tester[i].Type){
                    test = false;

                    for (var j = 0; j < (tester.length - 1); ++j) {
                      if(tester[j].Type == rParams[i].Type && tester[j].Stage == rParams[i].Stage){
                        test = true;
                      }
                    }
                    if(!test){
                      aetParams[aetParams.length - 1].Stage += ", " + rParams[i].Stage;
                    }
                  }
                  else{
                    aetParams.push(rParams[i]);
                  }
                }
                for (var k = (rParams.length - 1); k > 0; k--) {
                  if(rParams[k].Type == rParams[k-1].Type){
                    rParams[k].Stage = "\\";
                  }
                }
                context.print = rParams;
                res.render('advancedEnemyType', context);
          break;
        case 5: res.render('basicItem', context);
          break;
        case 6: res.render('basicSpecialAbility', context);
          break;
        case 7: var aeolParams = [];
                for (var i = 0; i < rParams.length; i++) {
                  aeolParams.push(rParams[i]);
                }
                for (var j = (aeolParams.length - 1); j > 0; j--) {
                  if(aeolParams[j].Stage == aeolParams[j-1].Stage){
                    aeolParams[j].Stage = "\\";
                  }
                }
                context.print = aeolParams;
                res.render('enemiesOnLevels', context);
          break;
        case 8: var apuolParams = [];
                for (var i = 0; i < rParams.length; i++) {
                  apuolParams.push(rParams[i]);
                }
                for (var j = (apuolParams.length - 1); j > 0; j--) {
                  if(apuolParams[j].Stage == apuolParams[j-1].Stage){
                    apuolParams[j].Stage = "\\";
                  }
                }
                context.print = apuolParams;
                res.render('powerUpsOnLevels', context);
          break;
        case 9: res.render('enemyTypeSpecialAbilityCount', context);
          break;
        case 10: res.render('itemEnemyTypeCount', context);
          break;
        case 11: res.render('enemyTypeLevelCount', context);
          break;
        case 12: res.render('enemyTypeGameCount', context);
          break;
        case 13: var tetsaParams = [];
                for (var i = 0; i < rParams.length; i++) {
                  tetsaParams.push(rParams[i]);
                }
                for (var j = (tetsaParams.length - 1); j > 0; j--) {
                  if(tetsaParams[j].EnemyType == tetsaParams[j-1].EnemyType){
                    tetsaParams[j].EnemyType = "\\";
                  }
                }
                context.print = tetsaParams;
                res.render('enemyTypeSpecialAbility', context);
          break;
        default: res.render('problemPage', context);
      }
    }
  });
});

/*********************************************************************
** Search PAGES HANDLER: navigates the many search options
*********************************************************************/
app.get('/searchPage',function(req,res,next){
  //for displaying context in html format
  var context = {};
  var switchHelper1 = Number(req.query.s);
  var switchHelper2 = Number(req.query.p);
  var sql = "";
  var options = [];
  switch (switchHelper1) {
    case 0: switch (switchHelper2) {
        case 1: context.searchTitle = "Basic Level Data";
                context.id = 1;
                options.push({"option":"Stage is Greater Than or Equal To", "val":"1"});
                options.push({"option":"Stage is Less Than or Equal To", "val":"2"});
                options.push({"option":"Minimum enemies are Greater Than or Equal To", "val":"3"});
                options.push({"option":"Minimum enemies are Less Than or Equal To", "val":"4"});
                options.push({"option":"Maximum enemies are Greater Than or Equal To", "val":"5"});
                options.push({"option":"Maximum enemies are Less Than or Equal To", "val":"6"});
                context.options = options;
                res.render('searchPage', context);
          break;
        case 3: context.searchTitle = "Basic Enemy Type Data";
                context.id = 2;
                options.push({"option":"Attack Points are Greater Than or Equal To", "val":"1"});
                options.push({"option":"Attack Points are Less Than or Equal To", "val":"2"});
                options.push({"option":"Defense Points are Greater Than or Equal To", "val":"3"});
                options.push({"option":"Defense Points are Less Than or Equal To", "val":"4"});
                context.options = options;
                res.render('searchPage', context);
          break;
        case 4: context.searchTitle = "Advanced Enemy Type Data";
                context.id = 3;
                options.push({"option":"Attack Points are Greater Than or Equal To", "val":"1"});
                options.push({"option":"Attack Points are Less Than or Equal To", "val":"2"});
                options.push({"option":"Defense Points are Greater Than or Equal To", "val":"3"});
                options.push({"option":"Defense Points are Less Than or Equal To", "val":"4"});
                options.push({"option":"Stage is Greater Than or Equal To", "val":"5"});
                options.push({"option":"Stage is Less Than or Equal To", "val":"6"});
                context.options = options;
                res.render('searchPage', context);
          break;
        case 7: context.searchTitle = "Which Enemy Types are on Which Levels";
                context.id = 4;
                options.push({"option":"Average of Enemies on Stage is Greater Than or Equal To", "val":"1"});
                options.push({"option":"Average of Enemies on Stage is Less Than or Equal To", "val":"2"});
                context.options = options;
                res.render('searchPage', context);
          break;
        case 8: context.searchTitle = "How many of Each Power-up are on a Given Level";
                context.id = 5;
                options.push({"option":"Stage is Greater Than or Equal To", "val":"1"});
                options.push({"option":"Stage is Less Than or Equal To", "val":"2"});
                options.push({"option":"Number of Power-ups are Greater Than or Equal To", "val":"3"});
                options.push({"option":"Number of Power-ups are Less Than or Equal To", "val":"4"});
                context.options = options;
                res.render('searchPage', context);
          break;
        default: res.render('home');
      }
      break;
    case 1: context.searchTitle = "Basic Level Data";
      switch (switchHelper2) {
        case 1: context.search = "stage greater than or equal to";
                context.id = 10;
                res.render('search', context);
          break;
        case 2: context.search = "stage less than or equal to";
                context.id = 11;
                res.render('search', context);
          break;
        case 3: context.search = "minimum number of enemies greater than or equal to";
                context.id = 12;
                res.render('search', context);
          break;
        case 4: context.search = "minimum number of enemies less than or equal to";
                context.id = 13;
                res.render('search', context);
          break;
        case 5: context.search = "maximum number of enemies greater than or equal to";
                context.id = 14;
                res.render('search', context);
          break;
        case 6: context.search = "maximum number of enemies less than or equal to";
                context.id = 15;
                res.render('search', context);
          break;
        default: res.render('home');
      }
      break;
    case 2: context.searchTitle = "Basic Enemy Type Data";
      switch (switchHelper2) {
        case 1: context.search = "attack points greater than or equal to";
                context.id = 16;
                res.render('search', context);
          break;
        case 2: context.search = "attack points less than or equal to";
                context.id = 17;
                res.render('search', context);
          break;
        case 3: context.search = "defense points number of enemies greater than or equal to";
                context.id = 18;
                res.render('search', context);
          break;
        case 4: context.search = "defense points number of enemies less than or equal to";
                context.id = 19;
                res.render('search', context);
          break;
        default: res.render('home');
      }
      break;
    case 3: context.searchTitle = "Advanced Enemy Type Data";
      switch (switchHelper2) {
        case 1: context.search = "attack points greater than or equal to";
                context.id = 20;
                res.render('search', context);
          break;
        case 2: context.search = "attack points less than or equal to";
                context.id = 21;
                res.render('search', context);
          break;
        case 3: context.search = "defense points number of enemies greater than or equal to";
                context.id = 22;
                res.render('search', context);
          break;
        case 4: context.search = "defense points number of enemies less than or equal to";
                context.id = 23;
                res.render('search', context);
          break;
        case 5: context.search = "stage greater than or equal to";
                context.id = 24;
                res.render('search', context);
          break;
        case 6: context.search = "stage less than or equal to";
                context.id = 25;
                res.render('search', context);
          break;
        default: res.render('home');
      }
      break;
    case 4: context.searchTitle = "Which Enemy Types are on Which Levels";
      switch (switchHelper2) {
        case 1: context.search = "average of enemies on stage greater than or equal to";
                context.id = 26;
                res.render('search', context);
          break;
        case 2: context.search = "average of enemies on stage greater than or equal to less than or equal to";
                context.id = 27;
                res.render('search', context);
          break;
        default: res.render('home');
      }
      break;
    case 5: context.searchTitle = "How many of Each Power-up are on a Given Level";
      switch (switchHelper2) {
        case 1: context.search = "stage greater than or equal to";
                context.id = 28;
                res.render('search', context);
          break;
        case 2: context.search = "stage less than or equal to";
                context.id = 29;
                res.render('search', context);
          break;
        case 3: context.search = "number of Power-ups greater than or equal to";
                context.id = 30;
                res.render('search', context);
          break;
        case 4: context.search = "number of Power-ups less than or equal to";
                context.id = 31;
                res.render('search', context);
          break;
        default: res.render('home');
      }
      break;
    case 10: sql = "SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE Stage >= ? ORDER BY Stage";
      break;
    case 11: sql = "SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE Stage <= ? ORDER BY Stage";
      break;
    case 12: sql = "SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE MinEnemies >= ? ORDER BY Stage";
      break;
    case 13: sql = "SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE MinEnemies <= ? ORDER BY Stage";
      break;
    case 14: sql = "SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE MaxEnemies >= ? ORDER BY Stage";
      break;
    case 15: sql = "SELECT Theme, Stage, MinEnemies, MaxEnemies FROM tbl_level WHERE MaxEnemies <= ? ORDER BY Stage";
      break;
    case 16: sql = "SELECT tet.Type, tet.Description, tet.AttackPoints, " +
    "tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_item ti On tet.ItemId = ti.ID WHERE tet.AttackPoints >= ? " +
    "ORDER BY tet.ID";
      break;
    case 17: sql = "SELECT tet.Type, tet.Description, tet.AttackPoints, " +
    "tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_item ti On tet.ItemId = ti.ID WHERE tet.AttackPoints <= ? " +
    "ORDER BY tet.ID";
      break;
    case 18: sql = "SELECT tet.Type, tet.Description, tet.AttackPoints, " +
    "tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_item ti On tet.ItemId = ti.ID WHERE tet.DefensePoints >= ? " +
    "ORDER BY tet.ID";
      break;
    case 19: sql = "SELECT tet.Type, tet.Description, tet.AttackPoints, " +
    "tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_item ti On tet.ItemId = ti.ID WHERE tet.DefensePoints <= ? " +
    "ORDER BY tet.ID";
      break;
    case 20: sql = "SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, " +
    "ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID " +
    "LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID " +
    "LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl " +
    "ON tetl.LID = tl.ID WHERE tet.AttackPoints >= ? " +
    "GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage";
      break;
    case 21: sql = "SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, " +
    "ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID " +
    "LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID " +
    "LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl " +
    "ON tetl.LID = tl.ID WHERE tet.AttackPoints <= ? " +
    "GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage";
      break;
    case 22: sql = "SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, " +
    "ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID " +
    "LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID " +
    "LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl " +
    "ON tetl.LID = tl.ID WHERE tet.DefensePoints >= ? " +
    "GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage";
      break;
    case 23: sql = "SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, " +
    "ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID " +
    "LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID " +
    "LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl " +
    "ON tetl.LID = tl.ID WHERE tet.DefensePoints <= ? " +
    "GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage";
      break;
    case 24: sql = "SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, " +
    "ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID " +
    "LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID " +
    "LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl " +
    "ON tetl.LID = tl.ID WHERE tl.Stage >= ? " +
    "GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage";
      break;
    case 25: sql = "SELECT tet.Type, tet.AttackPoints, tet.DefensePoints, " +
    "ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID " +
    "LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID " +
    "LEFT JOIN tbl_item ti ON ti.ID = tet.ItemID " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.ETID = tet.ID JOIN tbl_level tl " +
    "ON tetl.LID = tl.ID WHERE tl.Stage <= ? " +
    "GROUP BY tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage";
      break;
    case 26: sql = "SELECT tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID " +
    "JOIN tbl_enemyType tet ON tetl.ETID = tet.ID " +
    "WHERE tetl.AveOf >= ? ORDER BY tl.Stage";
      break;
    case 27: sql = "SELECT tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID " +
    "JOIN tbl_enemyType tet ON tetl.ETID = tet.ID " +
    "WHERE tetl.AveOf <= ? ORDER BY tl.Stage";
      break;
    case 28: sql = "SELECT tl.Stage, tpu.Type, tpul.NumberOf " +
    "FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID " +
    "JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID WHERE tl.Stage >= ? " +
    "ORDER BY tl.Stage";
      break;
    case 29: sql = "SELECT tl.Stage, tpu.Type, tpul.NumberOf " +
    "FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID " +
    "JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID WHERE tl.Stage <= ? " +
    "ORDER BY tl.Stage";
      break;
    case 30: sql = "SELECT tl.Stage, tpu.Type, tpul.NumberOf " +
    "FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID " +
    "JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID WHERE tpul.NumberOf >= ? " +
    "ORDER BY tl.Stage";
      break;
    case 31: sql = "SELECT tl.Stage, tpu.Type, tpul.NumberOf " +
    "FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID " +
    "JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID WHERE tpul.NumberOf <= ? " +
    "ORDER BY tl.Stage";
      break;
  default: res.render('home');
  }

  if(switchHelper1 > 9){
    //query to database
    mysql.pool.query(sql, switchHelper2, function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      //parse rows into printable array
      var rParams = [];
      for (var x in rows){
        rParams.push(rows[x]);
      }
      context.print = rParams;
      switch (switchHelper1) {
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15: res.render('basicLevelSearchResults', context);
          break;
        case 16:
        case 17:
        case 18:
        case 19: res.render('basicEnemyTypeSearchResults', context);
          break;
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25: res.render('advancedEnemyTypeSearchResults', context);
          break;
        case 26:
        case 27: res.render('enemiesOnLevelsSearchResults', context);
          break;
        case 28:
        case 29:
        case 30:
        case 31: res.render('powerUpsOnLevelsSearchResults', context);
          break;
        default: res.render('home');
      }
    });
  }
});

/*********************************************************************
** UPDATE PAGES HANDLER: navigates through update page options
*********************************************************************/
app.get('/updatePage',function(req,res,next){
  //for displaying context in html format
  var context = {};
  var switchHelper = Number(req.query.s);

  switch (switchHelper) {
    case 1: sql = "SELECT ID, Theme, Stage, MinEnemies, MaxEnemies " +
    "FROM tbl_level ORDER BY Stage";
      break;
    case 2: sql = "SELECT ID, Type, Description FROM tbl_powerUp ORDER BY ID";
      break;
    case 3: sql = "SELECT tet.ID, tet.Type, tet.Description, tet.AttackPoints, " +
    "tet.DefensePoints, ti.Type AS ItemDrop FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_item ti On tet.ItemId = ti.ID ORDER BY tet.ID";
      break;
    case 4: sql = "SELECT tet.ID, tet.Type, tet.AttackPoints, tet.DefensePoints," +
    " ti.Type AS Item, tsa.Type AS Special, tl.Stage FROM tbl_enemyType tet " +
    "LEFT JOIN tbl_enemyTypeSpecialAbility tetsa ON tetsa.ETID = tet.ID " +
    "LEFT JOIN tbl_specialAbility tsa ON tetsa.SAID = tsa.ID LEFT JOIN tbl_item ti " +
    "ON ti.ID = tet.ItemID JOIN tbl_enemyTypeLevel tetl " +
    "ON tetl.ETID = tet.ID JOIN tbl_level tl ON tetl.LID = tl.ID " +
    "GROUP BY tet.ID, tl.Stage, tsa.Type ORDER BY tet.ID, tl.Stage, tsa.Type";
      break;
    case 5: sql = "SELECT ID, Type, Description, Value FROM tbl_item ORDER BY ID";
      break;
    case 6: sql = "SELECT ID, Type, Description, Value FROM tbl_specialAbility " +
    "ORDER BY ID";
      break;
    case 7: sql = "SELECT tetl.ID, tl.Stage, tet.Type, tetl.AveOf FROM tbl_level tl " +
    "JOIN tbl_enemyTypeLevel tetl ON tetl.LID = tl.ID " +
    "JOIN tbl_enemyType tet ON tetl.ETID = tet.ID GROUP BY tl.Stage, tet.Type ORDER BY tet.Type";
      break;
    case 8: sql = "SELECT tpul.ID, tl.Stage, tpu.Type, tpul.NumberOf FROM tbl_level tl JOIN tbl_powerUpLevel tpul ON tpul.LID = tl.ID JOIN tbl_powerUp tpu ON tpul.PUID = tpu.ID ORDER BY tl.Stage";
      break;
    case 13: sql = "SELECT tetsa.ID, tet.Type AS EnemyType, tsa.Type " +
    "AS SpecialType FROM tbl_enemyType tet " +
    "JOIN tbl_enemyTypeSpecialAbility tetsa " +
    "ON tetsa.ETID = tet.ID JOIN tbl_specialAbility tsa " +
    "ON tetsa.SAID = tsa.ID ORDER BY tet.Type";
      break;
    default: sql = 0;
  }

  //query to database
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    //parse rows into printable array
    var rParams = [];
    for (var x in rows){
      rParams.push(rows[x]);
    }
    context.print = rParams;

    //depending on user selection render results
    if(sql === 0){
      res.render('problemPage', context);
    }
    else {
      switch (switchHelper) {
        case 1: res.render('basicLevelUpdate', context);
          break;
        case 2: res.render('basicPowerUpUpdate', context);
          break;
        case 3: sql = "SELECT ID, Type FROM tbl_item ORDER BY ID";
                mysql.pool.query(sql, function(err, rows, fields){
                    if(err){
                      next(err);
                      return;
                    }
                    var options = [];
                    for (var y = 0; y < rows.length; y++) {
                      options.push({"option":rows[y].Type, "val":rows[y].ID});
                    }
                    context.options = options;
                    res.render('basicEnemyTypeUpdate', context);
                });
          break;
        case 4: res.render('advancedEnemyTypeUpdate', context);
          break;
        case 5: res.render('basicItemUpdate', context);
          break;
        case 6: res.render('basicSpecialAbilityUpdate', context);
          break;
        case 7: sql = "SELECT ID, Stage FROM tbl_level ORDER BY Stage";
                mysql.pool.query(sql, function(err, rows, fields){
                    if(err){
                      next(err);
                      return;
                    }
                    var options1 = [];
                    for (var x = 0; x < rows.length; x++) {
                      options1.push({"option":rows[x].Stage, "val":rows[x].ID});
                    }
                    context.options1 = options1;
                    sql = "SELECT ID, Type FROM tbl_enemyType tet ORDER BY tet.ID";
                    mysql.pool.query(sql, function(err, rows, fields){
                        if(err){
                          next(err);
                          return;
                        }
                        var options2 = [];
                        for (var y = 0; y < rows.length; y++) {
                          options2.push({"option":rows[y].Type, "val":rows[y].ID});
                        }
                        context.options2 = options2;
                        res.render('enemiesOnLevelsUpdate', context);
                    });
                });
          break;
        case 8: sql = "SELECT ID, Stage FROM tbl_level ORDER BY Stage";
                mysql.pool.query(sql, function(err, rows, fields){
                    if(err){
                      next(err);
                      return;
                    }
                    var options1 = [];
                    for (var x = 0; x < rows.length; x++) {
                      options1.push({"option":rows[x].Stage, "val":rows[x].ID});
                    }
                    context.options1 = options1;
                    sql = "SELECT ID, Type FROM tbl_powerUp ORDER BY ID";
                    mysql.pool.query(sql, function(err, rows, fields){
                        if(err){
                          next(err);
                          return;
                        }
                        var options2 = [];
                        for (var y = 0; y < rows.length; y++) {
                          options2.push({"option":rows[y].Type, "val":rows[y].ID});
                        }
                        context.options2 = options2;
                        res.render('powerUpsOnLevelsUpdate', context);
                    });
                });
          break;
        case 13: sql = "SELECT ID, Type FROM tbl_enemyType ORDER BY Type";
                mysql.pool.query(sql, function(err, rows, fields){
                    if(err){
                      next(err);
                      return;
                    }
                    var options1 = [];
                    for (var x = 0; x < rows.length; x++) {
                      options1.push({"option":rows[x].Type, "val":rows[x].ID});
                    }
                    context.options1 = options1;
                    sql = "SELECT ID, Type FROM tbl_specialAbility ORDER BY ID";
                    mysql.pool.query(sql, function(err, rows, fields){
                        if(err){
                          next(err);
                          return;
                        }
                        var options2 = [];
                        for (var y = 0; y < rows.length; y++) {
                          options2.push({"option":rows[y].Type, "val":rows[y].ID});
                        }
                        context.options2 = options2;
                        res.render('enemyTypeSpecialAbilityUpdate', context);
                    });
                });
          break;
        default: res.render('problemPageUpdate', context);
      }
    }
  });
});

/*********************************************************************
** INSERT HANDLER: parses what to insert and inserts it
*********************************************************************/
app.get('/insert',function(req,res,next){
  var switchHelper = Number(req.query.s);
  var sql = "";

  switch (switchHelper) {
    case 1: sql = "INSERT INTO tbl_level (`Theme`, `Stage`, `MinEnemies`, `MaxEnemies`) VALUES (?, ?, ?, ?)";
    mysql.pool.query(sql, [req.query.Theme, req.query.Stage, req.query.MinEnemies, req.query.MaxEnemies], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 2: sql = "INSERT INTO tbl_powerUp (`Type`, `Description`) VALUES (?, ?)";
    mysql.pool.query(sql, [req.query.Type, req.query.Description], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 3: sql = "INSERT INTO tbl_enemyType (`Type`, `Description`, `AttackPoints`, `DefensePoints`, `ItemID`) VALUES (?, ?, ?, ?, ?)";
        mysql.pool.query(sql, [req.query.Type, req.query.Description, req.query.AttackPoints, req.query.DefensePoints, req.query.ItemID], function(err, result){
        if(err){
          next(err);
          return;
        }
      });
      break;
    case 5: sql = "INSERT INTO tbl_item (`Type`, `Description`, `Value`) VALUES (?, ?, ?)";
    mysql.pool.query(sql, [req.query.Type, req.query.Description, req.query.Value], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 6: sql = "INSERT INTO tbl_specialAbility (`Type`, `Description`, `Value`) VALUES (?, ?, ?)";
    mysql.pool.query(sql, [req.query.Type, req.query.Description, req.query.Value], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 7: sql = "INSERT INTO tbl_enemyTypeLevel (`LID`, `ETID`, `AveOf`) VALUES (?, ?, ?)";
    mysql.pool.query(sql, [req.query.LID, req.query.ETID, req.query.AveOf], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 8: sql = "INSERT INTO tbl_powerUpLevel (`LID`, `PUID`, `NumberOf`) VALUES (?, ?, ?)";
    mysql.pool.query(sql, [req.query.LID, req.query.PUID, req.query.NumberOf], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 13: sql = "INSERT INTO tbl_enemyTypeSpecialAbility (`ETID`, `SAID`) VALUES (?, ?)";
    mysql.pool.query(sql, [req.query.ETID, req.query.SAID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
  }
});


/*********************************************************************
** DELETE HANDLER: parses what to delete and deletes it
*********************************************************************/
app.get('/delete',function(req,res,next){
  var switchHelper = Number(req.query.s);
  var sql = "";

  switch (switchHelper) {
    case 1: sql = "DELETE FROM tbl_level WHERE ID=?";
    mysql.pool.query(sql, [req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 2: sql = "DELETE FROM tbl_powerUp WHERE ID=?";
    mysql.pool.query(sql, [req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 3: sql = "DELETE FROM tbl_enemyType WHERE ID=?";
    mysql.pool.query(sql, [req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 5: sql = "DELETE FROM tbl_item WHERE id=?";
    mysql.pool.query(sql, [req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 6: sql = "DELETE FROM tbl_specialAbility WHERE ID=?";
      mysql.pool.query(sql, [req.query.ID], function(err, result){
        if(err){
          next(err);
          return;
        }
      });
      break;
    case 7: sql = "DELETE FROM tbl_enemyTypeLevel WHERE ID=?";
      mysql.pool.query(sql, [req.query.ID], function(err, result){
        if(err){
          next(err);
          return;
        }
      });
      break;
    case 8: sql = "DELETE FROM tbl_powerUpLevel WHERE ID=?";
      mysql.pool.query(sql, [req.query.ID], function(err, result){
        if(err){
          next(err);
          return;
        }
      });
      break;
    case 13: sql = "DELETE FROM tbl_enemyTypeSpecialAbility WHERE ID=?";
      mysql.pool.query(sql, [req.query.ID], function(err, result){
        if(err){
          next(err);
          return;
        }
      });
      break;
  }
});

/*********************************************************************
** UPDATE HANDLER: parses what to update and updates it
*********************************************************************/
app.get('/update',function(req,res,next){
  var switchHelper = Number(req.query.s);
  var sql = "";

  switch (switchHelper) {
    case 1: sql = "UPDATE tbl_level SET Theme=?, Stage=?, MinEnemies=?, MaxEnemies=? WHERE id=?";
    mysql.pool.query(sql, [req.query.Theme, req.query.Stage, req.query.MinEnemies, req.query.MaxEnemies, req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 2: sql = "UPDATE tbl_powerUp SET Type=?, Description=? WHERE ID=?";
    mysql.pool.query(sql, [req.query.Type, req.query.Description, req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 3: if(req.query.ItemID === ""){
            sql = "UPDATE tbl_enemyType SET Type=?, Description=?, AttackPoints=?, DefensePoints=?, ItemID=NULL WHERE ID=?";
            mysql.pool.query(sql, [req.query.Type, req.query.Description, req.query.AttackPoints, req.query.DefensePoints, req.query.ID], function(err, result){
              if(err){
                next(err);
                return;
              }
            });
          }
          else {
            sql = "UPDATE tbl_enemyType SET Type=?, Description=?, AttackPoints=?, DefensePoints=?, ItemID=? WHERE ID=?";
            mysql.pool.query(sql, [req.query.Type, req.query.Description, req.query.AttackPoints, req.query.DefensePoints, req.query.ItemID, req.query.ID], function(err, result){
              if(err){
                next(err);
                return;
              }
            });
          }
      break;
    case 5: sql = "UPDATE tbl_item SET Type=?, Description=?, Value=? WHERE ID=?";
    mysql.pool.query(sql, [req.query.Type, req.query.Description, req.query.Value, req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 6: sql = "UPDATE tbl_specialAbility SET Type=?, Description=?, Value=? WHERE ID=?";
    mysql.pool.query(sql, [req.query.Type, req.query.Description, req.query.Value, req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 7: sql = "UPDATE tbl_enemyTypeLevel SET AveOf=? WHERE ID=?";
    mysql.pool.query(sql, [req.query.AveOf, req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
    case 8: sql = "UPDATE tbl_powerUpLevel SET NumberOf=? WHERE ID=?";
    mysql.pool.query(sql, [req.query.NumberOf, req.query.ID], function(err, result){
      if(err){
        next(err);
        return;
      }
    });
      break;
  }
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
