
class Game {

    score = 0;
    lines = 0;
    level = 0;

    score = 0;
    lines = 0;
    level = 0;

    playfield = this.createPlayfield();
    activePiece = this.createPiece();
    nextPiece = this.createPiece();

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

    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }

    movePieceRight() {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;  
        }      
    }

    movePieceDown() { 
        this.activePiece.y +=1;
        
        if (this.hasCollision()) {       
            this.activePiece.y -=1;
            this.lockPiece();
            this.updatePieces();
        }
    }

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

    updatePieces() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }       
}

let selector = document.getElementById('root');




class Sheet {
    constructor(selector, playfield) {

        this.playfield =  playfield 

        this._sheet = document.getElementById('root');       
                
        this._tetronimo = new Tetronimo;        

        this._tetronimo.render(this._sheet, this.playfield);
    }

    //getRandom() // выбор рандомной фигуры

    //score() // начисление очков
}

class Tetronimo {
    
    render(parent, playfield) {
       
        let tetris = document.createElement('div');
        tetris.classList.add('tetris');
        parent.appendChild(tetris);
        this.clearCell();
        this.renderPlayfield(tetris, playfield);        
    }

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
                }
            } 
        }        
    }

    clearCell() {
        let tetris = document.querySelector('.tetris');        

    for (let i = 0; i < tetris.children.length; i++ ) {    
        tetris.children[i].classList.remove('set');
        }
    }
}
    
let game = new Game();
console.log(game.playfield);
//new Tetronimo('root');
new Sheet('root', game.getState());
//let game = new Game();
    