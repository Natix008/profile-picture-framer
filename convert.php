<?php
function makeDP($sourcePath, $design = 0) {
    if (!in_array($design, [0, 1, 2])) {
        return false;
    }

    $designPath = __DIR__ . "/frames/frame-{$design}.png";
    if (!file_exists($designPath)) {
        return false;
    }

    $imageData = file_get_contents($sourcePath);
    if ($imageData === false) {
        return false;
    }

    $src = imagecreatefromstring($imageData);
    if ($src === false) {
        return false;
    }

    $size = getimagesize($sourcePath);
    $srcWidth = $size[0];
    $srcHeight = $size[1];
    $squareSize = min($srcWidth, $srcHeight);
    $srcX = ($srcWidth - $squareSize) / 2;
    $srcY = ($srcHeight - $squareSize) / 2;

    $cropped = imagecreatetruecolor(1080, 1080);
    imagecopyresampled($cropped, $src, 0, 0, $srcX, $srcY, 1080, 1080, $squareSize, $squareSize);
    imagedestroy($src);

    $fg = imagecreatefrompng($designPath);
    $resizedFG = imagecreatetruecolor(1080, 1080);
    imagealphablending($resizedFG, false);
    imagesavealpha($resizedFG, true);
    imagecopyresampled($resizedFG, $fg, 0, 0, 0, 0, 1080, 1080, imagesx($fg), imagesy($fg));
    imagedestroy($fg);

    $final = imagecreatetruecolor(1080, 1080);
    imagecopy($final, $cropped, 0, 0, 0, 0, 1080, 1080);
    imagedestroy($cropped);
    imagecopy($final, $resizedFG, 0, 0, 0, 0, 1080, 1080);
    imagedestroy($resizedFG);

    ob_start();
    imagepng($final);
    $result = ob_get_clean();
    imagedestroy($final);

    return $result;
}
