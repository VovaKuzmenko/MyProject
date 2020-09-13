let root = document.getElementById('root');

class Game {

    score = 0;
    lines = 0;
    level = 0;

    playfield = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

        activePiece = {
            x: 0,
            y: 0,
            blocks: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ]
        };

    
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
             
}

let selector = document.getElementById('root');




class Sheet {
    constructor(selector) {     
        
        this._sheet = document.getElementById('root');
        console.log(this._sheet)
                
        this._tetronimo = new Tetronimo;
        
        this._tetronimo.appearance(this._sheet);

        
    }

    //getRandom() // выбор рандомной фигуры

    //score() // начисление очков
}

class Tetronimo {
    
    appearance(parent) {
        let tetris = document.createElement('div');
        tetris.classList.add('tetris');
        
        // заполняем наш див таблицей из 180 клеток - создаем поле
        for (let i = 1; i < 181; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            tetris.appendChild(cell);
        }
        
        parent.appendChild(tetris);
        
        // достаем все элементы из нашего игрового поля и присваиваем значения Х У
        let cell = document.getElementsByClassName('cell');
        let i = 0;
        
        for (let y = 18; y > 0; y--) {
            for (let x = 1; x < 11; x++) {
                cell[i].setAttribute('posX', x);
                cell[i].setAttribute('posY', y);
                i++;
            }
        }

    }
}
    
    //new Tetronimo('root');
    new Sheet('root', 30, 20);
    //let game = new Game();
    
    