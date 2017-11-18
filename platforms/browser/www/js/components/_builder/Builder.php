<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace ComponentBuilder;



/**
 * некоторое отличие - этот билдер должен упаковать все компоненты разом в 1 файл
 */
require_once __DIR__ . DIRECTORY_SEPARATOR . "CSSmin.php";
require_once __DIR__ . DIRECTORY_SEPARATOR . "JSMinPlus.php";

/**
 * @property string $MC
 * @property string $MD
 * @property string $FQCN
 * @property boolean $compress
 * @property boolean $cache
 */
class Builder {

    public $FQCN;
    public $srcPath;

    /** @var string component source files folder */
    public $componentDir;
    public $compress = true;
    public $cache = false;

    protected function __construct($comDir, $fqcn) {
        $this->srcPath = $comDir;
        $this->componentName = $fqcn;
        $this->FQCN = $this->componentName;
        $this->componentDir = $this->srcPath;
        $this->compress = file_exists($this->componentDir . "noCompress") ? false : true;
    }

    protected function build($ifn = "index.js") {
        $index = $this->componentDir . $ifn;
        file_exists($index) ? FALSE : ERR::RF("NoIndexFile `%s`", $index);
        ob_start();
        include $index;
        $comText = ob_get_clean();
        if ($this->compress) {
            $comText = \JSMinPlus::minify($comText);
        }
        return $comText;
    }

    /**
     * подготовит ошибку для передачи в клиент (алерт с инфой об ошибке)
     * @param \Exception $e
     */
    protected static function buildError(\Exception $e) {
        $x = [
            'message' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
            'trace' => $e->getTraceAsString(),
        ];
        //static!
        return "(function(){ window.Eve.EFO.Com().reportFail('" . static::$FQCN . "','{$e->getMessage()}');console.log(" . json_encode($x) . ") })();";
    }

    /**
     */
    public static function F() {

        $output = [];
        $path = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR;
        $list = scandir($path);
        foreach ($list as $file) {
            if (is_dir($path . $file) && is_writeable($path . $file) && !preg_match('/^(?:\.|_)/', $file) && file_exists($path . $file . DIRECTORY_SEPARATOR . 'index.js')) {
                $x = new static($path . $file . DIRECTORY_SEPARATOR, $file);
                $output[] = ";/*===COMPONENT:{$file}========*/;";
                $output[] = $x->build();
            }
        }
        $path2 = __DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."Filters".DIRECTORY_SEPARATOR;
        $list = scandir($path2);
        foreach ($list as $file) {
            if (is_dir($path2 . $file) && is_writeable($path2 . $file) && !preg_match('/^(?:\.|_)/', $file) && file_exists($path2 . $file . DIRECTORY_SEPARATOR . 'filter.js')) {
                $x = new static($path2 . $file . DIRECTORY_SEPARATOR, $file);
                $output[] = ";/*===COMPONENT:{$file}========*/;";
                $output[] = $x->build("filter.js");
            }
        }
        file_put_contents($path . "pack.js", implode("\n", $output));
    }

    //<editor-fold defaultstate="collapsed" desc="TemplateMethod">
    public function getMD() {
        return md5($this->componentName);
    }

    public function getMC() {
        $ra = explode('.', $this->componentName);
        foreach ($ra as $key => $value) {
            $ra[$key] = ucfirst($value);
        }
        return implode('', $ra);
    }

    /**
     * Найдет все стили в папке компонента и передаст из в выходной скрипт в переменную с именем $varName
     * (JSON)
     * @param type $varName  
     */
    public function includeStyles($varName = 'STL') {
        $minifer = \CSSmin::F();
        $sPath = $this->componentDir;
        if (file_exists($this->componentDir . "css" . DIRECTORY_SEPARATOR) && is_dir($this->componentDir . "css" . DIRECTORY_SEPARATOR)) {
            $sPath = $this->componentDir . "css" . DIRECTORY_SEPARATOR;
        }
        $r = [];
        foreach (scandir($sPath) as $file) {
            $m = [];
            if (preg_match('/^(?P<n>[^\.]{1,})\.css$/', $file, $m)) {
                $r[$m['n']] = $minifer->run(file_get_contents($sPath . $file)); //minify!
            }
        }
        return "====>Styles=====*/\n{$varName}=" . json_encode($r, JSON_FORCE_OBJECT) . ";\n/*=====Styles<====";
    }

    public function includeTemplates($varName = "TPL", $subDir = false, $recursive = false) {
        $sPath = $this->componentDir . "TPL" . DIRECTORY_SEPARATOR;
        if ($subDir) {
            $sPath .= $subDir . DIRECTORY_SEPARATOR;
        }
        (file_exists($sPath) && is_dir($sPath)) ? FALSE : ERR::RF("Cant find templates dir for `%s`, dubfolder is `%s`", $this->componentName, $subDir);
        $ra = [];
        $this->_includeTemplates($sPath, $recursive, $ra);
        return "====>Templates=====*/\n{$varName}=" . json_encode($ra, JSON_FORCE_OBJECT) . ";\n/*=====Templates<====";
    }

    protected function _includeTemplates($path, $rec, array &$out, $prefix = false) {
        foreach (scandir($path) as $file) {
            if (mb_substr($file, 0, 1, 'UTF-8') !== '.') {
                if (is_dir($path . $file) && $rec) {
                    $this->_includeTemplates($path . $file . DIRECTORY_SEPARATOR, $rec, $out, $prefix ? "{$prefix}.{$file}" : $file);
                    continue;
                }
                if (is_file($path . $file)) {
                    $m = [];
                    if (preg_match('/^(?P<n>[^\.]{1,})\.(?:html|svg|xml)$/', $file, $m)) {
                        $okey = $prefix ? "{$prefix}." . $m['n'] : $m['n'];
                        $out[$okey] = file_get_contents($path . $file);
                    }
                }
            }
        }
    }

    public function __get($x) {
        $m = "__get__{$x}";
        return method_exists($this, $m) ? $this->$m() : null;
    }

    protected function __get__MD() {
        return $this->getMD();
    }

    protected function __get__MC() {
        return $this->getMC();
    }

    protected function __get__FQCN() {
        return $this->componentName;
    }

    protected function __get__compress() {
        return $this->compress;
    }

    protected function __get__cache() {
        return $this->cache;
    }

    protected function __set__compress($v) {
        $this->compress = $v ? true : false;
    }

    protected function __set__cache($v) {
        $this->cache = $v ? true : false;
    }

    //</editor-fold>
}

Builder::F();
