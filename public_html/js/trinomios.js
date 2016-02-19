/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var controller = {
    establecerNivel : function (niv) {
        model.nivel = niv;
        views.esconderNiveles();
        this.inicializarVariables();
    },
};


//Document ready
$(document).ready(function() {
    //Side nav
    $('.button-collapse').sideNav();
    
    //Modal
    $('.modal-trigger').leanModal();
    
    $("#binomios").click(function() {
        views.comenzar();
    });

    //Niveles de dificultad
    $("#bajo").click(function() {
      controller.establecerNivel(1);
    });

    $("#medio").click(function() {
      controller.establecerNivel(2);
    });

    $("#alto").click(function() {
      controller.establecerNivel(3);
    });
});