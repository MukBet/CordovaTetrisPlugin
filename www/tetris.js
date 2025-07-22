var exec = require('cordova/exec');

exports.myJavaMethod = function (arg0, success, error) {
    exec(success, error, 'TetrisPlugin', 'myJavaMethod', [arg0]);
};

exports.start =  function () {
    TetrisPlugin.myJavaMethod( // вызываю Ява код
        "Argument from JS to Java",  // аргумент
        function(res) { alert(res);},   // success callback
        function(err) { alert("Ошибка: " + err); } // error callback
    );
    const body = document.body;

    body.innerHTML = `
        <div style="height: 85vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <canvas id="tetris" width="300" height="600" style="background: #000;"></canvas>
            <div style="margin-top: 1em; display: flex; gap: 1em; justify-content: center;">
                <button id="btn-left" style="font-size: 2em; padding: 1em;">⬅️</button>
                <button id="btn-down" style="font-size: 2em; padding: 1em;">⬇️</button>
                <button id="btn-right" style="font-size: 2em; padding: 1em;">➡️</button>
                <button id="btn-rotate" style="font-size: 2em; padding: 1em;">🔁</button>
            </div>
        </div>
    `;

    const canvas = document.getElementById('tetris');
    const context = canvas.getContext('2d');
    context.scale(30, 30);

    const matrix = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ];

    const arena = createMatrix(12, 20);

    const player = {
        pos: {x: 5, y: 0},
        matrix: matrix,
    };

    function createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    function drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = 'red';
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    function draw() {
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        drawMatrix(arena, {x: 0, y: 0});
        drawMatrix(player.matrix, player.pos);
    }

    function merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }

    function collide(arena, player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (arena[y + o.y] &&
                        arena[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    function playerDrop() {
        player.pos.y++;
        if (collide(arena, player)) {
            player.pos.y--;
            merge(arena, player);
            player.pos.y = 0;
        }
        dropCounter = 0;
    }

    function playerMove(dir) {
        player.pos.x += dir;
        if (collide(arena, player)) {
            player.pos.x -= dir;
        }
    }

    function rotate(matrix) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        matrix.forEach(row => row.reverse());
    }

    function playerRotate() {
        rotate(player.matrix);
        if (collide(arena, player)) {
            rotate(player.matrix);
            rotate(player.matrix);
            rotate(player.matrix);
        }
    }

    document.getElementById('btn-left').addEventListener('click', () => playerMove(-1));
    document.getElementById('btn-right').addEventListener('click', () => playerMove(1));
    document.getElementById('btn-down').addEventListener('click', playerDrop);
    document.getElementById('btn-rotate').addEventListener('click', playerRotate);

    let dropCounter = 0;
    let dropInterval = 1000;

    let lastTime = 0;
    function update(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;
        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }
        draw();
        requestAnimationFrame(update);
    }

    update();
};
