const CONTROLS = ['KeyZ', 'KeyM', 'KeyP', 'Enter'];

let BOARD, MAIN, FPS = 100;

class HighScore {
    static get(name) {
        let value = window.localStorage.getItem(`score:${name}`);
        if(value !== null)
            value = parseInt(value);
        return value;
    }

    static set(name, value) {
        let previous = HighScore.get(name);
        if(previous === null || previous < value) {
            window.localStorage.setItem(`score:${name}`, ''+value);
            return true;
        }
        return false;
    }
}


class ViewModal {
    static show(name, params, callback) {
        const modal = document.querySelector('#view-modal');
        const html = ViewModal.templates[name](params);
        modal.innerHTML = html;
        modal.onclick = callback || ViewModal.hide;

        // Prevent modal closing on link click
        for(let link of modal.querySelectorAll('a'))
            if(link.href.startsWith('http')) {
                link.onclick = (event) => event.stopPropagation();
                link.target = '_blank';
            }

        document.body.classList.add('modal');
    }

    static hide() {
        document.body.classList.remove('modal');

        const modal = document.querySelector('#view-modal');
        modal.innerHTML = '';
    }

    static registerTemplate(name, template_fn) {
        ViewModal.templates[name] = template_fn;
    }
}
ViewModal.templates = {};

ViewModal.registerTemplate('win', function(params) {
    let html = `
        <h2>Congratulations</h2>
        <h3>You win!</h3>
        <hr/>
    `;
    const score = (''+params.score).padStart(5, '0');
    if(params.highscore)
        html += '<h3>You have set new highscore!</h3>';
    else html += '<h3>Your score:</h3>';

    html += `<h1>${score}</h1>`;
        
    return html;
});

ViewModal.registerTemplate('loss', function() {
    return `
        <h2>Ha ha ha</h2>
        <h3>You lost!</h3>
    `;
});

ViewModal.registerTemplate('help', function() {
    return `
        <h1>Help</h1>
        <h2>-- Goal --</h2>
        <h3 style="opacity:0.8">Destroy all fruits on board by connecting 3 of the same kind.
        <h2>-- Controls --</h2>
        <h3 style="opacity:0.8">Mouse/Touch: Click on gun</h3>
        <h3 style="opacity:0.8">Keyboard: KeyZ (red) / KeyM (green) / KeyP (blue) / Enter (yellow)</h3>
        <h3 style="opacity:0.8">Hold to slow down</h3>
        <a href="https://github.com/pkubiak/frozen-fruits/blob/master/README.md" class="btn">Read more on GitHub</a>
    `
});

ViewModal.registerTemplate('credits', function() {
    return `
        <h1>Credits</h1>
        <h2>Programming</h2>
        <h3><a href="https://github.com/pkubiak/">Paweł Kubiak</a></h3>
        <h2>Testing</h2>
        <h3>...</h3>
        <h2>OpenGameArt.org Assets</h2>
        <h3><a href="https://opengameart.org/content/flat-designed-fruits">"flat designed fruits" by princesseFranky</a></h3>
        <h3><a href="https://opengameart.org/content/snow-flake">"Snow flake" by mkwong98</a></h3>
        <h3><a href="https://opengameart.org/content/simple-ornamented-arrow">"Simple ornamented arrow" by Nallebeorn</a></h3>
        <h3><a href="https://opengameart.org/content/pirate-skull">"Pirate Skull" by pechvogel</a></h3>
    `;
});


class Board {
    constructor() {       
        this.last_timestamp = null;
        this.startTime = (new Date()).getTime();
        this.score = 0;
        this.level_name = '';

        this.time = 0;
        this.setHUD();

        this.fruits = [];
        this.grid = [];
        this.guns = [];

        for(let y=0;y<Board.HEIGHT;y++) {
            this.grid.push(new Array(y % 2 ? Board.WIDTH - 1 : Board.WIDTH));
        }
    }

    update(timestamp) {
        if(this.allGunsDestroyed()) {
            ViewModal.show('loss', {}, () => switchView('levels'));
            return false;
        }
        if(this.isClear()) {
            ViewModal.show('win', {
                score: this.score,
                highscore: HighScore.set(this.level_name, this.score)
            }, () => switchView('levels'));
            return false;
        }

        if(!this.last_timestamp || timestamp - this.last_timestamp > 1000 / FPS) {
            this.last_timestamp = timestamp;
            for(let gun of this.guns) {
                if(!gun.fruit)
                    gun.putFruit();
                gun.update();
            }
            BOARD.setHUD();
        }

        return true;
    }

    input(event) {
        // ignore repeated key press
        if(event.repeat)
            return; 

        for(let gun of this.guns)
            if(event.code == gun.fireKey)
                gun.input(event);
    }

    setHUD() {       
        // Update score 
        document.querySelector('#hud_score').innerText = ('' + this.score).padStart(5, '0');

        // Update time
        this.time = ((new Date()).getTime() - this.startTime)/1000.0;
        let m = ('' + parseInt(this.time/60)), s = ('' + parseInt(this.time % 60));
        document.querySelector('#hud_time').innerText = m.padStart(2, '0') + ':' + s.padStart(2, '0'); 
    }

    loadLevel(level) {
        let board = (typeof(level.board) == 'function') ? level.board() : level.board;
        this.level_name = level.name;

        if(board.length > BOARD.HEIGHT)
            throw 'Board is too large!';

        for(let y=0;y<board.length;y++)
            for(let x=y%2;x<board[y].length;x+=2) {
                if((x>>1) >= (y % 2 ? 7 : 8)) {
                    throw "Too many fruits in row";
                }
                if(board[y][x] == ' ')
                    continue;
                let type;
                if(board[y][x] == 'x')
                    type = 'frozen';
                else type = FRUITS[parseInt(board[y][x])];
                this.addOnGrid(new Fruit(0, 0, type), x>>1, y);
            }

        for(let i=0;i<level.players.length;i++) {
            let player = level.players[i];
            let params = {fireKey: CONTROLS[i]};
            for(let key of ['speed', 'maxAngle', 'baseAngle', 'fruits'])
                if(key in player)
                    params[key] = player[key];

            let gun = new Gun(player.x, player.y, params);
            this.guns.push(gun);
        }

        // Update level
        document.querySelector('#hud_level').innerText = level.name + ' (' + level.diff + ')';;
    }

    checkCollisionDistance(fruit) {
        let best = Infinity;
        let dx = Math.sin(fruit.direction), dy = -Math.cos(fruit.direction);

        for(let obj of this.fruits) {
            let vx = obj.x - fruit.x, vy = obj.y - fruit.y, vv = Math.hypot(vx, vy);

            let dot = (dx*vx + dy*vy) / 1.0;
            let ux = dx * dot, uy = dy * dot;

            let min_dist = Math.hypot(fruit.x + ux - obj.x, fruit.y + uy - obj.y);
            if(min_dist > 40)
                continue;
            let ddist = Math.sqrt(40*40 - min_dist*min_dist);

            let t0 = dot - ddist, t1 = dot + ddist;
            if(t0 <= 0.0 && t1 >= 0.0) {
                return 0.0;
            }
            if(t0 > 0 && t0 < best)
                best = t0;
        }

        return best;
    }

    /* Find the closest grid point to the given fruit */
    snapToGrid(fruit) {
        let best = Infinity, best_pos = null;

        for(let y = 0;y < this.grid.length; y++) 
            for(let x = 0;x <this.grid[y].length;x++)
                if(this.grid[y][x] === undefined) {
                    let cx = 40*x+(y%2?40:20), cy = 20 + 34*y;
                    let dist = Math.hypot(fruit.x - cx, fruit.y - cy);

                    if(dist < best) {
                        best = dist;
                        best_pos = [x, y];
                    }
                }

        return (best > 25 ? null : best_pos);
    }

    dfs(x, y, visited={}, type=undefined, upward=true) {
        if(x < 0 || y < 0 || y >= this.grid.length || x >= (y % 2 ? 7 : 8))
            return false;
        if((x + '_' + y) in visited)
            return false;
        if(this.grid[y][x] === undefined)
            return false;
        if(type !== undefined && this.grid[y][x].type != type)
            return false;
        visited[x + '_' + y] = true;

        let dirs = (y % 2) ? [[1, 1], [0, 1]] : [[-1, 1], [0, 1]];

        if(upward) {
            for(let i=0;i<2;i++)
                dirs.push([dirs[i][0], -dirs[i][1]]);
            dirs.push([-1, 0]);
            dirs.push([1, 0]);
        }
        

        for(let dir of dirs) {
            let x2 = x + dir[0], y2 = y + dir[1];
            this.dfs(x2, y2, visited, type, upward);
        }
    }

    checkGroups(fruit) {
        let x,y;
        for(y=0;y<this.grid.length;y++) {
            x = this.grid[y].indexOf(fruit);
            if(x != -1)break;
        }

        let visited = {};
        this.dfs(x, y, visited, this.grid[y][x].type, true);
        let count = Object.keys(visited).length;

        if(count >= 3) {
            for(let key in visited) {
                let [x, y] = key.split('_');
                this.removeFromGrid(parseInt(x), parseInt(y));
            }
            this.score += count * count;
        }
    }

    checkOrphans() {
        let visited = {};

        // attach to top line
        for(let x=0;x<8;x++)
            this.dfs(x, 0, visited, undefined, true);
        
        // attach to frozen fruits
        for(let y=1;y<this.grid.length;y++)
            for(let x=0;x<this.grid[y].length;x++)
                if(this.grid[y][x] !== undefined && this.grid[y][x].type == 'frozen')
                    this.dfs(x, y, visited, undefined, false);

        for(let y=0;y<this.grid.length;y++)
            for(let x=0;x<this.grid[y].length;x++)
                if(this.grid[y][x] !== undefined && !((x + '_' + y) in visited) && this.grid[y][x].type != 'frozen') {
                    this.removeFromGrid(x, y);
                    this.score += 1;
                }
    }

    addOnGrid(fruit, x, y) {
        if(this.grid[y][x] !== undefined)
            throw 'Grid already occupied!';

        this.grid[y][x] = fruit;
        this.fruits.push(fruit);
        fruit.setPosition(40 * x + (y % 2 ? 40 : 20), 20 + 34 * y);

        return true;
    }

    add(fruit) {
        let pos = this.snapToGrid(fruit);
        if(pos === null)
            return false;

        return this.addOnGrid(fruit, ...pos);
    }

    removeFromGrid(x, y) {
        let fruit = this.grid[y][x];
        this.grid[y][x] = undefined;
        this.fruits.splice(this.fruits.indexOf(fruit), 1);
        fruit.destroy();
    }

    isClear() {
        return this.fruits.length == 0;
    }

    allGunsDestroyed() {
        for(let gun of this.guns)
            if(gun.state != 'KILLED')
                return false;
        return true;
    }

    destroy() {
        console.log('Destroy');
        MAIN.innerHTML = '';
        document.removeEventListener('keydown', BOARD.handler);
        document.removeEventListener('keyup', BOARD.handler);
        BOARD = null;
    }
}

Board.HEIGHT = 14;
Board.WIDTH = 8;

FRUITS = ['kiwi', 'strawberry', 'cocoa', 'watermelon', 'apple', 'orange', 'lemon', 'cherry'];

class Fruit {
    constructor(x, y, type) {
        this.type = type;
        this.el = document.createElement('div');
        this.el.className = 'fruit fruit-' + type;
        this.setPosition(x, y);
        MAIN.appendChild(this.el);
    }

    destroy(animate=true) {
        let el = this.el;

        if(animate) {
            el.classList.add('falling');
            
            setTimeout(function(){
                el.remove();
            }, 1000);
        } else {
            el.remove();
        }
    }

    setPosition(x, y) {
        this.x = x; this.y = y;
        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
    }

    setRotating(yesno) {
        this.el.classList[yesno ? 'add' : 'remove']('rotating');
    }

    fly(distance=1.0) {
        if(this.direction === null)
            return false;

        let dx = Math.sin(this.direction);
        let dy = -Math.cos(this.direction);
        let ts = [
            (this.direction < 0 ? (this.x - 20) / dx : (300 - this.x) / dx), // check bouncing from left/right wall
            (this.y - 20) / dy, // check collision with top wall
            BOARD.checkCollisionDistance(this), // check collision with other fruits
            Fruit.FLY_SPEED / FPS // free fly
        ];

        for(let i=0;i<4;i++)
            if(ts[i] < 0)
                ts[i] = Infinity;

        let min_t = Math.min(...ts);

        this.setPosition(this.x + dx * min_t, this.y + dy * min_t);

        if(ts[1] == min_t || ts[2] == min_t) {
            this.direction = null;
            return false;
        }

        if(ts[0] == min_t) {
            this.direction *= -1;
            return this.fly(distance - min_t);
        }

        return true;
    }
}
Fruit.FLY_SPEED = 500;
Fruit.RADIUS = 20;

class Gun {
    constructor(x, y, {speed=1.0, fireKey=undefined, maxAngle=60, baseAngle=0, fruits='01234567'}) {
        this.state = 'FREE';

        this.speed = 0.5 * 240 * speed / maxAngle;
        this.fireKey = fireKey;
        this.baseAngle = baseAngle;
        this.maxAngle = maxAngle;
        this.fruitsTypes = fruits;

        this.direction = Math.random() < 0.5 ? 'right': 'left';

        this.x = x;
        this.y = y;
        this.slowdown = false;

        this.el = document.createElement('div');
        this.el.className = 'gun';
        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';


        this.setAngle(0.0);
        
        MAIN.appendChild(this.el);

        // HACK: to correctly bind this inside handler
        this.callback = (event) => this.input(event); 

        this.putFruit();
    }

    input(event) {
        switch(event.type) {
                case 'keydown':
                case 'mousedown':
                case 'touchstart':
                    this.slowdown = true;
                    break;
                case 'mouseleave':
                    if(!this.slowdown)
                        break;
                case 'keyup':
                case 'mouseup':
                case 'touchend':
                    this.slowdown = false;
                    this.fire();
                    break;
            }
    }

    putFruit() {
        let next_fruit = FRUITS[+(this.fruitsTypes[Math.floor(Math.random()*this.fruitsTypes.length)])];
        this.fruit = new Fruit(0, 0, next_fruit);
        this.fruit.setPosition(this.x, this.y);
        this.fruit.el.classList.add('resting');
        this.fruit.el.classList.add('clickable');

        for(let event of Gun.EVENTS)
            this.fruit.el.addEventListener(event, this.callback);
    }

    getAngle() {
        return this.baseAngle + (this.maxAngle * this.angle);
    }

    setAngle(angle) {
        this.angle = angle;
        this.el.style.transform = 'translate(-50%, -100%) rotate(' + this.getAngle() + 'deg)';
    }

    destroy() {
        this.state = 'KILLED';
        this.fruit.destroy(false);
        this.el.style.transform = '';
        this.el.classList.add('killed');
    }
    update() {
        if(this.state == 'FREE') {
            let speed = (this.slowdown ? 0.2 : 1.0) * this.speed / FPS;
            let angle = this.angle + (this.direction == 'left' ? -1 : 1) * speed;

            if(angle >= 1.0) {
                this.direction = 'left';
                angle = 1.0;
            } else if(angle <= -1.0) {
                this.direction = 'right';
                angle = -1.0;
            }

            this.setAngle(angle);
        } else 
        if(this.state == 'FLY') {
            if(!this.fruit.fly()) {
                this.fruit.el.classList.remove('resting');

                if(!BOARD.add(this.fruit)) {
                    this.destroy();
                } else {
                    this.fruit.setRotating(false);
                    BOARD.checkGroups(this.fruit);
                    BOARD.checkOrphans();
                    this.fruit = null;
                    this.state = 'FREE';
                }
            }
        }
    }

    fire() {
        if(this.state == 'FREE' && this.fruit) {
            this.state = 'FLY';
            console.log('Fire!');

            for(let event of Gun.EVENTS)
                this.fruit.el.removeEventListener(event, this.callback);

            this.fruit.el.classList.remove('clickable');
            this.fruit.setRotating(true);
            this.fruit.direction = 2.0 * Math.PI * this.getAngle() / 360.0; // direction in radians
        }
    }
}
Gun.EVENTS = ['mousedown', 'mouseup', 'mouseleave', 'touchstart', 'touchend'];

function createLevelsList() {
    const view = document.getElementById('levels_list');
    view.innerHTML = ''; // clear levels list

    for(let diff of ['easy', 'medium', 'hard', 'original']) {
        const h2 = document.createElement('h2');
        h2.innerText = diff;
        view.appendChild(h2);
        
        let levels = LEVELS.filter(level => level.diff == diff);

        const table = document.createElement('table');
        table.className = 'table';

        for(let level of levels) {
            let tr = document.createElement('tr');
            let players = level.players.length;
            let bestScore = HighScore.get(level.name);

            if(bestScore !== null) {
                bestScore = (''+bestScore).padStart(5, '0');
                tr.classList.add('completed');
            } else
                bestScore = '';

            tr.innerHTML = `
                <td>
                    <a href="#" class="stretched players-${players}">${level.name}</a><br/>
                    <small>author: ${level.author}</small>
                </td>
                <td>${bestScore}</td>
            `;
            tr.querySelector('a').addEventListener('click', () => initGame(level));
            table.appendChild(tr);
        }

        view.appendChild(table);
    }
}

let currentView = null;
function switchView(name) {
    // TODO: refactor into State Pattern ;P

    // beforeSwitchFrom
    if(currentView == 'board') {
        BOARD.destroy();
    }

    // beforSwitchTo
    if(name == 'levels') {
        createLevelsList();
    }

    ViewModal.hide();

    if(currentView)
        document.querySelector('#view-' + currentView).classList.add('hidden');

    currentView = name;
    document.querySelector('#view-' + currentView).classList.remove('hidden');
}

function initFlyingFruits() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const fruits = document.createElement('img');
    fruits.src = 'src/gfx/fruits.png';

    fruits.onload = function() {
        // draw 500 random fruits in backgrund
        for(let i=0;i<500;i++) {
            let i = Math.floor(Math.random() * 9);

            ctx.drawImage(fruits, 128 * i, 0, 128, 128, 360 * Math.random() - 64, 620 * Math.random() - 64, 128, 128);
        }
    }
}

function init() {
    onresize();
    createLevelsList();
    initFlyingFruits();

    switchView('menu');

    document.body.classList.remove('spinner');
}

function initGame(level) {
    switchView('board');

    MAIN = document.getElementById('board');

    BOARD = new Board();
    BOARD.handler = (event) => BOARD.input(event)
    document.addEventListener('keydown', BOARD.handler);
    document.addEventListener('keyup', BOARD.handler);


    BOARD.loadLevel(level);

    let loop = function(timestamp) {
        if(BOARD && BOARD.update(timestamp))
            window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);
}

function onresize() {
    document.body.style.zoom = Math.min(
        window.innerHeight / 660,
        window.innerWidth / 400,
        1.0
    );
}

document.body.onresize = onresize;