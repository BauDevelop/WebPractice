<!DOCTYPE html>
<html onmouseup="UpChangeVar(1)">
    <head>
        <title>Фигуры Лиссажу</title>
        <link rel="stylesheet" href="../mainmenustyle.css">
        <meta charset="utf-8">
    </head>
    <body>
        <?php $root = $_SERVER['DOCUMENT_ROOT']; include $root.'/webpractice/mainmenu.html'; ?>
        <canvas id="myCanvas" width="500" height="500"></canvas> 
        <script src="lissajous_figures.js"></script>
        <button onmousedown="DownChangeVar(1)">-</button>
        <button onmousedown="DownChangeVar(2)">+</button>
    </body>
</html>