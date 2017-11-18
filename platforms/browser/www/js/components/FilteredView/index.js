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