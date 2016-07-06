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
	var Taux = [];

	if (GetTauxMetal !== ''){
		TauxMetal = parseFloat(GetTauxMetal);
	}
	if (GetTauxCristal !== '') {
		TauxCristal = parseFloat(GetTauxCristal);
	}
	if (GetTauxDeuterium !== '') {
		TauxDeuterium = parseFloat(GetTauxDeuterium);
	}
	if ((GetTauxMetal !== '') || (GetTauxCristal !== '') || (GetTauxDeuterium !== '')){
		Taux = [TauxMetal, TauxCristal, TauxDeuterium];
	} else {
		Taux = [2.2, 1.6, 1];
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
		Cristal = (Quantity / (TauxM / TauxC)).toFixed();
		Deuterium = (Quantity / TauxM).toFixed();
		Total = Cristal + ' de Cristal OU ' + Deuterium + ' de Deutérium';

	} else if (RessourceType == 'cristal') {
		Metal =  (Quantity * (TauxM / TauxC)).toFixed();
		Cristal = 'Métal OU Deutérium';
		Deuterium = (Quantity / TauxC).toFixed();
		Total = Metal + ' de Métal OU ' + Deuterium + ' de Deutérium';

	} else if (RessourceType == 'deuterium') {
		if (isMix) {
			$('.hidden-slider').show();
			$('.content-mix .content-mix-value').html(Mix + '% de Métal');
			MetalSansTaux = Quantity * (Mix / 100);
			CristalSansTaux = Quantity * ((100 - Mix) / 100);
			Metal = (MetalSansTaux * (TauxM / TauxD)).toFixed();
			Cristal = (CristalSansTaux * (TauxC / TauxD)).toFixed();
			Deuterium = 'Métal ET Cristal';
			Total = Metal + ' de Métal ET ' + Cristal + ' de Cristal';
			Mix = Mix + '% de Métal';
		} else {
			$('.hidden-slider').hide();
			$('.content-mix .content-mix-value').html('');
			Metal = (Quantity * (TauxM/TauxD)).toFixed();
			Cristal = (Quantity * (TauxC/TauxD)).toFixed();
			Deuterium = 'Métal OU Cristal';
			Total = Metal + ' de Métal OU ' + Cristal + ' de Cristal';
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
	Copy = 'Ressources à Vendre : ' + Quantity + ' de ' + RessourceType + '\nTaux : ' + TauxM + '/' + TauxC + '/' + TauxD + '\nMix : ' + Mix + '\nTotal : ' + Total;
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
