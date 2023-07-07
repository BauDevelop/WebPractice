let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
ctx.fillStyle="#FFFFFF";
ctx.fillRect(0, 0, 500, 500);

let a = Math.PI * 2;
let b = 0;
let d = 0;

Start();

function Start()
{
    timer = setInterval(Update, 1000 / 60);
}

function Update()
{
  if (b === 1) d -= 0.01;
  if (b === 2) d += 0.01;

  ctx.fillStyle="#FFFFFF";
  ctx.fillRect(0, 0, 500, 500);

  DrawGrid();
  Draw();
}

function DownChangeVar(num)
{
  if (num === 1) b = 1;
  if (num === 2) b = 2;
}

function UpChangeVar(num)
{
  b = 0;
}

function DrawGrid() 
{
  ctx.strokeStyle="#BABABA";
  ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(500, 250);
  ctx.closePath();
    ctx.moveTo(250, 0);
    ctx.lineTo(250, 500);
  ctx.closePath();
  ctx.stroke();
}

function Draw() 
{
  ctx.lineWidth = 1;
  ctx.strokeStyle="#000000";
  ctx.beginPath();
  for (let i = 0; i <= a; i+= Math.PI * 2 / 1000)
  {
    
    let x1 = 150 * Math.sin(i + d);
    let y1 = 150 * Math.sin(i + Math.PI / 2);
    if (i === 0) 
      ctx.moveTo(x1 + 250, y1 + 250);
    else 
      ctx.lineTo(x1 + 250, y1 + 250);


  }
  ctx.stroke();
}