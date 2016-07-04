function getRessourceType(){
    // Init var
    var RessourceType = "";
    var displayImage = "";
    //Get a reference to the form id="ogtradetool"
    var OGTradeTool = document.forms["ogtradetool"];
    //Get a reference to the cake the user Chooses name=selectedCake":
    var SelectedRessourceType = OGTradeTool.elements["type-ressource"];
    RessourceType = SelectedRessourceType.value;

    if (RessourceType == "metal"){
      displayImage = '<img src="images/metal.png" alt="Métal" class="circle responsive-img">'
      document.getElementById("mix").checked = false;
      document.getElementById("mix").disabled = true;
      $(".hidden-div").hide();
      $(".content-mix .content-mix-value").html("");
      document.getElementById("ressource-type-select").className = "input-field col s4 m4";
      document.getElementById("ressource-image").className = "col s2 m2 right-align";
      document.getElementById("ressource-image").innerHTML = displayImage;
    } else if (RessourceType == "cristal"){
      displayImage = '<img src="images/cristal.png" alt="Métal" class="circle responsive-img">'
      document.getElementById("mix").checked = false;
      document.getElementById("mix").disabled = true;
      $(".hidden-div").hide();
      $(".content-mix .content-mix-value").html("");
      document.getElementById("ressource-type-select").className = "input-field col s4 m4";
      document.getElementById("ressource-image").className = "col s2 m2 right-align";
      document.getElementById('ressource-image').innerHTML = displayImage;
    } else if (RessourceType == "deuterium"){
      displayImage = '<img src="images/deuterium.png" alt="Métal" class="circle responsive-img">'
      document.getElementById("mix").disabled = false;
      document.getElementById("ressource-type-select").className = "input-field col s4 m4";
      document.getElementById("ressource-image").className = "col s2 m2 right-align";
      document.getElementById('ressource-image').innerHTML = displayImage;
    }

    // Return value
    return RessourceType;
}

function resetForm(){
   document.getElementById("ogtradetool").reset();
   ​document.getElementById("type-ressource").value = "none";​​​​​​​​​​
   document.getElementById("mix").checked = false;
   document.getElementById("mix").disabled = true;
   document.getElementById("ressource-type-select").className = "input-field col s6 m6";
   document.getElementById("ressource-image").className = "";
   document.getElementById("ressource-image").innerHTML = "";
   document.getElementById("total-div-title").innerHTML = "";
   document.getElementById("total-div").innerHTML = "";
}

function showMix(){
    var OGTradeTool = document.forms["ogtradetool"];
    var Mix = OGTradeTool.elements["mix"];
    var MixPourcentage = OGTradeTool.elements["mix-pourcentage"].value;
    if (Mix.checked) {
      $(".hidden-div").show();
      $(".content-mix .content-mix-value").html(MixPourcentage + "% de Métal");
      getTotal();
    } else {
      $(".hidden-div").hide();
      $(".content-mix .content-mix-value").html("");
      getTotal();
    }
}

function getMix(){
  var OGTradeTool = document.forms["ogtradetool"];
  var MixPourcentage = OGTradeTool.elements["mix-pourcentage"].value;
  return MixPourcentage;
}

function getTaux(){
    // init var
    var TauxMetal = parseFloat('2.2');
    var TauxCristal = parseFloat('1.6');
    var TauxDeuterium = parseFloat('1');
    var Taux = new Array();
    //Get a reference to the form id="ogtradetool"
    var OGTradeTool = document.forms["ogtradetool"];
    //Get a reference to the TextBox
    var GetTauxMetal = OGTradeTool.elements["taux-metal"];
    if(GetTauxMetal.value!=""){
        TauxMetal = parseFloat(GetTauxMetal.value);
    }
    //Get a reference to the TextBox
    var GetTauxCristal = OGTradeTool.elements["taux-cristal"];
    if(GetTauxCristal.value!=""){
        TauxCristal = parseFloat(GetTauxCristal.value);
    }
    //Get a reference to the TextBox
    var GetTauxDeuterium = OGTradeTool.elements["taux-deuterium"];
    if(GetTauxDeuterium.value!=""){
        TauxDeuterium = parseFloat(GetTauxDeuterium.value);
    }

    var Taux = [TauxMetal, TauxCristal, TauxDeuterium];
    return Taux;
}

function getQuantity(){
    //Get a reference to the form id="ogtradetool"
    var OGTradeTool = document.forms["ogtradetool"];
    //Get a reference to the TextBox
    var Quantity = OGTradeTool.elements["quantity"];
    var HowMany = 0;
    //If the textbox is not blank
    if(Quantity.value!=""){
        HowMany = parseInt(Quantity.value);
    }
    return HowMany;
}

function calculTotal(){

    var Quantity = getQuantity();
    var Taux = getTaux();
    var RessourceType = getRessourceType();
    var TauxM = Taux[0];
    var TauxC = Taux[1];
    var TauxD = Taux[2];
    var Mix = getMix();
    var OGTradeTool = document.forms["ogtradetool"];
    var isMix = OGTradeTool.elements["mix"];
    if (isMix.checked) {
      $(".hidden-div").show();
      $(".content-mix .content-mix-value").html(Mix + "% de Métal");
    } else {
      $(".hidden-div").hide();
      $(".content-mix .content-mix-value").html("");
    }

    if (RessourceType == "metal"){
      var Metal = "Cristal OU Deutérium";
      var Cristal = (Quantity / (TauxM / TauxC)).toFixed();
      var Deuterium = (Quantity / TauxM).toFixed();
    } else if (RessourceType == "cristal") {
      var Metal =  (Quantity * (TauxM / TauxC)).toFixed();
      var Cristal = "Métal OU Deutérium";
      var Deuterium = (Quantity / TauxC).toFixed();
    } else if (RessourceType == "deuterium") {
      if (isMix.checked) {
        var MetalSansTaux = Quantity * (Mix / 100);
        var CristalSansTaux = Quantity * ((100 - Mix) / 100)
        var Metal = (MetalSansTaux * (TauxM / TauxD)).toFixed();
        var Cristal = (CristalSansTaux * (TauxC / TauxD)).toFixed();
        var Deuterium = "Métal ET Cristal";
      } else {
        var Metal = (Quantity * (TauxM/TauxD)).toFixed();
        var Cristal = (Quantity * (TauxC/TauxD)).toFixed();
        var Deuterium = "Métal OU Cristal";
      }
    } else {
      var Metal = "/";
      var Cristal = "/";
      var Deuterium = "/";
    }

    var Result = [Metal, Cristal, Deuterium];
    return Result;

}

function getTotal(){
    //Here we get the total price by calling our function
    //Each function returns a number so by calling them we add the values they return together
    var Quantity = getQuantity();
    var RessourceType = getRessourceType();
    var Total = calculTotal();
    var TotalHtmlTitle = '<h4 class="col s12 left-align grey-text text-darken-4">Total</h4>'
    var TotalHtml = '<table class="responsive-table centered col s12"><thead><tr><th data-field="total-metal">Métal</th><th data-field="total-cristal">Cristal</th><th data-field="total-deuterium">Deutérium</th></tr></thead><tbody><tr><td>' + Total[0] + '</td><td>' + Total[1] + '</td><td>' + Total[2] + '</td></tr></tbody></table>';

    //display the result
    if (!((RessourceType == "") || (Quantity == ""))){
      document.getElementById('total-div-title').innerHTML = TotalHtmlTitle;
      document.getElementById('total-div').innerHTML = TotalHtml;
    }
}
