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

ctx.fillStyle = '#5CD3A0'; // Цвет квадрата по стандарту черн 
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

ctx.arc(canv.width / 2, canv.height / 2, 100, 0, Math.PI * 2, true); 

// canv.width / 2 Это нахождение на оси x 
// canv.height / 2 Это нахождение на оси y

// 100 Это размер

// 0 Это начало с права - https://youtu.be/XYgcNVwHUdg?t=591

// Math.PI Это конец углв данном примере половина круга - https://youtu.be/XYgcNVwHUdg?t=660
// Math.PI * 2 Это конец углв данном примере целый круг - https://youtu.be/XYgcNVwHUdg?t=668

// true Это против часовой стрелки
// false Это по часовой стрелке

ctx.fill(); // СТАРТ 