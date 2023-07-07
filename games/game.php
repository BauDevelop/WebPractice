<!DOCTYPE html>
<html>
    <head>
        <title>JS Game</title>
        <link rel="stylesheet" href="gamestyle.css">
        <link rel="stylesheet" href="../mainmenustyle.css">
        <meta charset="utf-8">
    </head>
    <body>
        <?php $root = $_SERVER['DOCUMENT_ROOT']; include $root.'/miragesite/mainmenu.html'; ?>
        <canvas onclick="OnClick()" onmousemove="OnMouse(event)" class="canvas" id="canvas">Ваш браузер не поддерживает JavaScript и HTML5!</canvas>
        <script src="game.js"></script>
    </body>
</html>
