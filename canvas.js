// Inisial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Object Lingkaran

// c.beginPath()
// c.arc(300, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (var i = 0; i < 3; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath()
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    '#0540F2',
    '#3D6AF2',
    '#02732A',
    '#F2E205',
    '#F24130'
]

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Lingkaran(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interaktivitas
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }

        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}




var lingkaranArray = [];
function init(){
    lingkaranArray = [];
    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        lingkaranArray.push(new Lingkaran(x, y, dx, dy, radius));
    }
}

function animasi() {
    requestAnimationFrame(animasi);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < lingkaranArray.length; i++) {
        lingkaranArray[i].update();

    }

}

init();
animasi();