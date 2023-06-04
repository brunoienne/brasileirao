sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel", //declaração da lib
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
                var live = 'live_9bca756e2d0e4263ce24fb0dd9db71';
                var test = 'test_bc1624368f176739606514c1e8d285';

                var visao = this.getView();

                 //Campeonato
                 $.ajax({
                    method : "GET",
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    headers: {
                        'Authorization': 'Bearer ' + live
                     },
                     success: function(dados){
                        var oCampeonato = new JSONModel(dados);
                        visao.setModel(oCampeonato,"CampeonatoModel");
                     },
                     error: function(erro){
                        console.log(erro);
                     }

                });
                
                //Partidas
                $.ajax({
                    method : "GET",
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/9",
                    headers: {
                        'Authorization': 'Bearer ' + live
                     },
                     success: function(dados){
                        var oRodada = new JSONModel(dados);
                        visao.setModel(oRodada,"PartidasModel");
                     },
                     error: function(erro){
                        console.log(erro);
                     }

                });

                //Classificação 
                /*$.ajax({
                    method : "GET",
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    headers: {
                        'Authorization': 'Bearer ' + live
                     },
                     success: function(dados){
                        var jsonConv = {
                            "Classificacao" : dados
                        }
                        var jsonFin = JSON.stringify(jsonConv);
                        console.log(jsonFin);
                        var oTabela = new JSONModel(jsonFin);
                        visao.setModel(oTabela,"ClassificacaoModel");
                        
                    },
                     error: function(erro){
                        console.log(erro);
                     }

                });*/

            }
        });
    });
