<?php
if (!isset($_FILES['image'])) {
    exit;
}

require_once 'convert.php';

$maxSize = 10 * 1024 * 1024;
if ($_FILES['image']['size'] > $maxSize) {
    echo 'images/default-profile-pic.jpeg';
    exit;
}

$tmpPath = $_FILES['image']['tmp_name'];
$imageData = file_get_contents($tmpPath);

if ($imageData === false) {
    echo 'images/default-profile-pic.jpeg';
    exit;
}

$testImage = imagecreatefromstring($imageData);
if ($testImage === false) {
    echo 'images/default-profile-pic.jpeg';
    exit;
}
imagedestroy($testImage);

$design = isset($_POST['design']) ? (int) $_POST['design'] : 0;

$result = makeDP($tmpPath, $design);
if ($result === false) {
    echo 'images/default-profile-pic.jpeg';
    exit;
}

$filename = bin2hex(random_bytes(16)) . '.png';
$loc = 'uploads/' . $filename;

file_put_contents($loc, $result);
echo $loc;
