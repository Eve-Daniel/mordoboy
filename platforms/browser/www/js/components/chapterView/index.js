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