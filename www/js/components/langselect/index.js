(function () {
    var H = null, MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
//</editor-fold>
    function initPlugin() {        
        //<editor-fold defaultstate="collapsed" desc="Глобы и  статики">
        var EFO = window.Eve.EFO, U = EFO.U,PAR = EFO.windowController,PPT = PAR.prototype;
        var TPLS = null;
        /*<?=$this->includeTemplates('TPLS')?>*/
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        var ST = null;
        /*<?=$this->includeStyles('ST')?>*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }

        U.FixCon(F);

        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Fieldable', 'Callbackable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            PPT.onInit.apply(this, Array.prototype.slice.call(arguments));
            H = this;
            //this.LEM.On('NEED_POSITE', this, this.placeAtCenter);
            return this;
        };
        F.prototype.onAfterShow = function () {
            PPT.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //this.placeAtCenter();
            return this;
        };

        F.prototype.show = function (cs) {
            this.current_selection = cs;
            this.load();
            this.handle.removeClass(MC + "allowCancel");
            this._retres = false;
            return PPT.show.apply(this, Array.prototype.slice.call(arguments));
        };


        F.prototype.getContentTemplate = function () {
            return EFO.TemplateManager().get([MC, 'Main'].join('.'));
        };

        F.prototype.getControllerAlias = function () {
            return MC;
        };

        F.prototype.getCssClass = function () {
            return MC;
        };

        F.prototype.getFooterButtons = function () {
            return [
                {'command': "cancel", 'text': "Cancel", buttonClass: MC + "OnlyIfAllowCancel"},
                {'command': "Save", 'text': "Apply"}
            ];
        };

        F.prototype.getDefaultTitle = function () {
            return "Select language";
        };
        //</editor-fold>            
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function () {
            this.clear().showLoader();
            EFO.LDriver2().getList()
                    .done(this.onLoadResponce.bindToObject(this))
                    .fail(this.onLoadFail.bindToObject(this))
                    .always(this.hideLoader.bindToObject(this));
            return this;
        };

        F.prototype.onLoadResponce = function (d) {            
            return this.setData(d);
        };
        F.prototype.onLoadFail = function (d) {
            //alert(['aa',JSON.stringify(arguments)].join(''));
            alert("cannot load langlist");

            return this.threadError("Ошибка связи с сервером");
        };

        F.prototype.setData = function (d) {
            d.d.items=d.d.list;
            this.getField('language').html(Mustache.render(EFO.TemplateManager().get([MC, 'option'].join('.')), d.d));
            return this;
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.clearCallbacks();
            return this;
        };

        F.prototype.forceZindex = function (x) {
            this.handle.css({'z-index': U.IntMoreOr(x, 0, 50) + 1});
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="Комманды">

        F.prototype.onCommandSave = function () {
            if (!this._retres) {
                EFO.LDriver2().setCurrent(this.getField('language').val());
            } else {
                this.runCallback(this.getField('language').val());
                this.hide().clear();
            }
            return this;
        };

        F.prototype.onCommandCancel = function () {
            this.hide().clear();
            return this;
        };
        //</editor-fold>            
        F.prototype.setAllowCancel = function (x) {
            var b = U.anyBool(x, false);
            this.handle[b ? 'addClass' : 'removeClass'](MC + "allowCancel");
            return this;
        };

        F.prototype.setReturnResult = function (x) {
            this._retres = U.anyBool(x, false);
            return this;
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, "Error while loading dependency");
            });

})();