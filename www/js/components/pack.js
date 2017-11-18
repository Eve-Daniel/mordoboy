;/*===COMPONENT:DAP.login========*/;
(function () {
    var H = null, MC = 'DAPLogin', MD = '8f324f1dce746772b75751bf8bf22630', FQCN = 'DAP.login';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"aerror":"<div class=\"{{getCssClass}}AError\">{{#_TT}}{{getCssClass}}{{rm}}{{\/_TT}}<\/div>","forgotFilter":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<filterList>\n    <property in=\"email\" filters=\"Trim,NEString,EmailMatch\" \/>        \n<\/filterList>\n","icons":"<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" style=\"display: none;\">\n    <symbol id=\"DAPLoginLock\" viewBox=\"0 0 512 512\">        \n        <path d=\"M469.333,85.333H249.75l-39.542-39.542c-2-2-4.708-3.125-7.542-3.125h-160C19.135,42.667,0,61.802,0,85.333v341.333 c0,23.531,19.135,42.667,42.667,42.667h426.667c23.531,0,42.667-19.135,42.667-42.667V128 C512,104.469,492.865,85.333,469.333,85.333z M490.667,426.667c0,11.76-9.573,21.333-21.333,21.333H42.667 c-11.76,0-21.333-9.573-21.333-21.333V85.333C21.333,73.573,30.906,64,42.667,64H198.25l39.542,39.542 c2,2,4.708,3.125,7.542,3.125h224c11.76,0,21.333,9.573,21.333,21.333V426.667z\"\/>\n        <path d=\"M405.333,234.667c0-35.292-28.708-64-64-64c-35.292,0-64,28.708-64,64c0,19.167,8.542,37.104,23.146,49.219 l-12.375,87.958c-0.427,3.063,0.49,6.156,2.51,8.49c2.031,2.333,4.969,3.667,8.052,3.667H384c3.083,0,6.021-1.333,8.052-3.667 c2.021-2.333,2.938-5.427,2.51-8.49l-12.375-87.958C396.792,271.771,405.333,253.833,405.333,234.667z M364.854,270.229 c-3.427,2.271-5.24,6.302-4.667,10.375l11.542,82.063h-60.792l11.542-82.063c0.573-4.073-1.24-8.104-4.667-10.375 c-11.99-7.958-19.146-21.25-19.146-35.563c0-23.531,19.135-42.667,42.667-42.667C364.865,192,384,211.135,384,234.667 C384,248.979,376.844,262.271,364.854,270.229z\"\/>\n    <\/symbol>\n<\/svg>","loginFilter":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<filterList>\n    <property in=\"email\" filters=\"Trim,NEString,EmailMatch\" \/>    \n    <property in=\"password\" filters=\"Trim,NEString,PasswordMatch\" \/>    \n<\/filterList>\n","main":"<div class=\"EFOFullScreen {{getCssClass}}__moderegister {{getCssClass}}login_signin\" id=\"{{getCssClass}}login_signin\">\n    <div class=\"container\">        \n        <p class=\"{{getCssClass}}reg_text {{getCssClass}}RegisterOnlyVis\">{{#_TT}}{{getCssClass}}reg_text{{\/_TT}}<\/p>\n        <form  data-role=\"form\" class=\"{{getCssClass}}RegisterForm\">\n            <div class=\"input_fielda {{getCssClass}}RegisterOnly\">\n                <label for=\"a{{MD}}name\">{{#_TT}}{{getCssClass}}FieldNameLabel{{\/_TT}}<\/label>\n                <input type=\"text\" data-field=\"name\" id=\"a{{MD}}name\" placeholder=\"{{#_TT}}{{getCssClass}}FieldNamePlaceholder{{\/_TT}}\">\n            <\/div>\n            <div class=\"input_fielda\">\n                <label for=\"a{{MD}}email\">{{#_TT}}{{getCssClass}}FieldEmailLabel{{\/_TT}}<\/label>\n                <input type=\"email\" data-field=\"email\" id=\"a{{MD}}email\" placeholder=\"{{#_TT}}{{getCssClass}}FieldEmailPlaceholder{{\/_TT}}\">\n            <\/div>\n            <div class=\"input_fielda\">\n                <label for=\"a{{MD}}pass\">{{#_TT}}{{getCssClass}}FieldPasswordLabel{{\/_TT}}<\/label>\n                <input type=\"password\" data-field=\"password\" id=\"a{{MD}}pass\" placeholder=\"{{#_TT}}{{getCssClass}}FieldPasswordPlaceholder{{\/_TT}}\">\n            <\/div>\n            <div class=\"input_fieldb {{getCssClass}}RegisterOnly\">\n                <input type=\"checkbox\" data-field=\"agreement\" id=\"a{{MD}}agreement\" class=\"filled-in\" data-fielddefault=\"1\">\n                <label for=\"a{{MD}}agreement\">{{#_TT}}{{getCssClass}}AgreementBeforeLink{{\/_TT}} <a data-command=\"agreement\" href=\"#\">{{#_TT}}{{getCssClass}}AgreementLinkText{{\/_TT}}<\/a> {{#_TT}}{{getCssClass}}AgreementAfterLink{{\/_TT}}<\/label>\n            <\/div>\n            <div class=\"input_fieldb {{getCssClass}}RegisterOnly\">\n                <input type=\"checkbox\" data-field=\"subscribe\" id=\"a{{MD}}subscribe\" class=\"filled-in\"  data-fielddefault=\"1\">\n                <label for=\"a{{MD}}subscribe\">{{#_TT}}{{getCssClass}}SubscribeLabel{{\/_TT}}<\/label>\n            <\/div>\n            <div class=\"input_fieldc {{getCssClass}}RegisterOnly\">\n                <a href=\"#\" data-command=\"doRegister\" class=\"{{getCssClass}}btn\">{{#_TT}}{{getCssClass}}RegisterButton{{\/_TT}}<\/a>\n            <\/div>\n            <div class=\"input_fieldc {{getCssClass}}LoginOnly\">\n                <a href=\"#\" data-command=\"doLogin\" class=\"{{getCssClass}}btn\">{{#_TT}}{{getCssClass}}LoginButton{{\/_TT}}<\/a>\n            <\/div>\n        <\/form>\n        <div class=\"{{getCssClass}}IHaveLoginLink\">\n            <a href=\"#\" class=\"{{getCssClass}}RegisterOnly\" data-command=\"setMode\" data-mode=\"login\">{{#_TT}}{{getCssClass}}IHaveLogin{{\/_TT}}<\/a>\n            <a href=\"#\" class=\"{{getCssClass}}LoginOnly\" data-command=\"setMode\" data-mode=\"register\">{{#_TT}}{{getCssClass}}INotHaveLogin{{\/_TT}}<\/a>\n            <a href=\"#\" class=\"{{getCssClass}}LoginOnly {{getCssClass}}ForgotLink\" data-command=\"forgotPassword\">{{#_TT}}{{getCssClass}}AForgotPassword{{\/_TT}}<\/a>\n        <\/div>\n    <\/div>\n    <div class=\"container {{getCssClass}}AgreementContainer\" style=\"display:none;\" data-role=\"awindow\">\n        <div class=\"{{getCssClass}}AgreementHeader\" data-role=\"aheader\">{{#_TT}}{{getCssClass}}AgreementTitle{{\/_TT}}<\/div>\n        <div class=\"{{getCssClass}}AgreementContent\" data-role=\"acontent\"><\/div>\n        <div class=\"EFOWindowLoader {{getCssClass}}AgreeLoader\" data-role=\"aloader\"><\/div>\n        <div class=\"{{getCssClass}}AgreementFooter\">\n            <div class=\"{{getCssClass}}AgreementButton\" data-command=\"closeAgreement\">{{#_TT}}{{getCssClass}}AgreementButton{{\/_TT}}<\/div>\n        <\/div>\n    <\/div>\n<\/div>\n","registerFilter":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<filterList>\n    <property in=\"email\" filters=\"Trim,NEString,EmailMatch\" \/>\n    <property in=\"name\" filters=\"Strip,Trim,NEString\" \/>\n    <property in=\"password\" filters=\"Trim,NEString,PasswordMatch\" \/>\n    <property in=\"agreement\" filters=\"Boolean,RequiredTrue\" \/>\n    <property in=\"subscribe\" filters=\"Boolean,DefaultTrue\" \/>\n<\/filterList>\n"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".DAPLoginlogin_signin{background-color:#760000;position:absolute;width:100%;color:#fff}.DAPLoginlogin_signin input:not([type]):focus:not([readonly]),.DAPLoginlogin_signin input[type=text]:focus:not([readonly]),.DAPLoginlogin_signin input[type=password]:focus:not([readonly]),.DAPLoginlogin_signin input[type=email]:focus:not([readonly]),.DAPLoginlogin_signin input[type=url]:focus:not([readonly]),.DAPLoginlogin_signin input[type=time]:focus:not([readonly]),.DAPLoginlogin_signin input[type=date]:focus:not([readonly]),.DAPLoginlogin_signin input[type=datetime]:focus:not([readonly]),.DAPLoginlogin_signin input[type=datetime-local]:focus:not([readonly]),.DAPLoginlogin_signin input[type=tel]:focus:not([readonly]),.DAPLoginlogin_signin input[type=number]:focus:not([readonly]),.DAPLoginlogin_signin input[type=search]:focus:not([readonly]),.DAPLoginlogin_signin textarea.materialize-textarea:focus:not([readonly]){border-bottom:1px solid #fff;box-shadow:0 1px 0 0 #fff}p.DAPLoginreg_text{text-align:center;margin:0;padding-top:30px;padding-bottom:20px;font-size:13px}.DAPLoginlogin_signin .input_fielda label{color:#fff}.DAPLoginlogin_signin .input_fieldb [type=\"checkbox\"]:checked+label:before{border-right:2px solid #760000;border-bottom:2px solid #760000}.DAPLoginlogin_signin .input_fieldb [type=\"checkbox\"].filled-in:checked+label:after{border:2px solid #fff;background-color:#fff}.DAPLoginlogin_signin .input_fieldc{margin-top:20px}a.DAPLoginbtn{text-align:center;width:auto;background-color:#fff;color:#760000;display:inline-block;padding:0 2em;line-height:2.5em}.DAPLoginlogin_signin .input_fieldb [type=\"checkbox\"]+label{line-height:20px;height:auto;color:#eee}.DAPLoginlogin_signin .input_fieldb{margin-bottom:10px}.EFOFlatControllerWraper.FlatControllerDAPLoginWrapper{position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;overflow:hidden}.EFOWindowContent.DAPLoginWindowContent{box-sizing:border-box;height:100%;overflow:hidden}.DAPLoginlogin_signin{box-sizing:border-box;height:100%;overflow:auto}.DAPLoginmoderegister .DAPLoginLoginOnly{display:none}.input_fieldb.DAPLoginRegisterOnly a{color:white;font-weight:bold}.DAPLoginlogin_signin .input_fieldc{text-align:center}ul.DAPLoginTabMode{position:absolute;left:0;width:2em;top:0;margin:0;padding:0;height:100%;max-height:100%}ul.DAPLoginTabMode li{width:2em;height:50%;display:block;overflow:hidden}.DAPLoginmodelogin .DAPLoginRegisterOnly{display:none}div#DAPLoginlogin_signin .container{height:100%;box-sizing:border-box}.DAPLoginIHaveLoginLink{text-align:center;padding-top:2em}.DAPLoginIHaveLoginLink a{color:white}.DAPLoginmodelogin .DAPLoginRegisterOnlyVis{visibility:hidden}.container.DAPLoginAgreementContainer{position:fixed;background:white;box-sizing:border-box;width:100%;height:100%;top:0;left:0;z-index:2;padding-top:3em;padding-bottom:4em}.DAPLoginAgreementHeader{position:absolute;top:0;left:0;width:100%;height:3em;line-height:3em;box-sizing:border-box;padding:0 .5em;width:100%;background:#760000;color:white}.DAPLoginAgreementFooter{position:absolute;left:0;bottom:0;height:4em;max-height:4em;line-height:3em;padding:.5em 1em;box-sizing:border-box;text-align:center;border-top:1px solid #760000;width:100%}.DAPLoginAgreementButton{display:inline-block;box-sizing:border-box;height:3em;line-height:3em;width:100%;height:100%;background:#760000;color:white;text-align:center}.DAPLoginAgreementContent{box-sizing:border-box;padding:.5em;width:100%;height:100%;overflow:auto;max-height:100%}.DAPLoginAgreementContent{color:black}.DAPLoginAError{color:crimson;text-align:center}a.DAPLoginLoginOnly.DAPLoginForgotLink{display:block;margin-top:2em}"};
/*=====Styles<====*/;
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
;/*===COMPONENT:FilteredView========*/;
(function () {
    var H = null, MC = 'FilteredView', MD = '5f0655875e2e5b3330684f4d2ef66ea8', FQCN = 'FilteredView';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","excersize":"<div class=\"col s12 m6 l4\" data-command=\"showExcersize\" data-id=\"{{id}}\" data-retid=\"{{get_chapter_id}}\">\n    <div class=\"card\">\n        <div class=\"big_image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/EXC\/N{{id}}\/600_600.png{{\/mkurl}}\" \/>\n        <\/div>\n        <div class=\"title_card\">\n            <span class=\"{{getCssClass}}ExcersizeNameInnera\">{{#_TT}}{{getCssClass}}ExcersizeText{{\/_TT}} {{excnum}}. {{name}}<\/span>\n        <\/div>\n        <div class=\"price_card\">\n            {{#_TT}}{{getCssClass}}GoToText{{\/_TT}}\n        <\/div>\n    <\/div>\n<\/div>   ","icons":"","list":"","main":"<div class=\"{{getCssClass}}Wrapepr\" >\n    <div class=\"{{getCssClass}}InnerWrapper {{getCssClass}}Tabs3\" data-role=\"content\">\n        <div class=\"{{getCssClass}}TabWrapper\">\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN1 {{getCssClass}}opened\" data-role=\"toptab\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}TrainingTabHeader{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\">\n                    <div class=\"{{getCssClass}}FilteredViewWrapper\">\n                        <div class=\"{{getCssClass}}FilteredViewVideoZone\" data-role=\"video\"><\/div>\n                        <div class=\"{{getCssClass}}FilteredViewFilterZone\" data-role=\"filter\"><\/div>\n                    <\/div>\n                <\/div>\n            <\/div>\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN2\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}DescriptionTabHeader{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\">\n                    <div class=\"{{getCssClass}}FilteredViewText\" data-role=\"info\"><\/div>\n                <\/div>\n            <\/div>\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN3\" data-role=\"exitab\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}ExVideoTabHeader{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\">\n                    <div class=\"{{getCssClass}}FilteredViewExVideo\" data-role=\"exvideo\" data-comment=\"\u0412\u0441\u0435 \u0438 \u043f\u043e\u0445\u0443\u0439\"><\/div>\n                <\/div>\n            <\/div>\n        <\/div>\n    <\/div>\n<\/div>","subchapter":"{{#published}}\n<div class=\"col s4 m3 l2\" data-id=\"{{key}}\" data-nid=\"{{id}}\" data-retid=\"{{get_return_id}}\" data-filter=\"{{groupmode}}\" data-command=\"openChapterSelf\">\n    <div class=\"card {{getCssClass}}SubChapterRow\">\n        <div class=\"image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">\n        <\/div>\n        <div class=\"title_card\">\n            {{name}}\n        <\/div>        \n    <\/div>\n<\/div>\n{{\/published}}"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".FilteredViewWrapepr{box-sizing:border-box;overflow:hidden;height:100%;max-height:100%}.FilteredViewInnerWrapper{height:100%;max-height:100%;box-sizing:border-box}.FilteredViewTabWrapper{overflow:auto;box-sizing:border-box;height:100%}.FilteredViewTabHeader{line-height:3.5em;border:1px solid silver;box-sizing:border-box;border-top:1px solid transparent;padding:0 .5em;border-left:0 solid transparent;border-right:0 solid transparent;position:relative;cursor:pointer}.FilteredViewTabHeader:after{display:block;content:' ';position:absolute;width:1em;height:1em;border:1px solid #8c8b8b;top:1.25em;right:1.25em;transform:rotate(-45deg);margin-top:-.3em;border-top:0;border-right:0;transition:all .3s}.FilteredViewopened .FilteredViewTabHeader:after{transform:rotate(45deg);border-bottom:0;border-top:1px solid #8c8b8b;margin-top:.25em}.FilteredViewTabBody{overflow:hidden;display:none}.FilteredViewopened .FilteredViewTabBody{display:block}.FilteredViewInnerWrapper{padding-top:3.5em}.FilteredViewTabHeader{position:absolute;top:0;text-align:center;overflow:hidden;border-bottom:1px solid silver !important;border-top:0 !important;border-left:1px solid silver;box-sizing:border-box;max-height:3.5em;overflow:hidden}.FilteredViewTab.FilteredViewTabN1 .FilteredViewTabHeader{left:0;border-left:0}.FilteredViewTabHeader:after{display:none}.FilteredViewInnerWrapper.FilteredViewTabs3 .FilteredViewTabHeader{width:33.3333%}.FilteredViewInnerWrapper.FilteredViewTabs2 .FilteredViewTabHeader{width:50%}.FilteredViewInnerWrapper.FilteredViewTabs1 .FilteredViewTabHeader{width:100%}.FilteredViewInnerWrapper.FilteredViewTabs3 .FilteredViewTab.FilteredViewTabN2 .FilteredViewTabHeader{left:33.333%}.FilteredViewInnerWrapper.FilteredViewTabs3 .FilteredViewTab.FilteredViewTabN3 .FilteredViewTabHeader{left:66.6666%}.FilteredViewInnerWrapper.FilteredViewTabs2 .FilteredViewTab.FilteredViewTabN2 .FilteredViewTabHeader{left:50%}.FilteredViewInnerWrapper.FilteredViewTabs2 .FilteredViewTab.FilteredViewTabN3 .FilteredViewTabHeader{display:none}.FilteredViewTab.FilteredViewopened .FilteredViewTabHeader{font-weight:bold;color:#760000}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        F.prototype.videoSwitch = null;
        //
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.videoSwitch = EFO.videoSwitch();
            this.videoSwitch.setContainer(this.getRole('video')).clear();
            this.videoSlider = EFO.videoSlider();
            this.videoSlider.setContainer(this.getRole('exvideo')).clear();
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                var d = x();
                this.data ? d.setTitle(this.data.chapter.name) : false;
                d.setBackMode(true);
            });
            return this;
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
            this.showLoader();
            this.aload = x;
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/BookChapterGroup/' + x + '_' + E.Config().getLang() + '.json'));
        };


        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d.responce;
            this.lastid = this.data.chapter.id;
            this.stamp = d.m._ts;
            //this.videoSwitch.setData(this.data.excersizes[0].imagemap,this.stamp);
            var exa = U.safeArray(this.data.excersizes);
            var exi = [];
            for (var i = 0; i < exa.length; i++) {
                var oexi = U.safeArray(exa[i].images);
                for (var j = 0; j < oexi.length; j++) {
                    oexi[j].excid = exa[i].info.id;
                    exi.push(oexi[j]);
                }
            }
            this.getRole('content').removeClass(MC + "Tabs1 " + MC + "Tabs1 " + MC + "Tabs2 " + MC + "Tabs3");
            if (exi.length) {
                this.getRole('exitab').show();
                this.videoSlider.setData(exi, this.stamp);
                this.getRole('content').addClass(MC + "Tabs3");
            } else {
                this.getRole('exitab').hide();
                this.videoSlider.setData([]);
                this.getRole('content').addClass(MC + "Tabs2");
            }

            this.filter ? this.filter.clear() : false;
            this.filter = null;

            var ff = window.Eve.ConFil[this.data.chapter.groupmode];

            if (U.isCallable(ff)) {
                this.filter = ff().setCallback(this, this.onFilterChanged).install(this.getRole('filter'), this.data.excersizes);
            } else {
                this.error = "contentFilterNotFound";
                this.getRole('filter').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            }
            this.getRole('info').html(this.data.chapter.info);

            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this.data.chapter.name);
            });
            this.onCommandSetTab(this.getRole('toptab'));
            //this.initFilter();
            //this.setGroupData();
            return this;
        };

        F.prototype.onFilterChanged = function (fv) {
            //debugger;
            var fv = U.IntMoreOr(fv, 0, 0);
            var cd = null;
            for (var i = 0; i < this.data.excersizes.length; i++) {
                if (this.data.excersizes[i].info.filter_value == fv) {
                    cd = this.data.excersizes[i];
                    break;
                }
            }
            if (cd) {
                this.videoSwitch.setData(cd.imagemap, this.stamp);
            }
        };

        F.prototype.get_chapter_id = function () {
            return H.data.chapter.id;
        };

        F.prototype.excnum = function () {
            return (++H.counter);
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };


        F.prototype.onLoadError = function (x, y, z) {
            if ((U.isError(x) && x.message === 'NoAccess') || x === 'NoAccess') {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(this.aload).show().setCallback(this, this.onCommandReload);
                        })
                        .fail(this, this.onRequiredComponentFail);
                return;
            }
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('list', MC)
                        //  ,'excersize': EFO.TemplateManager().get('excersize', MC)
                        //,'subchapter': EFO.TemplateManager().get('subchapter', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            this.videoSlider.clear();
            this.videoSwitch.clear();
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
        F.prototype.stackOnBackButton = function () {
            this.clear();
            return false;
        };

        F.prototype.onTopStack = function () {
            this.show();
            this.videoSlider ? this.videoSlider.onChanged() : false;
            this.videoSwitch ? this.videoSwitch.onChanged() : false;
            return this;
        };



        F.prototype.onCommandReload = function () {
            return this.load(this.aload);
        };

        F.prototype.onCommandShowExcersize = function (t) {
            var id = t.data('id');
            var retid = t.data('retid');
            EFO.Com().com('excersizeView')
                    .done(function (x) {
                        x().load(id).show().setReturnId(retid);
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandSetTab = function (t) {
            this.getRole('content').find('.' + MC + "opened").removeClass(MC + 'opened');
            t.closest('.' + MC + "Tab").addClass(MC + 'opened');
            this.videoSlider.onChanged();
            this.videoSwitch.onChanged();
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
;/*===COMPONENT:about========*/;
(function () {
    var H = null, MC = 'About', MD = '46b3931b9959c927df4fc65fdee94b07', FQCN = 'about';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"content":"<div id=\"{{getCssClass}}NewsWrapper\" class=\"{{getCssClass}}Block\">\n    <h4>{{data.page.title}}<\/h4>\n    {{{data.page.info}}}\n<\/div>","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","icons":"\n","main":"<div class=\"{{getCssClass}}Outer\">\n    <div class=\"{{getCssClass}}Wrapper\" data-role=\"content\"><\/div>    \n<\/div>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".AboutOuter{box-sizing:border-box;padding:1em;padding-right:0;height:100%;max-height:100%;overflow:hidden}.AboutWrapper{height:100%;max-height:100%;box-sizing:border-box;padding-right:1em;overflow:auto}div#AboutNewsWrapper>h4{font-size:1.7em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
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
                x().setBackMode(true).setTitle(this._T(MC + "AboutTitle"));
            });
            return this;
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
            this.showLoader();
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/cache/Pages/about_' + E.Config().getLang() + '.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d;
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            return this;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('content', MC)
            };
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



        F.prototype.onCommandReload = function () {
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
;/*===COMPONENT:book========*/;
(function () {
    var H = null, MC = 'Book', MD = '821f03288846297c2cf43c34766a38f7', FQCN = 'book';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"cchapter":"{{#childs}}\n{{#published}}\n{{registerSection}}\n<div class=\"col s4 m3 l2\" data-id=\"{{key}}\" data-nid=\"{{id}}\" data-filter=\"{{groupmode}}\" data-command=\"openChapter\">\n    <div class=\"card\">\n        <div class=\"image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">\n        <\/div>\n        <div class=\"title_card\">\n            {{name}}\n        <\/div>\n        <div class=\"price_card\">\n            {{{absolutePrice}}}\n        <\/div>\n    <\/div>\n<\/div>\n{{\/published}}\n{{\/childs}}\n","cmain":"{{#data.tree.items}}\n{{#published}}\n<div class=\"{{getCssClass}}Section container\">\n    <h2>{{name}}<\/h2>\n    <div class=\"{{getCssClass}}SectionContentV2 row\">\n        {{registerSection}}\n        {{>lessons}}\n    <\/div>\n<\/div>\n{{\/published}}\n{{\/data.tree.items}}\n{{updateFullPrice}}\n","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","icons":"<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" style=\"display: none;\">\n    <symbol id=\"BookLabelBoughtItem\" viewBox=\"0 0 448.8 448.8\">        \n        <polygon points=\"142.8,323.85 35.7,216.75 0,252.45 142.8,395.25 448.8,89.25 413.1,53.55 \"\/>\n    <\/symbol>\n<\/svg>\n","main":"<div class=\"{{getCssClass}}Outer\">\n    <div class=\"{{getCssClass}}Wrapper\" data-role=\"content\"><\/div>\n    <div class=\"{{getCssClass}}ByAllButtonW\">\n        <div class=\"{{getCssClass}}ByAllAccess\" data-command=\"byAll\">{{#_TT}}{{getCssClass}}ByAllAccess{{\/_TT}} <span data-role=\"fullPrice\"><\/span><\/div>\n    <\/div>\n<\/div>","oklable":"<span class=\"BookBoughtLabel\">\n    <svg>\n    <use xlink:href=\"#BookLabelBoughtItem\"\/>\n    <\/svg>\n<\/span>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".BookOuter{box-sizing:border-box;overflow:hidden;padding:.5em;padding-right:0;height:100%;max-height:100%}.BookWrapper{box-sizing:border-box;height:100%;max-height:100%;overflow:auto;padding-right:.5em}.BookSection{padding:.5em 0;box-sizing:border-box}.SectionHeader{font-weight:bold;font-size:1.2em;margin-bottom:1em}.BookChapter{float:left;box-sizing:border-box;width:32%}.BookSectionContent{overflow:hidden;padding-bottom:1em}.BookChapter{margin-left:.6%;margin-right:.6%}.BookChapterPict{width:100%;box-sizing:border-box}.BookChapterPict img{max-width:100%;max-height:100%}.BookChapterPict{padding:.2em}.BookChapter{padding:.2em;border:1px solid silver;border-radius:3%;box-shadow:3px 3px 10px silver}.BookChapterName{padding:.2em}.BookchapterPrice{padding:.2em;font-weight:bold;margin:.3em 0}span.BookBoughtLabel{width:1.1em;height:1.1em;overflow:hidden;display:inline-block}span.BookBoughtLabel svg{width:100%;height:100%;fill:green}.BookchapterPrice{text-align:right;padding-right:.7em}.BookChapter{cursor:pointer}.BookchapterPrice{color:#760000}@media all and (max-width:450px){.BookChapter{width:45%;margin-left:2.5%;margin-right:2.5%}}.BookallowByAll .BookOuter{padding-bottom:5em}.BookByAllButtonW{position:absolute;bottom:0;left:0;text-align:center;height:5em;box-sizing:border-box;line-height:4em;width:100%;padding:.5em}.BookByAllAccess{cursor:pointer;font-size:1.4em;background:#760000;color:white;cursor:pointer}.BookByAllButtonW{display:none}.BookallowByAll .BookByAllButtonW{display:block}.BookChapter{max-width:300px}.BookChapterPict img{width:100%}.price_card{display:none}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            var self = this;
            this.registerSection = function () {
                return self._registerSection(this);
            };
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.load();
            this.handle[U.anyBool(E.Config().userInfo.ra, false) ? 'removeClass' : 'addClass'](MC + 'allowByAll');
            //E.Config().pushComponent(this);
             EFO.Com().com('toolbar').done(this, function (x) {                 
                x().setBackMode(false).setTitle(this._T(MC+"Encilopedy"));
            });            
            return this;
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
            return EFO.Request('get', E.Config().mkurl('/cache/Book/Tree_'+E.Config().getLang()+'.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d;
            this.sections = {};
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            return this;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.absolutePrice = function () {
            return H.getAbsolutePrice(this);
        };

        F.prototype.getAbsolutePrice = function (section) {
            if (U.anyBool(E.Config().userInfo.ra, false)) {
                return this.getBoughtMark();
            }
            var ptr = [];
            ptr.push(section.id);
            var n = section.parent;
            while (n) {
                var key = "N" + n;
                if (key in this.sections) {
                    ptr.push(n);
                    n = this.sections[key].parent;
                } else {
                    n = null;
                }
            }
            var price = null;
            for (var i = 0; i < ptr.length; i++) {
                if (this.hasAccess(ptr[i])) {
                    return this.getBoughtMark();
                }
                if (price === null && U.IntMoreOr(this.sections['N' + ptr[i]].cost, 0, 0)) {
                    price = this.sections['N' + ptr[i]].cost;
                }
            }

            return price ? [parseInt(price / 100), ' ', this._T(MC + "ValuteLabel")].join('') : this.getFreeMark();
        };

        F.prototype.hasAccess = function (x) {
            var A = U.safeArray(E.Config().userInfo.permissions);
            for (var i = 0; i < A.length; i++) {
                if (A[i] == x) {
                    return true;
                }
            }
            return false;
        };

        F.prototype.getFreeMark = function () {
            return this._T(MC + "FreeMark");
        };
        F.prototype.getBoughtMark = function () {
            return EFO.TemplateManager().get('oklable', MC);
        };



        F.prototype._registerSection = function (sec) {
            this.sections ? false : this.sections = {};
            this.sections[sec.key] = sec;
            return '';
        };

        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('cmain', MC),
                'lessons': EFO.TemplateManager().get('cchapter', MC)
            };
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
            EFO.Filter.Filter().throwValuesErrors(data, "InvalidInput", MC + ":");
            data.agreement ? false : U.Error(MC + "AgreementIsRequired");
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/DAP/Auth/Register'), data)
                    .done(this, this.onRegisterSuccess)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());
            return this;
        };

        F.prototype.getFilterRegister = function () {
            return EFO.TemplateManager().get('registerFilter', MC);
        };


        F.prototype.onRegisterSuccess = function (d) {
            debugger;
        };

        F.prototype.onSubmitError = function () {
            debugger;
        };

        //</editor-fold>
        //</editor-fold>

        //</editor-fold>

        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


      //  F.prototype.install = function () {
           
      //      return this.show();
     //   };
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


        F.prototype.updateFullPrice = function () {
            H.setFullPrice();
        };

        F.prototype.setFullPrice = function () {
            var i = 0;
            for (var k in this.sections) {
                if (this.sections.hasOwnProperty(k) && U.isObject(this.sections[k])) {
                    if (this.sections[k].parent === null) {
                        i += U.IntMoreOr(this.sections[k].cost, 0, 0);
                    }
                }
            }
            this.getRole('fullPrice').html(['(', U.IntMoreOr(i / 100, 0, 0), ' ', this._T(MC + 'ValuetFull'), ')'].join(''));
        };

        F.prototype.hasAccessDeep = function (x) {
            if (U.anyBool(E.Config().userInfo.ra, false)) {
                return true;
            }
            var ca = [];
            var s = this.sections["N" + x];
            while (s) {
                if (this.hasAccess(s.id)) {
                    return true;
                }
                ca.push(U.IntMoreOr(s.cost,0,0));
                s = (s.parent) ? this.sections["N" + s.parent] : null;
            }
            var cx = Math.max.apply(Math,ca);
            return cx>0?false:true;
        };

        F.prototype.onCommandOpenChapter = function (t) {
            var chapterId = t.data('nid');
          
            if (this.hasAccessDeep(chapterId)) {
                EFO.Com().com('chapterView')
                        .done(function (x) {
                            x().load(chapterId).install();
                        })
                        .fail(this, this.onRequiredComponentFail);
            } else {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(chapterId).install().setCallback(this,this.load);
                        })
                        .fail(this, this.onRequiredComponentFail);
            }
            return this;
        };

        F.prototype.onCommandByAll = function () {
            EFO.Com().com('paymentView')
                    .done(function (x) {
                        x().load(null).install();
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandReload = function () {
            return this.load();
        };
        


        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:chapterView========*/;
(function () {
    var H = null, MC = 'ChapterView', MD = '6232d837aabc71ecfe4d23b8abc74b76', FQCN = 'chapterView';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","excersize":"<div class=\"col s12 m6 l4\" data-command=\"showExcersize\" data-id=\"{{id}}\" data-retid=\"{{get_chapter_id}}\">\n    <div class=\"card\">\n        <div class=\"big_image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/EXC\/N{{id}}\/600_600.png{{\/mkurl}}\" \/>\n        <\/div>\n        <div class=\"title_card\">\n            <span class=\"{{getCssClass}}ExcersizeNameInnera\">{{#_TT}}{{getCssClass}}ExcersizeText{{\/_TT}} {{excnum}}. {{name}}<\/span>\n        <\/div>\n        <div class=\"price_card\">\n            {{#_TT}}{{getCssClass}}GoToText{{\/_TT}}\n        <\/div>\n    <\/div>\n<\/div>   ","icons":"","list":"\n<div class=\"container\">\n    <div class=\"{{getCssClass}}Header\" data-role=\"chptitle\">{{{data.chapter.name}}}<\/div>    \n    <div class=\"{{getCssClass}}Intro\" data-role=\"intro\">{{{data.chapter.info}}}<\/div>    \n    {{#hasSubChapters}}\n    <div class=\"row\">\n        {{#data.subchapters}}\n        {{>subchapter}}\n        {{\/data.subchapters}}\n    <\/div>\n    {{\/hasSubChapters}}\n    <div class=\"row\">\n        {{#data.excersizes}}\n        {{>excersize}}\n        {{\/data.excersizes}}\n        {{^data.excersizes}}\n        <div class=\"{{getCssClass}}ExcersizeError\">{{#_TT}}{{getCssClass}}NoExcersizes{{\/_TT}}<\/div>\n        {{\/data.excersizes}}\n    <\/div>\n<\/div>  \n","main":"<div class=\"{{getCssClass}}Wrapepr\">\n    <div class=\"{{getCssClass}}InnerWrapper\" data-role=\"content\"><\/div>\n<\/div>","subchapter":"{{#published}}\n<div class=\"col s4 m3 l2\" data-id=\"{{key}}\" data-nid=\"{{id}}\" data-retid=\"{{get_return_id}}\" data-filter=\"{{groupmode}}\" data-command=\"openChapterSelf\">\n    <div class=\"card {{getCssClass}}SubChapterRow\">\n        <div class=\"image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">\n        <\/div>\n        <div class=\"title_card\">\n            {{name}}\n        <\/div>        \n    <\/div>\n<\/div>\n{{\/published}}"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".ChapterViewWrapepr{box-sizing:border-box;height:100%;max-height:100%;overflow:hidden;padding:.5em}.ChapterViewInnerWrapper{box-sizing:border-box;height:100%;max-height:100%;overflow:hidden;padding:.5em;padding-right:0}.ChapterViewInner{box-sizing:border-box;height:100%;max-height:100%;padding-right:.5em;overflow:auto}.ChapterViewHeader{font-size:1.4em;font-weight:bold}.ChapterViewIntro p{margin-top:0;margin-bottom:0}.ChapterViewIntro{margin-bottom:.8em}.ChapterViewExcersizeBlock{box-sizing:border-box;overflow:hidden;padding:.3em;border:1px solid silver;margin-bottom:1.5em;border-radius:1%}.ChapterViewImageWrapper{box-sizing:border-box}.ChapterViewImageWrapper img{max-width:100%;max-height:100%;width:100%}.ChapterViewExcersizeBlock{width:100%;float:left}.ChapterViewExcerizes{overflow:hidden}.ChapterViewExcersizeName{font-size:1.4em}.ChapterViewGoTo{line-height:1.7em;text-align:right;color:#760000;font-size:1.3em;padding-right:.5em;margin-bottom:.4em;font-weight:bold}.ChapterViewExcersizeName{height:4em;max-height:4em;line-height:1.3em;overflow:hidden}.ChapterViewExcersizeName{margin-top:.3em}.ChapterViewExcersizeBlock{max-width:750px}.ChapterViewWrapepr{padding:0 !important}.ChapterViewInnerWrapper{padding:0 !important;overflow:auto !important}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.hasSubChapters = this._hasSubChapters.bindToObject(this);
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                var d = x();
                d.setBackMode(true);
                this.data ? d.setTitle(this.data.chapter.name) : false;
            });
            return this;
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
        F.prototype.returnStack = [];
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        F.prototype.load = function (x) {
            this.clear();
            this.showLoader();
            this.aload = x;
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/BookChapter/' + x + '_' + E.Config().getLang() + '.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d.chapterinfo;
            this.counter = 0;
            this.data.chapter.chapter_id = this.data.chapter.id;
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this.data.chapter.name);
            });
            return this;
        };

        F.prototype.get_chapter_id = function () {
            return H.data.chapter.id;
        };

        F.prototype.excnum = function () {
            return (++H.counter);
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };


        F.prototype.onLoadError = function (x, y, z) {
            if ((U.isError(x) && x.message === 'NoAccess') || x === 'NoAccess') {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(this.aload).install().setCallback(this, this.onCommandReload);
                        })
                        .fail(this, this.onRequiredComponentFail);
                return;
            }
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('list', MC),
                'excersize': EFO.TemplateManager().get('excersize', MC),
                'subchapter': EFO.TemplateManager().get('subchapter', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            return this;
        };


        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


//        F.prototype.install = function () {
//
//            return this.show();
//        };

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

        F.prototype.displayFilteredContent = function (x) {
            this.showLoader();
            EFO.Com().com('FilteredView')
                    .done(this, function (c) {
                        c().load(x).install();
                    }).fail(this, this.onRequiredComponentFail)
                    .always(this, this.hideLoader);
            return this;

        };

        F.prototype.onCommandOpenChapterSelf = function (t) {
            if (U.NEString(t.data('filter'))) {
                return this.displayFilteredContent(t.data('nid'));
            }
            var chapterId = t.data('nid');
            this.returnStack.push(this.data.chapter_id);
            this.load(chapterId);
//            if (this.hasAccess(chapterId)) {
//                EFO.Com().com('chapterView')
//                        .done(function (x) {
//                            x().load(chapterId).show();
//                        })
//                        .fail(this, this.onRequiredComponentFail);
//            } else {
//                EFO.Com().com('paymentView')
//                        .done(function (x) {
//                            x().load(chapterId).show();
//                        })
//                        .fail(this, this.onRequiredComponentFail);
//            }
            return this;
        };

        F.prototype.onCommandByAll = function () {
            EFO.Com().com('paymentView')
                    .done(function (x) {
                        x().load(null).install();
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandReload = function () {
            return this.load(this.aload);
        };

        F.prototype.onCommandShowExcersize = function (t) {
            var id = t.data('id');
            var retid = t.data('retid');
            EFO.Com().com('excersizeView')
                    .done(function (x) {
                        x().load(id).install().setReturnId(retid);
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype._hasSubChapters = function () {
            return U.isArray(this.data.subchapters) && this.data.subchapters.length ? true : false;
        };

        F.prototype.stackHide = function () {
            this.hide();
        };

        F.prototype.stackShow = function () {
            this.show();
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:excersizeView========*/;
(function () {
    var H = null, MC = 'ExcersizeView', MD = '848eb470cb1fb563644e8298a4b3260c', FQCN = 'excersizeView';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"771":"<svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>","Navigation":"<div class=\"{{getCssClass}}NavigationBlock\">\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1m1\" data-command=\"navTo\" data-x=\"-1\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTonnm1\" data-command=\"navTo\" data-x=\"0\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1m1\" data-command=\"navTo\" data-x=\"1\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1nn\" data-command=\"navTo\" data-x=\"-1\" data-y=\"0\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1nn\" data-command=\"navTo\" data-x=\"1\" data-y=\"0\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1p1\" data-command=\"navTo\" data-x=\"-1\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTonnp1\" data-command=\"navTo\" data-x=\"0\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1p1\" data-command=\"navTo\" data-x=\"1\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n<\/div>","exc":"{{#data}}\n<div  class=\"close_block\">\n    <h2 class=\"accord_title\" data-command=\"openblock\" data-block=\"map\">\n        {{#_TT}}{{getCssClass}}TrainingHeader{{\/_TT}}\n        <span><i class=\"mdi mdi-chevron-down\"><\/i><\/span>\n    <\/h2>\n    <div  class=\"one_acord {{getCssClass}}ImagesBlock {{getCssClass}}active\" data-role=\"block_map\">\n        <div class=\"big_image_block {{getCssClass}}TrainingViewImage {{getCssClass}}ImageMiddleMiddle\">\n            {{#imagemap}}\n            <div class=\"one_image\" data-textid=\"{{indexText}}\" data-xindex=\"{{xindex}}\"  data-yindex=\"{{yindex}}\" data-index=\"{{index}}\" id=\"{{#createPeloader}}{{{url}}}{{\/createPeloader}}\">  \n                <div class=\"{{getCssClass}}Preloader\" >\n                    <svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>\n                <\/div>                            \n            <\/div>   \n            {{\/imagemap}}\n            {{>navigation}}\n        <\/div>\n    <\/div>\n    <h2 class=\"accord_title\" data-command=\"openblock\" data-block=\"text\">\n        {{#_TT}}{{getCssClass}}DescriptionHeader{{\/_TT}}\n        <span><i class=\"mdi mdi-chevron-down\"><\/i><\/span>\n    <\/h2>\n    <div  class=\"one_acord {{getCssClass}}TextBlock\" data-role=\"block_text\">\n        <div class=\"kick_text\">\n            {{{info.info}}}\n        <\/div>\n    <\/div>\n    {{#hasImages}}\n    <h2 class=\"accord_title\" data-command=\"openblock\" data-block=\"images\">\n        {{#_TT}}{{getCssClass}}ExamplesHeader{{\/_TT}}\n        <span><i class=\"mdi mdi-chevron-down\"><\/i><\/span>\n    <\/h2>    \n    <div  class=\"one_acord {{getCssClass}}EximagesBlock\" data-role=\"block_images\">        \n        {{resetImageIndex}}\n        {{#images}}        \n        <div class=\"one_boy {{getCssClass}}Eximage {{#isFirst}}{{getCssClass}}ActiveImage{{\/isFirst}}\" data-index=\"{{#getExiIndex}}.{{\/getExiIndex}}\">\n            <div id=\"{{#preloadExt}}{{excid}}\/{{imageid}}{{\/preloadExt}}\">\n                <div class=\"{{getCssClass}}Preloader\" >\n                    <svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>\n                <\/div>\n            <\/div>            \n            <div class=\"{{getCssClass}}ImageInfo\">{{{info}}}<\/div>\n        <\/div>        \n        {{\/images}}\n        {{>sliderNavigation}}\n    <\/div>\n    {{\/hasImages}}\n<\/div>\n{{\/data}}","excview":"<div class=\"{{getCssClass}}Tab {{getCssClass}}TabOpen\" data-command=\"settab\">\n    <div class=\"{{getCssClass}}TabHeader\">{{#_TT}}{{getCssClass}}TrainingTabheader{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}TabBody\">\n        {{#images}}\n        <div class=\"{{getCssClass}}ImageWrapper\" data-xindex=\"{{xindex}}\" data-yindex=\"{{yindex}}\" data-index=\"{{index}}\">\n            <img src=\"{{#mkurl}}\/PImageFly\/EXC\/N{{id}}\/{{indexText}}\/600_450.gif\" \/>            \n        <\/div>\n        {{\/images}}        \n        {{>navigation}}\n    <\/div>\n<\/div>\n<div class=\"{{getCssClass}}Tab\" data-command=\"settab\">\n    <div class=\"{{getCssClass}}TabHeader\">{{#_TT}}{{getCssClass}}InfoTabheader{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}TabBody\">\n        \n    <\/div>\n<\/div>\n\n<div class=\"{{getCssClass}}Tab\" data-command=\"settab\">\n    <div class=\"{{getCssClass}}TabHeader\">{{#_TT}}{{getCssClass}}ExamplesTabheader{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}TabBody\">\n        \n    <\/div>\n<\/div>","icon":"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!-- Created with Inkscape (http:\/\/www.inkscape.org\/) -->\n\n<svg style=\"display:none\" \n   xmlns:dc=\"http:\/\/purl.org\/dc\/elements\/1.1\/\"\n   xmlns:cc=\"http:\/\/creativecommons.org\/ns#\"\n   xmlns:rdf=\"http:\/\/www.w3.org\/1999\/02\/22-rdf-syntax-ns#\"\n   xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\"\n   xmlns=\"http:\/\/www.w3.org\/2000\/svg\"\n   xmlns:sodipodi=\"http:\/\/sodipodi.sourceforge.net\/DTD\/sodipodi-0.dtd\"\n   xmlns:inkscape=\"http:\/\/www.inkscape.org\/namespaces\/inkscape\"\n   width=\"210mm\"\n   height=\"297mm\"\n   >\n  <defs>\n    <symbol\n        viewBox=\"57 85 25 25\"\n       id=\"navigationArrow\">      \n      <path        \n         id=\"path3691\"\n         d=\"M 62.839121,103.78172 57.73297,98.666438 h 2.905853 2.905854 v -3.175002 -3.175 h 4.409722 4.409722 v 3.175 3.175002 h 2.822225 c 1.55222,0 2.82222,0.12119 2.82222,0.26931 0,0.29215 -9.596938,9.961242 -9.886907,9.961242 -0.09701,0 -2.474154,-2.30187 -5.282538,-5.11527 z m -5.579682,-14.904867 0.111627,-0.970139 10.671528,-0.09337 10.671532,-0.09337 v 1.063506 1.063506 H 67.930967 57.147812 Z\"\n          \/>\n    <\/symbol>\n  <\/defs>  \n<\/svg>","main":"<div class=\"{{getCssClass}}Wrapepr\">\n    <div class=\"{{getCssClass}}InnerWrapper {{getCssClass}}Tabs3\" data-role=\"content\">\n        <div class=\"{{getCssClass}}TabWrapper\">\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN1  {{getCssClass}}TabOpened\" data-role=\"toptab\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}TabVideoTitle{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\" data-role=\"video\"><\/div>\n            <\/div>\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN2\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}TabInfoTitle{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\" data-role=\"info\"><\/div>\n            <\/div>\n            <div class=\"{{getCssClass}}Tab {{getCssClass}}TabN3\" data-role=\"videotab\">\n                <div class=\"{{getCssClass}}TabHeader\" data-command=\"setTab\">{{#_TT}}{{getCssClass}}TabExvideoTitle{{\/_TT}}<\/div>\n                <div class=\"{{getCssClass}}TabBody\" data-role=\"exvideo\"><\/div>\n            <\/div>\n        <\/div>\n    <\/div>    \n<\/div>","sliderNavigation":"<div class=\"{{getCssClass}}SliderNavigation\">\n    <div class=\"{{getCssClass}}SliderArrow {{getCssClass}}SliderArrowLeft\" data-command=\"slideLeft\">\n        <svg ><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}SliderArrow {{getCssClass}}SliderArrowRight\" data-command=\"slideRight\">\n        <svg ><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n<\/div>","videotpl":"<video loop autoplay webkit-playsinline playsinline src=\"{{{xurl}}}\"><\/video>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".ExcersizeViewWrapepr{box-sizing:border-box;height:100%;max-height:100%;overflow:hidden;padding:.5em;padding-right:0}.ExcersizeViewInnerWrapper{box-sizing:border-box;overflow:auto;padding-right:.5em}.ExcersizeViewInnerWrapper .close_block{display:block}.one_acord.ExcersizeViewactive{display:block}.big_image_block.ExcersizeViewTrainingViewImage .one_image{position:relative;text-align:center}.one_image img{height:auto !important;width:100%}.ExcersizeViewInnerWrapper{height:100%;max-height:100%}.one_image{display:none}.ExcersizeViewNavigationBlock{font-size:1.5em;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box}.ExcersizeViewArrow{width:2em;height:2em;overflow:hidden;position:absolute;cursor:pointer}.ExcersizeViewArrow svg{width:100%;height:100%}.one_acord.ExcersizeViewImagesBlock{position:relative}.big_image_block.ExcersizeViewTrainingViewImage{position:relative}.ExcersizeViewNavigationBlock{font-size:16px}.ExcersizeViewArrow.ExcersizeViewArrowTonnm1{top:0;left:50%;transform:rotate(-180deg) translateX(50%);margin-top:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTop1m1{top:0;right:0;transform:rotate(-135deg);margin-top:.3em;margin-right:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTom1nn{left:0;top:50%;transform:rotate(90deg) translateX(-50%);margin-left:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTop1nn{top:50%;right:0;transform:rotate(-90deg) translateX(50%);margin-right:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTom1p1{left:0;bottom:0;transform:rotate(45deg);margin-bottom:.3em;margin-left:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTonnp1{left:50%;bottom:0;transform:translateX(-50%);margin-bottom:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTop1p1{right:0;bottom:0;transform:rotate(-45deg);margin-right:.3em;margin-bottom:.3em}.ExcersizeViewArrow.ExcersizeViewArrowTom1m1{left:0;top:0;transform:rotate(135deg);margin-top:.3em;margin-left:.3em}.ExcersizeViewArrow svg{fill:#760000}.ExcersizeViewArrow{animation:Excvwanm linear 1s infinite alternate;cursor:pointer}@keyframes Excvwanm{from{opacity:1}to{opacity:0}}.big_image_block.ExcersizeViewImageLeftUp .one_image[data-index=\"00\"]{display:block}.big_image_block.ExcersizeViewImageLeftMiddle .one_image[data-index=\"01\"]{display:block}.big_image_block.ExcersizeViewImageLeftDown .one_image[data-index=\"02\"]{display:block}.big_image_block.ExcersizeViewImageMiddleUp .one_image[data-index=\"10\"]{display:block}.big_image_block.ExcersizeViewImageMiddleMiddle .one_image[data-index=\"11\"]{display:block}.big_image_block.ExcersizeViewImageMiddleDown .one_image[data-index=\"12\"]{display:block}.big_image_block.ExcersizeViewImageRightUp .one_image[data-index=\"20\"]{display:block}.big_image_block.ExcersizeViewImageRightMiddle .one_image[data-index=\"21\"]{display:block}.big_image_block.ExcersizeViewImageRightDown .one_image[data-index=\"22\"]{display:block}.one_boy.ExcersizeViewEximage{display:none}.one_boy.ExcersizeViewEximage.ExcersizeViewActiveImage{display:block}.ExcersizeViewEximagesBlock{position:relative}.ExcersizeViewSliderNavigation{box-sizing:border-box;position:absolute;top:0;left:0;width:100%;height:100%;background:transparent}.ExcersizeViewSliderArrow{position:absolute;top:50%;width:4em;height:4em;margin-top:-2em;margin-left:1em;margin-right:1em;cursor:pointer;box-sizing:border-box;padding:.2em}.ExcersizeViewSliderArrow.ExcersizeViewSliderArrowLeft{left:0}.ExcersizeViewSliderArrow.ExcersizeViewSliderArrowRight{right:0}.ExcersizeViewSliderArrow svg{width:100%;height:100%;fill:#760000}.ExcersizeViewSliderArrow{padding:.5em}.ExcersizeViewSliderArrow.ExcersizeViewSliderArrowLeft svg{transform:rotate(90deg)}.ExcersizeViewSliderArrow.ExcersizeViewSliderArrowRight svg{transform:rotate(-90deg)}.ExcersizeViewTrainingViewImage video{width:100%}.ExcersizeViewWrapepr{padding-left:0;padding-right:0}.ExcersizeViewEximage video{width:100%;max-width:100%}.ExcersizeViewInnerWrapper{padding-right:0}.ExcersizeViewPreloader{background:whitesmoke;min-height:150px;position:relative}.ExcersizeViewPreloader svg{position:absolute;top:50%;left:50%;width:100px;height:100px;margin:-50px 0 0 -50px}.ExcersizeViewTabHeader{line-height:3.5em;height:3.5em;border:1px solid silver;border-left:0;border-right:0;position:relative;box-sizing:border-box;padding:0 .5em;border-top:0}.ExcersizeViewTabHeader:after{position:absolute;width:1.25em;height:1.25em;border:1px solid #8a8484;content:' ';top:50%;margin-top:-.75em;right:1em;transform:rotate(-45deg);border-top:0;border-right:0;transition:all .3s}.ExcersizeViewWrapepr{padding-top:0}.ExcersizeViewTab.ExcersizeViewTabOpened .ExcersizeViewTabHeader:after{transform:rotate(135deg);margin-top:-.3em}.ExcersizeViewTab.ExcersizeViewTabOpened+.ExcersizeViewTab .ExcersizeViewTabHeader{border-top:1px solid silver}.ExcersizeViewTabBody{display:none}.ExcersizeViewTab.ExcersizeViewTabOpened .ExcersizeViewTabBody{display:block}.ExcersizeViewInnerWrapper{position:relative;padding-top:3.5em}.ExcersizeViewTabHeader{position:absolute;top:0;border-top:0 !important;border-bottom:1px solid silver !important;border-left:1px solid silver;max-height:3.5em;overflow:hidden;text-align:center}.ExcersizeViewTabHeader:after{display:none}.ExcersizeViewTab.ExcersizeViewTabN1 .ExcersizeViewTabHeader{left:0;border-left:0}.ExcersizeViewTabHeader:after{display:none}.ExcersizeViewInnerWrapper.ExcersizeViewTabs3 .ExcersizeViewTabHeader{width:33.3333%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs2 .ExcersizeViewTabHeader{width:50%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs1 .ExcersizeViewTabHeader{width:100%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs3 .ExcersizeViewTab.ExcersizeViewTabN2 .ExcersizeViewTabHeader{left:33.333%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs3 .ExcersizeViewTab.ExcersizeViewTabN3 .ExcersizeViewTabHeader{left:66.6666%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs2 .ExcersizeViewTab.ExcersizeViewTabN2 .ExcersizeViewTabHeader{left:50%}.ExcersizeViewInnerWrapper.ExcersizeViewTabs2 .ExcersizeViewTab.ExcersizeViewTabN3 .ExcersizeViewTabHeader{display:none}.ExcersizeViewTab.ExcersizeViewTabOpened .ExcersizeViewTabHeader{font-weight:bold;color:#760000}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icon'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.videoSwitch = EFO.videoSwitch();
            this.videoSwitch.setContainer(this.getRole('video')).clear();
            this.videoSlider = EFO.videoSlider();
            this.videoSlider.setContainer(this.getRole('exvideo')).clear();
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };





        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //E.Config().pushComponent(this);
            
            return this;
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
            this.showLoader();
            this.aload = x;
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };
        F.prototype.loadAlias = function (x) {
            this.clear();
            this.showLoader();
            this.aload = x;
            this.getRequestAlias(x)
                    .done(this, this.onMainResponceAlias)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequestAlias = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/Excersize/alias_' + x + '_' + E.Config().getLang() + '.json'));
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/Excersize/' + x + '_' + E.Config().getLang() + '.json'));
        };

        F.prototype.setReturnId = function (x) {
            this.returnId = x;
            return this;
        };
        F.prototype.onMainResponceAlias = function (d) {
            this.aload = d.d.excersize.info.id;
            return this.onMainResponce(d);
        };

        F.prototype.onMainResponce = function (d) {
            this.data = d.d.excersize;
            this.stamp = d.m._ts;
            this.data.excid = this.data.info.id;
            //this.getRole('content').html(Mustache.render(tp.main, this, tp));
            // порядковая расстановка
            this.videoSwitch.setData(this.data.imagemap, this.stamp);
            var exi = U.safeArray(this.data.images);
            this.getRole('content').removeClass(MC+"Tabs1 "+MC+"Tabs1 "+MC+"Tabs2 "+MC+"Tabs3");
            if (exi.length) {
                for (var i = 0; i < exi.length; i++) {
                    exi[i].excid = this.data.excid;
                }
                this.videoSlider.setData(exi, this.stamp);
                this.getRole('videotab').show();
                this.getRole('content').addClass(MC+"Tabs3");
                
            } else {
                this.videoSlider.setData([]);
                this.getRole('videotab').hide();
                this.getRole('content').addClass(MC+"Tabs2");
            }
            this.getRole('info').html(this.data.info.info);

            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this.data.info.name);
            });
            this.onCommandSetTab(this.getRole('toptab'));
            return this;
        };






        F.prototype.get_chapter_id = function () {
            return H.data.chapter.id;
        };


        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurlfull(b(a));
            };
        };


        F.prototype.onCommandOpenblock = function (t) {
            var block = t.data('block');
            this.handle.find('.one_acord').removeClass(MC + 'active');
            this.handle.find('[data-role="block_' + block + '"]').addClass(MC + 'active');
            this.onSwipeChange();
            return this;
        };

        F.prototype.onCommandSetTab = function (t) {
            this.handle.find('.' + MC + "TabOpened").removeClass(MC + "TabOpened");
            t.closest('.' + MC + "Tab").addClass(MC + 'TabOpened');
            this.videoSlider.onChanged();
            this.videoSwitch.onChanged();
            return this;
        };


        F.prototype.onLoadError = function (x, y, z) {
            if ((U.isError(x) && x.message === 'NoAccess') || x === 'NoAccess') {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(this.aload).show().setCallback(this, this.onCommandReload);
                        })
                        .fail(this, this.onRequiredComponentFail);
                return;
            }
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };



        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            this.videoSlider.clear();
            this.videoSwitch.clear();
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
            this.videoSlider ? this.videoSlider.onChanged() : false;
            this.videoSwitch ? this.videoSwitch.onChanged() : false;
            return this;
        };

        F.prototype.stackOnBackButton = function () {
            this.clear();
            return false;
        };


        F.prototype.onCommandReload = function () {
            return this.load(this.aload);
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();

;/*===COMPONENT:langselect========*/;
(function () {
    var H = null, MC = 'Langselect', MD = 'f15fe88a9a81c841530d536f6d93d254', FQCN = 'langselect';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
//</editor-fold>
    function initPlugin() {        
        //<editor-fold defaultstate="collapsed" desc="Глобы и  статики">
        var EFO = window.Eve.EFO, U = EFO.U,PAR = EFO.windowController,PPT = PAR.prototype;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"main":"<div class=\"{{getCssClass}}MainWrap\">\n    <div class=\"{{getCssClass}}InnerWrap\">\n        <div class=\"{{getCssClass}}DataRow\">\n            <label for=\"a{{MD}}LangList\">Select language<\/label>\n            <select data-field=\"language\"><\/select>\n        <\/div>\n    <\/div>\n<\/div>","option":"{{#items}}<option value=\"{{token}}\">{{name}}  ({{eng_name}})<\/option>{{\/items}}"};
/*=====Templates<====*/
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        var ST = null;
        /*====>Styles=====*/
ST={"style":".EFOBackdrop.SelectorLanguageBackdrop{z-index:20}.EFOWindow.SelectorLanguageWindow{width:33em;height:15em}.EFOTitle.SelectorLanguageTitle{display:none}.EFOWindowResizer.SelectorLanguageWindowResizer{display:none}.SelectorLanguageMainWrap{box-sizing:border-box;height:100%;max-height:100%;padding:1em}.SelectorLanguageInnerWrap{box-sizing:border-box;height:100%;max-height:100%}.SelectorLanguageDataRow select{box-sizing:border-box;border-radius:0;height:3em;display:block;width:100%;margin-top:.5em;border:0;padding:0 .5em;outline:1px solid silver}span.EFOFooterButton.SelectorLanguageFooterButton.SelectorLanguageOnlyIfAllowCancel{display:none}.SelectorLanguageallowCancel span.EFOFooterButton.SelectorLanguageFooterButton.SelectorLanguageOnlyIfAllowCancel{display:inline-block}.EFOWindow.LangselectWindow{width:100%;height:100%;padding-top:0;padding:2em;background:#7f0000;box-sizing:border-box;padding-bottom:4em}.EFOTitle.LangselectTitle{display:none}.EFOFooter.LangselectFooter{background:#7f0000;border-top:1px solid white}span.EFOFooterButton.LangselectFooterButton.LangselectOnlyIfAllowCancel{display:none}span.EFOFooterButton.LangselectFooterButton,span.EFOFooterButton.LangselectFooterButton:hover{color:white;border:1px solid white}.EFOWindowResizer.LangselectWindowResizer{display:none}.LangselectMainWrap label{display:block;font-size:1.1em;color:white}.LangselectMainWrap select{display:block;border:0;border-radius:0;outline:1px solid silver;margin-top:.5em;-webkit-appearance:none;background:transparent;color:white;font-family:inherit;font-size:inherit;cursor:pointer}.LangselectMainWrap select option{color:black}.LangselectMainWrap select option::-moz-selection{color:white;background:#7f0000}.LangselectMainWrap select option::selection{color:white;background:#7f0000}.LangselectDataRow{padding:.1em}"};
/*=====Styles<====*/;
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
;/*===COMPONENT:menu========*/;
(function () {
    var E = window.Eve, EFO = E.EFO, U = EFO.U, H = null, MC = 'Menu', MD = '<$this->MD>', FQCN = 'menu';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        var PAR = EFO.Handlable, PARP = PAR.prototype;
        //<editor-fold defaultstate="collapsed" desc="Static">
        function F() {
            return F.is(H) ? H : F.is(this) ? this.init() : F.F();
        }
        F.xInheritE(PAR);

        var TPLS = null;
        /*====>Templates=====*/
TPLS={"Main":"<div class=\"{{getCssClass}}MainMenu\">\n    <div class=\"{{getCssClass}}MenuHeaderPart\">\n        <div class=\"{{getCssClass}}MenuHeaderContent\">\n            <div class=\"{{getCssClass}}MenuHeaderLogo\">\n                <i class=\"mdi mdi-account\"><\/i>\n            <\/div>\n            <div class=\"{{getCssClass}}HeaderUserDisplay\" data-role=\"userDisplay\"><\/div>\n            <div class=\"{{getCssClass}}HeaderBrandDisplay\" data-role=\"emailDisplay\"><\/div>            \n        <\/div>\n        <div class=\"EFOWindowLoader {{getCssClass}}WindowLoader\" data-role=\"loader\"><\/div>\n    <\/div>\n    <div class=\"{{getCssClass}}MenuItemsPart\">\n        <ul class=\"{{getCssClass}}MenuList\">\n            <li id=\"enc\" data-command=\"menuitem\" data-menucommand=\"showBook\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIBook\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemEnciclopedy{{\/_TT}}<\/span><\/li>\n            <li id=\"nas\" data-command=\"menuitem\" data-menucommand=\"showPrefs\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIPrefs\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemPreferences{{\/_TT}}<\/span><\/li>\n            <li id=\"nov\" data-command=\"menuitem\" data-menucommand=\"showNews\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MINews\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemNews{{\/_TT}}<\/span><\/li>\n            <li id=\"abo\" data-command=\"menuitem\" data-menucommand=\"showAbout\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIAbout\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemAbout{{\/_TT}}<\/span><\/li>\n            <li id=\"exi\" data-command=\"menuitem\" data-menucommand=\"runQr\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIQR\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemQr{{\/_TT}}<\/span><\/li>            \n            <li id=\"exi\" data-command=\"menuitem\" data-menucommand=\"runExit\">\n                <div class=\"{{getCssClass}}Image\">\n                    <svg ><use xlink:href=\"#{{getCssClass}}MIExit\"\/><\/svg>\n                <\/div>\n                <span>{{#_TT}}{{getCssClass}}ItemExit{{\/_TT}}<\/span><\/li>            \n            \n        <\/ul>\n    <\/div>\n<\/div>","backdrop":"<div class=\"{{getCssClass}}LowUnderBackdrop\"><\/div>","brand_display":"<b>{{brand_name}}<\/b>","default":"{{=<% %>=}}\n<div class=\" <%getCssClass%>Backdrop\" id=\"EFOController{{getControllerId}}\" data-component=\"{{getCssClass}}\">     \n    <div class=\" <%getCssClass%>ComponentContent\" data-role=\"window\">        \n        <div class=\"EFOWindowContent <%getCssClass%>WindowContent\" data-role=\"windowContent\">\n            <%{getContentTemplate}%>\n        <\/div>               \n    <\/div>\n    <div class=\"<%getCssClass%>toggler\" data-command=\"toggle\" data-role=\"toggler\"><\/div>\n<\/div>\n<%={{ }}=%>","icons":"<div style=\"display:none\">\n    <svg version=\"1.1\"  xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" >\n        <symbol id=\"MenuMIQR\" viewBox=\"0 0 512 512\">\n            <g>\n                <g>\n                    <path d=\"M189.17,50.363H96.28c-5.271,0-9.545,4.274-9.545,9.545v92.89c0,5.271,4.274,9.545,9.545,9.545h92.89\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545v-92.89C198.715,54.636,194.441,50.363,189.17,50.363z M179.625,143.252h-73.8v-73.8h73.8\n\t\t\tV143.252z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M454.327,94.288c5.271,0,9.545-4.274,9.545-9.545V59.908c0-5.271-4.274-9.545-9.545-9.545h-92.89\n\t\t\tc-5.271,0-9.545,4.274-9.545,9.545v92.89c0,5.271,4.274,9.545,9.545,9.545h92.89c5.271,0,9.545-4.274,9.545-9.545v-36.875\n\t\t\tc0-5.271-4.274-9.545-9.545-9.545c-5.271,0-9.545,4.274-9.545,9.545v27.33h-73.8v-73.8h73.8v15.291\n\t\t\tC444.782,90.015,449.056,94.288,454.327,94.288z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M454.327,315.52h-92.89c-5.271,0-9.545,4.274-9.545,9.545v92.89c0,5.271,4.274,9.545,9.545,9.545h92.89\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545v-92.89C463.872,319.794,459.598,315.52,454.327,315.52z M444.782,408.41h-73.8v-73.8h73.8\n\t\t\tV408.41z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M502.455,2.228H48.143c-5.271,0-9.545,4.274-9.545,9.545v374.262c0,5.271,4.274,9.545,9.545,9.545\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545V21.318H492.91V456.54h-83.382c-5.271,0-9.545,4.274-9.545,9.545\n\t\t\tc0,5.271,4.274,9.545,9.545,9.545h92.927c5.271,0,9.545-4.274,9.545-9.545V11.773C512,6.502,507.726,2.228,502.455,2.228z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M377.712,456.54H119.259c-5.271,0-9.545,4.274-9.545,9.545c0,5.271,4.274,9.545,9.545,9.545h258.453\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545C387.257,460.814,382.983,456.54,377.712,456.54z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M271.485,116.032h-47.722c-5.271,0-9.545,4.274-9.545,9.545c0,5.271,4.274,9.545,9.545,9.545h47.722\n\t\t\tc5.271,0,9.545-4.274,9.545-9.545C281.03,120.305,276.756,116.032,271.485,116.032z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M420.378,243.926h-49.395v-47.721c0-5.271-4.274-9.545-9.545-9.545s-9.545,4.274-9.545,9.545v87.808\n\t\t\tc0,5.271,4.274,9.545,9.545,9.545s9.545-4.274,9.545-9.545v-20.997h49.395c5.271,0,9.545-4.274,9.545-9.545\n\t\t\tC429.923,248.199,425.649,243.926,420.378,243.926z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M326.844,50.363h-103.08c-5.271,0-9.545,4.274-9.545,9.545c0,5.271,4.274,9.545,9.545,9.545h74.446v90.484\n\t\t\tc-0.001,5.27,4.272,9.544,9.544,9.544c5.271,0,9.545-4.274,9.545-9.545V69.453h9.545c5.271,0,9.545-4.274,9.545-9.545\n\t\t\tC336.389,54.636,332.115,50.363,326.844,50.363z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M292.159,217.6c-24.393-24.394-56.827-37.828-91.326-37.828c-34.498,0-66.931,13.434-91.326,37.828\n\t\t\tc-24.394,24.393-37.828,56.827-37.828,91.326c0,34.498,13.434,66.931,37.828,91.326c2.95,2.949,6.018,5.735,9.192,8.359\n\t\t\tl-78.451,78.439c-4.836,4.835-12.704,4.836-17.542,0c-4.836-4.836-4.836-12.705,0-17.542L87.8,404.402\n\t\t\tc3.728-3.728,3.726-9.771-0.001-13.498c-3.728-3.728-9.771-3.728-13.498,0.001L9.209,456.01\n\t\t\tc-12.279,12.279-12.279,32.259,0,44.538c5.948,5.948,13.857,9.224,22.268,9.224c0.003,0,0.006,0,0.009,0\n\t\t\tc8.41-0.003,16.315-3.278,22.261-9.224l80.756-80.743c19.836,11.915,42.594,18.275,66.331,18.275\n\t\t\tc34.498,0,66.931-13.434,91.326-37.828s37.828-56.828,37.828-91.326C329.988,274.427,316.553,241.994,292.159,217.6z\n\t\t\t M278.66,386.752c-20.788,20.788-48.428,32.238-77.827,32.238s-57.038-11.449-77.827-32.238\n\t\t\tc-20.789-20.789-32.238-48.427-32.238-77.827s11.449-57.039,32.238-77.827s48.428-32.238,77.827-32.238\n\t\t\ts57.039,11.449,77.827,32.238c20.787,20.789,32.238,48.428,32.238,77.827S299.449,365.963,278.66,386.752z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M267.387,242.372c-36.697-36.697-96.409-36.698-133.107,0c-17.778,17.778-27.568,41.413-27.568,66.553\n\t\t\tc0,25.14,9.791,48.777,27.568,66.553c17.776,17.778,41.412,27.568,66.553,27.568c25.14,0,48.777-9.791,66.553-27.568\n\t\t\tC304.084,338.782,304.084,279.07,267.387,242.372z M253.888,361.98c-14.172,14.171-33.014,21.976-53.056,21.976\n\t\t\ts-38.883-7.805-53.054-21.976c-14.171-14.171-21.976-33.013-21.976-53.054s7.805-38.883,21.976-53.056\n\t\t\tc14.629-14.629,33.839-21.941,53.054-21.941c19.212,0,38.43,7.315,53.056,21.941C283.142,285.124,283.142,332.726,253.888,361.98z\n\t\t\t\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M200.834,253.043c-5.271,0-9.545,4.274-9.545,9.545s4.274,9.545,9.545,9.545c20.287,0,36.792,16.505,36.792,36.792\n\t\t\tc0,5.271,4.274,9.545,9.545,9.545c5.271,0,9.545-4.274,9.545-9.545C256.716,278.112,231.647,253.043,200.834,253.043z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g><\/g>\n            <g><\/g>\n            <g><\/g>\n            <g><\/g>\n        <\/symbol>    \n    <\/svg>\n\n    <?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n    <svg version=\"1.1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\"\n    >\n        <symbol id=\"MenuMIPrefs\" viewBox=\"0 0 54 54\">\n            <g>\n                <path d=\"M27,13c-7.72,0-14,6.28-14,14s6.28,14,14,14s14-6.28,14-14S34.72,13,27,13z M27,39c-6.617,0-12-5.383-12-12s5.383-12,12-12\n\t\ts12,5.383,12,12S33.617,39,27,39z\"\/>\n                <path d=\"M51.22,21h-2.018c-0.515-1.912-1.272-3.742-2.26-5.457l1.426-1.426c0.525-0.525,0.814-1.224,0.814-1.966\n\t\tc0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.049-2.881-1.051-3.933,0l-1.426,1.426C36.74,6.07,34.911,5.313,33,4.798\n\t\tV2.78C33,1.247,31.753,0,30.22,0H23.78C22.247,0,21,1.247,21,2.78v2.018c-1.911,0.515-3.74,1.272-5.457,2.26l-1.426-1.426\n\t\tc-1.051-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l1.426,1.426\n\t\tC6.07,17.258,5.312,19.088,4.798,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h2.018\n\t\tc0.515,1.911,1.272,3.74,2.26,5.457l-1.426,1.426c-0.525,0.525-0.814,1.224-0.814,1.966c0,0.743,0.289,1.441,0.814,1.967\n\t\tl4.553,4.553c1.05,1.051,2.882,1.052,3.933,0l1.426-1.426c1.717,0.987,3.546,1.745,5.457,2.26v2.018c0,1.533,1.247,2.78,2.78,2.78\n\t\th6.439c1.533,0,2.78-1.247,2.78-2.78v-2.018c1.911-0.515,3.74-1.272,5.457-2.26l1.426,1.426c1.052,1.052,2.882,1.05,3.933,0\n\t\tl4.553-4.553c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-1.426-1.426\n\t\tc0.987-1.717,1.745-3.546,2.26-5.457h2.018c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22\n\t\tC52,30.65,51.65,31,51.22,31h-3.592l-0.18,0.773c-0.521,2.237-1.399,4.36-2.613,6.311l-0.42,0.674l2.539,2.539\n\t\tc0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-2.539-2.539l-0.674,0.42\n\t\tc-1.95,1.214-4.073,2.093-6.311,2.613L31,47.628v3.592C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-3.592\n\t\tl-0.773-0.18c-2.237-0.521-4.36-1.399-6.311-2.613l-0.674-0.42l-2.539,2.539c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553\n\t\tc-0.305-0.305-0.305-0.8,0-1.104l2.539-2.539l-0.42-0.674c-1.214-1.95-2.093-4.073-2.613-6.311L6.372,31H2.78\n\t\tC2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h3.592l0.18-0.773c0.521-2.238,1.399-4.361,2.613-6.311l0.42-0.674\n\t\tl-2.539-2.539c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553c0.304-0.304,0.799-0.306,1.104,0l2.539,2.539l0.674-0.42\n\t\tc1.95-1.214,4.073-2.093,6.311-2.613L23,6.372V2.78C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v3.592l0.773,0.18\n\t\tc2.237,0.521,4.36,1.399,6.311,2.613l0.674,0.42l2.539-2.539c0.306-0.306,0.801-0.304,1.104,0l4.553,4.553\n\t\tc0.305,0.305,0.305,0.8,0,1.104l-2.539,2.539l0.42,0.674c1.214,1.949,2.093,4.072,2.613,6.311L47.628,23h3.592\n\t\tC51.65,23,52,23.35,52,23.78V30.22z\"\/>\n                <path d=\"M27,17c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S32.514,17,27,17z M27,35c-4.411,0-8-3.589-8-8s3.589-8,8-8\n\t\ts8,3.589,8,8S31.411,35,27,35z\"\/>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n\n   \n    <svg version=\"1.1\"  xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\">\n        <symbol id=\"MenuMIExit\" viewBox=\"0 0 512 512\" >\n            <g>\n                <g>\n                    <polygon points=\"325.502,52.833 325.502,68.377 409.816,68.377 409.816,443.623 400.633,443.623 400.633,117.138 385.089,117.138 \n\t\t\t385.089,443.623 325.502,443.623 325.502,459.167 425.361,459.167 425.361,52.833 \t\t\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <rect x=\"86.644\" y=\"355.486\" width=\"15.544\" height=\"15.544\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <polygon points=\"86.639,54.494 86.639,337.866 102.184,337.866 102.184,66.717 295.693,19.766 295.693,492.234 102.184,445.283 \n\t\t\t102.184,389.68 86.639,389.68 86.639,457.506 311.237,512 311.237,0 \t\t\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M255.762,254.446c-12.685,0-23.005,10.32-23.005,23.005s10.32,23.005,23.005,23.005\n\t\t\tc12.685,0.001,23.005-10.32,23.005-23.005S268.447,254.446,255.762,254.446z M255.761,284.912\n\t\t\tc-4.113,0.001-7.461-3.347-7.461-7.461s3.347-7.461,7.461-7.461c4.114,0,7.461,3.347,7.461,7.461S259.875,284.912,255.761,284.912\n\t\t\tz\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <rect x=\"385.093\" y=\"83.98\" width=\"15.544\" height=\"15.544\"\/>\n                <\/g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n    \n    <svg version=\"1.1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" >\n        <symbol id=\"MenuMINews\" viewBox=\"0 0 470 470\" >\n            <g>\n                <path d=\"M430.809,30h-40.491c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h13.952c-2.827,4.673-4.457,10.148-4.457,15.997v354.509   c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5V60.997c0-8.821,7.176-15.997,15.996-15.997c8.821,0,15.998,7.176,15.998,15.997   v354.509c0,21.777-17.717,39.494-39.494,39.494s-39.494-17.717-39.494-39.494V7.5c0-4.142-3.357-7.5-7.5-7.5H15.693   c-4.143,0-7.5,3.358-7.5,7.5v408.006C8.193,445.554,32.64,470,62.688,470h344.625c30.048,0,54.494-24.446,54.494-54.494V60.997   C461.807,43.905,447.901,30,430.809,30z M62.688,455c-21.777,0-39.494-17.717-39.494-39.494V15h329.625v400.506   c0,15.526,6.529,29.559,16.983,39.494H62.688z\"\/>\n                <path d=\"m320.318,40h-264.625c-4.143,0-7.5,3.358-7.5,7.5v75c0,4.142 3.357,7.5 7.5,7.5h264.625c4.143,0 7.5-3.358 7.5-7.5v-75c0-4.142-3.357-7.5-7.5-7.5zm-7.5,75h-249.625v-60h249.625v60z\"\/>\n                <path d=\"m320.318,145h-264.625c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h264.625c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z\"\/>\n                <path d=\"m320.318,205h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m173.006,205h-117.313c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z\"\/>\n                <path d=\"m320.318,235h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m173.006,235h-117.313c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z\"\/>\n                <path d=\"m320.318,265h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m320.318,295h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m203.006,340h77.313c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-77.313c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5z\"\/>\n                <path d=\"m280.318,415h-77.313c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h77.313c4.143,0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5z\"\/>\n                <path d=\"m320.318,385h-117.312c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5s-3.358-7.5-7.501-7.5z\"\/>\n                <path d=\"m173.006,265h-117.313c-4.143,0-7.5,3.358-7.5,7.5v150c0,4.142 3.357,7.5 7.5,7.5h117.313c4.143,0 7.5-3.358 7.5-7.5v-150c0-4.142-3.358-7.5-7.5-7.5zm-7.5,150h-102.313v-135h102.313v135z\"\/>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n    \n    <svg version=\"1.1\"  xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\"  >\n        <symbol id=\"MenuMIAbout\" viewBox=\"0 0 512 512\">\n            <g>\n                <g>\n                    <path d=\"M437.019,74.982C388.667,26.628,324.381,0,256,0S123.333,26.628,74.982,74.982C26.628,123.333,0,187.619,0,256\n\t\t\ts26.628,132.667,74.982,181.019C123.333,485.372,187.619,512,256,512s132.667-26.628,181.019-74.981\n\t\t\tC485.372,388.667,512,324.381,512,256S485.372,123.333,437.019,74.982z M256,491.602c-129.911,0-235.602-105.69-235.602-235.602\n\t\t\tS126.089,20.398,256,20.398S491.602,126.089,491.602,256S385.911,491.602,256,491.602z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M462.131,298.131c-5.464-1.392-11.012,1.907-12.4,7.367c-5.689,22.34-15.158,43.377-28.142,62.528\n\t\t\tc-3.161,4.663-1.943,11.004,2.719,14.166c1.753,1.188,3.744,1.758,5.715,1.758c3.268,0,6.48-1.568,8.451-4.478\n\t\t\tc14.313-21.11,24.751-44.306,31.024-68.94C470.888,305.073,467.591,299.52,462.131,298.131z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M466.104,245.801c-5.632,0-10.199,4.567-10.199,10.199c0,2.915-0.063,5.855-0.188,8.739\n\t\t\tc-0.244,5.628,4.121,10.387,9.749,10.63c0.15,0.007,0.299,0.01,0.448,0.01c5.43,0,9.945-4.282,10.182-9.759\n\t\t\tc0.138-3.176,0.207-6.412,0.207-9.62C476.303,250.368,471.736,245.801,466.104,245.801z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M256,172.877c-19.683,0-35.697,16.014-35.697,35.697V386.04c0,19.683,16.014,35.697,35.697,35.697\n\t\t\tc19.683,0,35.697-16.014,35.697-35.697V208.574C291.697,188.89,275.683,172.877,256,172.877z M271.299,386.04\n\t\t\tc0,8.436-6.863,15.299-15.299,15.299c-8.436,0-15.299-6.863-15.299-15.299V208.574c0-8.436,6.863-15.299,15.299-15.299\n\t\t\tc8.436,0,15.299,6.863,15.299,15.299V386.04z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n                <g>\n                    <path d=\"M281.235,100.707c-6.652-6.638-15.851-10.444-25.235-10.444c-9.385,0-18.584,3.806-25.246,10.453\n\t\t\tc-6.642,6.644-10.451,15.844-10.451,25.244c0,9.384,3.806,18.583,10.46,25.251c6.652,6.639,15.851,10.446,25.237,10.446\n\t\t\tc9.385,0,18.584-3.807,25.251-10.461c6.639-6.652,10.446-15.851,10.446-25.236C291.697,116.56,287.888,107.359,281.235,100.707z\n\t\t\t M266.827,136.773c-2.858,2.85-6.804,4.486-10.827,4.486c-4.026,0-7.972-1.636-10.813-4.47c-2.85-2.858-4.486-6.805-4.486-10.828\n\t\t\tc0-4.032,1.633-7.976,4.469-10.813c2.858-2.85,6.805-4.486,10.83-4.486c4.024,0,7.971,1.636,10.819,4.478\n\t\t\tc2.847,2.847,4.479,6.79,4.479,10.82C271.299,129.985,269.663,133.931,266.827,136.773z\"\/>\n                <\/g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n    \n    <svg version=\"1.1\"  xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\">\n        <symbol id=\"MenuMIBook\" viewBox=\"0 0 60 60\">\n            <path d=\"M13,0c-1.547,0-3.033,0.662-4.078,1.817C7.895,2.954,7.389,4.476,7.525,6H7.5v48.958C7.5,57.738,9.762,60,12.542,60H52.5V11\n\tV9V0H13z M9.5,54.958V9.998c0.836,0.629,1.875,1.002,3,1.002v46.996C10.842,57.973,9.5,56.621,9.5,54.958z M50.5,58h-36V11h3v25.201\n\tc0,0.682,0.441,1.262,1.099,1.444c0.137,0.037,0.273,0.056,0.408,0.056c0.015,0,0.029-0.005,0.044-0.006\n\tc0.045-0.001,0.088-0.012,0.133-0.017c0.103-0.012,0.202-0.033,0.299-0.066c0.048-0.016,0.093-0.035,0.138-0.056\n\tc0.094-0.043,0.18-0.097,0.263-0.159c0.036-0.027,0.073-0.05,0.106-0.08c0.111-0.099,0.212-0.211,0.292-0.346l4.217-7.028\n\tl4.217,7.029c0.327,0.545,0.939,0.801,1.55,0.687c0.045-0.008,0.089-0.002,0.134-0.014c0.657-0.183,1.099-0.763,1.099-1.444V11h19\n\tV58z M29.64,9.483l-0.003,0.007L29.5,9.764v0.042l-0.1,0.23l0.1,0.152v0.112V34.39l-5-8.333l-5,8.333V10.236L21.118,7h9.764\n\tL29.64,9.483z M32.118,9l2-4H19.882l-2,4h-4.67c-1.894,0-3.516-1.379-3.693-3.14c-0.101-0.998,0.214-1.957,0.887-2.701\n\tC11.071,2.422,12.017,2,13,2h37.5v1h-5c-0.553,0-1,0.447-1,1s0.447,1,1,1h5v1h-4c-0.553,0-1,0.447-1,1s0.447,1,1,1h4v1H32.118z\"\/>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n            <g>\n            <\/g>\n        <\/symbol>\n    <\/svg>\n\n\n<\/div>\n\n\n\n\n","point_display":"{{point_address}}","user_display":"<b>{{user_name}}<\/b> ({{login}})"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".MenuBackdrop{position:fixed;top:0;left:0;z-index:10;box-sizing:border-box;padding-right:10px;width:0;max-width:80%;min-width:10px;height:100%;max-height:100%;overflow:hidden;transition:all .3s}.MenuBackdrop,.MenuBackdrop div,.MenuBackdrop ul,.MenuBackdrop span,.MenuBackdrop li,.MenuBackdrop svg,.MenuBackdrop img{user-select:none;-o-user-select:none;-ms-user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none}.MenuBackdrop.MenuOpened{width:20em}.MenuBackdrop.notransition{transition:none}.MenuComponentContent{position:relative;width:100%;max-width:19em;height:100%;max-height:100%;box-sizing:border-box}.MenuBackdrop.MenuOpened .MenuComponentContent{border-right:1px solid silver}.EFOWindowContent.MenuWindowContent{position:absolute;right:0;top:0;width:100%;max-width:100%;overflow:hidden;height:100%;max-height:100%;box-sizing:border-box;min-width:18.5em}.MenuMainMenu{height:100%;width:100%;box-sizing:border-box;max-height:100%;overflow:auto}.MenuMenuHeaderPart{background:orange;position:relative}.MenuMenuHeaderContent{padding-top:.5em;padding-bottom:.5em;padding-left:1.6em;color:white;padding-right:1em;box-sizing:border-box}.MenuMenuHeaderLogo{height:110px}.MenuHeaderUserDisplay{height:1.3em;white-space:nowrap;line-height:1.3em}.MenuHeaderPointDisplay{line-height:1.3em;white-space:nowrap;overflow:hidden;height:1.3em}.EFOWindowLoader.MenuWindowLoader{font-size:.4em}.MenuMenuItemsPart{overflow:hidden;list-style:none}ul.MenuMenuList{margin:0;list-style:none;padding:0;padding-left:1.6em;box-sizing:border-box}ul.MenuMenuList .MenuMenuIcon{display:inline-block;overflow:hidden;width:1.5em;height:1.5em}ul.MenuMenuList .MenuMenuIcon svg{width:100%;height:100%;fill:#444343}ul.MenuMenuList li{white-space:nowrap;padding-left:3em;position:relative;display:block;width:100%;box-sizing:border-box;position:relative;overflow:hidden;line-height:2.5em;transition:all .3s;cursor:pointer;box-sizing:border-box}span.MenuMenuIcon{position:absolute;left:.25em;top:50%;margin-top:-.75em}.MenuLowUnderBackdrop{z-index:9;top:0;left:0;position:fixed;height:100%;max-height:100%;box-sizing:border-box;width:100%;background:rgba(0,0,0,.3);transition:all .3s;max-width:0}.MenuLowUnderBackdrop.MenuOpened{max-width:5000px}.MenuMainMenu{background:white}ul.MenuMenuList li:hover{background:whitesmoke}ul.MenuMenuList li:hover .MenuMenuIcon svg{width:100%;height:100%;fill:#442020}li.MenuShowOffline.OM-Online{display:none}li.MenuShowOnline.OM-Offline{display:none}.MenuMenuHeaderLogo{max-width:100px;max-height:100px;overflow:hidden;border-radius:50%;width:5.5em;height:5.5em}.MenuMenuHeaderLogo img{width:100%;height:100%;max-width:100%}.MenuHeaderUserDisplay{margin-top:.5em;line-height:1.5em;max-width:100%;overflow:hidden;height:1.5em;white-space:nowrap;font-size:.9em}.MenuHeaderBrandDisplay{height:1.5em;line-height:1.5em;max-height:1.5em;white-space:nowrap;overflow:hidden;font-size:.9em}.MenuHeaderPointDisplay{line-height:1.3em;white-space:nowrap;overflow:hidden;height:1.3em;font-size:.9em}.MenuBackdrop .MenuToggler{position:absolute;width:1.5em;top:0;right:0;height:3em;cursor:pointer}body .MenuBackdrop{min-width:1.5em;padding-right:1.5em}.Menutoggler{background:transparent;position:absolute;top:0;right:0;width:1.5em;height:3em;cursor:pointer}.MenuMenuHeaderPart{background:#760000 !important}ul.MenuMenuList li{padding-left:0;margin-top:.8em;margin-bottom:.5em}ul.MenuMenuList{padding-top:1em}ul.MenuMenuList li img{margin-right:1em;vertical-align:middle}.MenuMenuHeaderLogo i{font-size:3em;background:white;color:#760000;line-height:1.2em}.MenuMenuHeaderLogo{text-align:center;line-height:4em;background:white;width:4em;height:4em;margin-top:1em}ul.MenuMenuList li{position:relative;box-sizing:border-box;padding-left:3em}ul.MenuMenuList li .MenuImage{position:absolute;top:.25em;left:0;height:2em;width:2em}ul.MenuMenuList li .MenuImage svg{width:100%;height:100%;fill:#760000}.MenuImage{box-sizing:border-box;padding:.16em}.MenuBackdrop.MenuOpened{z-index:100}.MenuLowUnderBackdrop.MenuOpened{z-index:99}.Menutoggler{display:none}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Fieldable'];
        U.initMixines(F);
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">        
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            EFO.Events.GEM().On('USERINFO_UPDT', this, this.actualize);
            this.actualize();
            return this.initEvents();
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

        F.prototype.show = function () {
            return PARP.show.apply(this, Array.prototype.slice.call(arguments));
        };
        F.prototype.onBeforeShow = function () {
            //this.actualize();//считать данные по точке и текущему состоянию
            return PARP.onBeforeShow.apply(this, Array.prototype.slice.call(arguments));
        };

        /**
         * @override
         * @returns {string}
         */
        F.prototype.getWrapperTemplate = function () {
            return EFO.TemplateManager().get('default', MC);
        };

        F.prototype.getContainer = function () {
            return jQuery('body');
        };
        //</editor-fold>                

        //<editor-fold defaultstate="collapsed" desc="Комманды">
        /**
         * меню обрабатывает только команду menuitem -и передает ее приложению
         * @param {type} t
         * @param {type} e
         * @returns {_MenuL#1.initPlugin.F.prototype@call;hide}
         */
        F.prototype.onCommandMenuitem = function (t, e) {
            var cmd = U.NEString(U.UCFirst(U.trim(t.data('menucommand'))));
            if (cmd) {
                var fn = ["onCommand", cmd].join('');
                if (U.isCallable(this[fn])) {
                    this[fn](t, e);
                }
            }
            return this.closeMenu();
        };

        F.prototype.onCommandShowBook = function () {
            EFO.Com().com('newBook').done(function (x) {
                x().install();
            })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandShowPrefs = function () {
            EFO.Com().com('preferences').done(function (x) {
                x().install();
            })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandShowNews = function () {
            EFO.Com().com('news').done(function (x) {
                x().install();
            })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandShowAbout = function () {
            EFO.Com().com('about').done(function (x) {
                x().install();
            })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandRunExit = function () {
            localStorage.setItem("session","");
            localStorage.setItem("uiToken","y");
            localStorage.setItem("uitoken","y");
            localStorage.removeItem('cmark');
            window.location.reload(true);
            return this;
        };
        F.prototype.onCommandRunQr = function () {
            EFO.Com().com('qrreader').done(function (x) {
                x().install();
            });
            return this;
        };

        F.prototype.onCommandToggle = function () {
            this.toggle();
            return this;
        };

        //</editor-fold>


        F.prototype.initEvents = function () {
            this.handle.on('touchstart', this.touchStart.bindToObject(this));
            this.getRole('window').on('touchstart', function (e) {
                e.stopPropagation();
            });
            this.getRole('toggler').on('touchstart', function (e) {
                e.stopPropagation();
            });
            return this;
        };

        F.prototype.resetTouch = function () {
            this.handle.on('touchmove', this.touchMove.bindToObject(this));
            this.handle.on('touchend', this.touchEnd.bindToObject(this));
            this.handle.removeClass('notransition');
            this._touch = null;
            return this;
        };
        F.prototype.touchStart = function (e) {
            this.handle.addClass('notransition');
            this._touch ? this.resetTouch() : false;
            this._touch = e.originalEvent.targetTouches.item(0);
            this._startX = this._touch.clientX;
            this.handle.on('touchmove', this.touchMove.bindToObject(this));
            this.handle.on('touchend', this.touchEnd.bindToObject(this));
            return this;
        };

        F.prototype.touchMove = function (e) {
            var activeTouches = Array.prototype.slice.call(e.originalEvent.targetTouches);
            for (var i = 0; i < activeTouches.length; i++) {
                this._touch && (activeTouches[i].identifier === this._touch.identifier) ? this.processMove(activeTouches[i]) : false;
            }
            return this;
        };
        F.prototype.processMove = function (t) {
            this.handle.css({width: t.clientX + 'px'});
            return this;
        };
        F.prototype.processTouchEnd = function (t) {
            this.handle.removeClass('notransition');
            var delta = t.clientX - this._touch.clientX;
            if (delta === 0) {
                delta = t.clientX - this._startX;
            }
            var s = parseFloat(this.getRole('windowContent').outerWidth()) / 5;
            //window.Eve.bootstrap().getConfig()==='ios'?s=20:false;
            Math.abs(delta) > s ? false : delta = 0;
            if (delta !== 0) {
                delta < 0 ? this.closeMenu() : this.openMenu();
            }
            this.handle.css({width: ''});
            this.resetTouch();
        };

        F.prototype.toggle = function () {
            this.handle.hasClass('MenuOpened') ? this.closeMenu() : this.openMenu();
            return this;
        };


        F.prototype.openMenu = function () {         
            this.handle.addClass('MenuOpened');
            this.backdrop().addClass('MenuOpened');
            E.appStack().setMenuInt(this.onBackButton.bindToObject(this));
            return this;
        };
        F.prototype.closeMenu = function () {
            this.handle.removeClass('MenuOpened');
            this.backdrop().removeClass('MenuOpened');
            //E.Config().removeStack(this);
            E.appStack().setMenuInt(null);
            return this;
        };

        F.prototype.backdrop = function () {
            if (!this._backdrop) {
                this._backdrop = jQuery(Mustache.render(EFO.TemplateManager().get('backdrop', MC), this));
                this._backdrop.appendTo('body');
                this._backdrop.on('click', this.closeMenu.bindToObject(this));
            }
            return this._backdrop;
        };

        F.prototype.touchEnd = function (e) {
            var activeTouches = Array.prototype.slice.call(e.originalEvent.changedTouches);
            for (var i = 0; i < activeTouches.length; i++) {
                this._touch && (activeTouches[i].identifier === this._touch.identifier) ? this.processTouchEnd(activeTouches[i]) : false;
            }
            return this;
        };

        F.prototype.actualize = function () {
            var c = E.Config();
            if (c) {
                this.getRole('userDisplay').html(c.userInfo.name);
                this.getRole('emailDisplay').html(c.userInfo.email);
            }
            if(/^file/.test(window.location.href)){
                this.handle.find('[data-menucommand="runQr"]').hide();
            }
            return this;
        };

        F.prototype.install = function (co) {
            return this.show();
        };
        
        F.prototype.onBackButton = function(){
            return this.closeMenu();
        };

        


        F.prototype.onRequiredComponentFail = function (x) {
            U.TError(U.isError(x) ? x.message : U.NEString(x) ? x : "ComponentError");
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
;/*===COMPONENT:navigator========*/;
(function () {
    var H = null, MC = 'Navigator', MD = 'c9f7198c57735fa7a7a8ac2cc18dd542', FQCN = 'navigator';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"Empty":"<div class=\"{{getCssClass}}Empty\">{{#_TT}}{{getCssClass}}EmptyChapterMessage{{\/_TT}}<\/div>\n<div class=\"{{getCssClass}}EmptyActions\">\n    <div class=\"{{getCssClass}}EmptyActionButton\" data-command=\"return\">{{#_TT}}{{getCssClass}}ReturnButtonTitle{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}EmptyActionButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}ReloadButtonTitle{{\/_TT}}<\/div>\n<\/div>","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","excersize":"<div class=\"{{getCssClass}}ItemRow\" data-command=\"openExcersize\" data-id=\"{{id}}\">\n    <div class=\"{{getCssClass}}ItemRowImage\">\n        <img src=\"{{#mkurl}}\/ImageFly\/EXC\/N{{id}}\/600_600.png{{\/mkurl}}\" \/>    \n    <\/div>\n    <div class=\"{{getCssClass}}ChapterName\"><span class=\"{{getCssClass}}NameInner\">{{name}}<\/span><\/div>    \n<\/div>\n","icons":"","list":"\n<div class=\"container\">\n    <div class=\"{{getCssClass}}Header\" data-role=\"chptitle\">{{{data.chapter.name}}}<\/div>    \n    <div class=\"{{getCssClass}}Intro\" data-role=\"intro\">{{{data.chapter.info}}}<\/div>    \n    {{#hasSubChapters}}\n    <div class=\"row\">\n        {{#data.subchapters}}\n        {{>subchapter}}\n        {{\/data.subchapters}}\n    <\/div>\n    {{\/hasSubChapters}}\n    <div class=\"row\">\n        {{#data.excersizes}}\n        {{>excersize}}\n        {{\/data.excersizes}}       \n    <\/div>\n    {{^data.subchapters}}\n    {{^data.excersizes}}\n    {{>Empty}}\n    {{\/data.excersizes}}\n    {{\/data.subchapters}}\n\n\n<\/div>  \n","main":"<div class=\"{{getCssClass}}Wrapepr\">\n    <div class=\"{{getCssClass}}InnerWrapper\" data-role=\"content\"><\/div>\n<\/div>","subchapter":"{{#published}}\n<div class=\"{{getCssClass}}ItemRow\" data-command=\"openNavigator\" data-id=\"{{id}}\" data-filter=\"{{groupmode}}\">\n    <div class=\"{{getCssClass}}ItemRowImage\">\n        <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\" \/>    \n    <\/div>\n    <div class=\"{{getCssClass}}ChapterName\"><span class=\"{{getCssClass}}NameInner\">{{name}}<\/span><\/div>    \n<\/div>\n{{\/published}}"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".NavigatorIntro p{margin:0}.NavigatorEmpty{text-align:center;color:white;background:crimson;line-height:2.5em}.NavigatorWrapepr{box-sizing:border-box;padding:0 .5em;height:100%;max-height:100%;overflow:hidden}.NavigatorInnerWrapper{box-sizing:border-box;padding:0;margin:0;height:100%;max-height:100%;overflow:auto}.NavigatorInnerWrapper>.container{margin:0;width:100%}.NavigatorInnerWrapper .row{margin:0}.NavigatorEmptyActions{overflow:hidden;margin-top:2em}.NavigatorEmptyActionButton{float:left;width:48%;margin:0 1%;box-sizing:border-box;padding:0 .1em;overflow:hidden;border:1px solid #760000;line-height:2.5em;cursor:pointer;color:#760000;transition:all .3s;text-align:center}.NavigatorEmptyActionButton:hover{color:white;background:#760000}.EFOWindowContent.NavigatorWindowContent{user-select:none}.NavigatorItemRow{overflow:hidden}.NavigatorItemRowImage{width:5em;border-radius:50%;box-sizing:border-box;overflow:hidden;border:3px solid silver;line-height:0}.NavigatorItemRowImage img{width:100%;vertical-align:middle}.NavigatorItemRow{overflow:hidden;vertical-align:middle;border-bottom:1px solid whitesmoke;padding:.3em 0}.NavigatorItemRowImage{float:left;vertical-align:middle}.NavigatorChapterName{box-sizing:border-box;margin-left:5em;padding:.1em 1em;vertical-align:middle;height:5em}.NavigatorChapterName:before{content:' ';display:inline-block;width:0;height:5em;vertical-align:middle}span.NavigatorNameInner{display:inline-block;max-height:4.5em;max-width:100%;overflow:hidden;box-sizing:border-box;white-space:normal;vertical-align:middle}.NavigatorItemRow{overflow:hidden;vertical-align:middle;border-bottom:1px solid #ded8d8;padding:.3em 0;cursor:pointer}.NavigatorItemRowImage{height:5em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.hasSubChapters = this._hasSubChapters.bindToObject(this);
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                var d = x();
                d.setBackMode(true);
                this.data ? d.setTitle(this.data.chapter.name) : false;
            });
            return this;
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
        F.prototype.returnStack = []; //стек обратных переходов
        //<editor-fold defaultstate="collapsed" desc="Лоадер">
        //<editor-fold defaultstate="collapsed" desc="main and mainwrapeer requests">
        F.prototype.load = function (x) {
            this.clear();
            return this.loadPush(x);
        };

        F.prototype.loadPush = function (id) {
            if (this.data) {
                this.data.st = this.getRole('content').scrollTop();
                this.returnStack.push(this.data);
                this.data = null;
            }
            this.showLoader();
            this.aload = id;
            this.getRequest(id)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);
            return this;
        };

        F.prototype.getRequest = function (x) {
            return EFO.Request('get', E.Config().mkurl('/ProtectedCache/BookChapter/' + x + '_' + E.Config().getLang() + '.json'));
        };
        //</editor-fold>

        F.prototype.onMainResponce = function (d) {
            this.data = d.d.chapterinfo;
            this.data.chapter.chapter_id = this.data.chapter.id;
            return this.setDataInternal();
        };

        F.prototype.setDataInternal = function () {
            var tp = this.prepareTemplates();
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(true).setTitle(this.data.chapter.name);
            });
            if (this.data.st) {
                this.getRole('content').scrollTop(this.data.st);
            } else {
                this.getRole('content').scrollTop(0);
            }
            return this;
        };

        F.prototype.get_chapter_id = function () {
            return H.data.chapter.id;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.onLoadError = function (x, y, z) {
            if ((U.isError(x) && x.message === 'NoAccess') || x === 'NoAccess') {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load().install().setCallback(this, this.onCommandReload);
                        })
                        .fail(this, this.onRequiredComponentFail);
                return;
            }
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('list', MC),
                'excersize': EFO.TemplateManager().get('excersize', MC),
                'subchapter': EFO.TemplateManager().get('subchapter', MC),
                'Empty': EFO.TemplateManager().get('Empty', MC)
            };
        };

        //</editor-fold>        
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            this.returnStack = [];
            this.data = null;
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
            this.lst = this.getRole('content').scrollTop();
            this.hide();            
            return this;
        };

        F.prototype.onTopStack = function () {            
            this.show();            
            this.lst?this.getRole('content').scrollTop(this.lst):false;
            return this;
        };

        F.prototype.displayFilteredContent = function (x) {
            this.showLoader();
            EFO.Com().com('FilteredView')
                    .done(this, function (c) {
                        c().load(x).install();
                    }).fail(this, this.onRequiredComponentFail)
                    .always(this, this.hideLoader);
            return this;

        };

        F.prototype.onCommandOpenChapterSelf = function (t) {
            if (U.NEString(t.data('filter'))) {
                return this.displayFilteredContent(t.data('nid'));
            }
            var chapterId = t.data('nid');
            this.returnStack.push(this.data.chapter_id);
            this.load(chapterId);

            return this;
        };

        F.prototype.onCommandByAll = function () {
            EFO.Com().com('paymentView')
                    .done(function (x) {
                        x().load(null).install();
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandReload = function () {
            return this.load(this.aload);
        };

        F.prototype.onCommandShowExcersize = function (t) {
            var id = t.data('id');
            var retid = t.data('retid');
            EFO.Com().com('excersizeView')
                    .done(function (x) {
                        x().load(id).install().setReturnId(retid);
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype._hasSubChapters = function () {
            return U.isArray(this.data.subchapters) && this.data.subchapters.length ? true : false;
        };
        

        F.prototype.onCommandReturn = function () {
            window.Eve.appStack().onBackButton();
            return this;
        };

        F.prototype.onCommandOpenNavigator = function (t) {
            var id = U.IntMoreOr(t.data('id'), 0, null);
            var filter = U.NEString(t.data('filter'), null);
            if (id) {
                if (filter) {
                    return this.displayFilteredContent(id);
                } else {
                    this.loadPush(id);
                }
            }
            return this;
        };

        F.prototype.onCommandOpenExcersize = function (t) {
            var id = U.IntMoreOr(t.data('id'), 0, null);
            if (id) {
                EFO.Com().com('excersizeView')
                        .done(function (x) {
                            x().load(id).install();
                        })
                        .fail(this, this.onRequiredComponentFail);
            }
            return this;
        };

        F.prototype.stackOnBackButton = function () {            
            if (!this.returnStack.length) {
                return false;
            }
            this.cm_popStack();
            return true;
        };

        F.prototype.cm_popStack = function () {
            this.data = this.returnStack.pop();
            this.setDataInternal();
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
;/*===COMPONENT:newBook========*/;
(function () {
    var H = null, MC = 'NewBook', MD = '8146a97b04f6bb1f40c3b234883fbe64', FQCN = 'newBook';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"cchapter":"{{#childs}}\n{{#published}}\n{{registerSection}}\n<div class=\"col s4 m3 l2\" data-id=\"{{key}}\" data-nid=\"{{id}}\" data-filter=\"{{groupmode}}\" data-command=\"openChapter\">\n    <div class=\"card\">\n        <div class=\"image_card\">\n            <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">\n        <\/div>\n        <div class=\"title_card\">\n            {{name}}\n        <\/div>\n        <div class=\"price_card\">\n            {{{absolutePrice}}}\n        <\/div>\n    <\/div>\n<\/div>\n{{\/published}}\n{{\/childs}}\n","cmain":"{{#data.tree.items}}\n{{#published}}\n<div class=\"{{getCssClass}}Section container\">\n    <h2>{{name}}<\/h2>\n    <div class=\"{{getCssClass}}SectionContentV2 row\">\n        {{registerSection}}\n        {{>lessons}}\n    <\/div>\n<\/div>\n{{\/published}}\n{{\/data.tree.items}}\n{{updateFullPrice}}\n","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","icons":"","main":"<div class=\"{{getCssClass}}Outer\">\n    <div class=\"{{getCssClass}}Wrapper\" data-role=\"content\"><\/div>\n    <div class=\"{{getCssClass}}ByAllButtonW\">\n        <div class=\"{{getCssClass}}ByAllAccess\" data-command=\"byAll\">{{#_TT}}{{getCssClass}}ByAllAccess{{\/_TT}} <span data-role=\"fullPrice\"><\/span><\/div>\n    <\/div>\n<\/div>","mainr":"<div class=\"{{getCssClass}}Items\" data-role=\"support\">\n{{#data.tree.items}}\n{{#published}}\n<div class=\"{{getCssClass}}BookSection\" data-command=\"openNavigator\" data-root=\"{{id}}\" title=\"{{name}}\">\n    <img src=\"{{#mkurl}}\/ImageFly\/CHAP\/{{key}}\/200_200.png{{\/mkurl}}\">    \n<\/div>\n{{\/published}}\n{{\/data.tree.items}}\n<div class=\"{{getCssClass}}Center\"><img src=\"img\/center.png\" \/><\/div>\n<\/div>\n{{updateFullPrice}}\n","oklable":"<span class=\"BookBoughtLabel\">\n    <svg>\n    <use xlink:href=\"#BookLabelBoughtItem\"\/>\n    <\/svg>\n<\/span>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".NewBookWrapper{position:relative;box-sizing:border-box;height:100%;max-height:100%;padding:0}.NewBookOuter{box-sizing:border-box;width:100%;height:100%;padding:2em .5em}.NewBookBookSection{position:absolute;border:4px solid silver;border-radius:50%;box-sizing:border-box;overflow:hidden;transform:translate(-50%,-50%)}.NewBookBookSection img{width:100%}.NewBookOuter{background:#760000}.NewBookByAllButtonW{display:none}.NewBookCenter{position:absolute;left:50%;transform:translate(-50%,-50%);border-radius:50%;overflow:hidden}.NewBookCenter img{width:100%;max-width:100%}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable', 'Commandable'];
        U.initMixines(F);
        F.prototype.MD = MD;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            var self = this;
            this.registerSection = function () {
                return self._registerSection(this);
            };
            jQuery(window).on('resize', this.positeItems.bindToObject(this));
            return this;//this.initEditor();
        };


        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };



        F.prototype.onAfterShow = function () {
            PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
            this.loaded ? false : this.load();
            this.handle[U.anyBool(E.Config().userInfo.ra, false) ? 'removeClass' : 'addClass'](MC + 'allowByAll');
            //E.Config().pushComponent(this);
            EFO.Com().com('toolbar').done(this, function (x) {
                x().setBackMode(false).setTitle(this._T(MC + "Encilopedy"));
            });
            this.positeItems();
            return this;
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
            return EFO.Request('get', E.Config().mkurl('/cache/Book/Tree_' + E.Config().getLang() + '.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d;
            this.sections = {};
            this.getRole('content').html(Mustache.render(tp.main, this, tp));
            this.positeItems();
            this.loaded = true;
            return this;
        };

        F.prototype.positeItems = function () {
           // debugger;
            var w = Math.min(this.getRole('content').innerWidth(), this.getRole('content').innerHeight());
            // внешний радиус
            var R = w / 2;
            //this.handle.find('.NewBookItems').css({width: w + "px", height: w + "px", "box-sizing": "border-box", border: "1px solid black", "border-radius": "50%"});
            var items = this.getRole('content').find('.' + MC + 'BookSection');
            if (!items.length) {
                return this;
            }
            var grad_step = 360 / items.length; //3-120,5- 72. 6 - 60 etc
            var grad_step_size = 360 / (0+items.length);
            var radK = Math.PI / 180;
            var osn = 2 * R * Math.sin(grad_step_size * radK / 2);
            var RI = osn / 2 * Math.sqrt((2 * R - osn) / (2 * R + osn));
            var iw = RI * 2;
            var RV = R - RI; //радиусвектор                        
            var zp = {x: this.getRole('content').innerWidth() / 2, y: this.getRole('content').innerHeight() / 2};
            zp.y = Math.min(zp.x, zp.y);
            for (var i = 0; i < items.length; i++) {
                var it = jQuery(items.get(i));
                var gsdr = (-90 + (grad_step * i)) * radK;
                var x = RV * Math.cos(gsdr);
                var y = RV * Math.sin(gsdr);
                it.css({width: iw + "px", height: iw + "px",
                    left: zp.x + x + "px", top: zp.y + y + "px"
                });
            }
            this.handle.find('.'+MC+"Center").css({
                 left:zp.x+"px",top:zp.y+"px",
                 width:iw*.8+"px",height:iw*.8+"px"
            });
            return this;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.absolutePrice = function () {
            return H.getAbsolutePrice(this);
        };

        F.prototype.getAbsolutePrice = function (section) {
            if (U.anyBool(E.Config().userInfo.ra, false)) {
                return this.getBoughtMark();
            }
            var ptr = [];
            ptr.push(section.id);
            var n = section.parent;
            while (n) {
                var key = "N" + n;
                if (key in this.sections) {
                    ptr.push(n);
                    n = this.sections[key].parent;
                } else {
                    n = null;
                }
            }
            var price = null;
            for (var i = 0; i < ptr.length; i++) {
                if (this.hasAccess(ptr[i])) {
                    return this.getBoughtMark();
                }
                if (price === null && U.IntMoreOr(this.sections['N' + ptr[i]].cost, 0, 0)) {
                    price = this.sections['N' + ptr[i]].cost;
                }
            }

            return price ? [parseInt(price / 100), ' ', this._T(MC + "ValuteLabel")].join('') : this.getFreeMark();
        };

        F.prototype.hasAccess = function (x) {
            var A = U.safeArray(E.Config().userInfo.permissions);
            for (var i = 0; i < A.length; i++) {
                if (A[i] == x) {
                    return true;
                }
            }
            return false;
        };

        F.prototype.getFreeMark = function () {
            return this._T(MC + "FreeMark");
        };
        F.prototype.getBoughtMark = function () {
            return EFO.TemplateManager().get('oklable', MC);
        };



        F.prototype._registerSection = function (sec) {
            this.sections ? false : this.sections = {};
            this.sections[sec.key] = sec;
            return '';
        };

        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('mainr', MC)
                        //,'lessons': EFO.TemplateManager().get('rchapter', MC)
            };
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
            EFO.Filter.Filter().throwValuesErrors(data, "InvalidInput", MC + ":");
            data.agreement ? false : U.Error(MC + "AgreementIsRequired");
            this.showLoader();
            EFO.Request('post', E.Config().mkurl('/API/DAP/Auth/Register'), data)
                    .done(this, this.onRegisterSuccess)
                    .fail(this, this.onSubmitError)
                    .always(this, this.hideLoader());
            return this;
        };

        F.prototype.getFilterRegister = function () {
            return EFO.TemplateManager().get('registerFilter', MC);
        };


        F.prototype.onRegisterSuccess = function (d) {
            debugger;
        };

        F.prototype.onSubmitError = function () {
            debugger;
        };

        //</editor-fold>
        //</editor-fold>

        //</editor-fold>

        F.prototype.onRequiredComponentFail = function () {
            this.threadError(this._T("RequiredComponentFail"));
        };


        //  F.prototype.install = function () {

        //      return this.show();
        //   };
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


        F.prototype.updateFullPrice = function () {
            H.setFullPrice();
        };

        F.prototype.setFullPrice = function () {
            var i = 0;
            for (var k in this.sections) {
                if (this.sections.hasOwnProperty(k) && U.isObject(this.sections[k])) {
                    if (this.sections[k].parent === null) {
                        i += U.IntMoreOr(this.sections[k].cost, 0, 0);
                    }
                }
            }
            this.getRole('fullPrice').html(['(', U.IntMoreOr(i / 100, 0, 0), ' ', this._T(MC + 'ValuetFull'), ')'].join(''));
        };

        F.prototype.hasAccessDeep = function (x) {
            if (U.anyBool(E.Config().userInfo.ra, false)) {
                return true;
            }
            var ca = [];
            var s = this.sections["N" + x];
            while (s) {
                if (this.hasAccess(s.id)) {
                    return true;
                }
                ca.push(U.IntMoreOr(s.cost, 0, 0));
                s = (s.parent) ? this.sections["N" + s.parent] : null;
            }
            var cx = Math.max.apply(Math, ca);
            return cx > 0 ? false : true;
        };

        F.prototype.onCommandOpenNavigator = function (t) {
            var id = U.IntMoreOr(t.data('root'), 0, null);
            if (id) {
                if (this.hasAccessDeep(id)) {
                    EFO.Com().com('navigator')
                            .done(function (x) {
                                x().load(id).install();
                            })
                            .fail(this, this.onRequiredComponentFail);
                } else {
                    EFO.Com().com('paymentView')
                            .done(function (x) {
                                x().load().install().setCallback(this, this.load);
                            })
                            .fail(this, this.onRequiredComponentFail);
                }
            }
            return this;
        };

        F.prototype.onCommandOpenChapter = function (t) {
            var chapterId = t.data('nid');

            if (this.hasAccessDeep(chapterId)) {
                EFO.Com().com('chapterView')
                        .done(function (x) {
                            x().load(chapterId).install();
                        })
                        .fail(this, this.onRequiredComponentFail);
            } else {
                EFO.Com().com('paymentView')
                        .done(function (x) {
                            x().load(chapterId).install().setCallback(this, this.load);
                        })
                        .fail(this, this.onRequiredComponentFail);
            }
            return this;
        };

        F.prototype.onCommandByAll = function () {
            EFO.Com().com('paymentView')
                    .done(function (x) {
                        x().load(null).install();
                    })
                    .fail(this, this.onRequiredComponentFail);
            return this;
        };

        F.prototype.onCommandReload = function () {
            return this.load();
        };



        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });
})();
;/*===COMPONENT:news========*/;
(function () {
    var H = null, MC = 'News', MD = '508c75c8507a2ae5223dfd2faeb98122', FQCN = 'news';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"content":"<div id=\"{{getCssClass}}NewsWrapper\" class=\"{{getCssClass}}Block\">\n    {{>items}}\n<\/div>","error":"<div class=\"{{getCssClass}}Error\">\n    <div class=\"{{getCssClass}}ErrorText\">{{#_TT}}{{getCssClass}}ErrorIntro{{\/_TT}} {{#_TT}}{{getCssClass}}{{err}}{{\/_TT}}<\/div>\n    <div class=\"{{getCssClass}}ErrorButtonWrapper\">\n        <div class=\"{{getCssClass}}ErrorButton\" data-command=\"reload\">{{#_TT}}{{getCssClass}}TryAgain{{\/_TT}}<\/div>\n    <\/div>\n<\/div>","icons":"\n","item":"{{#data.news}}\n<div class=\"{{getCssClass}}item\">\n    <h2>{{created}}<\/h2>\n    <h4>{{title}}<\/h4>\n    <div class=\"{{getCssClass}}Info\">{{{info}}}<\/div>\n<\/div>\n{{\/data.news}}","main":"<div class=\"{{getCssClass}}Outer\">\n    <div class=\"{{getCssClass}}Wrapper\" data-role=\"content\"><\/div>    \n<\/div>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".NewsOuter{box-sizing:border-box;height:100%;max-height:100%;overflow:hidden;padding:.5em;padding-right:0}.NewsWrapper{box-sizing:border-box;height:100%;max-height:100%;overflow:auto;padding-right:.5em}.Newsitem>h4{font-size:1.4em;margin-top:0;margin-bottom:0}.NewsInfo p{margin-top:.3em;margin-bottom:.2em}.Newsitem{margin-bottom:1.8em}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : (F.is(this) ? this.init() : F.F());
        }
        F.xInheritE(PAR);
        F.mixines = ['Roleable', 'Loaderable','Commandable'];
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
                x().setBackMode(true).setTitle(this._T(MC+"News"));
            });
            return this;
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
            x===0?this.getRole('content').html(''):false;            
            this.showLoader();
            this.getRequest(x)
                    .done(this, this.onMainResponce)
                    .fail(this, this.onLoadError)
                    .always(this, this.hideLoader);

            return this;
        };

        F.prototype.getRequest = function (x) {
            x = U.IntMoreOr(x,0,0);
            return EFO.Request('get', E.Config().mkurl('/cache/News/'+x+'_'+E.Config().getLang()+'.json'));
        };

        F.prototype.onMainResponce = function (d) {
            var tp = this.prepareTemplates();
            this.data = d.d;
            this.offset=d.d.page;
            this.data.length?false:this.disableLoad=true;
            this.offset>0
            ?this.handle.find('#'+MC+'NewsWrapper').append(Mustache.render(tp.items, this, tp))
            :this.getRole('content').html(Mustache.render(tp.main, this, tp));
            return this;
        };

        F.prototype.mkurl = function () {
            return function (a, b) {
                return E.Config().mkurl(b(a));
            };
        };

        F.prototype.onLoadError = function (x) {
            this.err = U.isError(x) ? x.message : U.NEString(x) ? x : "Error";
            this.getRole('content').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
            return this;
        };

        F.prototype.prepareTemplates = function () {
            return {
                'main': EFO.TemplateManager().get('content', MC),
                'items': EFO.TemplateManager().get('item', MC)
            };
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

        
        F.prototype.onCommandReload = function () {
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
;/*===COMPONENT:preferences========*/;
(function () {
    var H = null, MC = 'Preferences', MD = '1ce027fe3518cc64ef3570b50a9a7c10', FQCN = 'preferences';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"filters":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<root>\n    <property in=\"email\" filters=\"Strip,Trim,NEString,EmailMatch\" \/>\n    <property in=\"name\" filters=\"Strip,Trim,NEString\" \/>\n    <property in=\"spam\" filters=\"Boolean,DefaultTrue\" \/>\n    <property in=\"password\" filters=\"Trim,NEString,DefaultNull\"\/>    \n<\/root>\n","main":"<div class=\"{{getCssClass}}Wrapper\">\n    <div id=\"{{getCssClass}}nas_open\" class=\"{{getCssClass}}close_block\">\n        <div class=\"form_nas\">\n            <div class=\"kiloa\">\n                <label for=\"{{getCssClass}}nas_lang\">{{#_TT}}{{getCssClass}}LangLabel{{\/_TT}}<\/label>\n                <select id=\"{{getCssClass}}nas_lang\" data-field=\"lang\"><\/select>\n            <\/div>\n            <div class=\"kiloa\">\n                <label for=\"{{getCssClass}}nas_user\">{{#_TT}}{{getCssClass}}NameLabel{{\/_TT}}<\/label>\n                <input type=\"text\" placeholder=\"{{#_TT}}{{getCssClass}}NamePlaceholder{{\/_TT}}\" id=\"{{getCssClass}}nas_user\" data-field=\"name\" \/>\n            <\/div>\n            <div class=\"kiloa\">\n                <label for=\"{{getCssClass}}nas_uemail\">{{#_TT}}{{getCssClass}}EmailLabel{{\/_TT}}<\/label>\n                <input type=\"email\" data-field=\"email\" placeholder=\"{{#_TT}}{{getCssClass}}EmailPlaceholder{{\/_TT}}\" id=\"{{getCssClass}}nas_email\" \/>\n            <\/div>\n            <div class=\"kiloa\">\n                <label for=\"{{getCssClass}}nas_pass\">{{#_TT}}{{getCssClass}}PasswordLubel{{\/_TT}}<\/label>\n                <input data-field=\"password\" type=\"password\" placeholder=\"{{#_TT}}{{getCssClass}}PasswordPlaceholder{{\/_TT}}\" id=\"{{getCssClass}}nas_pass\" \/>\n            <\/div>\n            <div class=\"kilob\">\n                {{#_TT}}{{getCssClass}}PasswordHint{{\/_TT}}                    \n            <\/div>\n            <div class=\"kiloa\">\n                <input type=\"checkbox\" data-field=\"spam\" data-fielddefault=\"1\" id=\"{{getCssClass}}Spam\" \/>\n                <label for=\"{{getCssClass}}Spam\">{{#_TT}}{{getCssClass}}SpamLabel{{\/_TT}}<\/label>\n            <\/div>\n        <\/div>\n        <div class=\"{{getCssClass}}footer\">\n            <div class=\"pay_btn btn\" id=\"{{getCssClass}}Save\" data-command=\"save\">{{#_TT}}{{getCssClass}}SaveButton{{\/_TT}}<\/div>\n        <\/div>\n    <\/div>\n<\/div>","option":"{{#lang}}\n<option value=\"{{token}}\">{{name}} ({{eng_name}})<\/option>\n{{\/lang}}"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".PreferencesWrapper{box-sizing:border-box;padding:.5em;padding-right:0;padding-bottom:4em;height:100%;max-height:100%;overflow:hidden;position:relative}div#Preferencesnas_open{box-sizing:border-box;height:100%;max-height:100%;padding-right:.5em;overflow:auto}.PreferencesWrapper select{display:block;margin:0;box-sizing:border-box;border:0;-webkit-appearance:none;width:100%;outline:1px solid silver}.Preferencesfooter{position:absolute;bottom:0;height:4em;box-sizing:border-box;text-align:center;padding-right:.5em;width:100%;padding-top:.5em}.PreferencesWrapper .kilob{margin-bottom:1.5em}"};
/*=====Styles<====*/;
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
;/*===COMPONENT:qrreader========*/;
(function () {
    var MC = 'Qrreader', MD = 'f6d6f3cf32d0ec0c3b33e9ec6da4ceaf', FQCN = 'qrreader';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>

    function initPlugin() {
        var MC = 'Qrreader', MD = 'f6d6f3cf32d0ec0c3b33e9ec6da4ceaf', FQCN = 'qrreader';
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"Main":"<div class=\"{{getCssClass}}Wrapper\">\n    <div class=\"{{getCssClass}}FormWrapper\">\n        <div class=\"{{getCssClass}}PreviewWrapper\">\n            <div class=\"{{getCssClass}}Preview\" data-role=\"preview\">\n                <div class=\"{{getCssClass}}CamWrapper\"><canvas data-role=\"cp\" width=\"500\" height=\"500\"><\/canvas><\/div>\n                <div class=\"{{getCssClass}}CamSwitch\" data-role=\"camSwitch\" data-command=\"camSwitch\" style=\"\">\n                    <svg><use xlink:href=\"#SVG{{getCssClass}}Camera\"\/><\/svg>\n                <\/div>\n            <\/div>\n        <\/div>\n        <div class=\"{{getCssClass}}FooterWrapper\">\n            <span class=\"{{getCssClass}}Button\" data-command=\"cancel\">{{#_TT}}CancelButton{{\/_TT}}<\/span>\n        <\/div>\n    <\/div>    \n<\/div>\n<div style=\"display:none\">\n    <svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" style=\"display: none;\">\n        <symbol id=\"SVG{{getCssClass}}Camera\" viewBox=\"0 0 333.668 333.668\">        \n            <path d=\"M295.101,298.649H38.561C17.295,298.649,0,281.354,0,260.088V103.703c0-21.266,17.295-38.561,38.561-38.561h52.347 l4.582-15.457c1.87-8.458,9.602-14.666,18.696-14.666h105.297c8.837,0,16.658,6.176,18.728,14.743l0.122,0.527l4.177,14.852h52.597 c21.266,0,38.561,17.295,38.561,38.561v156.384C333.662,281.354,316.361,298.649,295.101,298.649z M38.561,77.996 c-14.178,0-25.707,11.53-25.707,25.707v156.384c0,14.178,11.53,25.707,25.707,25.707h256.54c14.178,0,25.707-11.53,25.707-25.707 V103.703c0-14.178-11.53-25.707-25.707-25.707h-62.327l-7.037-25.097c-0.649-2.918-3.278-5.032-6.26-5.032H114.179 c-3.027,0-5.598,2.069-6.26,5.039l-7.429,25.09H38.561z M166.841,259.798c-44.981,0-81.576-36.588-81.576-81.563 c0-44.981,36.594-81.569,81.576-81.569c44.969,0,81.557,36.594,81.557,81.569C248.397,223.204,211.809,259.798,166.841,259.798z M166.841,109.513c-37.893,0-68.722,30.823-68.722,68.716s30.83,68.709,68.722,68.709c37.886,0,68.703-30.823,68.703-68.709 C235.543,140.336,204.72,109.513,166.841,109.513z M286.804,101.852c-6.555,0-11.858,5.315-11.858,11.858 c0,6.549,5.302,11.857,11.858,11.857c6.549,0,11.851-5.309,11.851-11.857C298.649,107.167,293.346,101.852,286.804,101.852z\" \/>\n        <\/symbol>\n    <\/svg>\n<\/div>","camera_error":"<div class=\"{{getCssClass}}QrReaderCameraError\">{{#_TT}}Barista.CAMREA_ERROR{{\/_TT}}<\/div>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"QRReader":".QrreaderBackdrop{background:white;position:fixed;z-index:2;width:100%;height:100%;box-sizing:border-box;left:0;top:0}.QrreaderComponentContent{width:100%;height:100%;box-sizing:border-box;overflow:hidden}.QrreaderWrapper{width:100%;height:100%;box-sizing:border-box;overflow:hidden}.QrreaderFormWrapper{width:100%;height:100%;max-height:100%;overflow:hidden;box-sizing:border-box;width:35em;max-width:100%;margin:0 auto}.QrreaderFormWrapper{position:relative;padding-bottom:4em}.QrreaderFooterWrapper{height:4em;position:absolute;left:0;bottom:0;width:100%;box-sizing:border-box;text-align:center;line-height:4em}.QrreaderPreviewWrapper{width:100%;height:100%;box-sizing:border-box;max-height:100%;overflow:hidden}.QrreaderPreview{width:100% !important;height:100% !important;max-width:100%;max-height:100%;min-width:100%;min-height:100%}.QrreaderPreview video{width:100%;height:100%}span.QrreaderButton{background:#760000;color:white;line-height:2em;display:inline-block;padding:0 1.5em;cursor:pointer}.qrreaderPreview{position:relative}.QrreaderCamSwitch{position:absolute;top:0;right:0;width:4em;height:4em;background:white;box-sizing:border-box;border:1px solid #760000;padding:.3em;cursor:pointer}.QrreaderCamSwitch svg{width:100%;height:100%;fill:#760000}.QrreaderCamWrapper,.qrreaderCamWrapper{width:100%;height:100%}.qrreaderCamWrapper canvas,.QrreaderCamWrapper canvas{max-height:100%;-zz-max-width:100%;height:100%;margin:0 auto;display:block}.qrreaderCameraError{text-align:center;color:white;background:crimson;padding:2em}body.NATCAM_ACTIVE{background-color:transparent}body.NATCAM_ACTIVE>div,body.NATCAM_ACTIVE #boxapp>div,body.NATCAM_ACTIVE div#appContent>div{opacity:0 !important}body.NATCAM_ACTIVE div#appContent,body.NATCAM_ACTIVE #boxapp,body.NATCAM_ACTIVE div#appContent .qrreaderBackdrop{opacity:1 !important;background:transparent !important}body.NATCAM_ACTIVE #boxapp,body.NATCAM_ACTIVE div#appContent{opacity:1 !important}body.NATCAM_ACTIVE div#appContent>div{opacity:0 !important}body.NATCAM_ACTIVE div#appContent div.qrreaderBackdrop{opacity:1 !important;background:transparent}body.NATCAM_ACTIVE .qrreaderComponentContent{background:transparent}body.NATCAM_ACTIVE .qrreaderPreviewWrapper{background:transparent}body.NATCAM_ACTIVE .QrreaderFooterWrapper{background:white !important;opacity:1 !important}body.NATCAM_ACTIVE .qrreaderPreviewWrapper{display:block}body.NATCAM_ACTIVE .qrreaderCamWrapper{display:none}body.NATCAM_ACTIVE div#appContent .FlatControllerQrreaderWrapper{opacity:1 !important;background:transparent}"};
/*=====Styles<====*/;
        EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
        EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
        //EFO.ImageManager().install([MC, 'icons'].join('.'));
        function F() {
            return F.is(H) ? H : F.is(this) ? this.init() : F.F();
        }
        F.xInheritE(PAR);

        F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Callbackable'];
        U.initMixines(F);
        F.prototype.cama = false;
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Обвес">
        F.prototype.onInit = function () {
            H = this;
            PARP.onInit.apply(this, Array.prototype.slice.call(arguments));
            this.selector = jQuery(document.createElement('select'));
            this.selector.on('change', this.doChangeCam.bindToObject(this));
            this.defaultSelected = EFO.GP().get('defCam', null);
            this.NATCAM = U.IntMoreOr(EFO.GP().get('natCam', 0), 0, 0);
            this.initReader();
            document.addEventListener('pause', this.clearHide.bindToObject(this));
            return this;
        };

        F.prototype.doChangeCam = function () {
            try {
                this.cameraStop().cameraStart();
            } catch (e) {

            }
        };
        F.prototype.onCommandCamSwitch = function () {

            //if (window.Eve.bootstrap().getConfig() !== 'browser') {
            return this.cameraSwapNAT();
            //}
            var cams = [];
            this.selector.find('option').each(function () {
                cams.push(jQuery(this).attr('value'));
            });
            var current = this.selector.val();
            var si = null;
            for (var i = 0; i < cams.length; i++) {
                cams[i] === current ? si = i : false;
            }
            if (si === null) {
                cams.length ? si = 0 : si = null;
            } else {
                si++;
                cams[si] ? false : si = 0;
            }
            si !== null && cams[si] ? this.selector.val(cams[si]).change() : false;
            EFO.GP().setSave('defCam', si === null ? null : si);
            return this;
        };

        F.prototype.initReader = function () {
            if (false && window.Eve.bootstrap().getConfig() === 'browser') {
                try {
                    this.reader = new WebCodeCamJS(this.getRole('cp').get(0));
                    this.reader.options.decoderWorker = '/DecoderWorker.js';
                    this.reader.options.DecodeQRCodeRate = 10;
                    this.reader.options.resultFunction = this.onCodeReaded.bindToObject(this);
                    this.reader.buildSelectMenu(this.selector.get(0), this.defaultSelected);
                    this.reader.init();
                } catch (e) {
                    this.reader = null;
                    this.renderCameraError();
                }
                return this;
            }
            return this;
        };
        F.prototype.renderCameraError = function () {
            this.getRole('preview').html(Mustache.render(EFO.TemplateManager().get('camera_error', MC), this));
            return this;
        };
        F.prototype.cameraStart = function () {
            if (false && window.Eve.bootstrap().getConfig() === 'browser') {
                try {
                    this.reader ? this.reader.play() : false;
                } catch (e) {
                    this.cameraStop();
                    this.renderCameraError();
                    this.reader = null;
                }
                return this;
            }
            return this.cameraStartNAT();
        };

        F.prototype.cameraStartNAT = function () {
            if (!this.cama) {
                try {
                    QRScanner.scan(this.onScannerNAT.bindToObject(this));
                    QRScanner.useCamera(this.NATCAM);
                    jQuery('body').addClass('NATCAM_ACTIVE');
                    QRScanner.show();
                    this.cama = true;
                } catch (e) {
                    this.cama = false;
                    this.renderCameraError();
                    jQuery('body').removeClass('NATCAM_ACTIVE');
                }
            }
            return this;
        };

        F.prototype.cameraStopNAT = function () {
            if (this.cama) {
                try {
                    this.cama = false;
                    QRScanner.destroy(function (status) {

                    });
                    jQuery('body').removeClass('NATCAM_ACTIVE');

                } catch (e) {
                    this.renderCameraError();
                    this.cama = false;
                    jQuery('body').removeClass('NATCAM_ACTIVE');
                }
            }
            return this;
        };

        F.prototype.cameraSwapNAT = function () {
            this.NATCAM === 1 ? this.NATCAM = 0 : this.NATCAM = 1;
            try {
                QRScanner.useCamera(this.NATCAM);
            } catch (e) {

            }
            EFO.GP().setSave('natCam', this.NATCAM);
            return this;
        };

        F.prototype.cameraStop = function () {
//            if (window.Eve.bootstrap().getConfig() === 'browser') {
//                try {
//                    this.reader ? this.reader.stop() : false;
//                } catch (e) {
//                    this.renderCameraError();
//                    this.reader = null;
//                }
//                return this;
//            }
            return this.cameraStopNAT();
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
        F.prototype.getContainer = function () {
            return document.getElementById('appContent');
        };

        F.prototype.xxxshow = function () {
            if (this.getContainer()) {
                return EFO.Handlable.prototype.show.apply(this, Array.prototype.slice.call(arguments));
            }
            return this;
        };


        F.prototype.setContainer = function (x) {
            this._container = x;
            return this.show();
        };
        F.prototype.onAfterShow = function () {
            this.cameraStart();
            //E.Config().pushComponent(this);
            return PARP.onAfterShow.apply(this, Array.prototype.slice.call(arguments));
        };
        F.prototype.onAfterHide = function () {
            E.appStack().remove(this);
            this.stopPreview();
            return PARP.onAfterHide.apply(this, Array.prototype.slice.call(arguments));
        };
        F.prototype.stopPreview = function () {
            this.cameraStop();
            //this.getRole('preview').html('');
            return this;
        };
//        F.prototype.onCodeReaderError = function () {
//            this.stopPreview();
//            this.getRole('preview').html(this._T('Barista', 'QRREADER_ERROR'));
//            return this;
//        };
        F.prototype.onCodeReaded = function (d) {
            try {
                var m = /^mordobox:\/\/excersize\/(.{1,})$/.exec(d.code);
                if (m) {
                    EFO.Com().com('excersizeView')
                            .done(function (x) {
                                x().loadAlias(m[1]).show();
                            })
                            .fail(this, this.onRequiredComponentFail);

                } else {
                    return null;
                }

            } catch (e) {

            }
            return this.hide().clear();
        };

        F.prototype.onScannerNAT = function (err, code) {
            if (!err && code) {
                return this.onCodeReaded({code: code});
            }
            return this;
        };

        /**
         * @override
         * @returns {string}
         */
        // F.prototype.getWrapperTemplate = function () {
        //     return EFO.TemplateManager().get('default', 'Component');
        // };

        // F.prototype.getContainer = function () {
        //      return this._container;
        // };
        //</editor-fold>
        //              
        F.prototype.clear = function () {
            this.LEM.Run('RESET_CONTENT');
            this.stopPreview();
            this.clearCallbacks();
            return this;
        };

        F.prototype.clearHide = function () {
            return this.hide().clear();
        };


        //<editor-fold defaultstate="collapsed" desc="Комманды и мониторы">
        //<editor-fold defaultstate="collapsed" desc="Комманды">


        F.prototype.onCommandCancel = function () {
            return this.hide().clear();
        };


        F.prototype.install = function (co) {
            this.setContainer(co).load();
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

        F.prototype.menuActive = function () {
            return false;
        };

        Y.reportSuccess(FQCN, F);
    }
    window.Eve.EFO.Promise.waitForArray(imports)
            .done(initPlugin)
            .fail(function () {
                Y.reportFail(FQCN, {}._T("ErrorDependencyLoading"));
            });

})();
;/*===COMPONENT:toolbar========*/;
(function () {
    var H = null, MC = 'Toolbar', MD = 'f50b3c2aa6125e65df874c95b2df8f9a', FQCN = 'toolbar';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>
    function initPlugin() {
        //<editor-fold defaultstate="collapsed" desc="Инициализация">
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.Handlable, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*====>Templates=====*/
TPLS={"icons":"<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" style=\"display: none;\">\n    <symbol id=\"Toolbarback\" viewBox=\"0 0 512 512\">        \n        <g> \n            <g> \n                <path d=\"M491.318,235.318H20.682C9.26,235.318,0,244.578,0,256c0,11.423,9.26,20.682,20.682,20.682h470.636 c11.423,0,20.682-9.259,20.682-20.682C512,244.578,502.741,235.318,491.318,235.318z\"\/> \n            <\/g> \n        <\/g>\n        <g> \n            <g> \n                <path d=\"M49.932,256L211.795,94.136c8.077-8.077,8.077-21.172,0-29.249c-8.077-8.076-21.172-8.076-29.249,0L6.058,241.375 c-8.077,8.077-8.077,21.172,0,29.249l176.488,176.488c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.625-6.058 c8.077-8.077,8.077-21.172,0-29.249L49.932,256z\"\/> \n            <\/g> \n        <\/g>\n    <\/symbol>\n<\/svg>\n","main":"<div class=\"navbar-fixed {{getCssClass}}ModeMenu\">\n    <nav>\n        <div id=\"open_menu_btn\" data-command=\"openmenu\">\n            <i class=\"mdi mdi-menu\"><\/i>\n        <\/div>\n        <div class=\"{{getCssClass}}BackButton\" data-command=\"doback\">\n            <svg><use xlink:href=\"#{{getCssClass}}back\" \/><\/svg>\n            <\/div>\n        <h1 class=\"truncate\" data-role=\"title\">{{#_TT}}{{getCssClass}}Title{{\/_TT}}<\/h1>        \n    <\/nav>\n<\/div>"};
/*=====Templates<====*/
        var ST = null;
        /*====>Styles=====*/
ST={"style":".navbar-fixed{z-index:1 !important}div#boxapp.ToolbarInstalld{padding-top:56px}.ToolbarBackButton{width:56px;height:56px;box-sizing:border-box;padding:1.2em;float:left;cursor:pointer;line-height:0}.ToolbarBackButton svg{width:100%;height:100%;fill:white}.ToolbarModeMenu .ToolbarBackButton{display:none}.ToolbarModeBack .ToolbarBackButton{display:block}.ToolbarModeBack #open_menu_btn{display:none}.ToolbarBackButton{position:relative;z-index:200}.navbar-fixed.ToolbarModeMenu{z-index:15 !important}"};
/*=====Styles<====*/;
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
;/*===COMPONENT:videoSlider========*/;
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(ready);
    function ready() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice;
        EFO.videoSlider ? false : initPlugin();

        function initPlugin() {
            var PAR = EFO.flatController, PARP = PAR.prototype;
            var MC = 'VideoSlider', MD = '35e20d8b1ad7f3625a03355758ff08c8', FQCN = 'videoSlider';
            var TPLS = null;
            /*====>Templates=====*/
TPLS={"error":"<div class=\"{{getCssClass}}VideoError\">{{#_TT}}{{getCssClass}}VideoError{{error}}{{\/_TT}}<\/div>","images":"{{#images}}\n<div class=\"{{getCssClass}}owWrapper {{#ifZero}}{{getCssClass}}ActiveImage{{\/ifZero}}\" data-index=\"{{xxindex}}\" id=\"{{#createLoader}}{{excid}}\/{{imageid}}{{\/createLoader}}\">  \n    {{>loader}}                           \n<\/div>   \n{{\/images}}","loader":"<div class=\"{{getCssClass}}Preloader\" >\n    <svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>\n<\/div>                            \n","main":"<div class=\"{{getCssClass}}ExtVideoWrap {{getCssClass}}ExtViewVideo\" data-role=\"imap_vs_wrapper\">\n    <div class=\"{{getCssClass}}imapInner\">\n        <div class=\"{{getCssClass}}VideoContainer {{getCssClass}}VideoMiddleMiddle\" data-role=\"videoContainer\"><\/div>\n        {{>VideoSliderNavi}}\n    <\/div>\n    {{>VideoSliderSlowSwitch}}    \n<\/div>","navi":"<div class=\"{{getCssClass}}NavigationBlock\" data-role=\"navblock\" data-command=\"replay\">\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowLeft\" data-command=\"navTo\" data-x=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowRight\" data-command=\"navTo\" data-x=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>    \n<\/div>","slowSwitch":"<div class=\"{{getCssClass}}videoSlowSwitch\" data-role=\"slowContainer\">\n    <input type=\"checkbox\" id=\"a{{MD}}slowSwitch\" data-monitor=\"slowswitch\" data-role=\"slowswitch\" {{#slowSwitch}}checked=\"checked\"{{\/slowSwitch}} \/>\n           <label for=\"a{{MD}}slowSwitch\">{{#_TT}}{{getCssClass}}SlowPleaseIamWriting{{\/_TT}}<\/label>\n<\/div>"};
/*=====Templates<====*/
            var ST = null;
            /*====>Styles=====*/
ST={"style":"#appContent .EFOFlatControllerWraper.FlatControllerVideoSliderWrapper{position:static}.VideoSliderowWrapper{display:none}.VideoSliderowWrapper.VideoSliderActiveImage{display:block}.VideoSliderowWrapper video{width:100%}.VideoSliderimapInner{position:relative}.VideoSliderNavigationBlock{position:absolute;top:0;left:0;width:100%;height:100%}.VideoSliderArrow{width:2.5em;height:2.5em;position:absolute;top:50%;margin-top:-1.25em;cursor:pointer;z-index:11}.VideoSliderArrow svg{width:100%;height:100%;fill:#760000}.VideoSliderArrow.VideoSliderArrowLeft{left:0;transform:rotate(90deg)}.VideoSliderArrow.VideoSliderArrowRight{right:0;transform:rotate(-90deg)}.VideoSlidervideoSlowSwitch{text-align:center;margin:.3em 0}.VideoSlidervideoSlowSwitch label:after,.VideoSlidervideoSlowSwitch label:before{display:none}.VideoSlidervideoSlowSwitch label{color:#760000;line-height:2.5em;height:2.5em;border:1px solid #760000;padding:0 .5em;cursor:pointer;transition:all .3s}.VideoSlidervideoSlowSwitch input[type=checkbox]:checked+label{color:white;background:#760000}.VideoSliderPreloader{text-align:center;height:7em;box-sizing:border-box;padding:1em}.VideoSliderPreloader svg{width:100%;height:100%}"};
/*=====Styles<====*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
           // EFO.ImageManager().install([MC, 'icon'].join('.'));

            function videoSwitch() {
                return (videoSwitch.is(this) ? this.init : videoSwitch.F).apply(this, APS.call(arguments));
            }
            videoSwitch.xInheritE(PAR);
            var F = videoSwitch;
            F.mixines = ['Roleable', 'Commandable', 'Monitorable'];
            U.initMixines(F);
            F.prototype.MD = MD;
            F.prototype.onCommandReplay = function(){
                this.onChanged();
                return this;
            };
            //<editor-fold defaultstate="collapsed" desc="overrides">
            F.prototype.getCssClass = function () {
                return MC;
            };
            F.prototype.getControllerAlias = function () {
                return MC;
            };
            F.prototype.getContentTemplate = function () {
                return EFO.TemplateManager().get([MC, 'Main'].join('.'));
            };

            F.prototype.enumSubTemplates = function () {
                var x = PARP.enumSubTemplates.apply(this, APS.call(arguments));
                return U.safeArray(x).concat([
                    MC + '.slowSwitch'
                            , MC + '.navi'
                ]);
            };

            F.prototype.onInit = function () {
                PARP.onInit.apply(this, APS.call(arguments));
                EFO.Events.GEM().On('SLOWSWITCH_STATE', this, this.onSlowSwitchState);
                this.createLoader = this._createLoader.bindToObject(this);
                return this;
            };
            //</editor-fold>
            //компонент обеспечивает рендеринг и загрузку видео, наследуем от EFO.flatController
            //<editor-fold defaultstate="collapsed" desc="set-clear-control">
            F.prototype.clear = function () {
                this.images = null;
                this.getRole('navblock').hide();
                this.error = "noExtendedVideo";
                this.handle.find('video').each(function(){
                    window.clearTimeout(this.whto); 
                });
                this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
                this.getRole('slowContainer').hide();
                return this;
            };

            F.prototype.setData = function ($images,stamp) {
                $images = U.safeArray($images);
                this.clear();
                if ($images.length) {
                    this.stamp = stamp;
                    this.images = [].concat($images);
                    for(var i = 0;i<this.images.length;i++){
                        this.images[i].xxindex=i;
                    }
                    this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('images', MC), this, {loader: EFO.TemplateManager().get('loader', MC)}));
                    this.images.length>1?this.getRole('navblock').show():false;
                    this.getRole('slowContainer').show();
                }

                return this;
            };

            F.prototype.onCommandNavTo = function (t) {
                var current = this.handle.find('.'+MC+"ActiveImage");
                var index = parseInt(current.data('index'));
                var dir=parseInt(t.data('x'));
                if(dir===-1){
                   index--;    
                }else{
                    index++;
                }
                var next = this.handle.find('[data-index='+index+']');
                if(!next.length){
                    next = dir===-1?this.handle.find('.'+MC+"owWrapper:last"):this.handle.find('.'+MC+"owWrapper:first");
                }
                current.removeClass(MC+"ActiveImage");
                next.addClass(MC+"ActiveImage");
                return this.onChanged();
            };

            F.prototype.onChanged = function () {                
                var self= this;
                this.handle.find('video').each(function () {
                    try {
                        if (jQuery(this).is(':visible')) {
                            self.setVideoTagVisible(this);
                        } else {
                            self.setVideoTagInvisible(this);                            
                        }
                    } catch (e) {

                    }
                });
                return this;
            };
            //</editor-fold>            
            //<editor-fold defaultstate="collapsed" desc="slowSwitch">
            F.prototype.onSlowSwitchState = function () {
                var cstate = E.Config().getSlowSwitchPreset();
                this.getRole('slowswitch').prop('checked', cstate);
                this.handle.find('video').each(function () {
                    this.playbackRate = cstate ? .3 : 1;
                });
                return this;
            };
            F.prototype.onMonitorSlowswitch = function (t) {
                E.Config().setSlowSwitch(t.prop('checked'));
                return this;
            };
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="renderers">
            F.prototype.slowSwitch = function () {
                return E.Config().getSlowSwitchPreset();
            };

            F.prototype._createLoader = function () {
                return this._createLoaderInternal.bindToObject(this);
            };
            
            F.prototype.ifZero = function(){
                return this.xxindex===0?true:false;
            };
            
            F.prototype.setVideoTagVisible = function (x) {
                window.clearTimeout(x.whto);
                var self = this;               
                var tc = x.currentTime;
                x.whto = window.setTimeout(function () {
                    if (((x.currentTime === tc)||(tc===0 && x.currentTime<1)) && !x.paused) {                    
                        x.oncanplaythrough = function () {
                            this.oncanplaythrough = null;
                            if (jQuery(this).is(':visible')) {
                                self.setVideoTagVisible(this);                                
                            } else {
                                self.setVideoTagInvisible(this);                               
                            }
                        };
                        x.load();
                    }
                }, 2000);
                var cstate = E.Config().getSlowSwitchPreset();
                x.play();
                x.playbackRate = cstate ? .3 : 1;
            };
            
            F.prototype.setVideoTagInvisible = function(x){
                x.pause();
                window.clearTimeout(x.whto);
            };

            F.prototype._createLoaderInternal = function (a, b) {                
                //https://mordoboy.ironstar.pw/PVideoFly/EXCEXT/N104/A104N0P/500_500.mp4?a=a1508024353449
                var url = "/PVideoFly/EXCEXT/N"+b(a);
                var id = [MC, "videx", U.UID()].join('');
                var fullUrl = [E.Config().mkurl(url), "/600_600.webm"].join('');
                var token = localStorage.getItem('uiToken') + "&nowritecookie=1&uiDevId=" + device.uuid;
                var self = this;
                if (window.videoLoader) {
                    window.videoLoader.loadVideo(fullUrl, token, U.IntMoreOr(this.stamp, 0, 0),
                            function (m) { //success
                                self.mkVideoWithSource(m,id);
//                                var vq = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>');
//                                var v = vq.get(0);
//                                v.oncanplaythrough = function () {
//                                    jQuery('#' + id).html('').append(v);
//                                    this.oncanplaythrough = null;
//                                    var cstate = E.Config().getSlowSwitchPreset();
//                                    if (jQuery(this).is(':visible')) {                                        
////                                        this.play();
////                                        //jQuery(this).addClass(MC+'Playing');
////                                        this.playbackRate = cstate ? .3 : 1;
//                                        self.setVideoTagVisible(this);
//                                    } else {
//                                        self.setVideoTagInvisible(this);
//                                        //this.pause();
//                                        //jQuery(this).removeClass(MC+'Playing');
//                                    }
//                                };
//                                v.onerror = function (z) {
//                                    jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                                };
//                                jQuery(v).append(['<source src="', m, '" type="video/webm" />'].join(''));
                            },
                            function (e) {//error
                                //alert(e);
                                jQuery('#' + id).html({}._T("ErrorVideoLoading"));
                            }
                    );
                } else {
                    var url = E.Config().mkurlfullvideo([url, "/600_600.webm?nowritecookie=1"].join(''));
                    self.mkVideoWithSource(url,id);
//                    var v = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>').get(0);
//                    v.onerror = function (z) {
//                        jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                    };
//                    v.oncanplaythrough = function () {
//                        jQuery('#' + id).html('').append(this);
//                        this.oncanplay = null;
//                        this.oncanplaythrough = null;
//                        var cstate = E.Config().getSlowSwitchPreset();
//                        if (jQuery(this).is(':visible')) {
//                             self.setVideoTagVisible(this);
//                        } else {
//                            self.setVideoTagInvisible(this);
//                        }
//
//                    };
//               
//                    jQuery(v).append(['<source src="', url.replace('.mp4', '.webm'), '" type="video/webm" /><source src="', url, '" type="video/mp4" />'].join(''));
                }
                return id;

            };
            
            
            F.prototype.mkVideoWithSource = function (url, containerId) {
                E.Config().getQueue().addTask(this, this.mkVideoSourceDo, {url: url, id: containerId});
                E.Config().getQueue().next();
                return this;
            };

            F.prototype.mkVideoSourceDo = function (task) {  
                //alert('vitask launchd');                
                var vis = '<video loop  webkit-playsinline playsinline preload="auto" ></video>';
                var vij = jQuery(vis);
                var vid = vij.get(0);
                var ip = jQuery("#" + task.getParam('id'));
                vid.oncanplaythrough = function () {
                    jQuery("#" + task.getParam('id')).html('').append(this);
                    this.oncanplaythrough = null;
                    if (jQuery(this).is(':visible')) {
                        task.context.setVideoTagVisible(this);
                    } else {
                        task.context.setVideoTagInvisible(this);
                    }
                    //alert('vitaskComplete');
                    task.complete();
                };
                vid.onerror = function (z) {
                    jQuery("#" + task.getParam('id')).html({}._T("ErrorVideoLoading"));
                    task.error();
                };                
                vij.append(['<source src="', task.getParam('url'), '" type="video/webm" />'].join(''));
            };
            //</editor-fold>
            EFO.videoSlider = F;
        }
    }
})();
;/*===COMPONENT:videoSwitch========*/;
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(ready);
    function ready() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice;
        EFO.videoSwitch ? false : initPlugin();

        function initPlugin() {
            var PAR = EFO.flatController, PARP = PAR.prototype;
            var MC = 'VideoSwitch', MD = '71ab262b0872b84d0a3d85dd5ce193b7', FQCN = 'videoSwitch';
            var TPLS = null;
            /*====>Templates=====*/
TPLS={"error":"<div class=\"{{getCssClass}}VideoError\">{{#_TT}}{{getCssClass}}VideoError{{error}}{{\/_TT}}<\/div>","images":"{{#images}}\n<div class=\"{{getCssClass}}owWrapper\" data-textid=\"{{indexText}}\" data-xindex=\"{{xindex}}\"  data-yindex=\"{{yindex}}\" data-index=\"{{index}}\" id=\"{{#createLoader}}{{{url}}}{{\/createLoader}}\">  \n    {{>loader}}                           \n<\/div>   \n{{\/images}}","loader":"<div class=\"{{getCssClass}}Preloader\" >\n    <svg xmlns:svg=\"http:\/\/www.w3.org\/2000\/svg\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" version=\"1.0\" width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\" xml:space=\"preserve\"><g><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#000000\" fill-opacity=\"1\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#f8f8f8\" fill-opacity=\"0.03\" transform=\"rotate(30 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#e8e8e8\" fill-opacity=\"0.09\" transform=\"rotate(60 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#d4d4d4\" fill-opacity=\"0.17\" transform=\"rotate(90 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#bebebe\" fill-opacity=\"0.25\" transform=\"rotate(120 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#a6a6a6\" fill-opacity=\"0.35\" transform=\"rotate(150 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#8e8e8e\" fill-opacity=\"0.44\" transform=\"rotate(180 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#737373\" fill-opacity=\"0.55\" transform=\"rotate(210 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#5a5a5a\" fill-opacity=\"0.65\" transform=\"rotate(240 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#414141\" fill-opacity=\"0.75\" transform=\"rotate(270 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#2a2a2a\" fill-opacity=\"0.84\" transform=\"rotate(300 64 64)\"\/><path d=\"M64 1.5a62.8 62.8 0 0 0-12.4 1.23l-.38-1.45a64.56 64.56 0 0 1 25.57 0l-.4 1.45A62.78 62.78 0 0 0 64 1.5zm0 3a59.78 59.78 0 0 1 11.62 1.14L71.34 21.6a43.43 43.43 0 0 0-14.67.04l-4.3-16A59.78 59.78 0 0 1 64.02 4.5z\" fill=\"#151515\" fill-opacity=\"0.92\" transform=\"rotate(330 64 64)\"\/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"><\/animateTransform><\/g><\/svg>\n<\/div>                            \n","main":"<div class=\"big_image_block {{getCssClass}}TrainingViewVideo\" data-role=\"imap_vs_wrapper\">\n    <div class=\"{{getCssClass}}imapInner\">\n        <div class=\"{{getCssClass}}VideoContainer {{getCssClass}}VideoMiddleMiddle\" data-role=\"videoContainer\"><\/div>\n        {{>VideoSwitchNavi}}\n    <\/div>\n    {{>VideoSwitchSlowSwitch}}    \n<\/div>","navi":"<div class=\"{{getCssClass}}NavigationBlock\" data-role=\"navblock\" data-command=\"replay\">\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1m1\" data-command=\"navTo\" data-x=\"-1\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTonnm1\" data-command=\"navTo\" data-x=\"0\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1m1\" data-command=\"navTo\" data-x=\"1\" data-y=\"-1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1nn\" data-command=\"navTo\" data-x=\"-1\" data-y=\"0\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1nn\" data-command=\"navTo\" data-x=\"1\" data-y=\"0\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTom1p1\" data-command=\"navTo\" data-x=\"-1\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTonnp1\" data-command=\"navTo\" data-x=\"0\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n    <div class=\"{{getCssClass}}Arrow {{getCssClass}}ArrowTop1p1\" data-command=\"navTo\" data-x=\"1\" data-y=\"1\" >\n        <svg><use xlink:href=\"#navigationArrow\" \/><\/svg>\n    <\/div>\n<\/div>","select":"<div class=\"{{getCssClass}}PleaseSelect\">{{#_TT}}{{getCssClass}}noVideoInThis{{\/_TT}}<\/div>","slowSwitch":"<div class=\"{{getCssClass}}videoSlowSwitch\" data-role=\"slowContainer\">\n    <input type=\"checkbox\" id=\"a{{MD}}slowSwitch\" data-monitor=\"slowswitch\" data-role=\"slowswitch\" {{#slowSwitch}}checked=\"checked\"{{\/slowSwitch}} \/>\n           <label for=\"a{{MD}}slowSwitch\">{{#_TT}}{{getCssClass}}SlowPleaseIamWriting{{\/_TT}}<\/label>\n<\/div>"};
/*=====Templates<====*/
            var ST = null;
            /*====>Styles=====*/
ST={"style":"#appContent .EFOFlatControllerWraper.FlatControllerVideoSwitchWrapper{position:relative}.VideoSwitchowWrapper{width:100%;box-sizing:border-box;display:none}.VideoSwitchowWrapper video{width:100%}.VideoSwitchimapInner{position:relative}.VideoSwitchNavigationBlock{position:absolute;top:0;left:0;width:100%;height:100%;font-size:2em}.VideoSwitchNavigationBlock .VideoSwitchArrow{width:1.5em;height:1.5em;-qqq-background:yellow;position:absolute;animation:blikers .8s linear alternate infinite;cursor:pointer;z-index:11}.big_image_block.VideoSwitchTrainingViewVideo{font-size:inherit}@keyframes blikers{from{opacity:0}to{opacity:1}}.VideoSwitchArrow svg{width:100%;height:100%;fill:#760000}.VideoSwitchArrow.VideoSwitchArrowTonnm1{top:0;left:50%;margin-left:-.75em;transform:rotate(-180deg)}.VideoSwitchArrow.VideoSwitchArrowTop1m1{top:-.3em;right:-.3em;transform:rotate(-135deg)}.VideoSwitchArrow.VideoSwitchArrowTom1nn{left:0;top:50%;transform:rotate(90deg);margin-top:-.75em}.VideoSwitchArrow.VideoSwitchArrowTop1nn{top:50%;right:0;margin-top:-.75em;transform:rotate(-90deg)}.VideoSwitchArrow.VideoSwitchArrowTom1p1{left:-.3em;bottom:0;transform:rotate(45deg)}.VideoSwitchArrow.VideoSwitchArrowTonnp1{bottom:0;left:50%;margin-left:-.75em}.VideoSwitchArrow.VideoSwitchArrowTop1p1{bottom:0;right:-.3em;transform:rotate(-45deg)}.VideoSwitchArrow.VideoSwitchArrowTom1m1{top:-.3em;left:-.3em;transform:rotate(135deg)}.VideoSwitchVideoRightDown .VideoSwitchowWrapper[data-textid=\"RightDown\"]{display:block}.VideoSwitchVideoMiddleDown .VideoSwitchowWrapper[data-textid=\"MiddleDown\"]{display:block}.VideoSwitchVideoLeftDown .VideoSwitchowWrapper[data-textid=\"LeftDown\"]{display:block}.VideoSwitchVideoRightMiddle .VideoSwitchowWrapper[data-textid=\"RightMiddle\"]{display:block}.VideoSwitchVideoRightUp .VideoSwitchowWrapper[data-textid=\"RightUp\"]{display:block}.VideoSwitchVideoLeftUp .VideoSwitchowWrapper[data-textid=\"LeftUp\"]{display:block}.VideoSwitchVideoMiddleUp .VideoSwitchowWrapper[data-textid=\"MiddleUp\"]{display:block}.VideoSwitchVideoLeftMiddle .VideoSwitchowWrapper[data-textid=\"LeftMiddle\"]{display:block}.VideoSwitchVideoMiddleMiddle .VideoSwitchowWrapper[data-textid=\"MiddleMiddle\"]{display:block}.VideoSwitchvideoSlowSwitch label{display:inline-block;line-height:2.5em;color:#760000;border:1px solid #760000;margin:0;padding:0 .5em;position:static;height:2.5em;transition:all .3s}.VideoSwitchvideoSlowSwitch input[type=checkbox]:checked+label{background:#760000;color:white}.VideoSwitchvideoSlowSwitch label:before,.VideoSwitchvideoSlowSwitch label:after{display:none}.VideoSwitchvideoSlowSwitch{text-align:center}.FilteredViewTab.FilteredViewopened+.FilteredViewTab .FilteredViewTabHeader{border-top:1px solid silver}.VideoSwitchvideoSlowSwitch{margin:.3em 0}.VideoSwitchPreloader{text-align:center;height:7em;box-sizing:border-box;padding:1em}.VideoSwitchPreloader svg{width:100%;height:100%}.VideoSwitchPleaseSelect{line-height:3em;background:crimson;color:white;text-align:center}video.VideoSwitchPlaying{box-sizing:border-box;border:3px solid red}"};
/*=====Styles<====*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
            //  EFO.ImageManager().install([MC, 'icon'].join('.'));

            function videoSwitch() {
                return (videoSwitch.is(this) ? this.init : videoSwitch.F).apply(this, APS.call(arguments));
            }
            videoSwitch.xInheritE(PAR);
            var F = videoSwitch;
            F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Monitorable'];
            U.initMixines(F);
            F.prototype.MD = MD;
            //<editor-fold defaultstate="collapsed" desc="overrides">
            F.prototype.getCssClass = function () {
                return MC;
            };
            F.prototype.getControllerAlias = function () {
                return MC;
            };
            F.prototype.getContentTemplate = function () {
                return EFO.TemplateManager().get([MC, 'Main'].join('.'));
            };

            F.prototype.enumSubTemplates = function () {
                var x = PARP.enumSubTemplates.apply(this, APS.call(arguments));
                return U.safeArray(x).concat([
                    MC + '.slowSwitch'
                            , MC + '.navi'
                ]);
            };

            F.prototype.onInit = function () {
                PARP.onInit.apply(this, APS.call(arguments));
                EFO.Events.GEM().On('SLOWSWITCH_STATE', this, this.onSlowSwitchState);
                this.createLoader = this._createLoader.bindToObject(this);
                return this;
            };
            //</editor-fold>
            //компонент обеспечивает рендеринг и загрузку видео, наследуем от EFO.flatController
            //<editor-fold defaultstate="collapsed" desc="set-clear-control">
            F.prototype.clear = function () {
                this.images = null;
                this.getRole('navblock').hide();
                this.handle.find('video').each(function () {
                    window.clearTimeout(this.whto);
                });
                this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('select', MC), this));
                this.getRole('slowContainer').hide();
                this.imageIndex = null;
                return this;
            };

            F.prototype.setData = function ($images, stamp) {
                $images = U.safeArray($images);
                this.clear();
                if ($images.length) {
                    this.stamp = stamp;
                    this.images = [].concat($images);
                    this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('images', MC), this, {loader: EFO.TemplateManager().get('loader', MC)}));
                    this.indexImages();
                    this.updateNavigation();
                    this.getRole('navblock').show();
                    this.getRole('slowContainer').show();
                    this.setIndex(0, 0);
                }

                return this;
            };

            F.prototype.indexImages = function () {
                this.imageIndex = [null, null, null, //00 10 20    n = y*3+x
                    null, null, null, //01 11 21
                    null, null, null];//02 12 22
                for (var i = 0; i < this.images.length; i++) {
                    var x = this.images[i];
                    var co = x.yindex * 3 + parseInt(x.xindex);
                    this.imageIndex[co] = x;
                }
                this.currentIndex = [1, 1];
                return this;
            };

            F.prototype.updateNavigation = function () {
                var ci = this.currentIndex[0] + 3 * this.currentIndex[1];
                var remap = {'m1m1': {x: -1, y: -1}, 'nnm1': {x: 0, y: -1}, 'p1m1': {x: +1, y: -1}, 'm1nn': {x: -1, y: 0}, 'p1nn': {x: +1, y: 0}, 'm1p1': {x: -1, y: +1}, 'nnp1': {x: 0, y: +1}, 'p1p1': {x: +1, y: +1}};
                this.handle.find('.' + MC + 'Arrow').hide().each(function () {
                    this.offsetWidth;
                });
                for (var k in remap) {
                    if (remap.hasOwnProperty(k)) {
                        var ofs = remap[k].x + remap[k].y * 3;
                        var tx = this.currentIndex[0] + remap[k].x;
                        var ty = this.currentIndex[1] + remap[k].y;
                        this.handle.find('.' + MC + 'ArrowTo' + k)[this.imageIndex[ci + ofs] && tx >= 0 && tx <= 2 && ty >= 0 && ty <= 2 ? 'show' : 'hide']();
                    }
                }
                this.onChanged();
                return this;
            };

            F.prototype.onCommandNavTo = function (t) {
                this.setIndex(t.data('x'), t.data('y'));
                return this;
            };


            F.prototype.setIndex = function (dx, dy) {
                var di = parseInt(dx) + 3 * dy;
                var ci = this.currentIndex[0] + 3 * this.currentIndex[1];
                var tcx = this.currentIndex[0] + parseInt(dx);
                var tcy = this.currentIndex[1] + parseInt(dy);
                if (this.imageIndex[ci + di] && tcx >= 0 && tcx <= 2 && tcy >= 0 && tcy <= 2) {
                    var ofs = ci + di;
                    var classes = ['LeftUp', 'MiddleUp', 'RightUp', 'LeftMiddle', 'MiddleMiddle', 'RightMiddle', 'LeftDown', 'MiddleDown', 'RightDown'];
                    this.currentIndex[0] = this.currentIndex[0] + parseInt(dx);
                    this.currentIndex[1] = this.currentIndex[1] + parseInt(dy);
                    var ClassToRemove = [];
                    for (var i = 0; i < classes.length; i++) {
                        ClassToRemove.push(MC + 'Video' + classes[i]);
                    }
                    this.getRole('videoContainer')
                            .removeClass(ClassToRemove.join(' '))
                            .addClass(MC + 'Video' + classes[ofs]);
                    this.updateNavigation();
                }
                return this;
            };

            F.prototype.onChanged = function () {
                var cstate = E.Config().getSlowSwitchPreset();
                var self = this;
                this.handle.find('video').each(function () {
                    try {
                        if (jQuery(this).is(':visible')) {
                            self.setVideoTagVisible(this);

                        } else {
                            self.setVideoTagInvisible(this);
                        }
                    } catch (e) {

                    }
                });
                return this;
            };
            //</editor-fold>
            F.prototype.onSlowSwitchState = function () {
                var cstate = E.Config().getSlowSwitchPreset();
                this.getRole('slowswitch').prop('checked', cstate);
                this.handle.find('video').each(function () {
                    this.playbackRate = cstate ? .3 : 1;
                });
                return this;
            };
            F.prototype.onMonitorSlowswitch = function (t) {
                E.Config().setSlowSwitch(t.prop('checked'));
                return this;
            };
            //<editor-fold defaultstate="collapsed" desc="renderers">
            F.prototype.slowSwitch = function () {
                return E.Config().getSlowSwitchPreset();
            };

            F.prototype._createLoader = function () {
                return this._createLoaderInternal.bindToObject(this);
            };

            F.prototype.onCommandReplay = function () {
                this.onChanged();
                return this;
            };

            F.prototype.videoOnLoad = function (x) {

            };

            F.prototype.setVideoTagVisible = function (x) {
                window.clearTimeout(x.whto);
                var self = this;
                var tc = x.currentTime;
                x.whto = window.setTimeout(function () {
                    if (((x.currentTime === tc) || (tc === 0 && x.currentTime < 1)) && !x.paused) {
                        x.oncanplaythrough = function () {
                            this.oncanplaythrough = null;
                            if (jQuery(this).is(':visible')) {
                                self.setVideoTagVisible(this);
                            } else {
                                self.setVideoTagInvisible(this);
                            }
                        };
                        x.load();
                    }
                }, 2000);
                var cstate = E.Config().getSlowSwitchPreset();
                x.play();
                x.playbackRate = cstate ? .3 : 1;
            };

            F.prototype.setVideoTagInvisible = function (x) {
                x.pause();
                window.clearTimeout(x.whto);
            };

            F.prototype._createLoaderInternal = function (a, b) {
                var url = b(a);
                var id = [MC, "vid", U.UID()].join('');
                var fullUrl = [E.Config().mkurl(url), "600_600.webm"].join('');
                var token = localStorage.getItem('uiToken') + "&nowritecookie=1&uiDevId=" + device.uuid;
                var self = this;
                if (window.videoLoader) {
                            window.videoLoader.loadVideo(fullUrl, token, U.IntMoreOr(this.stamp, 0, 0),
                            function (m) { //success  
                                //alert('oaded,queueing');
                                self.mkVideoWithSource(m,id);
//                                var vq = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>');
//                                var v = vq.get(0);
//                                v.oncanplaythrough = function () {
//                                    jQuery('#' + id).html('').append(v);
//                                    var cstate = E.Config().getSlowSwitchPreset();
//                                    this.oncanplaythrough = null;
//                                    if (jQuery(this).is(':visible')) {
//                                        self.setVideoTagVisible(this);
//                                    } else {
//                                        self.setVideoTagInvisible(this);
//                                    }
//                                };
//                                v.onerror = function (z) {
//                                    jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                                };
//                                jQuery(v).append(['<source src="', m, '" type="video/webm" />'].join(''));
                            },
                            function (e) {//error
                                alert(e);
                                jQuery('#' + id).html({}._T("ErrorVideoLoading"));
                            }
                    );
                } else {
                    var url = E.Config().mkurlfullvideo([b(a), "600_600.webm?nowritecookie=1"].join(''));
                    self.mkVideoWithSource(url,id);
//                    var v = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>').get(0);
//                    v.onerror = function (z) {
//                        jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                    };
//                    v.oncanplaythrough = function () {
//                        jQuery('#' + id).html('').append(this);
//                        this.oncanplay = null;
//                        this.oncanplaythrough = null;
//
//                        if (jQuery(this).is(':visible')) {
//                            self.setVideoTagVisible(this);
//
//                        } else {
//                            self.setVideoTagInvisible(this);
//                        }
//
//                    };
//                    jQuery(v).append(['<source src="', url.replace('.mp4', '.webm'), '" type="video/webm" /><source src="', url, '" type="video/mp4" />'].join(''));
                }
                return id;

            };

            F.prototype.mkVideoWithSource = function (url, containerId) {                
                E.Config().getQueue().addTask(this, this.mkVideoSourceDo, {url: url, id: containerId});
                E.Config().getQueue().next();
                //alert('queued');
                return this;
            };

            F.prototype.mkVideoSourceDo = function (task) {
                //alert('task launchd');
                var vis = '<video loop  webkit-playsinline playsinline preload="auto" ></video>';
                var vij = jQuery(vis);
                var vid = vij.get(0);
                var ip = jQuery("#" + task.getParam('id'));
                vid.oncanplaythrough = function () {
                    jQuery("#" + task.getParam('id')).html('').append(this);
                    this.oncanplaythrough = null;
                    if (jQuery(this).is(':visible')) {
                        task.context.setVideoTagVisible(this);
                    } else {
                        task.context.setVideoTagInvisible(this);
                    }
                    //alert('task complete');
                    console.log(E.Config().getQueue()._tasks);
                    task.complete();
                    
                };
                vid.onerror = function (z) {
                    jQuery("#" + task.getParam('id')).html({}._T("ErrorVideoLoading"));
                    //alert('taskError');
                    task.error();
                    
                };
                vij.append(['<source src="', task.getParam('url'), '" type="video/webm" />'].join(''));
            };
            //</editor-fold>
            EFO.videoSwitch = F;
        }
    }
})();
;/*===COMPONENT:AbstractFilter========*/;
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EFOReady);
    function EFOReady() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice, PAR = EFO.flatController, PARP = PAR.prototype;
        window.Eve.ConFil = window.Eve.ConFil || {};
        var CF = E.ConFil;
        window.Eve.ConFil.Ready = window.Eve.ConFil.Ready || [];
        window.Eve.ConFil.AbstractFilter ? false : initPlugin();
        function initPlugin() {
            var MC = 'AbstractFilter', MD = '77c396e7ebe189202aaecffbb04818a8', FQCN = 'AbstractFilter';
            function AbstractFilter() {
                U.AbstractError();
            }
            AbstractFilter.xInheritE(PAR);
            var TPLS = null;
            /*====>Templates=====*/
TPLS={"main":"<div class=\"{{getCssClass}}OutlineWrapper\">\n    <div class=\"{{getCssClass}}InsetWrapper\" data-role=\"filter_content\">\n    <\/div>\n<\/div>"};
/*=====Templates<====*/
            var ST = null;
            /*====>Styles=====*/
ST={"style":""};
/*=====Styles<====*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
            var F = AbstractFilter;
            F.mixines = ['Roleable', 'Commandable', 'Monitorable', 'Callbackable'];
            U.initMixines(F);
            F.prototype.MD = MD;
            //<editor-fold defaultstate="collapsed" desc="overrides">
            F.prototype.getCssClass = function () {
                return MC;
            };
            F.prototype.getControllerAlias = function () {
                return MC;
            };
            F.prototype.getContentTemplate = function () {
                return EFO.TemplateManager().get([MC, 'Main'].join('.'));
            };

            F.prototype.onInit = function () {
                PARP.onInit.apply(this, APS.call(arguments));
                this.isZoneActive = this._isZoneActive.bindToObject(this);
                this.getNameForZone = this._getNameForZone.bindToObject(this);
                return this;
            };
            //</editor-fold>


            F.prototype.install = function (container, items) {
                var activeZones = [];
                items = U.safeArray(items);
                this.zoneNames={};
                for (var i = 0; i < items.length; i++) {
                    var xi = U.IntMoreOr(items[i].info.filter_value, 0, null);
                    xi ? activeZones.push(xi) : false;
                    this.zoneNames["P"+xi]=items[i].info.name;
                }
                
                this.setContainer(container);
                this.updateZonesContent(activeZones);
                
                if (activeZones.length) {
                    this.setZoneHilight(activeZones[0]);
                    this.runCallback(activeZones[0]);
                }
                return this;
            };

            F.prototype.updateZonesContent = function (activeZones) {                
                var t = this.getFilterTemplate();
                this.activeZones = activeZones;
                this.getRole('filter_content').html(Mustache.render(t, this));
                return this;
            };

            F.prototype.getFilterTemplate = function () {
                return '';
            };

            F.prototype.onCommandSetZone = function (t) {
                //репорт родителю                  
                var id = U.IntMoreOr(t.data('zoneId'));
                var fid = null;
                for (var i = 0; i < this.activeZones.length; i++) {
                    if (this.activeZones[i] === id) {
                        fid = this.activeZones[i];
                        break;
                    }
                }
                if (fid) {
                    this.setZoneHilight(fid);
                    this.runCallback(fid);

                }
            };

            F.prototype._isZoneActive = function () {
                return this.isZoneActiveReal.bindToObject(this);
            };
            F.prototype._getNameForZone = function(){
                return this.getNameForZoneReal.bindToObject(this);
            };
            
            F.prototype.getNameForZoneReal = function(a,b){
                var z = U.IntMoreOr(b(a));
                if (z) {
                    var P = "P"+z;
                    if(U.NEString(this.zoneNames[P],null)){
                        return U.NEString(this.zoneNames[P],null);
                    }
                }
                return "---";
            };

            F.prototype.isZoneActiveReal = function (a, b) {
                
                var z = U.IntMoreOr(b(a));
                if (z) {
                    for (var i = 0; i < this.activeZones.length; i++) {
                        if (this.activeZones[i] === z) {
                            return '';
                        }
                    }
                }
                return 'disabled';
            };

            F.prototype.clear = function () {
                this.activeZones = [];
                this.getRole('filter_content').html('');
                this.clearCallbacks();
                this.handle.remove();
                this.handle = null;
                return this;
            };

            F.prototype.setZoneHilight = function (fid) {
                this.handle.find('.' + this.getCssClass() + 'Hilighted').removeClass(this.getCssClass() + 'Hilighted');
                this.handle.find('.' + this.getCssClass() + 'ZoneX' + fid).addClass(this.getCssClass() + 'Hilighted');
                return this;
            };

            CF.AbstractFilter = F;








            if (U.isArray(CF.Ready)) {
                var i = [].concat(CF.Ready);
                CF.Ready = {
                    push: function (x) {
                        if (U.isCallable(x)) {
                            try {
                                x();
                            } catch (e) {
                                U.TError(e.message);
                            }
                        }
                    }
                };
                for (var j = 0; j < i.length; j++) {
                    CF.Ready.push(i[j]);
                }
            }

        }


    }
})();
;/*===COMPONENT:LeftRightFilter========*/;
(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EFOReady);
    function EFOReady() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice ;
        window.Eve.ConFil = window.Eve.ConFil || {};
        var CF = E.ConFil;
        window.Eve.ConFil.Ready = window.Eve.ConFil.Ready || [];
        CF.Ready.push(CFReady);
        function CFReady() {
            var PAR = CF.AbstractFilter, PARP = PAR.prototype;
            CF.leftRightFilter ? false : initPlugin();
            
            function initPlugin() {
                var MC = 'LeftRightFilter', MD = '4a01c0780a4be2aa8fee5557eb25ee79', FQCN = 'LeftRightFilter';
                function Filter() {
                    return (Filter.is(this)?this.init:Filter.F).apply(this,APS.call(arguments));
                }
                Filter.xInheritE(PAR);
                var TPLS = null;
                /*====>Templates=====*/
TPLS={"filter":"<div class=\"{{getCssClass}}FilterClassContent\">\n    <div class=\"{{getCssClass}}XFilterZone {{getCssClass}}ZoneX1 {{getCssClass}}ActiveMarker{{#isZoneActive}}1{{\/isZoneActive}}\" data-command=\"SetZone\" data-zone-id=\"1\">{{#getNameForZone}}1{{\/getNameForZone}}<\/div>\n    <div class=\"{{getCssClass}}XFilterZone {{getCssClass}}ZoneX2 {{getCssClass}}ActiveMarker{{#isZoneActive}}2{{\/isZoneActive}}\" data-command=\"SetZone\" data-zone-id=\"2\">{{#getNameForZone}}2{{\/getNameForZone}}<\/div>\n    <div class=\"{{getCssClass}}XFilterZone {{getCssClass}}ZoneX3 {{getCssClass}}ActiveMarker{{#isZoneActive}}3{{\/isZoneActive}}\" data-command=\"SetZone\" data-zone-id=\"3\">{{#getNameForZone}}3{{\/getNameForZone}}<\/div>\n    <div class=\"{{getCssClass}}XFilterZone {{getCssClass}}ZoneX4 {{getCssClass}}ActiveMarker{{#isZoneActive}}4{{\/isZoneActive}}\" data-command=\"SetZone\" data-zone-id=\"4\">{{#getNameForZone}}4{{\/getNameForZone}}<\/div>\n<\/div>"};
/*=====Templates<====*/
                var ST = null;
                /*====>Styles=====*/
ST={"style":"#appContent .EFOFlatControllerWraper.FlatControllerLeftRightFilterWrapper{position:static;padding:.5em}.LeftRightFilterFilterClassContent{display:flex;flex-direction:row;justify-content:center}.LeftRightFilterXFilterZone{width:40%;overflow:hidden;margin:0 .5em;color:#760000;border:1px solid #760000;display:block;line-height:2.5em;box-sizing:border-box;padding:0 .5em;cursor:pointer;transition:all .3s}.LeftRightFilterXFilterZone:hover{color:white;background:#760000}.LeftRightFilterXFilterZone.LeftRightFilterHilighted{background:#760000;color:white}.LeftRightFilterFilterClassContent{flex-wrap:wrap}.LeftRightFilterXFilterZone{margin-bottom:.5em}.LeftRightFilterXFilterZone.LeftRightFilterActiveMarkerdisabled,.LeftRightFilterXFilterZone.LeftRightFilterActiveMarkerdisabled:hover{color:darkgray;border-color:darkgray;background:transparent;display:none}.LeftRightFilterXFilterZone{text-align:center}"};
/*=====Styles<====*/;
                EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
                EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
                var F = Filter; //миксины не наследубтся!
                F.mixines = ['Roleable', 'Commandable', 'Monitorable', 'Callbackable'];
                U.initMixines(F);
                F.prototype.MD = MD;
                //<editor-fold defaultstate="collapsed" desc="overrides">
                F.prototype.getCssClass = function () {
                    return MC;
                };
                F.prototype.getControllerAlias = function () {
                    return MC;
                };               
                //</editor-fold>


                

                F.prototype.getFilterTemplate = function () {
                    return EFO.TemplateManager().get('filter',MC);
                };

                
                CF.leftRightFilter =F;

            }
        }



    }
})();