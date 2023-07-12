let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let freq1 = 2, freq2 = 3, phase, t = 0, range = 115, rate = 1 / 100;

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
  //DrawFigure();
  const endTime = performance.now();
  let num = endTime - startTime;
  document.getElementById("label").innerText = "Время одного кадра = " + String(Math.trunc(num)) + " ms.";
}

function DrawGrid() 
{
  ctx.fillStyle="#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);

  ctx.beginPath();
  const DrawLine = (startX, startY, endX, endY, context, color) => {
    context.strokeStyle = color;
      context.moveTo(startX, startY); 
      context.lineTo(endX, endY);
  };

  DrawLine(0, 250, 500, 250, ctx, "#303030");
  DrawLine(250, 0, 250, 500, ctx, "#303030");
  ctx.stroke();

  DrawLine(calculateLissFigX(t, range, 375), 250, 
           calculateLissFigX(t, range, 375), calculateLissFigY(t, range, 375), ctx, "#FF0000");

  DrawLine(250, calculateLissFigY(t, range, 375), 
           calculateLissFigX(t, range, 375), calculateLissFigY(t, range, 375), ctx, "#FF0000");
  ctx.stroke();
  ctx.strokeStyle = "#000";
  ctx.moveTo(calculateLissFigX(0, range, 375), calculateLissFigY(0, range, 375)); 
  for (let i = 0; i <= Math.PI*2 + rate; i += rate)
  {
    ctx.lineTo(calculateLissFigX(i, range, 375), calculateLissFigY(i, range, 375));
  }

  ctx.moveTo(0, calculateLissFigY(t, range, 375)); 
  for (let i = 0; i <= Math.PI*2 + rate; i += rate)
  {
    ctx.lineTo(i * (250 / (Math.PI * 2)), calculateLissFigY(i+t, range, 375));
  }

  ctx.moveTo(calculateLissFigX(t, range, 375), 0); 
  for (let i = 0; i <= Math.PI*2 + rate; i += rate)
  {
    ctx.lineTo(calculateLissFigX(i+t, range, 375), i * (250 / (Math.PI * 2)));
  }

  ctx.stroke();
}

function calculateLissFigX(time, amplitude, offset) 
{
  return amplitude * Math.sin(freq1 * time + phase) + offset;
}

function calculateLissFigY(time, amplitude, offset) 
{
  return amplitude * Math.sin(freq2 * time) + offset;
}