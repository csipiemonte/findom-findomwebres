/*
#-------------------------------------------------------------------------------
# Copyright Regione Piemonte - 2020
# SPDX-License-Identifier: EUPL-1.2-or-later
#-------------------------------------------------------------------------------
*/

/*
 * Questo file viene utilizzato dall'applicazione FINDOMWEB
 * 
 */
//////////////////////////////////////////////////////////////
// Funzioni per popolare le combo box del form di inserimento
//////////////////////////////////////////////////////////////

/*
 Sul change della select "Area Tematica",  carico le liste
  "Normativa", "Descrizione breve bando" e "Bando"
*/
$(document).on("change", "#id_areaTematicaINS", function() {
	var IdAreaTematicaSel = $(this).val();
	$.get("changeAreaTematicaInsJSON.do", {
		"areaTematicaINS" : IdAreaTematicaSel

	}, function(data) {

		valorizzaNormativaINS(data);
		valorizzaComboDescrBreveBandoINS(data);
		valorizzaComboBandoINS(data);
		valorizzaComboSportelloINS(data);
		valorizzaComboBeneficiariINS(data);

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
			console.log('The server is not responding');
		if (textStatus == 'error')
			console.log(errorThrown);
	});
});

/*
 Sul change della select "Normativa",  carico le altre liste
*/
$(document).on("change", "#id_normativaINS", function() {
	var IdNormativaSel = $(this).val();
	
	$.get("changeNormativaInsJSON.do", {
		"normativaINS" : IdNormativaSel

	}, function(data) {

		valorizzaAreaTematicaINS(data); 
		valorizzaComboDescrBreveBandoINS(data);
		valorizzaComboBandoINS(data);
		valorizzaComboSportelloINS(data);
		valorizzaComboBeneficiariINS(data);

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
			console.log('The server is not responding');
		if (textStatus == 'error')
			console.log(errorThrown);
	});
});

/*
Sul change della select "Descrizione Breve Bando", carico le liste "Sportello" e "Tipologia Beneficiari"
*/
$(document).on("change", "#id_descBreveBandoINS", function() {
	var IdDescrBreveSel = $(this).val();
	
	$.get("changeDescrBreveInsJSON.do", {
		"descBreveBandoINS" : IdDescrBreveSel
	}, function(data) {

		valorizzaAreaTematicaINS(data);
		valorizzaNormativaINS(data);
		valorizzaComboBandoINS(data);
		valorizzaComboSportelloINS(data);
		valorizzaComboBeneficiariINS(data);

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
			console.log('The server is not responding');
		if (textStatus == 'error')
			console.log(errorThrown);
	});
});

/*
Sul change della select "Bando", carico le liste "Sportello" e "Tipologia Beneficiari" e "Descrizione Breve Bando"
*/
$(document).on("change", "#id_bandoINS", function() {
	var IdBandiINDSel = $(this).val();
	
	$.get("changeBandoInsJSON.do", {
		"bandoINS" : IdBandiINDSel
		
	}, function(data) {

	valorizzaAreaTematicaINS(data);
	valorizzaNormativaINS(data);
	valorizzaComboDescrBreveBandoINS(data);
	valorizzaComboSportelloINS(data);
	valorizzaComboBeneficiariINS(data);

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
			console.log('The server is not responding');
		if (textStatus == 'error')
			console.log(errorThrown);
	});
});

//valorizzo la Combo dell'Area Tematica
function valorizzaAreaTematicaINS(dataFun){
	var $areaTematica = $("#id_areaTematicaINS");
	var valoreAT = dataFun.areaTematicaINS;
	if(valoreAT==null){
		valoreAT = $areaTematica.val();
	}
	$areaTematica.empty();

	if (null != dataFun.listaAreeTematicheINS && dataFun.listaAreeTematicheINS.length > 0) {
		$areaTematica.append("<option value='-1'>Seleziona</option>");
		$areaTematica.prop('class', 'long idleField');
		if(dataFun.listaAreeTematicheINS.length == 1){
			$areaTematica.append("<option value='" + dataFun.listaAreeTematicheINS[0].key + "' selected=\"selected\">" + dataFun.listaAreeTematicheINS[0].value + "</option>")
			$areaTematica.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listaAreeTematicheINS.length; i++) {
				if(valoreAT == dataFun.listaAreeTematicheINS[i].key){
					$areaTematica.append("<option value='" + dataFun.listaAreeTematicheINS[i].key + "'  selected=\"selected\">" + dataFun.listaAreeTematicheINS[i].value + "</option>")
				}else{
					$areaTematica.append("<option value='" + dataFun.listaAreeTematicheINS[i].key + "'>" + dataFun.listaAreeTematicheINS[i].value + "</option>")
				}
			}
			$areaTematica.prop('readonly', false);
		}
	} else{
		$areaTematica.append("<option value='-1'>Non ci sono aree tematiche valide. Si prega di selezionare altri parametri</option>");
		$areaTematica.prop('readonly', 'readonly');
		$areaTematica.prop('class', 'long idleField error');
	}
}

// valorizzo la Combo della Normativa
function valorizzaNormativaINS(dataFun){
	var $normativaINS = $("#id_normativaINS");
	$normativaINS.empty();

	if (null != dataFun.listaNormativeINS && dataFun.listaNormativeINS.length > 0) {

		$normativaINS.append("<option value='-1'>Seleziona</option>");
		$normativaINS.prop('class', 'long idleField');

		if(dataFun.listaNormativeINS.length == 1){
			$normativaINS.append("<option value='" + dataFun.listaNormativeINS[0].key + "' selected=\"selected\">" + dataFun.listaNormativeINS[0].value + "</option>")
			$normativaINS.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listaNormativeINS.length; i++) {
				$normativaINS.append("<option value='" + dataFun.listaNormativeINS[i].key + "'>" + dataFun.listaNormativeINS[i].value + "</option>")
			}
			$normativaINS.prop('readonly', false);
		}
	}else{
		$normativaINS.append("<option value='-1'>Non ci sono normative valide. Si prega di selezionare altri parametri</option>");
		$normativaINS.prop('readonly', 'readonly');
		$normativaINS.prop('class', 'long idleField error');
	}
}

// valorizzo la Combo delle Descrizioni Brevi
function valorizzaComboDescrBreveBandoINS(dataFun){
    var $descBreveBandoINS = $("#id_descBreveBandoINS");
	  $descBreveBandoINS.empty();

	  if (null != dataFun.listadescBreveBandoINS && dataFun.listadescBreveBandoINS.length > 0) {

		  $descBreveBandoINS.append("<option value='-1'>Seleziona</option>");
		  $descBreveBandoINS.prop('class', 'long idleField');

		  if(dataFun.listadescBreveBandoINS.length == 1){
			 $descBreveBandoINS.append("<option value='" + dataFun.listadescBreveBandoINS[0].key + "' selected=\"selected\">" + dataFun.listadescBreveBandoINS[0].value + "</option>")
			 $descBreveBandoINS.prop('readonly', 'readonly');

		  }else{
				for ( var i = 0; i < dataFun.listadescBreveBandoINS.length; i++) {
					$descBreveBandoINS.append("<option value='" + dataFun.listadescBreveBandoINS[i].key + "'>" + dataFun.listadescBreveBandoINS[i].value + "</option>")
				}
				$descBreveBandoINS.prop('readonly', false);
		  }
	 }else{
		  $descBreveBandoINS.append("<option value='-1'>Non ci sono descrizione valide. Si prega di selezionare altri parametri</option>");
		  $descBreveBandoINS.prop('readonly', 'readonly');
		  $descBreveBandoINS.prop('class', 'long idleField error');
	 }
}
	
// valorizzo la Combo dei BAndi
function valorizzaComboBandoINS(dataFun){
	var $bandoINS = $("#id_bandoINS");
	$bandoINS.empty();

	if (null != dataFun.listaBandiINS && dataFun.listaBandiINS.length >0 ) {

		$bandoINS.append("<option value='-1'>Seleziona</option>");
		$bandoINS.prop('class', 'long idleField');

		if(dataFun.listaBandiINS.length == 1){
			$bandoINS.append("<option value='" + dataFun.listaBandiINS[0].key + "' selected=\"selected\">" + dataFun.listaBandiINS[0].value + "</option>")
			$bandoINS.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listaBandiINS.length; i++) {
				$bandoINS.append("<option value='" + dataFun.listaBandiINS[i].key + "'>" + dataFun.listaBandiINS[i].value + "</option>")
			}
			$bandoINS.prop('readonly', false);
		}
	}else{
		$bandoINS.append("<option value='-1'>Non ci sono bandi validi. Si prega di selezionare altri parametri</option>");
		$bandoINS.prop('readonly', 'readonly');
		$bandoINS.prop('class', 'long idleField error');
	}
}

// valorizzo la Combo degli Sportelli
function valorizzaComboSportelloINS(dataFun){
	var $sportelloINS = $("#id_sportelloINS");
	$sportelloINS.empty();
	
	$sportelloINS.append("<option value='-1'>Seleziona</option>");
	$sportelloINS.prop('class', 'long idleField');
			
	if (null != dataFun.listaBandiINS && dataFun.listaBandiINS.length == 1 ) {
		if (null != dataFun.listaSportelliINS && dataFun.listaSportelliINS.length > 0) {

			if(dataFun.listaSportelliINS.length == 1){
				$sportelloINS.append("<option value='" + dataFun.listaSportelliINS[0].key + "' selected=\"selected\">" + dataFun.listaSportelliINS[0].value + "</option>")
				$sportelloINS.prop('readonly', 'readonly');
			}else{
				for ( var i = 0; i < dataFun.listaSportelliINS.length; i++) {
					$sportelloINS.append("<option value='" + dataFun.listaSportelliINS[i].key + "'>" + dataFun.listaSportelliINS[i].value + "</option>")
				}
				$sportelloINS.prop('readonly', false);
			}
		}else{
			$sportelloINS.append("<option value='-1'>Non ci sono sportelli validi. Si prega di selezionare altri parametri</option>");
			$sportelloINS.prop('readonly', 'readonly');
			$sportelloINS.prop('class', 'long idleField error');
		}
	}
}

// valorizzo la Combo dei Beneficiari
function valorizzaComboBeneficiariINS(dataFun){
	var $tipolBeneficiarioINS = $("#id_tipolBeneficiarioINS");
	// ripristino l'attributo class
	$tipolBeneficiarioINS.empty();
	$tipolBeneficiarioINS.prop('class', 'long idleField');
	$tipolBeneficiarioINS.append("<option value='-1'>Seleziona</option>");
	
	if ((dataFun.idBandoINS != "-1") && (dataFun.descBreveBandoINS != "-1" )){

		if (null != dataFun.listaTipologieBeneficiariINS && dataFun.listaTipologieBeneficiariINS.length >0) {
			
			if(dataFun.listaTipologieBeneficiariINS.length == 1){
				$tipolBeneficiarioINS.append("<option value='" + dataFun.listaTipologieBeneficiariINS[0].idTipolBeneficiario + "' selected=\"selected\">" + dataFun.listaTipologieBeneficiariINS[0].descrizione + "</option>")
			}else{
				for ( var i = 0; i < dataFun.listaTipologieBeneficiariINS.length; i++) {
					$tipolBeneficiarioINS.append("<option value='" + dataFun.listaTipologieBeneficiariINS[i].idTipolBeneficiario + "'>" + dataFun.listaTipologieBeneficiariINS[i].descrizione + "</option>")
				}
			}
		}else{
			if ((dataFun.idBandoINS != "-1" && (dataFun.idBandoINS != undefined)) || 
					(dataFun.descBreveBandoINS != "-1" )&&(dataFun.descBreveBandoINS != undefined)){
				$tipolBeneficiarioINS.append("<option value='-1'>Non ci sono beneficiari validi. Si prega di selezionare altri parametri</option>");
				$tipolBeneficiarioINS.prop('class', 'long idleField error');
			}
		}
	}
}
