
var model = { //Variables
    i1 : (' 2357 '),
    j1 : ('xxyabm'),
    k1 : (' yzbcn'),
    nivel : 0,
    a : 0, //Valor del factor comun
    n : 0,
    m : 0,
    b : 0,
    b_i1 : "",
    c : 0,
    d : 0,
    d_j1 : "",
    e_k1 : "",
    f : 0,
    g : 0,
    t : 0,
    h : 0,
    hh : "",
    h1 : "",
    h2 : "",
    ft : 0,
    ab : 0,
    ac : 0,
    str_a : "",
    str_b_i1 : "",
    str_c_i1 : "",
    str_d_j1 : "",
    str_f : "",
    str_e_k1 : "",
    str_g : "",
    primer_factor : "",
    str_primer_factor : "",
    segundo_factor_cuadrados : "",
    str_segundo_factor_cuadrados : "",
    b2 : 0,
    bc : 0,
    c2 : 0,
    f2 : 0,
    expo1 : "",
    expo2 : "",
    g2 : "",
    segundo_factor_cubos : "",
    str_segundo_factor_cubos : "",
    binomio : "",
    str_binomio : "",
    tipo : "",
    str_segundo_factor : ""
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
        this.esconder("#existe_fc");
        this.mostrar("#ingresa_fc");
    },
    
    actualizarTabs :  function (tab) {
        switch (tab){
            case 'factor_comun':
                $("#li_cuadrado_cubo").addClass("disabled");
                $("#li_factores").addClass("disabled");
                $("#li_resultado").addClass("disabled");
                break;
            case 'cuadrado_cubo':
                $("#li_cuadrado_cubo").removeClass("disabled");
                //$("#li_fc").addClass("disabled");
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
    
    mostrarMensaje : function (valor, tipo){
        var title;
        if(tipo === "warning"){
            title = "Error";
        }else{
            title ="Bien hecho!";
        }
        
        swal({   
            title: title,   
            text: valor,   
            type: tipo,
            confirmButtonColor: "#FC9400"
        });
    },
    
    deshabilitarRadio : function (valor){
        $('input[name='+valor+']').attr("disabled",true);
    }, 
    
    mostrarFC : function (){
        this.esconder("#ingresa_fc");
        this.mostrar("#continuar2");
        this.reemplazarHTML("#valor_fc", "El factor común es " + model.a);
    },
    
    mostrarExplicaciones : function (){
        if(model.t === 2){
            this.mostrar("#explicacion_cuadrado");
        }else if(model.t === 3){
            this.mostrar("#explicacion_cubico");
        }
    },
    
    mostrarFactores : function (){
        this.esconder("#ingresa_factores");
        this.esconder("#explicaciones");
        this.mostrar("#continuar4");
        
        if(model.t === 2){
            model.str_segundo_factor = model.str_segundo_factor_cuadrados;
        }else if(model.t === 3){
            model.str_segundo_factor = model.str_segundo_factor_cubos;
        }
        
        this.reemplazarHTML("#valor_factores", "Los factores son: <br>" + model.str_primer_factor + " y " + model.str_segundo_factor);
    }, 
    
    mostrarResultado : function (){
        if(model.t === 2){
            model.str_segundo_factor = model.str_segundo_factor_cuadrados;
        }else if(model.t === 3){
            model.str_segundo_factor = model.str_segundo_factor_cubos;
        }
        
        if(model.a === 1){
            var res = "R = (" + model.str_primer_factor + ")" + "(" + model.str_segundo_factor + ")"; 
        }else{
            var res = "R = " + model.a + "(" + model.str_primer_factor + ")" + "(" + model.str_segundo_factor + ")"; 
        }
        
        $("#valor_resultado").html(res);
    }
    
    
    /*mostrarFactor : function (){
        this.reemplazarHTML("#valor_fc", "El factor común es " + model.a);
    },
    
    mostrarTipo : function (){
        if(model.t === 2){
            var tipo = "cuadrático";
        }else{
            var tipo = "cúbico";
        }
        this.esconder("#ingresa_tipo");
        this.reemplazarHTML("#tipo", "El binomio es " + tipo);
    }*/
};

var controller = {
    calcularRandom : function (X, Y){
        //Número aleatorio entre un rango X y Y entonces usando Math.floor(Math.random()*(Y-X))+X
        return Math.floor(Math.random()*(Y+1-X))+X;
    },

    calcularPow : function (a, b) {
        return Math.pow(a, b);
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
    
    inicializarVariables : function() {
        //Obtener cookie
        var nivel = this.getCookie("nivel");
        if (nivel !== "") {
            model.nivel = parseInt(nivel);
        } 
        console.log("nivel", model.nivel);
        
        //Segun nivel asignar a, n, m
        switch(model.nivel) {
            case 1:
                model.a = 1;
                model.n = 1;
                model.m = 3;
                break;
            case 2:
                model.a = this.calcularRandom(1,3);
                model.n = 1;
                model.m = 4;
                break;
            case 3:
                model.a = this.calcularRandom(1,7);
                //Mientras a sea igual a 4 se repite el calculo del random
                while (model.a === 4) {
                    model.a = this.calcularRandom(1,7);
                }
                model.n = 1;
                model.m = 6;
                break;
        }
        
        console.log("VARIABLES");
        
        console.log("a", model.a);
        console.log("n", model.n);
        console.log("m", model.m);
        
        /*REVISAR
        if(model.a === 1){
            model.str_a = "";
        }else{
            model.str_a = model.a.toString();
        }*/

        this.calcularb();
    },

    calcularb : function () {
        model.b = this.calcularRandom(model.n, model.m);
        model.b_i1 = model.i1[model.b - 1];

        if (model.b === 6) {
            model.b = 1;
        }

        if (model.b !== 1 && model.b !== 6) {
            //REVISAR: QUITE PARSEINT
            model.b = parseInt(model.b_i1);
        }
        
        console.log("b" + model.b);
        console.log("b_i1" + model.b_i1);

        this.calcularc();
    },

    calcularc : function () {
        model.c = this.calcularRandom(model.n, model.m);

        //Validar que c y b sean diferentes
        while (model.c === model.b) {
            model.c = this.calcularRandom(model.n, model.m);
        }
        
        //console.log("c en calcularc" + model.c + typeof model.c);
        
        model.c_i1 = model.i1[model.c - 1];
        
        //Validar que b_i1 y c_i1 sean diferentes
        if (model.c_i1 === model.b_i1) {
            model.c_i1 = model.i1[model.c - 2];
        }

        if (model.c !== 1 && model.c !== 6) {
            model.c = parseInt(model.c_i1);
        }
        //console.log("c_i1 en calcularc" + model.c_i1 + typeof model.c);
        //console.log("c en calcularc luego del parse " + model.c);

        console.log("c", model.c);
        console.log("c_i1", model.c_i1);

        this.calculard();
    },

    calculard : function () {
        model.d = this.calcularRandom(model.n, model.m);

        model.d_j1 = model.j1[model.d - 1];
        model.e_k1 = model.k1[model.d - 1];

        if(model.e_k1 === " " &&  model.c === 1){
            model.c_i1 = 1;
        }
        
        console.log("d", model.d);
        console.log("d_j1", model.d_j1);
        console.log("e_k1", model.e_k1);
        
        this.calcularf();
    },

    calcularf : function () {
        model.f = this.calcularRandom(model.n, model.m);

        //Actualizar f
        if (model.d_j1 === " ") {
            model.f = "";
        }
        
        console.log("f", model.f);

        this.calcularg();
    },

    calcularg : function () {
        model.g = this.calcularRandom(model.n, model.m);

        //Actualizar g
        if (model.e_k1 === " ") {
            model.g = "";
        }
        
        console.log("g", model.g);
        
        this.calculart();
    },
    
    calculart : function  () {
        model.t = this.calcularRandom(2, 3);

        //Asignar hh, h1 y h2 segun valor de t
        if(model.t === 2){
            model.hh = " -";
            model.h1 = "-";
            model.h2 = "+";
        }else{
            model.h = this.calcularRandom(0, 1);

            if(model.h === 0){
                model.hh = "+";
                model.h1 = "+";
                model.h2 = "-";
            }else{
                model.hh = " -";
                model.h1 ="-";
                model.h2 ="+";
            }
        }
        
        console.log("t", model.t);
        console.log("h", model.h);
        console.log("hh", model.hh);
        console.log("h1", model.h1);
        console.log("h2", model.h2);

        this.calcularMultiplicaciones();
    },

    calcularMultiplicaciones : function () {
        //Calcular ft
        model.ft = model.f * model.t;

        //Calcular gt
        model.gt = model.g * model.t;

        //Calcular ab
        model.ab = model.a * this.calcularPow(model.b, model.t);

        //Actualizar valor de ab
        if (model.ab === 1){
            model.ab = "";
        }
        
    //        console.log("ab");
    //        console.log("a " + model.a);
    //        console.log("b " + model.b);
    //        console.log("t " + model.t);
    //        console.log("pow(model.b, model.t) " + this.calcularPow(model.b, model.t));
    //        console.log("pow*a " + model.ab);
    //        console.log(" ");
        
        //Calcular ac
        model.ac = model.a * this.calcularPow(model.c, model.t);

        //Actualizar valor de ac
        if (model.ac === 1 && model.e_k1 !== " "){
            model.ac = "";
        }
        
//        console.log("ac");
//        console.log("a " + model.a);
//        console.log("c " + model.c);
//        console.log("t " + model.t);
//        console.log("pow(model.c, model.t) " + this.calcularPow(model.c, model.t));
//        console.log("pow*a " + model.ac);
        
        console.log("ft", model.ft);
        console.log("gt", model.gt);
        console.log("ab", model.ab);
        console.log("ac", model.ac);
        
        this.convertiraString();
    },

    convertiraString : function () {
        //COEFICIENTES
        model.str_b_i1 = model.b_i1.toString();
        
        //Si b es igual a 1 o 6 al hallar str_b_i1 = i1[b-1], tendriamos " " entonces se reemplaza por ""
        if(model.b === 1 || model.b === 6){
            model.str_b_i1 = "";
        }
        
        if(model.str_b_i1 === " "){
            model.str_b_i1 === "";
        }

        /*if(model.c === 1 || model.b === 6){
            model.str_c_i1 = "";
        }*/
        
        if(model.c_i1 === " "){
            model.str_c_i1 === "";
        }else{
            model.str_c_i1 = model.c_i1.toString();
        }
        
        /*if(model.c_i1 === 1){
            model.str_c_i1 = "";
        }*/
        
        //BASES
        model.str_d_j1 = model.d_j1.toString();

        if(model.d_j1 === " "){
            model.str_d_j1 = "";
        }
        
        if(model.str_b_i1 === " " || model.str_b_i1 === "1"){
            model.str_d_j1 = "";
        }
        
        model.str_e_k1 = model.e_k1.toString();

        if(model.e_k1 === " "){
            model.str_e_k1 = "";
        }
        
        //EXPONENTES
        model.str_f = model.f.toString();

        if(model.f === 1){
            model.str_f = "";
        }

        model.str_g = model.g.toString();
        
        if(model.g === 1){
            model.str_g = "";
        }

        if(model.g === 1 && model.e_k1 === " "){
            model.str_g = "";
        }

        this.construirPrimerFactor();
    },

    //Primer factor de cuadrados y cubos es el mismo
    construirPrimerFactor : function (){
        //Primer factor: str_b_i1 + str_d_j1 + str_f + str(h1) + str_c_i1 + str_e_k1 + str_g
        model.primer_factor = model.str_b_i1.concat(model.str_d_j1, model.str_f, model.h1.toString(), model.str_c_i1, model.str_e_k1, model.str_g);
        model.str_primer_factor = model.str_b_i1 + model.str_d_j1 + "<sup>" + model.str_f + "</sup>"
                                  + " " + model.h1 + " " + model.str_c_i1 + model.str_e_k1 + "<sup>" + model.str_g + "</sup>";
        
        console.log("PRIMER FACTOR", model.primer_factor);
        console.log("b_i1", model.str_b_i1);
        console.log("d_j1", model.str_d_j1);
        console.log("f", model.str_f);
        console.log("h1", model.h1);
        console.log("c_i1", model.str_c_i1);
        console.log("e_k1", model.str_e_k1);
        console.log("g" ,model.str_g);
        //$('#binomio_resolver').html(model.str_primer_factor);

        if(model.t === 2){
            this.construirSegundoFactorCuadrados();
        }else{
            this.calcularb2();
        }
        
    },

    construirSegundoFactorCuadrados : function () {
        //Segundo factor: str_b_i1 + str_d_j1 + str_f + str(h2) + str_c_i1 + str_e_k1 + str_g
        model.segundo_factor_cuadrados = model.str_b_i1.concat(model.str_d_j1, model.str_f, model.h2.toString(), model.str_c_i1, model.str_e_k1, model.str_g);
        model.str_segundo_factor_cuadrados = model.str_b_i1 + model.str_d_j1 + "<sup>" + model.str_f + "</sup>" + " " + model.h2 + " " + model.str_c_i1 +
                                              model.str_e_k1 + "<sup>" + model.str_g + "</sup>";
        
        console.log("SEGUNDO FACTOR", model.segundo_factor_cuadrados);
        console.log("b_i1", model.str_b_i1);
        console.log("g_j1", model.str_d_j1);
        console.log("f", model.str_f);
        console.log("h2", model.h2);
        console.log("c_i1", model.str_c_i1);
        console.log("e_k1", model.str_e_k1);
        console.log("g", model.str_g);
        //$('#binomio_resolver').html(model.str_segundo_factor_cuadrados);
        
        this.mostrarBinomio();
        
    },

    calcularb2 : function () {
        model.b2 = (this.calcularPow(model.b, 2)).toString();
        if(model.b === 1){
            model.b2 = "";
        }    

        this.calcularbc();
    },

    calcularbc : function () {
        //Convertir a string antes de parseInt para asegurar que no retorne NaN
        //model.b = model.b.toString();
        //model.c = model.c.toString();
       
        model.bc = (model.b * model.c).toString();
        
        /*if(isNaN(model.bc)){
            model.bc = "";
        }*/
        
        this.calcularc2();
    },

    calcularc2 : function () {
        model.c2 = (this.calcularPow(model.c, 2)).toString();
        
        if(model.c === 1 && model.e_k1 !== " "){
            model.c2 = "";
        }
        
        if(model.c === 1 && model.e_k1 === " "){
            model.c2 = "1";
        }

        this.calcularf2();
    },

    calcularf2 : function (){
        model.f2 = (2 * model.f).toString();

        if (model.b === 1){
            model.expo1 = "";
        }else{
            model.expo1 = model.f2;
        }

        this.calcularg2();
    },

    calcularg2 : function () {
        model.g2 = (2 * model.g).toString();

        if (model.g2 === "" || model.g2 === "1" || model.g2 === "0"){
            model.expo2 = "";
        }else{
            model.expo2 = model.g2;
        }

        this.construirSegundoFactorCubos();
    },

    construirSegundoFactorCubos : function () {
        //Segundo factor: b2 + str_d_j1 + f2 + str(h2) + bc + str_d_j1 + str_f + str_e_k1 + str_g + "+" + c2 + str_e_k1 + g2
        model.segundo_factor_cubos = model.b2.concat(model.str_d_j1, model.f2, model.h2.toString(), model.bc, model.str_d_j1,
                                     model.str_f, model.str_e_k1, model.str_g, "+", model.c2, model.str_e_k1, model.expo2);
        model.str_segundo_factor_cubos = model.b2 + model.str_d_j1 + "<sup>" + model.expo1 + "</sup>" + model.h2.toString()+ 
                                         model.bc + model.str_d_j1 + "<sup>"+ model.str_f + "</sup>" + model.str_e_k1 + "<sup>" 
                                         + model.str_g + "</sup>" + "+" + model.c2 + model.str_e_k1 + "<sup>"+ model.expo2 + "</sup>";
        
        console.log("SEGUNDO FACTOR", model.segundo_factor_cubos);
        console.log("b2", model.b2);
        console.log("d_j1", model.str_d_j1);
        console.log("f2", model.f2);
        console.log("h2", model.h2);
        console.log("bc", model.bc);
        console.log("d_j1", model.str_d_j1);
        console.log("f", model.f);
        console.log("e_k1", model.str_e_k1);
        console.log("g", model.g);
        console.log("+");
        console.log("c2", model.c2);
        console.log("e_k1", model.str_e_k1);
        console.log("expo2", model.expo2);
        //$('#binomio_resolver').html(model.str_segundo_factor_cubos);
        
        this.mostrarBinomio();
    },
    
    mostrarBinomio : function() {
        if(model.d === 1){
            model.binomio =  model.ab.toString().concat(model.str_d_j1, model.ft.toString(), " ", model.hh, " ", model.ac.toString(), model.str_e_k1);
            model.str_binomio =  model.ab.toString() + model.str_d_j1 + "<sup>" + model.ft.toString() + "</sup> " + model.hh + " " + model.ac.toString() +  model.str_e_k1;
        }else {
            model.binomio =  model.ab.toString().concat(model.str_d_j1, model.ft.toString(), " ", model.hh, " ", model.ac.toString(), model.str_e_k1, model.gt.toString());
            model.str_binomio =  model.ab.toString() + model.str_d_j1 + "<sup>" + model.ft.toString() + "</sup> " + model.hh + " " + model.ac.toString() + model.str_e_k1 + "<sup>" 
                                + model.gt.toString() + "</sup>";
        }
        
        console.log("BINOMIO", model.binomio);
        
        views.reemplazarHTML("#binomio_resolver", model.str_binomio);
        
    },
    
    validarExistenciaFC : function (valor){
        views.deshabilitarRadio('fc');
        if(valor === "si"){
            if(model.a === 1 ){
                views.mostrarMensaje("No amigo, debiste verificar. No hay factor común", "warning");
                views.mostrar("#continuar");
            }
            if(model.a !== 1 ){
                views.mostrarIngresaFC();
            }
        }else{
            if(model.a === 1 ){
                views.mostrarMensaje("¡Correcto!", "success");
                views.mostrar("#continuar");
            }
            if(model.a !== 1 ){
                views.mostrarMensaje("No amigo. Sí hay factor común. Revisa y ubícalo", "warning");
                views.mostrarIngresaFC();
            }
        }
    },
    
    //El factor comun es a
    validarFC : function (){
        var factor_comun = parseInt($("#fc").val());
        
        if(factor_comun === model.a){
            views.esconder("#ingresa_fc");
            views.mostrarMensaje("¡Correcto!", "success");
            views.mostrar("#continuar2");
        }else{
            views.mostrarMensaje("Ingresa nuevamente el factor común" , "warning");
        }
    },
    
    //El tipo es t
    validarTipoBinomio : function (valor){
        views.deshabilitarRadio('tipo');
        if(valor === "cuadratico"){
            model.tipo = 2;
        }else{
            model.tipo = 3; 
        } 
        
        views.esconder("#ingresa_tipo a");
        if(model.tipo === model.t){
            views.mostrarMensaje("¡Correcto!", "success");
        }else{
            if(model.tipo === 2){
                views.mostrarMensaje("El binomio es cúbico",  "warning");
            }else{
                views.mostrarMensaje("El binomio es cuadrático", "warning");
            }
        }
        
        views.mostrar("#continuar3");
    },
    
    validarFactores : function (){
        var p_factor = $("#primer").val().toLowerCase().trim();
        var s_factor = $("#segundo").val().toLowerCase().trim();
        
        if(p_factor === "undefined"){
           p_factor = "";
        }
        
        if(s_factor === "undefined"){
            s_factor = "";
        }
        
        if(model.t === 2){
            model.segundo_factor = model.segundo_factor_cuadrados;
        }else if(model.t === 3){
            model.segundo_factor = model.segundo_factor_cubos;
        }
        
        /*console.log("model.primer_factor" + model.primer_factor);
        console.log("segundo_factor" + segundo_factor);
        console.log("model.p_factor" + p_factor);
        console.log("model.s_factor" + s_factor);*/
        
        if(p_factor === model.primer_factor && s_factor !== model.segundo_factor){
            views.mostrarMensaje("Verifica el segundo factor", "warning");
            //$("#primer").css("border-bottom", "2px solid red").css("x-shadow ", "0 2px 0 0 red");
            $("#primer.valid").css("border-bottom", "2px solid #5C97A0").css("x-shadow ", "0 2px 0 0 #5C97A0");
            $("#primer.valid").css("border-bottom", "2px solid red").css("x-shadow ", "0 2px 0 0 red");
            
        }else if(p_factor !== model.primer_factor && s_factor === model.segundo_factor){
            views.mostrarMensaje("Verifica el primer factor", "warning");
            
        }else if(p_factor !== model.primer_factor && s_factor !== model.segundo_factor){
            views.mostrarMensaje("Verifica ambos factores", "warning");
            
        }else if(p_factor === model.primer_factor && s_factor === model.segundo_factor){
            views.esconder("#ingresa_factores");
            views.mostrarMensaje("¡Correcto!", "success");
            views.mostrar("#continuar4");
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
