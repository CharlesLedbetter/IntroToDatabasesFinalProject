/*********************************************************************
** Final Project (client-side implementation)
** Author: Charles Ledbetter
** Date: 11/30/2017
** Description: This is all the client-side JavaScript functions used in
the website.
*********************************************************************/


/*********************************************************************
** selectChange: updates buttons when option is selected from menu
*********************************************************************/
function selectChange(sel){
  var viewData = document.getElementById("viewData");
  var searchData = document.getElementById("searchData");
  var audData = document.getElementById("addData");

  switch (sel) {
    case 0: viewData.className = "grayedOut tallButton";
            viewData.setAttribute("onclick", "event.preventDefault();");
            searchData.className = "grayedOut tallButton";
            searchData.setAttribute("onclick", "event.preventDefault();");
            audData.className = "grayedOut tallButton";
            audData.setAttribute("onclick", "event.preventDefault();");
      break;
    case 1: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(1)");
            searchData.className = "wideButton tallButton";
            searchData.setAttribute("onclick", "searchButton(1)");
            audData.className = "wideButton tallButton";
            audData.setAttribute("onclick", "audButton(1)");
      break;
    case 2: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(2)");
            searchData.className = "grayedOut tallButton";
            searchData.setAttribute("onclick", "event.preventDefault();");
            audData.className = "wideButton tallButton";
            audData.setAttribute("onclick", "audButton(2)");
      break;
    case 3: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(3)");
            searchData.className = "wideButton tallButton";
            searchData.setAttribute("onclick", "searchButton(3)");
            audData.className = "wideButton tallButton";
            audData.setAttribute("onclick", "audButton(3)");
      break;
    case 4: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(4)");
            searchData.className = "wideButton tallButton";
            searchData.setAttribute("onclick", "searchButton(4)");
            audData.className = "grayedOut tallButton";
            audData.setAttribute("onclick", "event.preventDefault();");
      break;
    case 5: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(5)");
            searchData.className = "grayedOut tallButton";
            searchData.setAttribute("onclick", "event.preventDefault();");
            audData.className = "wideButton tallButton";
            audData.setAttribute("onclick", "audButton(5)");

      break;
    case 6: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(6)");
            searchData.className = "grayedOut tallButton";
            searchData.setAttribute("onclick", "event.preventDefault();");
            audData.className = "wideButton tallButton";
            audData.setAttribute("onclick", "audButton(6)");

      break;
    case 7: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(7)");
            searchData.className = "wideButton tallButton";
            searchData.setAttribute("onclick", "searchButton(7)");
            audData.className = "wideButton tallButton";
            audData.setAttribute("onclick", "audButton(7)");

      break;
    case 8: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(8)");
            searchData.className = "wideButton tallButton";
            searchData.setAttribute("onclick", "searchButton(8)");
            audData.className = "wideButton tallButton";
            audData.setAttribute("onclick", "audButton(8)");

      break;
    case 9: viewData.className = "wideButton tallButton";
            viewData.setAttribute("onclick", "viewButton(9)");
            searchData.className = "grayedOut tallButton";
            searchData.setAttribute("onclick", "event.preventDefault();");
            audData.className = "grayedOut tallButton";
            audData.setAttribute("onclick", "event.preventDefault();");

      break;
    case 10: viewData.className = "wideButton tallButton";
             viewData.setAttribute("onclick", "viewButton(10)");
             searchData.className = "grayedOut tallButton";
             searchData.setAttribute("onclick", "event.preventDefault();");
             audData.className = "grayedOut tallButton";
             audData.setAttribute("onclick", "event.preventDefault();");
      break;
    case 11: viewData.className = "wideButton tallButton";
             viewData.setAttribute("onclick", "viewButton(11)");
             searchData.className = "grayedOut tallButton";
             searchData.setAttribute("onclick", "event.preventDefault();");
             audData.className = "grayedOut tallButton";
             audData.setAttribute("onclick", "event.preventDefault();");
      break;
    case 12: viewData.className = "wideButton tallButton";
             viewData.setAttribute("onclick", "viewButton(12)");
             searchData.className = "grayedOut tallButton";
             searchData.setAttribute("onclick", "event.preventDefault();");
             audData.className = "grayedOut tallButton";
             audData.setAttribute("onclick", "event.preventDefault();");
      break;
    case 13: viewData.className = "wideButton tallButton";
             viewData.setAttribute("onclick", "viewButton(13)");
             searchData.className = "grayedOut tallButton";
             searchData.setAttribute("onclick", "event.preventDefault();");
             audData.className = "wideButton tallButton";
             audData.setAttribute("onclick", "audButton(13)");
      break;
    default: viewData.className = "grayedOut tallButton";
             viewData.setAttribute("onclick", "event.preventDefault();");
             searchData.className = "grayedOut tallButton";
             searchData.setAttribute("onclick", "event.preventDefault();");
             audData.className = "grayedOut tallButton";
             audData.setAttribute("onclick", "event.preventDefault();");
  }
  event.preventDefault();
}


/*********************************************************************
** viewButton: used to interact with '/select' the view pages navigation
handler.
*********************************************************************/
function viewButton(sel){
  var get = "/select?s=" + sel.toString();
  window.location.href = get;
  event.preventDefault();
}


/*********************************************************************
** searchButton: used to interact with '/searchPage' the search pages
navigation handler.
*********************************************************************/
function searchButton(sel){
  var get = "/searchPage?s=0&p=" + sel.toString();
  window.location.href = get;
  event.preventDefault();
}

/*********************************************************************
** doneButton: used to take user back to the main page by invoking
'/' the home page handler
*********************************************************************/
function doneButton(){
  window.location.href = '/';
  event.preventDefault();
}

/*********************************************************************
** searchChange: used to turn button functionality on an off in the
search menus
*********************************************************************/
function searchChange(sel){
  var searchData = document.getElementById("searchData");

  if(sel === 0){
    searchData.className = "wideButton tallButton";
    searchData.setAttribute("onclick", "event.preventDefault();");
  }
  else {
    searchData.className = "wideButton tallButton";
    searchData.setAttribute("onclick", "searchDataButton(" + sel.toString() + ")");
  }
  event.preventDefault();
}


/*********************************************************************
** numberChange: used to turn button functionality on an off in the
search menus
*********************************************************************/
function numberChange(sel){
  var searchData = document.getElementById("searchData");

  if(isNaN(sel) || sel < 0){
    searchData.className = "grayedOut tallButton";
    searchData.setAttribute("onclick", "event.preventDefault();");
  }
  else {
    searchData.className = "wideButton tallButton";
    searchData.setAttribute("onclick", "searchSubmitButton()");
  }
  event.preventDefault();
}


/*********************************************************************
** searchButton: used to interact with '/searchPage' the search pages
navigation handler. This is a level deeper in the hierarchy
than searchChange.
*********************************************************************/
function searchDataButton(sel){
  var pageID = document.getElementById("pageID").value;
  var get = "/searchPage?s=" + pageID.toString() + "&p=" + sel.toString();
  window.location.href = get;
  event.preventDefault();
}

/*********************************************************************
** searchButton: used to interact with '/searchPage' the search pages
navigation handler. This is a level deeper in the hierarchy
than searchDataButton. This button calls the results to be loaded.
*********************************************************************/
function searchSubmitButton(){
  var pageID = document.getElementById("pageID").value;
  var quant = document.getElementById("quant").value;
  if(quant > 0){
    var get = "/searchPage?s=" + pageID.toString() + "&p=" + quant.toString();
    window.location.href = get;
  }
  event.preventDefault();
}


/*********************************************************************
** audButton: used to interact with '/updatePage' the update pages
navigation handler. aud stands for add update delete.
*********************************************************************/
function audButton(sel){
  var get = "/updatePage?s=" + sel.toString();
  window.location.href = get;
  event.preventDefault();
}

/*********************************************************************
** insertButton: used to interact with '/insert'. This button sends
values that are inserted into the database
*********************************************************************/
function insertButton(id){
  //get form values ready to send
  var get = "";
  var val = [6];
  if (typeof document.getElementById("add0") != "undefined" && document.getElementById("add0") !== null) {
     val[0] = document.getElementById("add0").value;
  }
  if (typeof document.getElementById("add1") != "undefined" && document.getElementById("add1") !== null) {
     val[1] = document.getElementById("add1").value;
  }
  if (typeof document.getElementById("add2") != "undefined" && document.getElementById("add2") !== null) {
     val[2] = document.getElementById("add2").value;
  }
  if (typeof document.getElementById("add3") != "undefined" && document.getElementById("add3") !== null) {
     val[3] = document.getElementById("add3").value;
  }
  if (typeof document.getElementById("add4") != "undefined" && document.getElementById("add4") !== null) {
     val[4] = document.getElementById("add4").value;
  }
  if (typeof document.getElementById("add5") != "undefined" && document.getElementById("add5") !== null) {
     val[5] = document.getElementById("add5").value;
  }


  //prep the GET message with the gathered values
  switch (Number(id)) {
    case 1: if(val[0] !== "" && val[1] !== "" && val[2] !== "" && val[3] !== ""){
            var req = new XMLHttpRequest();
            get = "/insert?s=" + id.toString() +"&Theme=" + val[0] +
            "&Stage=" + val[1].toString() + "&MinEnemies=" +
            val[2].toString() + "&MaxEnemies=" + val[3].toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 2: if(val[0] !== ""){
            var req = new XMLHttpRequest();
            get = "/insert?s=" + id.toString() +"&Type=" + val[0] +
            "&Description=" + val[1].toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
      case 3: if(val[0] !== "" && val[3] !== ""){
              var req = new XMLHttpRequest();
              get = "/insert?s=" + id.toString() +"&Type=" + val[0] +
              "&Description=" + val[1].toString() +"&AttackPoints=" + val[2].toString() +
              "&DefensePoints=" + val[3].toString() + "&ItemID=" + val[4].toString();
              console.log(val[0]);
              console.log(val[1]);
              console.log(val[2]);
              console.log(val[3]);
              console.log(val[4]);
              req.open("GET", get, true);
              req.send(null);
              location.reload();
            }
        break;
    case 5:
    case 6: if(val[0] !== ""){
            var req = new XMLHttpRequest();
            get = "/insert?s=" + id.toString() +"&Type=" + val[0] +
            "&Description=" + val[1].toString() +
            "&Value=" + val[2].toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 7: if(val[0] !== "" && val[1] !== "" && val[2] !== ""){
            var req = new XMLHttpRequest();
            get = "/insert?s=" + id.toString() +"&LID=" + val[0] +
            "&ETID=" + val[1].toString() +
            "&AveOf=" + val[2].toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 8: if(val[0] !== "" && val[1] !== "" && val[2] !== ""){
            var req = new XMLHttpRequest();
            get = "/insert?s=" + id.toString() +"&LID=" + val[0] +
            "&PUID=" + val[1].toString() +
            "&NumberOf=" + val[2].toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 13: if(val[0] !== "" && val[1] !== ""){
            var req = new XMLHttpRequest();
            get = "/insert?s=" + id.toString() +"&ETID=" + val[0] +
            "&SAID=" + val[1].toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    default:

  }
  event.preventDefault();
}

/*********************************************************************
** deleteButton: this sends a request to delete a row from a table.
*********************************************************************/
function deleteButton(sel, id){
  //for GET request
  var req = new XMLHttpRequest();

  //prep the GET message with the value
  var get = "/delete?s=" + sel.toString() + "&ID=" + id.value.toString();

  //GET request
  req.open("GET", get, true);
  req.send(null);
  location.reload();
  event.preventDefault();
}

/*********************************************************************
** updateStartButton: this creates a form the user can fill in to
update values. It sets the update button to a new function
updateDoneButton and graysOut other buttons.
*********************************************************************/
function updateStartButton(id){
  var pageID = Number(document.getElementById("pageID").value);

  //gray out other buttons
  var grayedAdd = document.getElementById("insertButton");
  grayedAdd.setAttribute("onclick", "event.preventDefault();");
  grayedAdd.setAttribute("class", "grayedOut");

  var grayedUpdate = document.getElementsByName("update");
  for (var x = 0; x < grayedUpdate.length; x++) {
    grayedUpdate[x].setAttribute("onclick", "event.preventDefault();");
    grayedUpdate[x].setAttribute("class", "grayedOut");
  }

  var grayedDelete = document.getElementsByName("delete");
  for (var y = 0; y < grayedDelete.length; y++) {
    grayedDelete[y].setAttribute("onclick", "event.preventDefault();");
    grayedDelete[y].setAttribute("class", "grayedOut");
  }

  //possible variables for switch statement
  //for selecting and manipulating table cells
  var updateCell1;
  var updateCell2;
  var updateCell3;
  var updateCell4;
  var updateCell5;
  var updateCell6;
  var updateInfo1;
  var updateInfo2;
  var updateInfo3;
  var updateInfo4;
  var updateInfo5;
  var updateInfo6;
  //for creating new inputs
  var updateTheme;
  var updateStage;
  var updateMinEnemies;
  var updateMaxEnemies;
  var updateType;
  var updateDescription;
  var updateValue;
  var updateAttackPoints;
  var updateDefensePoints;
  var updateItemID;

  switch (pageID) {
    case 1: updateCell1 = id.parentNode.parentNode.children[0];
            updateCell2 = id.parentNode.parentNode.children[1];
            updateCell3 = id.parentNode.parentNode.children[2];
            updateCell4 = id.parentNode.parentNode.children[3];

            updateInfo1 = updateCell1.innerHTML;
            updateInfo2 = updateCell2.innerHTML;
            updateInfo3 = updateCell3.innerHTML;
            updateInfo4 = updateCell4.innerHTML;

            updateCell1.innerHTML = "";
            updateCell2.innerHTML = "";
            updateCell3.innerHTML = "";
            updateCell4.innerHTML = "";

            updateTheme = document.createElement("input");
            updateTheme.setAttribute("type", "text");
            updateTheme.setAttribute("name", "updateTheme");
            updateTheme.setAttribute("id", "update0");
            updateTheme.setAttribute("class", "grayed");
            updateTheme.setAttribute("value", updateInfo1);
            updateStage = document.createElement("input");
            updateStage.setAttribute("type", "number");
            updateStage.setAttribute("name", "updateStage");
            updateStage.setAttribute("id", "update1");
            updateStage.setAttribute("class", "grayed");
            updateStage.setAttribute("value", updateInfo2);
            updateStage.setAttribute("min", "0");
            updateMinEnemies = document.createElement("input");
            updateMinEnemies.setAttribute("type", "number");
            updateMinEnemies.setAttribute("name", "updateMin");
            updateMinEnemies.setAttribute("id", "update2");
            updateMinEnemies.setAttribute("class", "grayed");
            updateMinEnemies.setAttribute("value", updateInfo3);
            updateMinEnemies.setAttribute("placeholder", updateInfo3);
            updateMinEnemies.setAttribute("min", "0");
            updateMaxEnemies = document.createElement("input");
            updateMaxEnemies.setAttribute("type", "number");
            updateMaxEnemies.setAttribute("name", "updateMax");
            updateMaxEnemies.setAttribute("id", "update3");
            updateMaxEnemies.setAttribute("class", "grayed");
            updateMaxEnemies.setAttribute("value", updateInfo4);
            updateMaxEnemies.setAttribute("placeholder", updateInfo4);
            updateMaxEnemies.setAttribute("min", "0");

            updateCell1.appendChild(updateTheme);
            updateCell2.appendChild(updateStage);
            updateCell3.appendChild(updateMinEnemies);
            updateCell4.appendChild(updateMaxEnemies);
      break;
      case 2: updateCell1 = id.parentNode.parentNode.children[0];
              updateCell2 = id.parentNode.parentNode.children[1];

              updateInfo1 = updateCell1.innerHTML;
              updateInfo2 = updateCell2.innerHTML;

              updateCell1.innerHTML = "";
              updateCell2.innerHTML = "";

              updateType = document.createElement("input");
              updateType.setAttribute("type", "text");
              updateType.setAttribute("name", "updateType");
              updateType.setAttribute("id", "update0");
              updateType.setAttribute("class", "grayed");
              updateType.setAttribute("value", updateInfo1);
              updateDescription = document.createElement("input");
              updateDescription.setAttribute("type", "text");
              updateDescription.setAttribute("name", "updateDesc");
              updateDescription.setAttribute("id", "update1");
              updateDescription.setAttribute("class", "grayed");
              updateDescription.setAttribute("value", updateInfo2);

              updateCell1.appendChild(updateType);
              updateCell2.appendChild(updateDescription);
        break;
      case 3: updateCell1 = id.parentNode.parentNode.children[0];
              updateCell2 = id.parentNode.parentNode.children[1];
              updateCell3 = id.parentNode.parentNode.children[2];
              updateCell4 = id.parentNode.parentNode.children[3];
              updateCell5 = id.parentNode.parentNode.children[4];

              updateInfo1 = updateCell1.innerHTML;
              updateInfo2 = updateCell2.innerHTML;
              updateInfo3 = updateCell3.innerHTML;
              updateInfo4 = updateCell4.innerHTML;
              updateInfo5 = updateCell5.innerHTML;

              updateCell1.innerHTML = "";
              updateCell2.innerHTML = "";
              updateCell3.innerHTML = "";
              updateCell4.innerHTML = "";
              updateCell5.innerHTML = "";

              updateType = document.createElement("input");
              updateType.setAttribute("type", "text");
              updateType.setAttribute("name", "updateType");
              updateType.setAttribute("id", "update0");
              updateType.setAttribute("class", "grayed");
              updateType.setAttribute("value", updateInfo1);
              updateDescription = document.createElement("input");
              updateDescription.setAttribute("type", "text");
              updateDescription.setAttribute("name", "updateDesc");
              updateDescription.setAttribute("id", "update1");
              updateDescription.setAttribute("class", "grayed");
              updateDescription.setAttribute("value", updateInfo2);
              updateAttackPoints = document.createElement("input");
              updateAttackPoints.setAttribute("type", "number");
              updateAttackPoints.setAttribute("name", "updateAtt");
              updateAttackPoints.setAttribute("id", "update2");
              updateAttackPoints.setAttribute("class", "grayed");
              updateAttackPoints.setAttribute("value", updateInfo3);
              updateAttackPoints.setAttribute("placeholder", updateInfo3);
              updateAttackPoints.setAttribute("min", "0");
              updateDefensePoints = document.createElement("input");
              updateDefensePoints.setAttribute("type", "number");
              updateDefensePoints.setAttribute("name", "updateDef");
              updateDefensePoints.setAttribute("id", "update3");
              updateDefensePoints.setAttribute("class", "grayed");
              updateDefensePoints.setAttribute("value", updateInfo4);
              updateDefensePoints.setAttribute("placeholder", updateInfo4);
              updateDefensePoints.setAttribute("min", "0");
              updateItemID = document.getElementById("add4").cloneNode(true);
              updateItemID.setAttribute("name", "updateItem");
              updateItemID.setAttribute("id", "update4");
              updateItemID.setAttribute("value", updateInfo5);


              updateCell1.appendChild(updateType);
              updateCell2.appendChild(updateDescription);
              updateCell3.appendChild(updateAttackPoints);
              updateCell4.appendChild(updateDefensePoints);
              updateCell5.appendChild(updateItemID);
        break;
      case 5:
      case 6: updateCell1 = id.parentNode.parentNode.children[0];
              updateCell2 = id.parentNode.parentNode.children[1];
              updateCell3 = id.parentNode.parentNode.children[2];

              updateInfo1 = updateCell1.innerHTML;
              updateInfo2 = updateCell2.innerHTML;
              updateInfo3 = updateCell3.innerHTML;

              updateCell1.innerHTML = "";
              updateCell2.innerHTML = "";
              updateCell3.innerHTML = "";

              updateType = document.createElement("input");
              updateType.setAttribute("type", "text");
              updateType.setAttribute("name", "updateType");
              updateType.setAttribute("id", "update0");
              updateType.setAttribute("class", "grayed");
              updateType.setAttribute("value", updateInfo1);
              updateDescription = document.createElement("input");
              updateDescription.setAttribute("type", "text");
              updateDescription.setAttribute("name", "updateDesc");
              updateDescription.setAttribute("id", "update1");
              updateDescription.setAttribute("class", "grayed");
              updateDescription.setAttribute("value", updateInfo2);
              updateValue = document.createElement("input");
              updateValue.setAttribute("type", "number");
              updateValue.setAttribute("name", "updateValue");
              updateValue.setAttribute("id", "update2");
              updateValue.setAttribute("class", "grayed");
              updateValue.setAttribute("value", updateInfo3);
              updateValue.setAttribute("placeholder", updateInfo3);
              updateValue.setAttribute("min", "0");

              updateCell1.appendChild(updateType);
              updateCell2.appendChild(updateDescription);
              updateCell3.appendChild(updateValue);
        break;
      case 7: updateCell3 = id.parentNode.parentNode.children[2];

              updateInfo3 = updateCell3.innerHTML;

              updateCell3.innerHTML = "";

              updateValue = document.createElement("input");
              updateValue.setAttribute("type", "number");
              updateValue.setAttribute("name", "updateAve");
              updateValue.setAttribute("id", "update0");
              updateValue.setAttribute("class", "grayed");
              updateValue.setAttribute("value", updateInfo3);
              updateValue.setAttribute("placeholder", updateInfo3);
              updateValue.setAttribute("min", "0");

              updateCell3.appendChild(updateValue);
          break;
      case 8: updateCell3 = id.parentNode.parentNode.children[2];

              updateInfo3 = updateCell3.innerHTML;

              updateCell3.innerHTML = "";

              updateValue = document.createElement("input");
              updateValue.setAttribute("type", "number");
              updateValue.setAttribute("name", "updateNumber");
              updateValue.setAttribute("id", "update0");
              updateValue.setAttribute("class", "grayed");
              updateValue.setAttribute("value", updateInfo3);
              updateValue.setAttribute("placeholder", updateInfo3);
              updateValue.setAttribute("min", "0");

              updateCell3.appendChild(updateValue);
          break;
    default:

  }

  //fix update button
  var usedButton = id.parentNode.children[0];
  usedButton.setAttribute("onclick", "updateDoneButton(this.parentNode.children[1])");
  usedButton.setAttribute("class", "wideButton");

  event.preventDefault();
}

/*********************************************************************
** updateDoneButton: this sends data to the '/update' handler used
to update the database. This also reloads the page so the changes are
evident.
*********************************************************************/
function updateDoneButton(id){
  var pageID = Number(document.getElementById("pageID").value);

  //get form values ready to send
  var get = "";
  var val = [6];
  if (typeof document.getElementById("update0") != "undefined" && document.getElementById("update0") !== null) {
     val[0] = document.getElementById("update0").value;
  }
  if (typeof document.getElementById("update1") != "undefined" && document.getElementById("update1") !== null) {
     val[1] = document.getElementById("update1").value;
  }
  if (typeof document.getElementById("update2") != "undefined" && document.getElementById("update2") !== null) {
     val[2] = document.getElementById("update2").value;
  }
  if (typeof document.getElementById("update3") != "undefined" && document.getElementById("update3") !== null) {
     val[3] = document.getElementById("update3").value;
  }
  if (typeof document.getElementById("update4") != "undefined" && document.getElementById("update4") !== null) {
     val[4] = document.getElementById("update4").value;
  }
  if (typeof document.getElementById("update5") != "undefined" && document.getElementById("update5") !== null) {
     val[5] = document.getElementById("update5").value;
  }

  switch (pageID) {
    case 1: if(val[0] !== "" && val[1] !== "" && val[2] !== "" && val[3] !== ""){
            var req = new XMLHttpRequest();
            get = "/update?s=" + pageID.toString() +"&Theme=" + val[0] +
           "&Stage=" + val[1].toString() + "&MinEnemies=" +
           val[2].toString() + "&MaxEnemies=" + val[3].toString() + "&ID=" + id.value.toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 2: if(val[0] !== ""){
            var req = new XMLHttpRequest();
            get = "/update?s=" + pageID.toString() + "&Type=" + val[0] +
           "&Description=" + val[1].toString() + "&ID=" + id.value.toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 3: if(val[0] !== "" && val[3] !== ""){
            var req = new XMLHttpRequest();
            get = "/update?s=" + pageID.toString() + "&Type=" + val[0] +
           "&Description=" + val[1].toString() + "&AttackPoints=" + val[2] +
          "&DefensePoints=" + val[3].toString() + "&ItemID=" + val[4].toString() + "&ID=" + id.value.toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 5:
    case 6: if(val[0] !== ""){
            var req = new XMLHttpRequest();
            get = "/update?s=" + pageID.toString() + "&Type=" + val[0] +
            "&Description=" + val[1].toString() + "&Value=" +
            val[2].toString() + "&ID=" + id.value.toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 7: if(val[0] !== ""){
            var req = new XMLHttpRequest();
            get = "/update?s=" + pageID.toString() + "&AveOf=" + val[0] +
            "&ID=" + id.value.toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    case 8: if(val[0] !== ""){
            var req = new XMLHttpRequest();
            get = "/update?s=" + pageID.toString() + "&NumberOf=" + val[0] +
            "&ID=" + id.value.toString();
            req.open("GET", get, true);
            req.send(null);
            location.reload();
          }
      break;
    default:

  }
  location.reload();
  event.preventDefault();
}
