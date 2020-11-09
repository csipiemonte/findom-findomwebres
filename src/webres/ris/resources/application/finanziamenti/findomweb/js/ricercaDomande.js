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

//////////////////////////////////////////////////////////
// Funzioni per popolare le combo box del form di ricerca
//////////////////////////////////////////////////////////
/*
Sul change della select "Area Tematica", 
carico le liste "Normativa", "Descrizione breve bando" e "Bando"
*/
$(document).on("change", "#id_areaTematica", function() {
	var IdAreaTematicaSel = $(this).val();

	$.get("changeAreaTematicaJSON.do", {
		"areaTematicaSRC" : IdAreaTematicaSel
	}, function(data) {

		valorizzaNormativa(data);
		valorizzaComboDescrBreveBando(data);
		valorizzaComboBando(data);
		valorizzaComboSportello(data);
		valorizzaComboStati(data);

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
			console.log('The server is not responding');
		if (textStatus == 'error')
			console.log(errorThrown);
	});
});

/*
 Sul change della select "Normativa", 
 carico le liste "Descrizione breve bando" e "Bando"
*/
$(document).on("change", "#id_normativa", function() {
	var IdNormativaSel = $(this).val();
	
	$.get("changeNormativaJSON.do", {
		"normativa" : IdNormativaSel

	}, function(data) {
		
		valorizzaAreaTematica(data);
		valorizzaComboDescrBreveBando(data);
		valorizzaComboBando(data);
		valorizzaComboSportello(data);
		valorizzaComboStati(data);
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
			console.log('The server is not responding');
		if (textStatus == 'error')
			console.log(errorThrown);
	});
});
	
	
/*
Sul change della select "Descrizione Breve Bando", 
carico la lista "Sportello" 
*/
$(document).on("change", "#id_descBreveBando", function() {
	var IdDescrBreveSel = $(this).val();
	
	$.get("changeDescrBreveJSON.do", {
		"descBreveBando" : IdDescrBreveSel
	}, function(data) {
		
		valorizzaAreaTematica(data);
		valorizzaNormativa(data);
		valorizzaComboBando(data);
		valorizzaComboSportello(data);
		valorizzaComboStati(data);

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
			console.log('The server is not responding');
		if (textStatus == 'error')
			console.log(errorThrown);
	});
});

/*
Sul change della select "Bando", 
carico le liste "Sportello" e "Tipologia Beneficiari" e "Descrizione Breve Bando"
*/
$(document).on("change", "#id_bando", function() {
	var IdBandiINDSel = $(this).val();
	
	$.get("changeBandoJSON.do", {
		"bando" : IdBandiINDSel
	}, function(data) {
		
		valorizzaAreaTematica(data);
		valorizzaNormativa(data);
		valorizzaComboDescrBreveBando(data);
		valorizzaComboSportello(data);
		valorizzaComboStati(data);
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
			console.log('The server is not responding');
		if (textStatus == 'error')
			console.log(errorThrown);
	});
});

//valorizzo la Combo dell'Area Tematica
function valorizzaAreaTematica(dataFun){
	var $areaTematica = $("#id_areaTematica");
	//var IdAreaTematicaSel = $("#id_areaTematica").val(); 
	var valoreAT = dataFun.areaTematicaSRC;

	//if(IdAreaTematicaSel!=null && IdAreaTematicaSel>0){
	//	valoreAT = IdAreaTematicaSel;
	//}

    $areaTematica.empty();

	if (null != dataFun.listaAreeTematiche && dataFun.listaAreeTematiche.length > 0) {
		$areaTematica.append("<option value='-1'>Seleziona</option>");
		$areaTematica.prop('class', 'long idleField');
		if(dataFun.listaAreeTematiche.length == 1){
			$areaTematica.append("<option value='" + dataFun.listaAreeTematiche[0].key + "' selected=\"selected\">" + dataFun.listaAreeTematiche[0].value + "</option>")
			$areaTematica.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listaAreeTematiche.length; i++) {
				if(valoreAT == dataFun.listaAreeTematiche[i].key){
					$areaTematica.append("<option value='" + dataFun.listaAreeTematiche[i].key + "'  selected=\"selected\">" + dataFun.listaAreeTematiche[i].value + "</option>")
				}else{
					$areaTematica.append("<option value='" + dataFun.listaAreeTematiche[i].key + "'>" + dataFun.listaAreeTematiche[i].value + "</option>")
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

//valorizzo la Combo della Normativa
function valorizzaNormativa(dataFun){
	var $normativa = $("#id_normativa");
	$normativa.empty();

	if (null != dataFun.listaNormative && dataFun.listaNormative.length > 0) {

		$normativa.append("<option value='-1'>Seleziona</option>");
		$normativa.prop('class', 'long idleField');

		if(dataFun.listaNormative.length == 1){
			$normativa.append("<option value='" + dataFun.listaNormative[0].key + "' selected=\"selected\">" + dataFun.listaNormative[0].value + "</option>")
			$normativa.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listaNormative.length; i++) {
				$normativa.append("<option value='" + dataFun.listaNormative[i].key + "'>" + dataFun.listaNormative[i].value + "</option>")
			}
			$normativa.prop('readonly', false);
		}
	}else{
		$normativa.append("<option value='-1'>Non ci sono normative valide. Si prega di selezionare altri parametri</option>");
		$normativa.prop('readonly', 'readonly');
		$normativa.prop('class', 'long idleField error');
	}
}

// valorizzo la Combo delle Descrizioni Brevi
function valorizzaComboDescrBreveBando(dataFun){
	var $descBreveBando = $("#id_descBreveBando");
	$descBreveBando.empty();
	if (null != dataFun.listadescBreveBando && dataFun.listadescBreveBando.length > 0) {

		$descBreveBando.append("<option value='-1'>Seleziona</option>");
		$descBreveBando.prop('class', 'long idleField');

		if(dataFun.listadescBreveBando.length == 1){
			$descBreveBando.append("<option value='" + dataFun.listadescBreveBando[0].key + "' selected=\"selected\">" + dataFun.listadescBreveBando[0].value + "</option>")
			$descBreveBando.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listadescBreveBando.length; i++) {
				$descBreveBando.append("<option value='" + dataFun.listadescBreveBando[i].key + "'>" + dataFun.listadescBreveBando[i].value + "</option>")
			}
			$descBreveBando.prop('readonly', false);
		}
	}else{
		$descBreveBando.append("<option value='-1'>Non ci sono descrizioni valide. Si prega di selezionare altri parametri</option>");
		$descBreveBando.prop('readonly', 'readonly');
		$descBreveBando.prop('class', 'long idleField error');
	}
}

// valorizzo la Combo dei Bandi
function valorizzaComboBando(dataFun){
	var $bando = $("#id_bando");

	$bando.empty();
	if (null != dataFun.listaBandi && dataFun.listaBandi.length > 0) {

		$bando.append("<option value='-1'>Seleziona</option>");
		$bando.prop('class', 'long idleField');

		if(dataFun.listaBandi.length == 1){
			$bando.append("<option value='" + dataFun.listaBandi[0].key + "' selected=\"selected\">" + dataFun.listaBandi[0].value + "</option>")
			$bando.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listaBandi.length; i++) {
				$bando.append("<option value='" + dataFun.listaBandi[i].key + "'>" + dataFun.listaBandi[i].value + "</option>")
			}
			$bando.prop('readonly', false);
		}
	}else{
		$bando.append("<option value='-1'>Non ci sono descrizioni valide. Si prega di selezionare altri parametri</option>");
		$bando.prop('readonly', 'readonly');
		$bando.prop('class', 'long idleField error');
	}
}

// valorizzo la Combo degli Sportelli
function valorizzaComboSportello(dataFun){
	var $sportello = $("#id_sportello");
	$sportello.empty();
	
	if (null != dataFun.listaSportelli && dataFun.listaSportelli.length > 0) {

		$sportello.append("<option value='-1'>Seleziona</option>");
		$sportello.prop('class', 'long idleField');

		if(dataFun.listaSportelli.length == 1){
			$sportello.append("<option value='" + dataFun.listaSportelli[0].key + "' selected=\"selected\">" + dataFun.listaSportelli[0].value + "</option>")
			$sportello.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listaSportelli.length; i++) {
				$sportello.append("<option value='" + dataFun.listaSportelli[i].key + "'>" + dataFun.listaSportelli[i].value + "</option>")
			}
			$sportello.prop('readonly', false);
		}
	}else{
		$sportello.append("<option value='-1'>Non ci sono sportelli validi. Si prega di selezionare altri parametri</option>");
		$sportello.prop('readonly', 'readonly');
		$sportello.prop('class', 'long idleField error');
	}
}
	
// valorizzo la Combo degli Stati
function valorizzaComboStati(dataFun){
	var $statoDomanda = $("#id_statoDomanda");
	$statoDomanda.empty();

	if (null != dataFun.listaStati && dataFun.listaStati.length > 0) {

		$statoDomanda.append("<option value='-1'>Seleziona</option>");
		$statoDomanda.prop('class', 'long idleField');

		if(dataFun.listaStati.length == 1){
			$statoDomanda.append("<option value='" + dataFun.listaStati[0].key + "' selected=\"selected\">" + dataFun.listaStati[0].value + "</option>")
			$statoDomanda.prop('readonly', 'readonly');
		}else{
			for ( var i = 0; i < dataFun.listaStati.length; i++) {
				$statoDomanda.append("<option value='" + dataFun.listaStati[i].key + "'>" + dataFun.listaStati[i].value + "</option>")
			}
			$statoDomanda.prop('readonly', false);
		}
	}else{
		$statoDomanda.append("<option value='-1'>Non ci sono stati validi. Si prega di selezionare altri parametri</option>");
		$statoDomanda.prop('readonly', 'readonly');
		$statoDomanda.prop('class', 'long idleField error');
	}
}
