"use strict";

angular.module("elevator")
    .factory("ElevatorService", function ($http, $injector) {

        return $http.get('config.json')
            .then(function (resp) {
                return $injector.get(resp.data.callStackType);
            }, function () {
                console.log("config.json file not found.")
            });
    })

    .factory('multiple', function () {
        //Object representing the elevator call
        var call =  {
            floorToGo:[],
            makeCall: function(floorNumber){
                if(this.floorToGo.indexOf(floorNumber)===-1){
                    return  this.floorToGo.push(floorNumber);
                }
            },
            removeCall: function(){
                this.floorToGo.splice(0,1);
            },
            currentFloor: function(){
                return this.floorToGo[0];
            },
            orderToMove: function(){
                return this.floorToGo.length>0;
            },
            noMoreCall: function(){
                return this.floorToGo.length===0;
            }
        };

        return call;
    })

    .factory('single', function () {
        //Object representing the elevator call
        var call =  {
            floorToGo:-1,
            makeCall: function(floorNumber){
                if(this.floorToGo === -1){
                    return  this.floorToGo = floorNumber;
                }
            },
            removeCall: function(){
                this.floorToGo = -1;
            },
            currentFloor: function(){
                return this.floorToGo;
            },
            orderToMove: function(){
                return this.floorToGo>=0;
            },
            noMoreCall: function(){
                return this.floorToGo === -1;
            }
        };

        return call;
    });
