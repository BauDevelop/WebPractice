let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")
let freq1 = 2, freq2 = 3, phase, t = 0, range = 115, range2 = 65, rate = 1 / 100

var screenImg = new Image();
screenImg.src = "oscillograph.png"; 


Start()

function Start()
{
  setInterval(Update, 1000 / 60)
}

function Update()
{ 
  t += 0.005
  if (t > Math.PI * 2) t = 0
  freq1 = Number(document.getElementById("freq1").value)
  freq2 = Number(document.getElementById("freq2").value)
  phase = Number(document.getElementById("phase").value)

  const startTime = performance.now()
    Draw()
  const frameTime = (performance.now() - startTime).toFixed(2)
  document.getElementById("label").innerText = "Время одного кадра = " + String(frameTime) + " ms."
}

function Draw() 
{
  ctx.drawImage(screenImg, 0, 0)

  const DrawLine = (startX, startY, endX, endY, arg_context, color, width = 1) => {
    arg_context.lineWidth = width
    arg_context.strokeStyle = color
    arg_context.moveTo(startX, startY)
    arg_context.lineTo(endX, endY)
  };

  ctx.beginPath()
  DrawLine(calculateLissFigX(t, range, 425), 300, 
           calculateLissFigX(t, range, 425), calculateLissFigY(t, range, 425), ctx, "red")

  DrawLine(300, calculateLissFigY(t, range, 425), 
           calculateLissFigX(t, range, 425), calculateLissFigY(t, range, 425), ctx, "red")
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "#90FF90"
  ctx.lineWidth = 1
  ctx.moveTo(calculateLissFigX(0, range, 425), calculateLissFigY(0, range, 425));
  for (let i = 0; i <= Math.PI*2 + rate; i += rate)
  {
    ctx.lineTo(calculateLissFigX(i, range, 425), calculateLissFigY(i, range, 425))
  }

  ctx.moveTo(50, calculateLissFigY(t, range, 425))
  for (let i = 0; i <= Math.PI*2 + rate; i += rate)
  {
    ctx.lineTo(i * (250 / (Math.PI * 2)) + 50, calculateLissFigY(i+t, range, 425))
  }

  ctx.moveTo(calculateLissFigX(t, range, 425), 50)
  for (let i = 0; i <= Math.PI*2 + rate; i += rate)
  {
    ctx.lineTo(calculateLissFigX(i+t, range, 425), i * (250 / (Math.PI * 2)) + 50)
  }
  ctx.stroke()
}

function calculateLissFigX(time, amplitude, offset) 
{
  return amplitude * Math.sin(freq1 * time + phase) + offset
}

function calculateLissFigY(time, amplitude, offset) 
{
  return amplitude * Math.sin(freq2 * time) + offset
}