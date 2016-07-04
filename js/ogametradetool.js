function getRessourceType(){
    var displayImage = '';
    var RessourceType = $('#type-ressource').val();

    if (RessourceType == 'metal'){
      displayImage = '<img src="images/metal.png" alt="Métal" class="circle responsive-img">';
      $('#mix').prop('checked', false);
      $('#mix').prop('disabled', true);
      $('.hidden-slider').hide();
      $('.content-mix .content-mix-value').html('');
      $('#ressource-type-select').removeClass('s6 m6').addClass('s4 m4');
      $('#ressource-image').addClass('col s2 m2 right-align')
      $('#ressource-image').html(displayImage);

    } else if (RessourceType == 'cristal'){
      displayImage = '<img src="images/cristal.png" alt="Métal" class="circle responsive-img">';
      $('#mix').prop('checked', false);
      $('#mix').prop('disabled', true);
      $('.hidden-slider').hide();
      $('.content-mix .content-mix-value').html('');
      $('#ressource-type-select').removeClass('s6 m6').addClass('s4 m4');
      $('#ressource-image').addClass('col s2 m2 right-align')
      $('#ressource-image').html(displayImage);

    } else if (RessourceType == 'deuterium'){
      displayImage = '<img src="images/deuterium.png" alt="Métal" class="circle responsive-img">';
      $('#mix').prop('disabled', false);
      $('#ressource-type-select').removeClass('s6 m6').addClass('s4 m4');
      $('#ressource-image').addClass('col s2 m2 right-align')
      $('#ressource-image').html(displayImage);
    }
    return RessourceType;
}

function resetForm(){
   $('#ogtradetool').trigger('reset');
   $('#mix').prop('checked', false);
   $('#mix').prop('disabled', true);
   $('.hidden-slider').hide();
   $('.content-mix .content-mix-value').html('');
   $('#ressource-type-select').removeClass('s4 m4').addClass('s6 m6');
   $('#ressource-image').removeClass('col s2 m2 right-align')
   $('#ressource-image').html('');
   $('#total-div-title').html('');
   $('#total-div').html('');
   $('#btn-copy-div').html('');
   $('.hidden').hide();
}

function showMix(){
    var MixPourcentage = $('#mix-pourcentage').val();
    if ($('#mix').is(':checked')) {
      $('.hidden-slider').show();
      $('.content-mix .content-mix-value').html(MixPourcentage + '% de Métal');
      getTotal();
    } else {
      $('.hidden-slider').hide();
      $('.content-mix .content-mix-value').html('');
      getTotal();
    }
}

function getMix(){
  var MixPourcentage = $('#mix-pourcentage').val();
  return MixPourcentage;
}

function getTaux(){
    var GetTauxMetal = $('#taux-metal').val();
    var GetTauxCristal = $('#taux-cristal').val();
    var GetTauxDeuterium = $('#taux-deuterium').val();
    var TauxMetal = parseFloat('2.2');
    var TauxCristal = parseFloat('1.6');
    var TauxDeuterium = parseFloat('1');
    var Taux = new Array();

    if (GetTauxMetal != ''){
        TauxMetal = parseFloat(GetTauxMetal);
    }
    if (GetTauxCristal != '') {
        TauxCristal = parseFloat(GetTauxCristal);
    }
    if (GetTauxDeuterium != '') {
        TauxDeuterium = parseFloat(GetTauxDeuterium);
    }

    if ((GetTauxMetal != '') || (GetTauxCristal != '') || (GetTauxDeuterium != '')){
      var Taux = [TauxMetal, TauxCristal, TauxDeuterium];
    } else {
      var Taux = [2.2, 1.6, 1];
    }

    return Taux;
}

function getQuantity(){
    var Quantity = $('#quantity').val();

    if (Quantity > 0){
      Quantity = parseInt(Quantity);
    } else {
      Quantity = null;
    }

    return Quantity;
}

function calculTotal(){
    var Quantity = getQuantity();
    var RessourceType = getRessourceType();
    var Taux = getTaux();
    var TauxM = Taux[0];
    var TauxC = Taux[1];
    var TauxD = Taux[2];
    var Mix = getMix();
    var isMix = $('#mix').is(':checked');

    if (isMix) {
      $('.hidden-slider').show();
      $('.content-mix .content-mix-value').html(Mix + '% de Métal');
    } else {
      $('.hidden-slider').hide();
      $('.content-mix .content-mix-value').html('');
    }

    if (RessourceType == 'metal'){
      var Metal = 'Cristal OU Deutérium';
      var Cristal = (Quantity / (TauxM / TauxC)).toFixed();
      var Deuterium = (Quantity / TauxM).toFixed();
      var Copy = Cristal + ' de Cristal OU ' + Deuterium + ' de Deutérium';

    } else if (RessourceType == 'cristal') {
      var Metal =  (Quantity * (TauxM / TauxC)).toFixed();
      var Cristal = 'Métal OU Deutérium';
      var Deuterium = (Quantity / TauxC).toFixed();
      var Copy = Metal + ' de Métal OU ' + Deuterium + ' de Deutérium';

    } else if (RessourceType == 'deuterium') {
      if (isMix) {
        var MetalSansTaux = Quantity * (Mix / 100);
        var CristalSansTaux = Quantity * ((100 - Mix) / 100);
        var Metal = (MetalSansTaux * (TauxM / TauxD)).toFixed();
        var Cristal = (CristalSansTaux * (TauxC / TauxD)).toFixed();
        var Deuterium = 'Métal ET Cristal';
        var Copy = Metal + ' de Métal ET ' + Cristal + ' de Cristal';
      } else {
        var Metal = (Quantity * (TauxM/TauxD)).toFixed();
        var Cristal = (Quantity * (TauxC/TauxD)).toFixed();
        var Deuterium = 'Métal OU Cristal';
        var Copy = Metal + ' de Métal OU ' + Cristal + ' de Cristal';
      }

    } else {
      var Metal = '/';
      var Cristal = '/';
      var Deuterium = '/';
      var Copy = 'Aucun';
    }

    // Copy Result to Textarea (Copy purpose)
    $('#hidden-textarea').val(Copy);

    var Result = [Metal, Cristal, Deuterium];
    return Result;
}

function getTotal(){
    var RessourceType = getRessourceType();
    var Quantity = getQuantity();
    var Total = calculTotal();
    var Metal = Total[0];
    var Cristal = Total[1];
    var Deuterium = Total[2];
    var TotalHtmlTitle = '<h4 class="grey-text text-darken-4">Total</h4>';
    var TotalHtml = '<table class="centered"><thead><tr><th data-field="total-metal">Métal</th><th data-field="total-cristal">Cristal</th><th data-field="total-deuterium">Deutérium</th></tr></thead><tbody><tr><td>' + Metal + '</td><td>' + Cristal + '</td><td>' + Deuterium + '</td></tr></tbody></table>';
    var Loader = '<div class="preloader-wrapper small active center"><div class="spinner-layer spinner-green-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';

    // Print var to debug
    $('#debug').html('Debug :' + (typeof Metal) );

    if (RessourceType === null || RessourceType === null || Quantity === undefined || Quantity === null) {
      $('#total-div').html(Loader);
      $('#total-div-title').html('');
      $('#btn-copy-div').html('');
    } else {
      $('#total-div-title').html(TotalHtmlTitle);
      $('#total-div').html(TotalHtml);
      $('.hidden').show();
    }
}
