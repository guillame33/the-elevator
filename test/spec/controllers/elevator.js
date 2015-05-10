'use strict';

describe('Controller: ElevatorCtrl', function () {

  // load the controller's module
  beforeEach(module('elevator'));

  var ElevatorCtrl,
    multiple,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _multiple_) {
    scope = $rootScope.$new();
    multiple = _multiple_;
    ElevatorCtrl = $controller('ElevatorCtrl', {
      $scope: scope
    });
  }));

  it('should unlock the 1st floor door', function () {
    expect(scope.floors[1].open).toBe(false);
    scope.unlockFloorDoor(1);
    expect(scope.floors[1].open).toBe(true);
  });

  it('should have a call in the call stack when we make a call', function () {
    scope.call = multiple;
    scope.call.makeCall(10);
    expect(scope.call.floorToGo[0]).toBe(10);
  });
});
