<?php
/**
 * Add frame to profile picture
 * @param  string $sourcePath Path to profile picture
 * @param  int    $design     Frame to use
 * @return binary             Binary data of framed profile picture
 */
function makeDP($sourcePath, $design = 0) {
  if (!in_array($design, array(0, 1, 2))) exit;

  $designPath = __DIR__ . "/frames/frame-$design.png";

  // Load user image
  $src = imagecreatefromstring(file_get_contents($sourcePath));
  list($srcWidth, $srcHeight) = getimagesize($sourcePath);

  // Crop user image to a square (center crop)
  $size = min($srcWidth, $srcHeight);
  $srcX = ($srcWidth - $size) / 2;
  $srcY = ($srcHeight - $size) / 2;
  $cropped = imagecreatetruecolor(1080, 1080);
  imagecopyresampled($cropped, $src, 0, 0, $srcX, $srcY, 1080, 1080, $size, $size);

  // Load and resize frame to 1080x1080
  $fg = imagecreatefrompng($designPath);
  $resizedFG = imagecreatetruecolor(1080, 1080);

  imagealphablending($resizedFG, false);
  imagesavealpha($resizedFG, true);

  imagecopyresampled($resizedFG, $fg, 0, 0, 0, 0, 1080, 1080, imagesx($fg), imagesy($fg));

  // Merge cropped photo with frame
  $final = imagecreatetruecolor(1080, 1080);
  imagecopy($final, $cropped, 0, 0, 0, 0, 1080, 1080);
  imagecopy($final, $resizedFG, 0, 0, 0, 0, 1080, 1080);

  // Output the final image as PNG
  ob_start();
  imagepng($final);
  $imageData = ob_get_clean();

  return $imageData;
}
