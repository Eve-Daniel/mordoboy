(function () {
    var H = null, MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.Handlable, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*<?=$this->includeTemplates('TPLS')?>*/
        var ST = null;
        /*<?=$this->includeStyles('ST')?>*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Commandable', 'Roleable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            var r = document.getElementById('boxapp');
            jQuery(r).addClass(MC + "Installd");
            return r;
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            return this;
        };

        F.prototype.getContentTemplate = function () {
            return '';//EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };
        F.prototype.getWrapperTemplate = function () {
            return EFO.TemplateManager().get('Main', MC);
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        //</editor-fold>            
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };

        F.prototype.setTitle = function (x) {
            this.getRole('title').html(x);
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="Комманды и мониторы">
        //<editor-fold defaultstate="collapsed" desc="Комманды">
        F.prototype.onCommandOpenmenu = function (x) {
            EFO.Com().com('menu').done(function (x) {
                x().toggle();
            });
            return this;
        };

        F.prototype.onCommandDoback = function (x) {
            window.Eve.appStack().onBackButton();
            return this;
        };
        //</editor-fold>

        //</editor-fold>


        F.prototype.install = function () {
            this.show();
            return this;
        };

        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };

        F.prototype.setBackMode = function (x) {
            x = U.anyBool(x, false);
            this.handle.removeClass(MC + "ModeMenu "+ MC + "ModeBack");
            this.handle.addClass(MC + (!x ? "ModeMenu" : "ModeBack"));
            return this;
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();