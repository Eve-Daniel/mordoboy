<?php

$DS = DIRECTORY_SEPARATOR;
$BASE = __DIR__ . $DS;

$rpath = $BASE . "components{$DS}_builder{$DS}Builder.php";
exec("php {$rpath}");
//compack compiled

$fto = [
    $BASE . "lib{$DS}mustache.js",
    $BASE . "lib{$DS}jquery.js",
    $BASE . "EveFlash.min.js",
    $BASE . "materialize.min.js",
    $BASE . "lib{$DS}efo.js",
    $BASE . "queueStack.js",
    $BASE . "config.js",
    $BASE . "stack.js",
    $BASE . "components{$DS}pack.js",
    $BASE . "app.js",
];

$o = [];
foreach ($fto as $file) {
    $o[] = "/**=====inc {$file} ==== */";
    $o[] = file_get_contents($file);
}

file_put_contents($BASE . "appscript.js", implode("\n", $o));

echo "done";
?>
