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
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Fieldable', 'Monitorable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            //this.LEM.On('NEED_POSITE', this, this.placeAtCenter);            
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('boxapp');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.load();
            //this.placeAtCenter();
            return this;
        };

        F.prototype.onAfterHide = function () {


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
        F.prototype.load = function (x) {
            this.clear();
            var c = U.NEString(window.localStorage.getItem(MC + "login"));
            c ? this.setMode('login') : this.setMode('register');
            c ? this.getField('email').val(c) : false;
            return this;
        };


        F.prototype.setMode = function (x) {

            this.handle.removeClass(MC + "moderegister").removeClass(MC + "modelogin");
            this.handle.addClass(MC + "mode" + x);
            return this;
        };


        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };



        //<editor-fold defaultstate="collapsed" desc="Комманды и мониторы">
        //<editor-fold defaultstate="collapsed" desc="Комманды">
        F.prototype.onCommandSetMode = function (x) {
            this.setMode(x.data('mode'));
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="команды сохранения">
        F.prototype.onCommandApply = function () {
            this.save(false);
            return this;
        };
        F.prototype.onCommandSave = function () {
            this.save(false);
            return this;
        };


        F.prototype.onCommandDoRegister = function () {
            var data = EFO.Filter.Filter().applyFiltersToHash(this.getFields(), this.getFilterRegister());
            EFO.Filter.Filter().throwValuesError(data, "InvalidInput", MC + ":");
            data.agreement ? false : U.Error(MC + "AgreementIsRequired");
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/DAP/Auth/Register'), data)
                    .done(this, this.onRegisterSuccess)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());
            return this;
        };

        //<editor-fold defaultstate="collapsed" desc="Policy">

        F.prototype.onCommandAgreement = function () {
            this.getRole('awindow').show();
            this.showAgreementLoader();
            //return EFO.Request('get', E.Config().mkurl('/cache/Pages/about_'+E.Config().getLang()+'.json'));
            EFO.Request('Get', E.Config().mkurl('/cache/Pages/policy_' + E.Config().getLang() + '.json'))
                    .done(this, this.onAgreementLoaded)
                    .fail(this, this.onAgreementLoadFail)
                    .always(this, this.hideAgreementLoader);
            return this;
        };

        F.prototype.onCommandCloseAgreement = function () {
            this.getRole('awindow').hide();
            return this;
        };


        F.prototype.showAgreementLoader = function () {
            this.getRole('aloader').show();
            return this;
        };
        F.prototype.hideAgreementLoader = function () {
            this.getRole('aloader').hide();
        };

        F.prototype.onAgreementLoaded = function (d) {
            this.getRole('aheader').html(d.d.page.title);
            this.getRole('acontent').html(d.d.page.info);
            return this;
        };

        F.prototype.onAgreementLoadFail = function (x) {
            var rm = "ASomeError";
            if (U.isError(x)) {
                rm = "A" + x.message;
            } else if (U.NEString(x)) {
                rm = "A" + x;
            }
            this.rm = rm;
            this.getRole("acontent").html(Mustache.render(EFO.TemplateManager().get('aerror', MC), this));
            return this;
        };
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="forgot">
        F.prototype.onCommandForgotPassword = function () {
            var data = EFO.Filter.Filter().applyFiltersToHash(this.getFields(), this.getFilterForgot());
            EFO.Filter.Filter().throwValuesError(data, "EmailRequired", MC + "_:FORGOT_");
            this.showLoader();
            EFO.Request('get', E.Config().mkurl('/API/Info/Restore/Index'), {email: data.email})
                    .done(this, this.onPasswordResetOne)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());

            return this;
        };
        F.prototype.onPasswordResetOne = function () {
            new EveFlash({cssclass: "blue", TITLE: this._T(MC + "PRMessageTitle"), "TEXT": this._T(MC + "PRTEXTMessageDone"), ICON: "ok", IMAGE: "ok", TO: false});
        };

        //</editor-fold>

        F.prototype.getFilterForgot = function () {
            return EFO.TemplateManager().get('forgotFilter', MC);
        };


        F.prototype.getFilterRegister = function () {
            return EFO.TemplateManager().get('registerFilter', MC);
        };
        F.prototype.getFilterLogin = function () {
            return EFO.TemplateManager().get('loginFilter', MC);
        };


        F.prototype.onRegisterSuccess = function (d) {
            EFO.Events.GEM().Run('LOGIN_SUCCESS', d.d.userInfo);
            this.hide();
            window.localStorage.setItem(MC + 'login', this.getField('email').val());
            return this;
        };


        F.prototype.onCommandDoLogin = function () {
            var data = EFO.Filter.Filter().applyFiltersToHash(this.getFields(), this.getFilterLogin());
            EFO.Filter.Filter().throwValuesError(data, "InvalidInput", MC + ":");
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/DAP/Auth/Auth'), data)
                    .done(this, this.onRegisterSuccess)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());
            return this;
        };

        F.prototype.onSubmitError = function (x) {
            U.TError(U.isError(x) ? x.message : (U.NEString(x) ? x : "NetworkError"));
            return this;
        };

        //</editor-fold>
        //</editor-fold>

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Сохранятор">
        F.prototype.save = function (keepOpen) {
            this.keep_editor_open = false;
            try {
                var data = this.checkData();
            } catch (e) {
                this.threadErrorObject(e);
                return this;
            }
            this.showLoader();
            EFO.Request('post', '/API/DAP/Auth/Auth', data)
                    .done(this.onPostResponce.bindToObject(this))
                    .fail(this.onPostFail.bindToObject(this))
                    .always(this.hideLoader.bindToObject(this));
            return this;
        };
        F.prototype.onPostResponce = function (d) {
            if (U.isObject(d)) {
                EFO.Events.GEM().Run('LOGIN_SUCCESS', d.d);                
                return this.hide();

            }
            return this.threadError(this._T("NetworkError"));
        };

        F.prototype.onPostFail = function (x) {
            return U.isError(x) ? this.threadError(x.message) : (U.NEString(x) ? this.threadError(x) : this.threadError(this._T("NegotiationError")));
        };

        F.prototype.checkData = function () {
            var d = this.getFields();
            d.login = U.NEString(d.login, null);
            d.login ? false : U.ERR("LoginIsRequired");
            EFO.Checks.isEmail(d.login) ? false : U.ERR("LoginMustBeValidEmail");
            d.password = U.NEString(d.password);
            d.password ? false : U.ERR("PasswordIsRequired");
            d.password.length >= 6 ? false : U.ERR("PasswordTooShort");
            d.email = d.login;
            return d;
        };
        //</editor-fold>

        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };

        F.prototype.install = function () {
            E.appStack().push(this);
            return this;
        };

        F.prototype.stackOnBackButton = function () {
            navigator.app.exitApp();
            return true;
        };
        F.prototype.stackOnPopPushOver = function () {
            this.hide();
            if (E.appStack().s.length>1) {
                E.appStack().remove(this);
            }
        };
        
        F.prototype.removeStack = function(){
                E.appStack().remove(this);
        };
        F.prototype.onTopStack = function () {
            this.show();
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