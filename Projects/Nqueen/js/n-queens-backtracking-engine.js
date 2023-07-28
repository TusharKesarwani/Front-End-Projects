/**
 *  BackTracking engine to solve n-queens problem
 *  Developer : Amir Kabiri
 *  Github : https://github.com/amirkabiri
 *  Site : https://akdev.ir
 *  Usage : create object from this class and call object.run() generator to get step by step solution
 */

class NQueensBacktrackingEngine{

    constructor(n = 8){
        this.n = n;
    }

    get n(){
        return this._n;
    }

    set n(n){
        this._n = n;
    }

    /**
     * creating 2 dimensional array that contains zeros and ones.
     * zeros represent empty cells and ones represent queens
     */
    generateBoard(){
        const { n } = this;
        this.board = Array.from(Array(n)).map(() => Array(n).fill(0));
    }

    *run(){
        this.generateBoard();

        for(let res of this._solve()){
            yield res;
        }
    }

    *_solve(row = 0){
        const { n, board } = this;

        if(row >= n){
            return true;
        }

        for(let i = 0; i < n; i ++){
            if(this._isUnderAttack(i, row)) continue;

            board[row][i] = 1;
            yield this._deepClone(board);

            if(yield* this._solve(row + 1)){
                return true;
            }

            board[row][i] = 0;
        }

        return false;
    }

    _deepClone(i){
        return JSON.parse(JSON.stringify(i));
    }

    /**
     * checking (x, y) position is under attack by other replaced queens or not
     * @param {int} x - The column index of queen
     * @param {int} y - The row index of queen
     * @returns {boolean}
     * @private
     */
    _isUnderAttack(x, y){
        const { n, board } = this;

        // checking attacks from rows and columns
        for(let i = 0; i < n; i ++){
            if(board[y][i] || board[i][x]){
                return true;
            }
        }

        // checking diagonal attacks
        for(let j = 0; j < n; j ++){
            for(let i = 0; i < n; i ++){
                if(!board[j][i]) continue;

                // calculate gradient of line that passes through (x, y) and (i, j)
                const gradient = Math.abs((y - j) / (x - i));

                // if gradient is equals to one, (x, y) queen is under attack by (i, j) queen
                if(gradient === 1)
                    return true;

            }
        }

        return false;
    }
}