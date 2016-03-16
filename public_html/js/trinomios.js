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
    factor_comun : "",
    puntos : 0
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
                break;
            case 'resultado':  
                $("#li_resultado").removeClass("disabled");
                break;    
        }
        
        $("#tabs ul.tabs").tabs('select_tab', tab);
        
    },
    
    mostrarMensaje : function (valor, tipo){
        if(tipo === "warning"){
            swal({   
                title: "Error",   
                text: valor,   
                type: tipo,
                timer: 5000 //4 segundos 
            });
        }else{
            swal({   
                title: "",   
                text: valor,   
                type: tipo,
                timer: 5000 //4 segundos 
            });
        }
    },
     
    deshabilitarRadio : function (){
        $('input[name=fc]').attr("disabled",true);
    }, 
    
    mostrarFC : function (){
        //Actualizar puntaje
        controller.actualizarPuntaje("-");
        
        this.esconder("#ingresa_fc");
        this.esconder("#mensaje2");
        this.reemplazarHTML("#valor_fc", "El factor común es " + model.factor_comun);
        this.mostrar("#continuar2");
    },
    
    mostrarFactores : function (){
        //Actualizar puntaje
        controller.actualizarPuntaje("-");
        
        this.esconder("#ingresa_variables");
        this.esconder("#explicaciones");
        this.mostrar("#continuar4");
        
        if(model.a_w1 === 1){
            model.a_w1 = "";
        }
        if(model.b_w2 === 1){
            model.b_w2 = "";
        }
        
        var primer_factor = "(" + model.a_w1.toString() + "x " + model.j + " " + Math.abs(model.c_w1).toString() + ")";
        var segundo_factor = "(" + model.b_w2.toString() + "x " + model.h + " " + Math.abs(model.d_w2).toString() + ")";

        this.reemplazarHTML("#valor_factores", "Los factores son: <br>" + primer_factor + " y " + segundo_factor);
    }, 
    
    mostrarResultado : function (){
        if(model.a_w1 === 1){
            model.a_w1 = "";
        }
        if(model.b_w2 === 1){
            model.b_w2 = "";
        }
        
        if(model.factor_comun === 1){
            var res = "R = (" + model.a_w1.toString() + "x " + model.j + " " + Math.abs(model.c_w1).toString() + ")(" + model.b_w2.toString() + "x " + model.h + " " + Math.abs(model.d_w2).toString() + ")";
        }else{
            var res = "R = " + model.factor_comun + "(" + model.a_w1.toString() + "x " + model.j + " " + Math.abs(model.c_w1).toString() + ")(" + model.b_w2.toString() + "x " + model.h + " " + Math.abs(model.d_w2).toString() + ")";
        }
        
        $("#valor_resultado").html(res);
    }
    
};

var controller = {
    calcularRandom : function (X, Y){
        //Número aleatorio entre un rango X y Y entonces usando Math.floor(Math.random()*(Y-X))+X
        return Math.floor(Math.random()*(Y+1-X))+X;
    },
    
    calcularPow : function (a, b) {
        return Math.pow(a, b);
    },
    
    filterInt : function (value) {
        if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
          return Number(value);
        return "NaN";
    },
    
    getCookie : function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return "";
    },
    
    setCookie : function(cname, cvalue) {
        document.cookie = cname + "=" + cvalue + ";";
    },
    
    inicializarVariables : function() {
        //Obtener cookie nivel
        var nivel = this.getCookie("nivel");
        if (nivel !== "") {
            model.nivel = parseInt(nivel);
        } 
        
        console.log("nivel", model.nivel);
        
        //Obtener cookie puntos
        var puntos = this.getCookie("puntos");
        if (puntos !== "") {
            model.puntos = parseInt(puntos);
        } 
        
        views.reemplazarHTML("#puntos", model.puntos);
        
        //Segun nivel asignar a, n, m
        switch(model.nivel) {
            case 1:
                model.n = 1;
                model.m = 6;
                break;
            case 2:
                model.n = 2;
                model.m = 7;
                break;
            case 3:
                model.n = 3;
                model.m = 10;
                break;
            case 4:
                model.n = 5;
                model.m = 15;
                break;
            case 5:
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
        
        console.log("a", model.a);
        console.log("n", model.n);
        console.log("m", model.m);
        
        this.calcularb();
    },
    
    calcularb : function () {
        model.b = this.calcularRandom(1, model.n);
        
        if(model.b === 1){
            model.str_b = "";
        }else{
            model.str_b = model.b.toString();
        }
        
        console.log("b", model.b);
        
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
        
        console.log("pot_cc*c", model.pot_cc * model.c);
        
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
        
        console.log("pot_dd*d", model.pot_dd* model.d);

        this.calcularw1();
    },
    
    calcularw1 : function (){
        var w1 = 1;
        
        while(w1 <= model.n){
            if(model.a % w1 === 0 && model.c % w1 === 0){
                model.ac = w1;
                model.a_w1 = model.a / w1;
                model.c_w1 = model.c / w1;
            }
            w1 += 1;
        }
        
        console.log("a_w1", model.a_w1);
        console.log("pot_cc*c_w1", model.pot_cc * model.c_w1);
        
        this.calcularw2();
    },
    
    calcularw2 : function (){
        var w2 = 1;
        
        while(w2 <= model.n){
            if(model.b % w2 === 0 && model.d % w2 === 0){
                model.bd = w2;
                model.b_w2 = model.b / w2;
                model.d_w2 = model.d / w2;
            }
            w2 += 1;
        }
        
        console.log("b_w2", model.b_w2);
        console.log("pot_dd*d_w2", model.pot_dd* model.d_w2);
        
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
        
        console.log("ff", model.ff);
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
        
        console.log("gg", model.gg);
        
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
        
        model.f = Math.abs(model.f);
        
        if(model.f === 1){
            model.f = "";
        }else{
            model.str_f = model.f.toString(); 
        }
        
        model.str_g = Math.abs(model.g).toString();
        
        
        this.construirBinomio_trinomio();
    },
    
    construirBinomio_trinomio : function(){
        //CASO ESPECIAL: BINOMIO
        if(model.f === 0){
            model.str_binomio =  model.str_e + "x<sup>2</sup> " + model.gg + model.str_g;
            console.log("Binomio");
            console.log(model.str_binomio);
            views.reemplazarHTML("#trinomio_resolver", model.str_binomio);
            views.reemplazarHTML("#mensaje", "<p><b>Caso especial:</b>  dadas ciertas condiciones un trinomio se puede reducir a una <b>diferencia de cuadrados</b>, un tipo de binomio</p>");
        
        //CASO TRINOMIO
        }else if(model.f !== 0){
            model.str_trinomio = model.str_e + "x<sup>2</sup> " + model.ff + model.str_f + "x" + model.gg + model.str_g;
            console.log("Trinomio");
            console.log(model.str_trinomio);
            views.reemplazarHTML("#trinomio_resolver", model.str_trinomio);
        }
    },
    
    actualizarPuntaje : function(val){
        if(val === "-"){
            model.puntos -= 1;
        }else{
            model.puntos += 1;
        }
        
        //model.puntos = model.puntos * model.nivel;
        
        views.reemplazarHTML("#puntos", model.puntos);
    },
    
    guardarPuntaje : function(){
        //Almacenar en cookie
        this.setCookie("puntos", model.puntos);
    },
    
    validarExistenciaFC : function (valor){
        views.deshabilitarRadio();
        
        //El factor comun es ac*bd
        model.factor_comun = model.ac * model.bd;
        
        /*console.log("ac", model.ac);
        console.log("bd", model.bd);
        console.log("factor_comun", model.factor_comun);*/
        
        if(valor === "si"){
            if(model.factor_comun === 1){
                views.mostrarMensaje("No amigo, debiste verificar. No hay factor común", "warning");
                
                //Actualizar puntaje
                this.actualizarPuntaje("-");
                
                views.mostrar("#continuar");
                
            }
            if(model.factor_comun !== 1){
                views.mostrarIngresaFC();
            }
        }else{
            if(model.factor_comun === 1){
                views.mostrarMensaje("¡Correcto!", "success");
                
                //Actualizar puntaje
                this.actualizarPuntaje("+");
                
                views.mostrar("#continuar");
            }
            if(model.factor_comun !== 1){
                views.mostrarMensaje("No amigo. Sí hay factor común. Revisa y ubícalo", "warning");
                views.mostrarIngresaFC();
            }
        }
    },
    
    validarFC : function (){
        var fc = parseInt($("#fc").val());
        
        if(fc === model.factor_comun){
            views.esconder("#ingresa_fc");
            views.mostrarMensaje("¡Correcto!", "success");
            
            //Actualizar puntaje
            this.actualizarPuntaje("+");
                
            views.mostrar("#continuar2");
        }else{
            views.mostrarMensaje("Ingresa nuevamente el factor común", "warning");
            
            //Actualizar puntaje
            this.actualizarPuntaje("-");
        }
    },
    
    validarFactores : function (){
        var valor_a = $("#a").val();
        var valor_b = $("#b").val();
        var valor_c = $("#c").val();
        var valor_d = $("#d").val();
        var signo; //Primer signo
        var signo2; //Segundo signo
        var flag = 0;
        
        if(this.filterInt(valor_a) !== "NaN" && this.filterInt(valor_b) !== "NaN" 
            && this.filterInt(valor_c) !== "NaN" && this.filterInt(valor_d) !== "NaN"){

            //ParseInt
            valor_a = this.filterInt(valor_a);
            valor_b = this.filterInt(valor_b);
            valor_c = this.filterInt(valor_c);
            valor_d = this.filterInt(valor_d);
            
            //Signos
            if (valor_b < 0){
                signo = "-";
            }
            if (valor_b > 0){
                signo = "+";
            }
            if (valor_d < 0){
                signo2 = "-";
            }
            if (valor_d > 0){
                signo2 = "+";
            }
            
            //No hay factor comun
            if(model.factor_comun === 1){
                /*Caso 1*/
                if(valor_a === model.a && valor_b === model.pot_cc * model.c && valor_c === model.b && valor_d === model.pot_dd * model.d){
                    views.mostrarMensaje("Correcto", "success");
                    $("input[type=number].valid").css("border-bottom", "2px solid #5C97A0").css("x-shadow ", "0 2px 0 0 #5C97A0");
                    flag = 1;
                } /*Caso 2*/
                else if(valor_a === model.b && valor_b === model.pot_dd * model.d && valor_c === model.a && valor_d === model.pot_cc * model.cc){
                    views.mostrarMensaje("Correcto", "success");
                    $("input[type=number].valid").css("border-bottom", "2px solid #5C97A0").css("x-shadow ", "0 2px 0 0 #5C97A0");
                    flag = 1;
                } /*Errores*/
                else{
                    views.mostrarMensaje("Verifica los valores", "warning");
                    $("input[type=number].valid").css("border-bottom", "2px solid red").css("x-shadow ", "0 2px 0 0 red");
                }
            }
            //Si hay factor comun
            else{
                /*Caso 1*/
                if(valor_a === model.a_w1 && valor_b === model.pot_cc * model.c_w1 && valor_c === model.b_w2 && valor_d === model.pot_dd * model.d_w2){
                    views.mostrarMensaje("Correcto", "success");
                    $("input[type=number].valid").css("border-bottom", "2px solid #5C97A0").css("x-shadow ", "0 2px 0 0 #5C97A0");
                    flag = 1;
                } /*Caso 2*/
                else if(valor_a === model.b_w2 && valor_b === model.pot_dd * model.d_w2 && valor_c === model.a_w1 && valor_d === model.pot_cc * model.c_w1){
                    views.mostrarMensaje("Correcto", "success");
                    $("input[type=number].valid").css("border-bottom", "2px solid #5C97A0").css("x-shadow ", "0 2px 0 0 #5C97A0");
                    flag = 1;
                } /*Errores*/
                else{
                    views.mostrarMensaje("Verifica los valores", "warning");
                    $("input[type=number].valid").css("border-bottom", "2px solid red").css("x-shadow ", "0 2px 0 0 red");
                }
            }
        }else{
            views.mostrarMensaje("Completa los campos vacíos", "warning");
        }
        
        if(flag === 1){
            if(valor_a === 1){
                valor_a = "";
            }
            if(valor_c === 1){
                valor_c = "";
            }
            
            //Actualizar puntaje
            this.actualizarPuntaje("+");
            
            model.str_trinomio = "(" + valor_a.toString() + "x " + signo + " " + Math.abs(valor_b).toString() + ")(" + valor_c.toString() + "x " + signo2 + " " + Math.abs(valor_d).toString() + ")";
            
            views.mostrar("#fact");
            views.reemplazarHTML("#valor_factores", model.str_trinomio);
            views.esconder("#botones");
            views.mostrar("#continuar4");
        }else{
            //Actualizar puntaje
            this.actualizarPuntaje("-");
        }
    }

};

//Document ready
$(document).ready(function() {
    //Side nav
    $('.button-collapse').sideNav();
    
    //Modal
    $('.modal-trigger').leanModal();
        
});