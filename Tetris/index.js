/**
   * Game mechanics   
*/ 
class Game {

    static points = {
        '1': 40,
        '2': 100,
        '3': 300,
        '4': 1200
    };

    score = 0;
    lines = 0;
    topOut = false;
    isGameOver = this.topOut;

    playfield = this.createPlayfield();
    activePiece = this.createPiece();
    nextPiece = this.createPiece();

     /**
        * method of obtaining game level
        * @docs multiplyMaker - get level
        * @param {*}   
    */
    get level() {
        return Math.floor(this.lines * 0.1);
    }

    /**
        *displaying the state of the playing field
        * @docs multiplyMaker - getting the playing field
        * @param {*}   
    */ 
    getState() {
        const playfield = this.createPlayfield();
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

         for (let y = 0; y < this.playfield.length; y++) {
            playfield[y] = [];

            for (let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x];
            }
        }

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playfield[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
        
        return playfield
        }

    /**
        * array playing field
        * @docs multiplyMaker - array creation
        * @param {*}   
    */ 

    createPlayfield() {
        const playfield =[];
    
        for (let y = 0; y < 20; y++) {
            playfield[y] = [];
    
            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
            }
        }
        return playfield
    }

    /**
        * movement of the figure to the left
        * @docs multiplyMaker - checking the possibility of displacement of the figure
        * @param {*}   
    */ 
    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }

    /**
        * movement of the figure to the right
        * @docs multiplyMaker - checking the possibility of displacement of the figure
        * @param {*}   
    */ 
    movePieceRight() {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;  
        }      
    }

    /**
        * move figure down
        * @docs multiplyMaker - checking the possibility of displacement of the figure
        * @param {*}   
    */ 
    movePieceDown() { 
        this.activePiece.y +=1;
        
        if (this.hasCollision()) {       
            this.activePiece.y -=1;
            this.lockPiece();
            const clearLines = this.clearLines();
            this.updateScore(clearLines);
            this.clearLines();
            this.updatePieces();
        }
    }

    /**
        * figure rotation
        * @docs multiplyMaker - change the values of the cells of the array with the figure
    */ 
    rotatePiece() {
        const blocks = this.activePiece.blocks;
        const length = blocks.length;

        const temp = [];
        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0);
        }

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                temp[x][y] = blocks[length - 1 - y][x];
            }
        }

        this.activePiece.blocks = temp;

        if (this.hasCollision()) {
            this.activePiece.blocks = blocks;  
        }   
    }

    /**
        * checking if a piece is in the playing field
        * @docs multiplyMaker - displacement of the shape when it reaches the field boundaries
    */ 
    hasCollision() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if ( blocks[y][x] &&
                        ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
                        this.playfield[pieceY + y][pieceX + x])
                    ) {
                        return true/*playfield[y] === undefined || playfield[y][x] === undefined;*/
                }
            }            
        }

        return false;
    }

    /**
        * method that transfers values from the array of the active figure to the playing field
        * @docs multiplyMaker - fixes the figure in the playing field
    */
    lockPiece() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;        

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
    }
    
    /**
     * cleaning lines
     * @docs multiplyMaker - remove the line when filling
     * @param {*}    
    */ 
    clearLines() {
        const rows = 20;
        const columns = 10;
        let lines = [];

        for (let y = rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0;

            for (let x = 0; x < columns; x++) {
                if (this.playfield[y][x]) {
                    numberOfBlocks += 1;
                }                
            }

            if (numberOfBlocks === 0) {
                break;
            } else if (numberOfBlocks < columns) {
                continue;
            } else if (numberOfBlocks === columns) {
                lines.unshift(y);
            }
        }
        

        for (let index of lines) {
            this.playfield.splice(index, 1);
            this.playfield.unshift(new Array(columns).fill(0));
        }
        return lines.length;
    }

    /**
     * creating a figure of various shapes
     * @docs multiplyMaker - we introduce arrays with the necessary shapes
     * @param {*}    
    */
    createPiece() {
        const index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index];
        const piece = { x: 0, y: 0};

        switch (type) {
            case 'I':
                piece.blocks = [
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0]
                ];
                break;

            case 'J':
                piece.blocks = [
                    [0,0,0],
                    [2,2,2],
                    [0,0,2]                    
                ];
                break;

            case 'L':
                piece.blocks = [
                    [0,0,0],
                    [3,3,3],
                    [3,0,0]                    
                ];
                break;

            case 'O':
                piece.blocks = [
                    [0,0,0,0],
                    [0,4,4,0],
                    [0,4,4,0],
                    [0,0,0,0]
                ];
                break;

            case 'S':
                piece.blocks = [
                    [0,0,0],
                    [0,5,5],
                    [5,5,0]                    
                ];
                break;

            case 'T':
                piece.blocks = [
                    [0,0,0],
                    [6,6,6],
                    [0,6,0]                    
                ];
                break;

            case 'Z':  
                piece.blocks = [
                    [0,0,0],
                    [7,7,0],
                    [0,7,7]                    
                ];
            break;
            default:
                throw new Error('Неизвестный тип фигуры');
        }        

        piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
        piece.y = -1;

        return piece;
    }

    /**
     * falling figure update
     * @docs multiplyMaker - update figure
     * @param {*}    
    */
    updatePieces() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    } 
    
     /**
     * account update
     * @docs multiplyMaker - update of the account depending on the deleted lines
     * @param {*} -  deleted lines
    */
    updateScore(clearLines) {
        console.log(this.level);
        if (clearLines > 0) {
            this.score += Game.points[clearLines] * (this.level + 1);
            this.lines += clearLines;  
            console.log(this.score, this.lines, this.level);              
        }
} 
}

let selector = document.getElementById('root');

 /**
     * class control of pieces on the field
     * @docs multiplyMaker
     * @param {*}
*/
class Sheet {
    constructor(selector, playfield) {

        this.game = new Game();

        this.playfield =  playfield 

        this._sheet = document.getElementById('root');       
                
        this._tetronimo = new Tetronimo;

        this._tetronimo.renderNextPiece(this.game.nextPiece);
        
        //let tetris = this._tetronimo.render(this._sheet, this.game.getState());
    
        const speed = 1000 - this.game.getState().level * 100;
        setInterval(() => {
            this.update();
        }, speed > 0 ? speed : 1000);
        
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }   
        
        /**
         * updates the data for setInterval
         * @docs multiplyMaker
         * @param {*}
        */
        update() {        
            this.game.movePieceDown();
            this._tetronimo.render(this._sheet, this.game.getState(), this.game.activePiece.color);
        }

        /**
         * buttons - events
         * @docs multiplyMaker - bind the figure control to buttons
         * @param {*}
        */
       handleKeyDown(event) {
        switch (event.keyCode) {
            
            case 37:                
                this.game.movePieceLeft();
                this._tetronimo.render(this._sheet, this.game.getState());
                break;            
            case 38:
                this.game.rotatePiece();
                this._tetronimo.render(this._sheet, this.game.getState());
                break;
            case 39:
                this.game.movePieceRight();
                this._tetronimo.render(this._sheet, this.game.getState());
                break;
            case 40:
                this.game.movePieceDown();
                this._tetronimo.render(this._sheet, this.game.getState());
                break;
        }
    }
}


/**
     * class drawing the game
     * @docs multiplyMaker
     * @param {*}
    */
class Tetronimo {
    
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6':  'purple',
        '7': 'red'
        }; 

    /**
     * draw the playing field
     * @docs multiplyMaker
     * @param {*} - parent element, playfield
    */
    render(parent, playfield) {
       
        let tetris = document.createElement('div');
        tetris.classList.add('tetris');
        parent.appendChild(tetris);
        this.clearCell();
        this.renderPlayfield(tetris, playfield);        
    }

     /**
     * game field update
     * @docs multiplyMaker
     * @param {*} - tetris element, playfield
    *//*
    renderUpdate(tetris, playfield) {
        this.clearCell();
        this.renderPlayfield(tetris, playfield);
    }
*/
    /**
     * draw the cell array
     * @docs multiplyMaker
     * @param {*} - muter element, playfield
    */
    renderPlayfield(muter, playfield) {        

        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = playfield[y][x];
                
                let cell = document.createElement('div');
                cell.setAttribute('posX', x);
                cell.setAttribute('posY', y);
                cell.classList.add('cell');
                muter.appendChild(cell);

                if(block) {
                    cell.classList.add('set');
                    cell.style.backgroundColor = Tetronimo.colors[block]; 
                }
            } 
        }        
    }

     /**
     * deleting cells
     * @docs multiplyMaker
     * @param {*}
    */
    clearCell() {
        let tetris = document.querySelector('.tetris');        

    for (let i = 0; i < tetris.children.length; i++ ) {    
        tetris.children[i].classList.remove('set');
        }
    }

    /**
     * next shape field
     * @docs multiplyMaker - next figure
     * @param {*} - next figure
    */
    renderNextPiece(nextPiece) {
        let nextP = document.getElementById('nextP'); 
        
        for (let y = 0; y < nextPiece.blocks.length; y++) {            
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];            
    
                let cell = document.createElement('div');
                    cell.setAttribute('posX', x);
                    cell.setAttribute('posY', y);
                    cell.classList.add('cell');
                    nextP.appendChild(cell);                    
            }               
        }
    }
}
    
let game = new Game();
console.log(game.playfield);
//new Tetronimo('root');
new Sheet('root', game.getState());
//let game = new Game();
    