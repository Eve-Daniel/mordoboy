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
