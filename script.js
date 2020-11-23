var 
  canv  = document.querySelector('#canvas'),
  ctx   = canv.getContext("2d"); // 2d graph

canv.width = window.innerWidth; // На всю ширину страницы  
canv.height = window.innerHeight; // На всю высоту

// code

var x    = 100;
var y    = 100;
var w    = 500;
var h    = 400;

// ctx.fillStyle = '#5CD3A0'; // Цвет квадрата по стандарту черн 
// ctx.fillRect(x, y, w, h); // x - отступ слева, y - отступ сверху, width, height

// ---------------------------------------------------------------------------------------------

// 1 вариант
// setInterval(function() {
//   ctx.fillRect(x++, y, w, h);
// }, 10); // Каждые 10мм плюс 1 к ширине НО НЕ ДВИГАЕСЯ 


// 2 вариант 
// setInterval(function() {
//   ctx.fillStyle = '#1B2324'; // цвет фона 
//   ctx.fillRect(0, 0, canv.width, canv.height);

//   ctx.fillStyle = '#5CD3A0';
//   ctx.fillRect(x++, y, w, h);
// }, 10); // Каждые 10мм плюс 1 к отступу 

// ---------------------------------------------------------------------------------------------

// Как не закрашивать квадрат а просто сделать border
// Для работы убрать fillStyle и fillRect

// ctx.strokeStyle = '#5CD3A0'; // Цвет бордера
// ctx.lineWidth = 10; // ДОЛЖНО БЫТЬ НАД .strokeRect ИЛИ НЕ БУЕТ РАБОТАТЬ 
// ctx.strokeRect(x, y, w, h); // x - отступ слева, y - отступ сверху, width, height

// ---------------------------------------------------------------------------------------------

// Как сделать круг?
// Для работы убрать fillRect

// ctx.arc(canv.width / 2, canv.height / 2, 100, 0, Math.PI * 2, true); 

// // canv.width / 2 Это нахождение на оси x 
// // canv.height / 2 Это нахождение на оси y

// // 100 Это размер

// // 0 Это начало с права - https://youtu.be/XYgcNVwHUdg?t=591

// // Math.PI Это конец углв данном примере половина круга - https://youtu.be/XYgcNVwHUdg?t=660
// // Math.PI * 2 Это конец углв данном примере целый круг - https://youtu.be/XYgcNVwHUdg?t=668

// // true Это против часовой стрелки
// // false Это по часовой стрелке

// ctx.fill(); // СТАРТ 

// ---------------------------------------------------------------------------------------------

// // Как сделать треугольник 
// // Для работы убрать все кроме fillStyle

// ctx.strokeStyle = '#5CD3A0';
// ctx.lineWidth = 5;

// ctx.scale(3, 2); // x, y Размер 2, 2 увеличивает в 2 раза
// ctx.rotate( 3 * Math.PI/180); // 4 градуса

// ctx.beginPath();

// ctx.moveTo(50, 50); // x y
// ctx.lineTo(25, 100); // x y
// ctx.lineTo(75, 100); // x y
// ctx.closePath(); // закрывает

// ctx.stroke(); // Run

// ---------------------------------------------------------------------------------------------

// Как написать Hello world? Изи!
// ДЛЯ РАБОТЫ ГРЕДИЕНТА УБРАТЬ FILLSTYLE
// ctx.textAlign = 'center'; // ДЛЯ РАЗМЕЩЕНИЕ ПО ЦЕНТРУ
// var 
//   grad = ctx.createLinearGradient(0, 0, 500, 0);

// grad.addColorStop('0', '#5CD3A0');
// grad.addColorStop('.50', '#0FC0FC'); // . - %
// grad.addColorStop('.30', '#F400A1');

// ctx.fillStyle = grad; // Цвет квадрата по стандарту черн 
// ctx.font = '50px Nunito, sans-serif';
// // ctx.fillText('Hello world!', canv.width / 2, canv.height / 2); // По средине
// ctx.fillText('Hello world!', 50, 80); // 50 - отступы по x и y

// Приложение 

var
  isMouseDown = false;
  coords = [];

canv.addEventListener('mousedown', function(){
  isMouseDown = true;
});

canv.addEventListener('mouseup', function(){
  isMouseDown = false;
  ctx.beginPath(); // Для того чтобы https://youtu.be/XYgcNVwHUdg?t=1495

  coords.push( 'mouseup');
});

ctx.lineWidth = 10*2;
ctx.strokeStyle = '#5CD3A0'; // Цвет линии 

canv.addEventListener('mousemove', function(e) {
  if( isMouseDown )
  {
    coords.push([e.clientX, e.clientY]);

    ctx.fillStyle = '#5CD3A0'; // Цвет квадрата по стандарту черн 
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0 , Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
});

// Сохранения 

function save() {
  localStorage.setItem('coords', JSON.stringify(coords));
}

function replay() {
  var 
    timer = setInterval(function(){
      if( !coords.length )
      {
        clearInterval(timer);
        ctx.beginPath();
        return;
      }

      var
        crd = coords.shift(),
        e = {
          clientX: crd["0"],
          clientY: crd["1"] 
        }
        
      ctx.fillStyle = '#5CD3A0'; // Цвет квадрата по стандарту черн 
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
  
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, 10, 0 , Math.PI * 2);
      ctx.fill();
  
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);

    }, 5);
}

function clear() {
  ctx.fillStyle = '#1B2324';
  ctx.fillRect(0,0, canv.width, canv.height);

  ctx.beginPath();
  ctx.fillStyle = '#5CD3A0';
}

document.addEventListener('keydown', function(e) { 
  // console.log(e.keyCode); 

  if( e.keyCode === 67 ){
    // save
    console.log('Saved');
    save();
  }

  if( e.keyCode === 86 ){
    // replay
    console.log('Repalaying ...');

    coords = JSON.parse(localStorage.getItem('coords'))

    clear();
    replay();
  }

  if( e.keyCode === 88 ){
    // clear
    clear();
    console.log('Cleared');
  }
});

