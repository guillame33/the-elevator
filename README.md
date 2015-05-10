# The Elevator

A programming test by Wopata.

## The job

Your job is to write the controlling logic board of an elevator in Angular.JS.
It is a completely standard elevator you surely have operated numerous times in
your life, so the way it works should be instantly familiar.

We have written a framework to display what's going on and to call and operate
the car. The rest is up to you.

We recommend you to fork this repository and work on Github. It is just as fine
to clone it and push it on Bitbucket instead. The choice of git provider does
not affect the evaluation of the solution.

## Your tasks


* Write the logic that moves the elevator. This should be done in the provided
  `$interval` skeleton; moving the car means simply updating `car.floor`.
* Some elevators can fulfill one request at a time, others collect requests and
  complete them in floor order. The algorithm choice is up to you, but the
  smarter the better!
* Write all the logic that's called by the call button and the buttons on the
  panel of the car.
* Write the logic that controls the light (red or green) at each floor. Red
  should mean that the car is occupied, green should mean that it's coming to
  this floor, and no light should mean that it's free to call. Just set
  `floors[n].light` to `""`, `"red"` or `green`.
* Disable step in/out buttons when it's not possible to enter or leave the car.
* Needless to say, write tests to test your code. And ours.
* For extra coolness points, you can separate the control logic to an injected
  dependency, to allow for it to be "upgraded" from, say, a simple logic to one
  that collects requests and optimizes them.

## Notes

* The elevator has a weight detector, so it can tell when it's occupied.
* The elevator has double doors: the car has a manual _inner door_ to be
  operated by the occupant, and each floor has an _outer door_ that should be
  locked by the system whenever the car is not stationary at the given floor.
* For security purposes, the elevator car shall not move if it's occupied _and_
  the inner door is not shut. Yes, this is an old design in an old building.
* It should also stop immediately if the inner door is opened during travel.
  In this app, though, "immediately" should mean "at the next one-second tick".
* An unoccupied car can be called irregardless of its inner door status.
* The car's `dir` property is supposed to be `-1`, `0` and `1`.
