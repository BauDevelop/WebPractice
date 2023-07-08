let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle="#FFFFFF";
ctx.fillRect(0, 0, 500, 500);
let freq1 = 2, freq2 = 3, phase, t = 0, range = 115;

Start();

function Start()
{
    timer = setInterval(Update, 1000 / 60);
}

function Update()
{
  t += 0.015;
  if (t > Math.PI * 2) t = 0;
  freq1 = Number(document.getElementById("freq1").value);
  freq2 = Number(document.getElementById("freq2").value);
  phase = Number(document.getElementById("phase").value);
  document.getElementById("label").innerText = t;

  DrawGrid();
  DrawFigure();
}

function DrawGrid() 
{
  ctx.fillStyle="#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);
  ctx.strokeStyle="#000";
  ctx.beginPath();
    ctx.moveTo(0, 250); 
    ctx.lineTo(500, 250);
  ctx.closePath();
    ctx.moveTo(250, 0);
    ctx.lineTo(250, 500);
  ctx.closePath();
  ctx.stroke();
}

function DrawFigure() 
{
  ctx.strokeStyle="#FF0000";
  ctx.beginPath();
    ctx.arc(calculateLissFigX(t, range, 125), calculateLissFigY(t, range, 125), 5, 0, Math.PI*2);
  ctx.stroke();
  let image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let color = {r: 0, g:   0, b:   0, a: 255};
  for (let i = 0; i <= Math.PI*2; i += 1 / 1000)
  {
    putPixel(calculateLissFigX(i, range, 125), calculateLissFigY(i, range, 125), color, image.data);
    putPixel(i * (250 / (Math.PI * 2)), calculateLissFigY(i+t, range, 375), color, image.data);
    putPixel(calculateLissFigX(i+t, range, 375), i * (250 / (Math.PI * 2)), color, image.data);
  }
  ctx.putImageData(image, 0, 0);
}

function putPixel(x, y, color, data) 
{
  var roundedX = Math.round(x);
  var roundedY = Math.round(y);
  let index = 4 * (canvas.width * roundedY + roundedX);
  data[index + 0] = color.r;
  data[index + 1] = color.g;
  data[index + 2] = color.b;
  data[index + 3] = color.a;
}

function calculateLissFigX(time, amplitude, offset) 
{
  return amplitude * Math.sin(freq1 * time + phase) + offset;
}

function calculateLissFigY(time, amplitude, offset) 
{
  return amplitude * Math.sin(freq2 * time) + offset;
}