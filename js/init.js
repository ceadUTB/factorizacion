/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(".dropdown-button").dropdown();

var tipo;

function abrirModal(){
    var style = 'line-height: 1.5em; font-weight: 200; letter-spacing: 1px; font-size: 0.9em; padding: 0 15px;';
    
    swal({   
        title: "<small>¡ Importante !</small> ",   
        text: "<p style='"+ style +"'> A continuación encontrará ejercicios propuestos de factorización de binomios y trinomios, \n\
            los cuales usted deberá resolver, para luego escribir la respuesta\n\
            obtenida y de esta manera verificar los resultados y obtener las correcciones\n\
            necesarias </p>",  
        html: true, 
        imageUrl: "img/ayuda.png"    
    });
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

function almacenarNivel(niv){
    //Almacenar en cookie
    setCookie("nivel", niv);

    if(tipo === 'binomios'){
        location.href = "binomios.html";
    }else{
        location.href = "trinomios.html";
    }
    
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}
