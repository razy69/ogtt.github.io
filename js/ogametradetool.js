function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P'],
        decimal;

    for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i+1);

        if (num <= - decimal || num >= decimal) {
            return + (num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}

function reverseShortenLageNumber(num) {
	var k = 1000;
	var M = 1000000;
	var G = 1000000000;
	var T = 1000000000000;
	var P = 1000000000000000;
	var regex = /^\d{1,3}[kKMmGmTtPp]{1}$/g;
	var regex2 = /^\d{1,3}\.\d{1,3}[kKMmGmTtPp]{1}$/g;
	var retest = regex.test(num);
	var retest2 = regex2.test(num);
	var splittedNum = num.split(/[kKMmGmTtPp]{1}$/);

	if (retest || retest2){
        if (/.[kK]{1}$/.test(num)){
            num = parseInt(splittedNum[0] * k);
        } else if (/.[mM]{1}$/.test(num)) {
			num = parseInt(splittedNum[0] * M);
        } else if (/.[gG]{1}$/.test(num)) {
			num = parseInt(splittedNum[0] * G);
        } else if (/.[tT]{1}$/.test(num)) {
			num = parseInt(splittedNum[0] * T);
        } else if (/.[pP]{1}$/.test(num)) {
			num = parseInt(splittedNum[0] * P);
        }
		$('#quantity').removeClass('invalid').addClass('valid');

	} else {
        num = null;
		$('#mix').prop('checked', false);
		$('#mix').prop('disabled', true);
		$('.hidden-slider').hide();
		$('.content-mix .content-mix-value').html('');
		$('#total-div-title').html('');
		$('#total-div').html('');
		$('#btn-copy-div').html('');
		$('.hidden').hide();
		$('#quantity').removeClass('valid').addClass('invalid');

	}

	return num;
}

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
		$('#ressource-image').addClass('col s2 m2 right-align');
		$('#ressource-image').html(displayImage);
	} else if (RessourceType == 'cristal'){
		displayImage = '<img src="images/cristal.png" alt="Métal" class="circle responsive-img">';
		$('#mix').prop('checked', false);
		$('#mix').prop('disabled', true);
		$('.hidden-slider').hide();
		$('.content-mix .content-mix-value').html('');
		$('#ressource-type-select').removeClass('s6 m6').addClass('s4 m4');
		$('#ressource-image').addClass('col s2 m2 right-align');
		$('#ressource-image').html(displayImage);
	} else if (RessourceType == 'deuterium'){
		displayImage = '<img src="images/deuterium.png" alt="Métal" class="circle responsive-img">';
		$('#mix').prop('disabled', false);
		$('#ressource-type-select').removeClass('s6 m6').addClass('s4 m4');
		$('#ressource-image').addClass('col s2 m2 right-align');
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
	$('#ressource-image').removeClass('col s2 m2 right-align');
	$('#ressource-image').html('');
	$('#total-div-title').html('');
	$('#total-div').html('');
	$('#btn-copy-div').html('');
	$('.hidden').hide();
	$('#quantity').val('');
	$('#quantity').removeClass('valid');
	$('#quantity').removeClass('invalid');
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
	var TauxMetal = parseFloat('2');
	var TauxCristal = parseFloat('1.5');
	var TauxDeuterium = parseInt('1');
	var Taux = [];

	if (GetTauxMetal >= 1.4 && GetTauxMetal <= 3 ){
		TauxMetal = parseFloat(GetTauxMetal);
	} else {
		$('#taux-metal').val(TauxMetal);
	}

	if (GetTauxCristal >= 1.2 && GetTauxCristal <= 2.5) {
		TauxCristal = parseFloat(GetTauxCristal);
	} else {
		$('#taux-cristal').val(TauxCristal);
	}

	Taux = [TauxMetal, TauxCristal, 1];

	return Taux;
}

function getQuantity(){
	var Quantity = $('#quantity').val();

	if (Quantity > 0){
		$('#quantity').val(shortenLargeNumber(Quantity, 3));
		$('#quantity').removeClass('invalid').addClass('valid');
	} else {
		Quantity = reverseShortenLageNumber(Quantity);
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
	var Metal = "";
	var Cristal = "";
	var Deuterium = "";
	var MetalSansTaux = 0;
	var CristalSansTaux = 0;
	var Total = "";
	var Copy = "";
	var Mix = getMix();
	var isMix = $('#mix').is(':checked');
	var Result = [];

	if (RessourceType == 'metal'){
		Metal = 'Cristal OU Deutérium';
		Cristal = shortenLargeNumber((Quantity / (TauxM / TauxC)).toFixed(), 1);
		Deuterium = shortenLargeNumber((Quantity / TauxM).toFixed(), 1);
		Total = shortenLargeNumber(Cristal, 3) + ' de Cristal OU ' + shortenLargeNumber(Deuterium, 3) + ' de Deutérium';

	} else if (RessourceType == 'cristal') {
		Metal =  shortenLargeNumber((Quantity * (TauxM / TauxC)).toFixed(), 1);
		Cristal = 'Métal OU Deutérium';
		Deuterium = shortenLargeNumber((Quantity / TauxC).toFixed(), 1);
		Total = shortenLargeNumber(Metal, 3) + ' de Métal OU ' + shortenLargeNumber(Deuterium, 3) + ' de Deutérium';

	} else if (RessourceType == 'deuterium') {
		if (isMix) {
			$('.hidden-slider').show();
			$('.content-mix .content-mix-value').html(Mix + '% de Métal');
			MetalSansTaux = Quantity * (Mix / 100);
			CristalSansTaux = Quantity * ((100 - Mix) / 100);
			Metal = shortenLargeNumber((MetalSansTaux * (TauxM / TauxD)).toFixed(), 1);
			Cristal = shortenLargeNumber((CristalSansTaux * (TauxC / TauxD)).toFixed(), 1);
			Deuterium = 'Métal ET Cristal';
			Total = shortenLargeNumber(Metal, 3) + ' de Métal ET ' + shortenLargeNumber(Cristal, 3) + ' de Cristal';
			Mix = Mix + '% de Métal';
		} else {
			$('.hidden-slider').hide();
			$('.content-mix .content-mix-value').html('');
			Metal = shortenLargeNumber((Quantity * (TauxM/TauxD)).toFixed(), 1);
			Cristal = shortenLargeNumber((Quantity * (TauxC/TauxD)).toFixed(), 1);
			Deuterium = 'Métal OU Cristal';
			Total = shortenLargeNumber(Metal, 3) + ' de Métal OU ' + shortenLargeNumber(Cristal, 3) + ' de Cristal';
			Mix = "Non";
		}

	} else {
		Metal = '/';
		Cristal = '/';
		Deuterium = '/';
		Total = 'Aucun';
	}
	Result = [Metal, Cristal, Deuterium];
	// Copy Result to Textarea (to Copy text)
	RessourceType = RessourceType.charAt(0).toUpperCase() + RessourceType.slice(1);
	if (isMix){
		Copy = 'Ressources à Vendre : ' + shortenLargeNumber(Quantity, 3) + ' de ' + RessourceType + '\nTaux : ' + TauxM + '/' + TauxC + '/' + TauxD + '\nMix : ' + Mix + '\nTotal : ' + Total;
	} else {
		Copy = 'Ressources à Vendre : ' + shortenLargeNumber(Quantity, 3) + ' de ' + RessourceType + '\nTaux : ' + TauxM + '/' + TauxC + '/' + TauxD + '\nTotal : ' + Total;
	}
	$('#hidden-textarea').val(Copy);

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
	//$('#debug').html('Debug :' + (typeof Metal) );

	if (RessourceType === undefined || RessourceType === null || Quantity === undefined || Quantity === null) {
		$('#total-div').html(Loader);
		$('#total-div-title').html('');
	} else {
		$('#total-div-title').html(TotalHtmlTitle);
		$('#total-div').html(TotalHtml);
		$('.hidden').show();
	}
}
