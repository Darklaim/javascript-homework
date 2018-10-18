function random(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
};

var game = {
	size: 20,
	snake: [],
	food: {},
	bomb: {},
	score: 0,
	direction: {
		row: -1,
		col: 0
	},
	createBoard: function(){
		var table = document.createElement('table');
		table.classList.add('game-table');

		for ( var i = 0; i < this.size; i++ ) {
			var tr = document.createElement('tr');

			for ( var j = 0; j < this.size; j++ ) {
				td = document.createElement('td');
				td.classList.add('game-table-cell');
				td.setAttribute('id', 'cell-' + i + '-' + j);
				tr.appendChild(td);
			}
			table.appendChild(tr);
		} 

		document.getElementById('snake-field').appendChild(table);		
	},
	createSnake: function(){
		this.snake.push({row: 10, col: 10});
		this.snake.push({row: 11, col: 10});
	},
	render: function(){
		var elements = document.getElementsByTagName('td');
		var count = document.getElementById('Score');

		count.innerHTML = 'Счет - ' + this.score;

		for ( var i = 0; i < elements.length; i++ ) {
			elements[i].classList.remove('snake-unit');
			elements[i].classList.remove('food-unit');
			elements[i].classList.remove('bomb-unit');
		}
		for ( var i = 0; i < this.snake.length; i++ ) {
			var row = this.snake[i].row;
			var col = this.snake[i].col;

		    if (row < 0 || row > 19 || col < 0 || col > 19) {
				if (row < 0) {
				this.snake[i].row = 19;
				}
				if (col < 0) {
					this.snake[i].col = 19;
				}
				if (row > 19) {
				this.snake[i].row = 0;
				}
				if (col > 19) {
				this.snake[i].col = 0;
				}
			}
			td = document.getElementById ('cell-' + this.snake[i].row + '-' + this.snake[i].col)
			td.classList.add('snake-unit');
		}
		// for ( var i = 0; i < this.snake.length; i++ ) {
		// 	var cell = this.snake[i];
		// 	var id = 'cell-' + cell.row + '-' + cell.col;
		// 	document.getElementById(id).classList.add('snake-unit');
		// }

		if ( this.food.row && this.food.col ) {
			var id = 'cell-' + this.food.row + '-' + this.food.col;
			document.getElementById(id).classList.add('food-unit');
		}
		if ( this.bomb.row && this.bomb.col ) {
			var id = 'cell-' + this.bomb.row + '-' + this.bomb.col;
			document.getElementById(id).classList.add('bomb-unit');
		}
	},
	isSnakeCell: function(row, col){
		for ( var i = 0; i < this.snake.length; i++ ) {
			var cell = this.snake[i];
			if ( cell.row == row && cell.col == col ) {
				return true;
			}
		}
		return false;
	},
	createFood: function(){

		var pool = [];
		for ( var i = 0; i < this.size; i++ ) {
			for ( var j = 0; j < this.size; j++ ) {
				if ( !this.isSnakeCell(i, j) && !this.isBombCell(i, j)) {
					pool.push({row: i, col: j});
				}
			}
		} 

		var index = random(0, pool.length);
		this.food = pool[index];
	},
	createBomb: function(){
		var pool = [];

		for ( var i = 0; i < this.size; i++ ) {
			for ( var j = 0; j < this.size; j++ ) {
				if ( !this.isSnakeCell(i, j) && !this.isFoodCell(i, j) ) {
					pool.push({row: i, col: j});
				}
			}
		} 

		var index = random(0, pool.length);
		this.bomb = pool[index];
	},

	setEvents: function(){
		this.intervalId = setInterval(this.move.bind(this), 500);
		document.addEventListener('keydown', this.changeDirection.bind(this));
	},
	changeDirection: function(e){
		switch ( e.keyCode ) {
			case 37:
				//влево
				this.direction = {
					row: 0,
					col : -1
				};
				break;
			case 38:
			 	//вверх
				this.direction = {
					row: -1,
					col : 0
				};
			 	break;
			case 39:
			 	//вправо
				this.direction = {
					row: 0,
					col : 1
				};
			 	break;
			case 40:
				//вниз
				this.direction = {
					row: 1,
					col : 0
				};
				break;
			default:
				break;
		}
	},
	checkCell: function(row, col){
		//if ( row < 0 || row >= this.size || col < 0 || col >= this.size ) {
		//	return false;
		//}

		if ( this.isSnakeCell(row, col) ) {
			return false;
		}
		if ( this.isBombCell(this.snake[0].row, this.snake[0].col)){
			return false;
		}
		return true;
	},
	over: function(){
		alert('Игра завершена! Ваш счет - ' + this.score);
		clearInterval(this.intervalId);
	},
	isFoodCell: function(row, col){
		return this.food && this.food.row == row && this.food.col == col;
	},
	isBombCell: function(row, col){
		return this.bomb && this.bomb.row == row && this.bomb.col == col;
	},

	move: function(){
		var row = this.snake[0].row + this.direction.row;
		var col = this.snake[0].col + this.direction.col;

		if ( !this.checkCell(row, col) ) {
			return this.over();
		}

		this.snake.unshift({row: row, col: col});

		if ( !this.food || this.food.row != row || this.food.col != col ) {
			this.snake.pop();
		} else {
			this.createFood();
			this.createBomb();
		}
		this.score = this.snake.length - 2;
		this.render();
	},
	run: function(){
		this.createBoard();
		this.createSnake();
		this.createFood();
		this.createBomb();

		this.render();
		this.setEvents();
	},
	init: function() {
		var start = 0;

		var button_1 = document.createElement ('button');
		button_1.innerHTML = 'Start game';
		button_1.classList.add('button');
		document.body.appendChild(button_1);

		var button_2 = document.createElement ('button');
		button_2.innerHTML = 'Game over';
		button_2.classList.add('button');
		button_2.style.display = 'none';
		document.body.appendChild(button_2);

		button_1.onclick = function () {
		button_1.style.display = 'none';
		button_2.style.display = 'block';
		if (start == 0){
			game.run();
			start = 1;
			button_1.remove();
			}
		};
	button_2.onclick = function () {
		game.over();
		};
	}
};

window.addEventListener('load', function(){
	game.init();
});