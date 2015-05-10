angular.module("elevator", [])
  .controller("ElevatorCtrl", ["$scope", "$interval","ElevatorService", function ($scope, $interval,ElevatorService) {
    // Object representing the car
    var car = $scope.car = {
      active: function (n) {
        return this.floor == n;
      },
      state: function () {
        var r = this.occupied ? "Occpd " : "Empty ";
        switch (this.dir) {
          case -1: r += "↑↑↑↑"; break;
          case  1: r += "↓↓↓↓"; break;
          case  0: r += this.open ? "OPEN" : "STOP";
        }
        return r;
      },
      canOpen: function (n) {
        var canWeOpen = (this.floor===n&&this.dir===0) ?  true : false;
        return canWeOpen;
      },
      stepIn: function () {
          this.occupied = true;
          //close the car door when entering
          this.open = false;
          //close the floor door when entering
          floors[car.floor].open = false;
      },
      stepOut: function () {
          this.occupied = false;
          //close the door when living
          this.open = false;
          //close the floor door when living
          floors[car.floor].open = false;
      },
        stateDoor: function(){
            return this.open ? "open" : "close";
        },
      dir: 0,
      floor: 10,
      open: false,
      occupied: false
    };

    var lights = {
      setFloorLightToRedExpectOne: function (floors,floorToGo){
      floors.forEach(function (floor,n) {
        if(floorToGo!==n)
          floor.light = "red";
      })
    },

      setAllFloorLightToEmpty: function (floors){
        floors.forEach(function (floor) {
          floor.light = "";
        })
      },

      setFloorLightToGreen: function (floors,floorNumber){
        floors[floorNumber].light = "green";
      },

      setLightForFloors: function(floors,floorToGoNow){
        //Set the green
        this.setFloorLightToGreen(floors,floorToGoNow);
        //other light to red
        this.setFloorLightToRedExpectOne(floors,floorToGoNow);
      }
    };

    // Object representing the control panel in the car
    $scope.panel = {
      btnClass: function (n) {
        // This can be used to emulate a LED light near or inside the button
        // to give feedback to the user.
        return null;
      },
      press: function (n) {
          call.makeCall(n);
      },
      stop: function () {
        elevatorStop();
      }
    };

    // Floors
    var floors = $scope.floors = [];
    for (var i=10; i>0; i--) floors.push({title:i});
    floors.push({title:"G"});

    // Let's have them know their indices. Zero-indexed, from top to bottom.
    // Also let's initialize them.
    floors.forEach(function (floor,n) {
      floor.n = n;
      floor.open = false;
      floor.light = null;
        floor.stateDoor = function(){
            return this.open ? "open" : "close";
        }
    });

    //use the service to manage call of the elevator
    var call;
    ElevatorService.then(function(resolve){
        call = $scope.call = resolve
    });

    //Say if we can move or not
    var readyToMove = function(){
      return call.orderToMove() && car.open === false && floors[car.floor].open === false;
    };

    //Open or close cart door
    $scope.toggleCarDoor = function(){
        car.open ? car.open = false : car.open = true;
    };

    //Enable or disable the car door button
    $scope.canUseCarDoor = function(n){
        if(car.occupied) return false;
        else if(floors[n].open) return false;
        else return true;
    };

    //Unlock floor door
    $scope.unlockFloorDoor = function(n){
        floors[n].open = true;
    };

    //Step In Button
    $scope.enableStepIn = function(){
      return !(car.occupied===false&&car.open&&floors[car.floor].open);
    };

    //Step Out Button
    $scope.enableStepOut = function(){
      return !(car.occupied===true&&car.open&&floors[car.floor].open);
    };

    var elevatorStop = function () {
      //Remove from call
      call.removeCall();

      //floor light to empty if there is no other call
      if(call.noMoreCall())
        lights.setAllFloorLightToEmpty(floors);

      //Set to Stop
      car.dir = 0;

      //We can open the floor door
      car.canOpen(car.floor)
    };

    $interval(function () {
      // Move the car if necessary
        if(readyToMove()){ //we can go!
            //The floor to go now
            var floorToGoNow = call.currentFloor();

            //We initialize the lights
            lights.setLightForFloors(floors,floorToGoNow)

            //Are we going up or down?
            if(car.floor>floorToGoNow){ //going up
                car.floor-=1;
                car.dir = -1;
            }
            else if(car.floor<floorToGoNow){ //going down
                car.floor+=1;
                car.dir = 1;
            }
            else{ //We are at the right floor, we have to stop
              elevatorStop();
            }
        }
    }, 1000);
  }]);
