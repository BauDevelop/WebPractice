<!DOCTYPE html>
<html>
    <head>
        <title>Фигуры Лиссажу</title>
        <link rel="stylesheet" href="../style.css">
        <link rel="stylesheet" href="../mainmenustyle.css">
        <meta charset="utf-8">
    </head>
    <body>
        
        <?php $root = $_SERVER['DOCUMENT_ROOT']; include $root.'/webpractice/mainmenu.html'; ?>
        <div align="center">
            <canvas class="canvas" id="myCanvas" width="500" height="500"></canvas> 
            <hr>
            <label>Частота А</label>
            <input type="number" id="freq1" step="1" value="1.0" style="width:50px">

            <label>Частота B</label>
            <input type="number" id="freq2" step="1" value="2.0" style="width:50px">

            <label>Сдвиг фаз</label>
            <input type="number" id="phase" step="0.01" value="0.0" style="width:50px">

            <label id="label">Coord</label>
        </div>
        <script src="lissajous_figures.js"></script>
        </div>
    </body>
</html>