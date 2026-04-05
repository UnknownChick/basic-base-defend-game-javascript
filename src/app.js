import { Entity } from "./js/classes/Entity";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player extends Entity {
	update(ctx) {
		this.draw(ctx);
	}
}

class Projectile extends Entity {
	constructor(x, y, radius, color, velocity) {
		super(x, y, radius, color);
		this.velocity = velocity;
	}

	update(ctx) {
		this.draw(ctx);
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
}

class Enemy extends Entity {
	constructor(x, y, radius, color, velocity) {
		super(x, y, radius, color);
		this.velocity = velocity;
	}

	update(ctx) {
		this.draw(ctx);
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, 'blue');
const projectiles = [];
const enemies = [];

function spawnEnemies() {
	setInterval(() => {
		const radius = Math.random() * (30 - 4) + 4;
		console.log(radius);
		let x;
		let y;

		if (Math.random() < 0.5) {
			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
			y = Math.random() * canvas.height;
		} else {
			x = Math.random() * canvas.width;
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
		}
		console.log(x, y);
		
		const color = 'green';
		const angle = Math.atan2(
			canvas.height / 2 - y,
			canvas.width / 2 - x
		);
		const velocity = {
			x: Math.cos(angle),
			y: Math.sin(angle)
		};
		enemies.push(new Enemy(x, y, radius, color, velocity));
		console.log(enemies);
	}, 1000);
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.draw(ctx);

	projectiles.forEach((projectile) => {
		projectile.update(ctx);
	});

	enemies.forEach((enemy) => {
		enemy.update(ctx);
	});
}

window.addEventListener('click', (event) => {
	const angle = Math.atan2(
		event.clientY - canvas.height / 2,
		event.clientX - canvas.width / 2
	);
	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle)
	};
	projectiles.push(
		new Projectile(
			canvas.width / 2,
			canvas.height / 2,
			5,
			'red',
			velocity
		)
	);
});

animate();
spawnEnemies();
