(function () {
    var E = window.Eve, EFO = E.EFO, U = EFO.U, H = null, MC = '<?=$this->MC?>', MD = '<$this->MD>', FQCN = '<?=$this->FQCN?>';
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
        /*<?=$this->includeTemplates('TPLS')?>*/
        var ST = null;
        /*<?=$this->includeStyles('ST')?>*/;
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