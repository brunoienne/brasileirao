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
                
                var oCampeonato = new JSONModel();
                var oRodada     = new JSONModel();
                var oTabela     = new JSONModel();

                this.getView().setModel(oCampeonato,"CampeonatoModel");
                this.getView().setModel(oRodada,"PartidasModel");
                this.getView().setModel(oTabela,"ClassificacaoModel");

                this.buscarCampeonato();
                this.buscarClassificacao();

            },

            //Campeonato
            buscarCampeonato: function(){      
                var dadosModel =  this.getView().getModel("CampeonatoModel");
                 $.ajax({
                    method : "GET",
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    headers: {
                        'Authorization': 'Bearer live_9bca756e2d0e4263ce24fb0dd9db71'
                     },
                     success: function(dados){
                        dadosModel.setData(dados);
                        this.buscarPartidas(dados.rodada_atual.rodada);
                     }.bind(this), //reconhece funções superiores
                     error: function(erro){
                        console.log(erro);
                     }

                });
            },

            //Partidas
            buscarPartidas: function(rodada){
                var dadosModel =  this.getView().getModel("PartidasModel");
                 $.ajax({
                    method : "GET",
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    headers: {
                        'Authorization': 'Bearer live_9bca756e2d0e4263ce24fb0dd9db71' 
                     },
                     success: function(dados){
                        dadosModel.setData(dados);
                     },
                     error: function(erro){
                        console.log(erro);
                     }

                });

            },

            //Classificação
           buscarClassificacao: function(){
                var dadosModel =  this.getView().getModel("ClassificacaoModel");
                $.ajax({
                    method : "GET",
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    headers: {
                        'Authorization': 'Bearer live_9bca756e2d0e4263ce24fb0dd9db71'
                     },
                     success: function(dados){
                        dadosModel.setData({'Classificacao' : dados});
                    },
                     error: function(erro){
                        console.log(erro);
                     }

                });
            }

        });
    });
