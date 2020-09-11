// идет разделение ответственности
class Field {
    constructor(selector, rowsNum, colsNum) {
        this._gameEnd = false;

        // игровое поле
        this._field = document.querySelector(selector);
        this._colsNum = colsNum;
        this._rowsNum = rowsNum;

        this._dots = new Dots;
        this._html = new HTML;
        
        this._queue = new Queue (['gamer1', 'gamer2']);

        this._html.createTable(this._field, this._rowsNum, this._colsNum);
        this._run();
    }

    // постановка новой точки, клики по полю
    _run() {
        this._field.addEventListener('click', () => {
            let cell = event.target.closest('td:not(.gamer)');

            if (!this._gameEnd && cell) {
                let col = this._html.getPrevSiblingsNum(cell);
                let row = this._html.getPrevSiblingsNum(cell.parentElement)

                let gamer = this._queue.getGamer();
                let dot = new Dot (gamer, cell, row, col, this._dots);
                this._dots.add(dot, row, col);                

                let winLine = this._checWin(dot);                
                if (winLine) {
                    this._win(winLine);
                }
            }
        });
    }

    _win(winLine) {
        this._gameEnd = true;
        this._notifyWinnerCells(winLine);
    }

    _notifyWinnerCells(winLine) {
        winLine.forEach((dot) => {
            dot.becomeWinner();
        });
    }

    _checWin(dot) {
        // массив направлений
        let dirs = [
            {deltaRow: 0, deltaCol: -1},
            {deltaRow: -1, deltaCol: -1},
            {deltaRow: -1, deltaCol: 0},
            {deltaRow: -1, deltaCol: 1},
        ];
        
        for (let i = 0; i < dirs.length; i++) {
            
            let line = this._checkLine(dot, dirs[i].deltaRow, dirs[i].deltaCol);
            //console.log(line)
            if (line.length >= 5) {
                return line;
            }
        };

        return false;
    }

    // проверяет 4 направления на наличие соседей
    _checkLine(dot, deltaRow, deltaCol) {
        let dir1 = this._checkDir(dot, deltaRow, deltaCol);
        let dir2 = this._checkDir(dot, -deltaRow, -deltaCol);
       //  console.log(dir1, dir2);
        return [].concat(dir1, [dot], dir2);
    }

    // проверяет направление на наличие соседей
    _checkDir(dot, deltaRow, deltaCol) {
        
        let result = [];
        let neighbor = dot;

        while (true) {
            neighbor = neighbor.getNeighbor(deltaRow, deltaCol);

            if (neighbor) {
                result.push(neighbor);
            } else {
                return result;
            }
        }
    }
}

// объект хранящий все точки
class Dots {
    constructor() {
        this._dots = {};
    }

    add(dot, row, col) {
        if (this._dots[row] === undefined) {
            this._dots[row] = {};
        }

        this._dots[row][col] = dot;
    }

        get(row, col) {
            if (this._dots[row] && this._dots[row][col]) {
                return this._dots[row][col];
            } else {
                return undefined;
            }
        }
    }

// описывает изгровую точку
class Dot {
    constructor (gamer, elem, row, col, dots) {
        this._gamer = gamer;
        this._elem = elem;
        this._row = row;
        this._col = col;
        this._dots = dots;

        this._neighbors = {};

        this._findNeighbors();
        this._notifyNeighbors();
        this._reflect();
    }

    // получение приватного метода
    getRow() {
        return this._row;
    }

    // получение приватного метода
    getCol() {
        return this._col;
    }

    // метод при победе отрисовывает красным точки
    becomeWinner() {
        this._elem.classList.add('winner');
    }

    // получение соседа
    getNeighbor(deltaRow, deltaCol) {
        if (this._neighbors[deltaRow] !== undefined) {
            return this._neighbors[deltaRow][deltaCol];
        } else {
            return undefined;
        }
    }

    // вычисляем смещение соседа, 
    // добавляется объект соседа во время постановки новой точки и вычисляем смещение
    addNeighbor(neighbor) {
        let deltaRow = neighbor.getRow() - this._row;
        let deltaCol = neighbor.getCol() - this._col;

        // нет ряда или колонки - создаем их
        if (this._neighbors[deltaRow] === undefined) {
            this._neighbors[deltaRow] = {};
        }
        // добавляем объект
        this._neighbors[deltaRow][deltaCol] = neighbor;
        
    }

    // находим соседа
    _findNeighbors() {
        this._cosiderNeighbor(1, 1);
        this._cosiderNeighbor(1, 0);
        this._cosiderNeighbor(1, -1);
        this._cosiderNeighbor(-1, 1);
        this._cosiderNeighbor(-1, 0);
        this._cosiderNeighbor(-1, -1);
        this._cosiderNeighbor(0, 1);
        this._cosiderNeighbor(0, -1);
    }

    // рассмфтривает соседнюю точку на наличие соседа
    _cosiderNeighbor (deltaRow, deltaCol) {

        let neighbor = this._dots.get(this._row + deltaRow, this._col + deltaCol);
        
        if (neighbor !== undefined && neighbor._belongsTo(this._gamer)) {
            this.addNeighbor(neighbor);
        }
    }

    // извещает соседей о новой точке
    _notifyNeighbors() {
        for (let rowKey in this._neighbors) {
            for (let colKey in this._neighbors[rowKey]) {
                this._neighbors[rowKey][colKey].addNeighbor(this);
            }
        }
    }

    // отражает изменения объекта с точкой на дом (в данном проекте объект первичен, дом вторичен)
    _reflect() {
        this._elem.classList.add('gamer');
        this._elem.classList.add(this._gamer);
    }

    // проверяет, какому геймеру пренадлежит точка
    _belongsTo(gamer) {
        return this._gamer == gamer;
    }
}

// поочереди дает игракам ходить, их переключает
class Queue {
    constructor(gamers) {
        this._gamers = gamers;

        this._counter = new Counter(this._gamers.length);
    }

    getGamer() {
        return this._gamers[this._counter.get()];
    }
}

// Этот класс по кругу выдает числа от 0 до переданного числа
class Counter {
    constructor(length) {
        
        this._counter = null;
        this._length = length;
    }

    get() {
        if (this._counter == null) {
            this._counter = 0;
        } else {
            this._counter++;

            if (this._counter == this._length) {
                this._counter = 0;
            }
        }

        return this._counter;
    }
    
}


class HTML {

    // создает таблицу
    createTable(parent, rowsNum, colsNum) {
        let table = document.createElement('table');
        
        for (let i = 0; i < rowsNum; i++) {
            let tr = document.createElement('tr');
            

            for (let j = 0; j < colsNum; j++) {
                let td = document.createElement('td');
                tr.appendChild(td);

                // возможность сразу записать ряды и колонки
                // но их можно будет поменять, мы их делаем неменяемыми
                //elem.dataset.row = i;
                //elem.dataset.col = j;
            }

            table.appendChild(tr);
        }
        
        parent.appendChild(table);
        
    } 

    // считает кол-во предыдущих соседей
    getPrevSiblingsNum(elem) {
        
    let prev = elem.previousSibling;
    let i = 0;

    while (prev) {
        prev = prev.previousSibling;
        i++;
    }
        return i;
    }
}

new Field ('#game', 50, 20);


















