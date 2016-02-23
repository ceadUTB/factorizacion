/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var model ={
    nivel : 0,
    a : 0, 
    n : 0,
    m : 0,
    str_a : "",
    b : 0,
    str_b : "",
    c : 0,
    cc : 0,
    pot_cc : 0,
    j : "",
    d : 0,
    dd : 0,
    pot_dd : 0,
    h : "",
    ac : 0,
    a_w1 : 0,
    c_w1 : 0,
    bd : 0,
    a_w2 : 0,
    c_w2 : 0,
    e : 0,
    str_e : "",
    f : 0,
    str_f : "",
    ff : "",
    nf : "",
    g : 0,
    str_g : "",
    mcd : 0,
    gg : 0,
    ng : 0,
    prdo : 0,
    str_binomio : "",
    str_trinomio : "",
    factor_comun : ""
};

var views = {
    mostrar : function (elemento){
        $(elemento).show();
    },
    
    esconder : function (elemento){
        $(elemento).hide();
    },
    
    reemplazarHTML : function (elemento, html){
        $(elemento).html(html);
    },
    
    comenzar : function () {
        this.mostrar("#niveles");
        this.mostrar("#container");
    },
    
    esconderNiveles : function (){
        this.esconder("#niveles");
        this.mostrar("#resuelve");
    },
    
    mostrarPasos : function (){
        this.esconder("#resolver");
        this.mostrar("#pasos");
        this.actualizarTabs('factor_comun');
    },
    
    mostrarIngresaFC : function (){
        this.mostrar("#ingresa_fc");
    },
    
    actualizarTabs :  function (tab) {
        switch (tab){
            case 'factor_comun':
                $("#li_factores").addClass("disabled");
                $("#li_resultado").addClass("disabled");
                break;  
            case 'factores':  
                $("#li_factores").removeClass("disabled");
                //$("#li_cuadrado_cubo").addClass("disabled");
                break;
            case 'resultado':  
                $("#li_resultado").removeClass("disabled");
                //$("#li_factores").addClass("disabled");
                break;    
        }
        
        
        $("#tabs ul.tabs").tabs('select_tab', tab);
        
    },
    
    mostrarMensaje : function (mensajes, mensaje, valor){
        this.mostrar(mensajes);
        $(mensaje).html(valor);
    },
    
    deshabilitarRadio : function (){
        $('input[name=fc]').attr("disabled",true);
    }, 
    
    mostrarFC : function (){
        this.esconder("#ingresa_fc");
        this.esconder("#mensaje2");
        this.mostrar("#continuar2");
        this.reemplazarHTML("#valor_fc", "El factor común es " + model.factor_comun);
    },
    
};

var controller = {
    establecerNivel : function (niv) {
        model.nivel = niv;
        views.esconderNiveles();
        this.inicializarVariables();
    },
    
    calcularRandom : function (X, Y){
        //Número aleatorio entre un rango X y Y entonces usando Math.floor(Math.random()*(Y-X))+X
        return Math.floor(Math.random()*(Y+1-X))+X;
    },
    
    calcularPow : function (a, b) {
        return Math.pow(a, b);
    },
    
    inicializarVariables : function() {
        //Segun nivel asignar a, n, m
        switch(model.nivel) {
            case 0:
                model.n = 1;
                model.m = 6;
                break;
            case 1:
                model.n = 2;
                model.m = 7;
                break;
            case 2:
                model.n = 3;
                model.m = 10;
                break;
            case 3:
                model.n = 5;
                model.m = 15;
                break;
            case 4:
                model.n = 10;
                model.m = 20;
                break;
        }
        
        model.a = this.calcularRandom(1,model.n);
        
        
        if(model.a === 1){
            model.str_a = "";
        }else{
            model.str_a = model.a.toString();
        }

        this.calcularb();
    },
    
    calcularb : function () {
        model.b = this.calcularRandom(1, model.n);
        
        if(model.b === 1){
            model.str_b = "";
        }else{
            model.str_b = model.b.toString();
        }

        this.calcularc();
    },
    
    calcularc : function () {
        model.c = this.calcularRandom(1, model.m);
        
        model.cc = this.calcularRandom(1, 2);
        
        model.pot_cc = this.calcularPow(-1, model.cc);
        
        if(model.pot_cc > 0){
            model.j = "+";
        }else{
            model.j = "-"; 
        }
        
        this.calculard();
    },
    
    calculard : function () {
        model.d = this.calcularRandom(1, model.m);
        
        model.dd = this.calcularRandom(1, 2);
        
        model.pot_dd = this.calcularPow(-1, model.dd);
        
        if(model.pot_dd > 0){
            model.h = "+";
        }else{
            model.h = "-"; 
        }
        
        this.calcularw1();
    },
    
    calcularw1 : function (){
        var w1 = 1;
        
        while(w1 <= model.n){
            if(model.a % w1 === 0 && model.c % w1 === 0){
                model.ac = w1;
                model.a_w1 = model.a / w1;
                model.a_w1 = model.c / w1;
            }
            w1 += 1;
        }
        
        this.calcularw2();
    },
    
    calcularw2 : function (){
        var w2 = 1;
        
        while(w2 <= model.n){
            if(model.b % w2 === 0 && model.d % w2 === 0){
                model.bd = w2;
                model.a_w2 = model.b / w2;
                model.a_w2 = model.d / w2;
            }
            w2 += 1;
        }
        
        this.calculare();
    },
    
    calculare : function(){
        model.e = model.a * model.b;
        
        if(model.e === 1){
            model.str_e = "";
        }else{
            model.str_e = model.e.toString();
        }
        
        this.calcularf();
    },
    
    calcularf : function(){
        model.f = (model.b * model.c * model.pot_cc) + (model.a * model.d * model.pot_dd);
        
        if(model.f > 0){
            model.ff = "+";
            model.nf = 1;
        }else{
            model.ff = "-";
            model.nf = -1;
        } 
        
        this.calcularf_g();
    },
    
    calcularf_g : function(){
        model.g = (model.c * model.pot_cc * model.d * model.pot_dd);
        
        this.validarf_g();
    },
    
    validarf_g : function(){
        var minimo, factor = 1;
        
        if(model.f === 0){
            minimo = Math.min(Math.abs(model.e), Math.abs(model.g));
            
            while(factor <= model.minimo){
                if(model.e % factor === 0 && model.g % factor === 0){
                    model.mcd = factor;
                }

                factor += 1;
            }
        }else{
            minimo = Math.min(Math.abs(model.e), Math.abs(model.f), Math.abs(model.g));
            
            while(factor <= model.minimo){
                if(model.e % factor === 0 && model.f % factor === 0 && model.g % factor === 0){
                    model.mcd = factor;
                }

                factor += 1;
            }
            
            if(model.a % model.mcd === 0 && model.c % model.mcd === 0){
                model.a = model.a / model.mcd;
                model.c = model.c / model.mcd;
            }else if(model.b % model.mcd === 0 && model.d % model.mcd === 0){
                model.b = model.b / model.mcd;
                model.d = model.d / model.mcd;
            }else{
                factor = 1;
            }
        }
        
        if(model.g > 0){
            model.gg = "+";
            model.ng = 1;
        }else{
            model.gg = "-";
            model.ng = -1;
        } 
        
        this.calcularprd();
    },
    
    calcularprd : function (){
        var prd = model.nf * model.nf * model.ng;
        
        if(prd === 1){
            model.prdo = "SUMADOS";
        }else if(prd === -1){
            model.prdo = "RESTADOS";
        }
        
        this.validaciones();
    },
    
    validaciones : function (){
        if(model.str_e === 1){
            model.str_e = "";
        }
        
        if(model.f === 1){
            model.f = "";
        }else{
            model.str_f = Math.abs(model.f).toString(); 
        }
        
        if(model.g === 1){
            model.str_g = "";
        }else{
            model.str_g = Math.abs(model.g).toString();
        }
        
        
        this.construirBinomio_trinomio();
    },
    
    construirBinomio_trinomio : function(){
        if(model.f === 0){
            model.str_binomio =  model.str_e + "x<sup>2</sup> " + model.gg + model.str_g;
            console.log("Binomio");
            console.log(model.str_binomio);
            views.reemplazarHTML("#trinomio_resolver", model.str_binomio);
        }else if(model.f !== 0){
            model.str_trinomio = model.str_e + "x<sup>2</sup> " + model.ff + model.str_f + "x" + model.gg + model.str_g;
            console.log("Trinomio");
            console.log(model.str_trinomio);
            views.reemplazarHTML("#trinomio_resolver", model.str_trinomio);
        }
    },
    
    validarExistenciaFC : function (valor){
        views.deshabilitarRadio();
        
        //El factor comun es ac*bd
        model.factor_comun = model.ac * model.bd;
        
        console.log("ac", model.ac);
        console.log("bd", model.bd);
        console.log("factor_comun", model.factor_comun);
        
        if(valor === "si"){
            if(model.factor_comun === 1){
                views.mostrarMensaje("#mensajes", "#mensaje",  "No amigo, debiste verificar. No hay factor común");
                views.mostrar("#continuar");
            }
            if(model.factor_comun !== 1){
                views.mostrarIngresaFC();
            }
        }else{
            if(model.factor_comun === 1){
                views.mostrarMensaje("#mensajes", "#mensaje",  "¡Correcto!");
                views.mostrar("#continuar");
            }
            if(model.factor_comun !== 1){
                views.mostrarMensaje("#mensajes", "#mensaje", "No amigo. Sí hay factor común. Revisa y ubícalo");
                views.mostrarIngresaFC();
            }
        }
    },
    
    validarFC : function (){
        model.factor_comun = parseInt($("#fc").val());
        
        if(model.factor_comun === model.factor_comun){
            views.esconder("#ingresa_fc");
            views.mostrarMensaje("#mensajes2", "#mensaje2",  "¡Correcto!");
            views.mostrar("#continuar2");
        }else{
            views.mostrarMensaje("#mensajes2", "#mensaje2",  "Error. Ingrese nuevamente el factor común");
        }
    },

};


//Document ready
$(document).ready(function() {
    //Side nav
    $('.button-collapse').sideNav();
    
    //Modal
    $('.modal-trigger').leanModal();
    
    views.comenzar();
});