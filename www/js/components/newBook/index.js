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