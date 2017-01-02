var numeroTentativas=0;
var userTurn=true;
var numberKeys=[1,5,9,13,17,21];

function userturn(){
	var valTotal=$("#valorTotal").val();
	if(valTotal==null){
		valTotal=0;
	}
	if(numeroTentativas==0){
		$('#changeTurn').attr("disabled", false);
	}
	
	if(numeroTentativas<3){
		numeroTentativas++;
		valTotal++;
	}else{
		alert("Number of tries is only three");
	}
	if(valTotal==21){
				alert("You Win!!");
				numeroTentativas=0;
				valTotal=0;
	}
	$("#valorTotal").val(valTotal);
	
}

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

function changeUser(){
	if(numeroTentativas==0){
		alert("You have to play before change the turn!!");

	}else{
		numeroTentativas=0;
	if(userTurn){
		userTurn=false;
		computerTurn();
	}else{
		userTurn=true;
		activeUserTurn();
	}
	}
}

function activeUserTurn(){
	$('#changeTurn').attr("disabled", true);
}


function computerTurn(){
		var valTotal=$("#valorTotal").val();
		if(valTotal==null){
			valTotal=0;
		}
		var noValorKey=true;
		while(numeroTentativas<3 && noValorKey){
			numeroTentativas++;
			valTotal++;
			if(include(numberKeys,valTotal)){
				noValorKey=false;
			}
		}
		if(valTotal==21){
			alert("I Win!!");
			numeroTentativas=0;
			valTotal=0;
		}
		$("#valorTotal").val(valTotal);
		changeUser();
}
	