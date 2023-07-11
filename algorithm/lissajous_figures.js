let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let freq1 = 2, freq2 = 3, phase, t = 0, range = 115;

Start();

function Start()
{
    timer = setInterval(Update, 1000 / 60);
}

function Update()
{ 
  const startTime = performance.now();
  t += 0.005;
  if (t > Math.PI * 2) t = 0;
  freq1 = Number(document.getElementById("freq1").value);
  freq2 = Number(document.getElementById("freq2").value);
  phase = Number(document.getElementById("phase").value);
  
  DrawGrid();
  DrawFigure();
  const endTime = performance.now();
  let num = endTime - startTime;
  document.getElementById("label").innerText = "Время одного кадра = " + String(Math.trunc(num)) + " ms.";
}

function DrawGrid() 
{
  ctx.fillStyle="#FFFFFF";
  ctx.strokeStyle="#000";

  ctx.fillRect(0, 0, 500, 500);
  ctx.beginPath();
    ctx.moveTo(0, 250); 
    ctx.lineTo(500, 250);
  ctx.closePath();
    ctx.moveTo(250, 0);
    ctx.lineTo(250, 500);
  ctx.closePath();
  ctx.stroke();

  ctx.strokeStyle="#FF1F1F";
  ctx.beginPath();
    ctx.moveTo(calculateLissFigX(t, range, 375), 250); 
    ctx.lineTo(calculateLissFigX(t, range, 375), calculateLissFigY(t, range, 375));
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
    ctx.moveTo(250, calculateLissFigY(t, range, 375)); 
    ctx.lineTo(calculateLissFigX(t, range, 375), calculateLissFigY(t, range, 375));
  ctx.closePath();
  ctx.stroke();
}

function DrawFigure() 
{   
  let image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let color = {r: 0, g: 0, b: 0, a: 255};

  for (let i = 0; i <= Math.PI*2; i += 1 / 1000)
  {
    putPixel(calculateLissFigX(i, range, 375), calculateLissFigY(i, range, 375), color, image.data);
    putPixel(i * (250 / (Math.PI * 2)), calculateLissFigY(i+t, range, 375), color, image.data);
    putPixel(calculateLissFigX(i+t, range, 375), i * (250 / (Math.PI * 2)), color, image.data);
  }
  ctx.putImageData(image, 0, 0);
}

function putPixel(x, y, color, data) 
{
  let index = 4 * (canvas.width * Math.round(y) + Math.round(x));
  data[index] = color.r;
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