(function () {
    var H = null, MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*<?=$this->includeTemplates('TPLS')?>*/
        var ST = null;
        /*<?=$this->includeStyles('ST')?>*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        //EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Fieldable'];
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
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.load();
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this._T(MC + "Preferences"));
            });
            return this;
        };

        F.prototype.onAfterHide = function () {
           // E.Config().removeStack(this);
           E.appStack().remove(this);
            return PARP.onAfterHide.apply(this, Array.prototype.slice.call(arguments));
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

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function () {
            this.clear();
            this.showLoader();
            this.getRequest()
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function () {
            return EFO.Request('get', E.Config().mkurl('/API/Client/User/GetMe'));
        };

        F.prototype.onMainResponce = function (d) {
            this.setMetadata(d.d.meta);
            this.setData(d.d.userInfo);
            this.getField('lang').val(E.Config().getLang());
            return this;
        };


        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            U.TError(this.err);
            this.hide();
            return this;
        };

        F.prototype.setMetadata = function (d) {
            this.getField('lang').html(Mustache.render(EFO.TemplateManager().get('option', MC), d));
            return this;
        };

        F.prototype.setData = function (d) {
            return this.setFields(d);
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };
       
        
        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            return this;
        };

        F.prototype.onTopStack = function () {
            this.show();
            return this;
        };

        F.prototype.onCommandSave = function () {
            try {
                var data = this.getData();
            } catch (e) {
                U.TError(e);
                return this;
            }
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/Client/User/TouchMe'), {data: data})
                    .done(this, this.onPostSuccess)
                    .fail(this, this.onPostFail)
                    .always(this, this.hideLoader);
            return this;
        };
        
        F.prototype.getData = function(){
            var a = this.getFields();
            var fil = EFO.Filter.Filter().applyFiltersToHash(a,this.getFilters());
            EFO.Filter.Filter().throwValuesErrors(fil);
            fil.password && fil.password.length<6?U.ERR(MC+"PasswordMinLenIs6"):false;
            return fil;
        };
        
        F.prototype.onPostSuccess = function(){
            //данные пользака подхватятся автоматом
            if(this.getField('lang').val()!==E.Config().getLang()){
                EFO.LDriver2().setCurrent(this.getField('lang').val());
            }
            this.hide();
        };
        
        F.prototype.onPostFail = function(x){
            U.TError(U.isError(x)?x.message:(U.NEString(x)?x:"NetworkError"));
            return this;
        };
        
        
        F.prototype.getFilters = function(){
            return EFO.TemplateManager().get('filters',MC);
        };



        F.prototype.onCommandReload = function () {
           // debugger;
            return this.load(0);
        };

       

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();