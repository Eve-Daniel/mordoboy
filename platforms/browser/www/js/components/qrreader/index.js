(function () {
    var MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
    //<editor-fold defaultstate="collapsed" desc="Импорт">
    var Y = window.Eve.EFO.Com();
    var imports = [];
    //</editor-fold>

    function initPlugin() {
        var MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
        var E = window.Eve, EFO = E.EFO, U = EFO.U, PAR = EFO.flatController, PARP = PAR.prototype, H = null;
        var TPLS = null;
        /*<?=$this->includeTemplates('TPLS')?>*/
        var ST = null;
        /*<?=$this->includeStyles('ST')?>*/;
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