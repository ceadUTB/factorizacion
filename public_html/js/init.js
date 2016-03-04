/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tipo;

function abrirModal(){
    $('#instrucciones').openModal();
}

function mostrarNiveles(t){
    $("#tipos").hide();

    if(t === 'binomios'){
        $("#niveles").show();
    }else if (t === 'trinomios'){
        $("#niveles").show();
        $("#niveles2").show();
    }
    
    tipo = t;

}

function almacenarNivel(nivel){
    //Almacenar en localStorage
    localStorage.setItem("nivel", nivel);

    if(tipo === 'binomios'){
        location.href = "binomios.html";
    }else{
        location.href = "trinomios.html";
    }
    
}