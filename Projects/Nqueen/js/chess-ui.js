/**
 *  A Chess UI generator which takes an object of Engine class and visualize that engines steps.
 *  Available Engines : NQueensBacktrackingEngine, NQueensGeneticEngine
 *  Developer : Amir Kabiri
 *  Github : https://github.com/amirkabiri
 *  Site : https://akdev.ir
 */

class ChessUI{
    constructor(engine, { parent, size, blackColor, whiteColor } = {}){
        if(!engine){
            throw new Error('engine is invalid');
        }

        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size || 500;
        (parent || document.body).appendChild(canvas);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.engine = engine;
        this.config = {
            blackColor : blackColor || '#D18B47',
            whiteColor : whiteColor || '#FFCE9E',
        };
        this.queenIcon = null;
        this._stop = false;
    }

    async loadQueenIcon(){
        try{
            this.queenIcon = await this.loadImage('queen.png');
        }catch(e){
            throw new Error('queen icon url is invalid');
        }
    }

    get cellSize(){
        return this.canvas.width / this.n;
    }
    set size(size){
        this.canvas.width = this.canvas.height = size;
    }
    get n(){
        return this.engine.n;
    }

    renderBoard(){
        const { n, ctx, cellSize, config } = this;

        for(let i = 0; i < n; i ++){
            for(let j = 0; j < n; j ++){
                ctx.fillStyle = config.whiteColor;
                if((j + i + 1) % 2 === 0){
                    ctx.fillStyle = config.blackColor;
                }
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
    renderQueen(x, y){
        const { ctx, cellSize, queenIcon } = this;
        ctx.drawImage(queenIcon, x * cellSize, y * cellSize, cellSize, cellSize);
    }
    renderQueens(board){
        for(let j in board){
            if(!board.hasOwnProperty(j)) continue;

            for(let i in board[j]){
                if(!board[j].hasOwnProperty(i)) continue;

                if(board[j][i]){
                    this.renderQueen(i, j);
                }
            }
        }
    }

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    loadImage(src){
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = e => reject(e);
        });
    }

    stop(){
        this._stop = true;
        return this;
    }

    async run(sleep = 0, onFrame){
        if(this.queenIcon === null){
            await this.loadQueenIcon();
        }

        for(let board of this.engine.run()){
            if(this._stop){
                this._stop = false;
                return false;
            }

            if(onFrame){
                onFrame(board);
            }

            this.renderBoard();

            this.renderQueens(board);

            if(sleep) await this.sleep(sleep);
        }

        return true;
    }
}