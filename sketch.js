var d = 40;
var delay = 0;
var cW = cH = 600;

function Snake() {
	this.body = [];
	this.links = 1;

	this.x = 0;
	this.y = 0;

	this.dirX = 1;
	this.dirY = 0;

	this.addLink = function (x, y) {
		this.body.push({
			x: x,
			y: y
		});
	}

	this.draw = function() {
		fill("white");
		for (var i = 0; i < this.body.length; i++) {
			var s = this.body[i];
			rect(s.x,s.y, d, d);
		}
	}

	this.removeLastLink = function () {
		if (this.body.length > this.links) {
			this.body.splice(0, 1);
		}
	}

	this.collision = function (x, y) {
		if (this.x == x && this.y == y) {
			return true;
		}
		return false;
	}

	this.selfCollision = function () {
		for (var i = 0; i < this.body.length-1; i++) {
			var col = this.collision(this.body[i].x, this.body[i].y);
			if (col) return true;
		}
		return false;
	}

	this.updateDirection = function (k) {

		var x = 0;
		var y = 0;

		switch (k) {
			case 37:
				x = -1;
				y = 0;
				break;
			case 38:
				x = 0;
				y = -1;
				break;
			case 39:
				x = 1;
				y = 0;
				break;
			case 40: 
				x = 0;
				y = 1;
				break;
			default:
				x = this.dirX;
				y = this.dirY;
				break;
		}

		if (this.dirX + x != 0) this.dirX = x;
		if (this.dirY + y != 0) this.dirY = y;


	}

	this.move = function () {
		this.x += this.dirX * d;
		this.y += this.dirY * d;

		if (this.x < 0) this.x = cW - d;
		if (this.x >= cW) this.x = 0;
		if (this.y < 0) this.y = cH - d;
		if (this.y >= cH) this.y = 0;

		this.addLink(this.x, this.y);

		this.removeLastLink();
	}

	this.reset = function () {
		this.links = 1;
		this.x = 0;
		this.y = 0;
		this.dirX = 1;
		this.dirY = 0;
		this.body.length = 0;
	}
}

function Food(x, y) {
	this.x = x;
	this.y = y;

	this.draw = function () {
		fill("red");
		rect(this.x, this.y, d, d);
	}

	this.relocate = function () {
		this.x = Math.floor(Math.random()*(cW/d-2))*d + d;
		this.y = Math.floor(Math.random()*(cH/d-2))*d + d;
	}
}

var food, snake;

function setup() {

	createCanvas(cW, cH);
	background(0, 0, 0);

	food = new Food();
	food.relocate();

	snake = new Snake();


	noStroke();
}

function draw() {
	background("black");

	food.draw();

	if (keyIsPressed) {
		snake.updateDirection(keyCode);
	}

	delay++;

	if (delay >= 7) {
		delay = 0;
		snake.move();

		if (snake.collision(food.x,food.y)) {
			food.relocate();
			snake.links++;
		}

		if (snake.selfCollision()) {
			snake.reset();
		}

	}

	snake.draw();

}
