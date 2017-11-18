(function () {
    var initialized = false;
    var openurl = null;
    document.addEventListener('deviceready', devready, false);

    function devready() {
        window.handleOpenURL = function (url) {
            openurl = url;
        };
        jQuery(appready);
    }

    function appready() {
        if (initialized) {
            return;
        }
        initialized = true;
        var E = window.Eve, EFO = E.EFO, U = EFO.U;
        var t = Eve.EFO.Request.getRequestOptions();
        t.statusSection = 's';
        t.errorSection = 'e';
        t.registerPreprocessor(function (rq) {
            //rq.data.session_name = localStorage.getItem('session');
            //if (!U.NEString(rq.data.session_name) || rq.data.session_name.length < 10) {
            //   delete(rq.data.session_name);
            //}
            //rq.data.uiToken = localStorage.getItem('uiToken');
            //rq.data['lock-client-cookie'] = 1;
            //device.uuid ? rq.data.devid = device.uuid : false;
        });
        t.registerPostprocessor(function (rq, ro) {
            if (U.isObject(ro) && U.isObject(ro.m)) {
                if (!U.anyBool(ro.m.ignoreSession, false)) {
                    ('session' in ro.m) ? localStorage.setItem('session', U.NEString(ro.m.session, '')) : false;
                    ('token' in ro.m) ? localStorage.setItem('uiToken', U.NEString(ro.m.token, '')) : false;

                    window.cookieMaster ? cookieMaster.setCookieValue(E.Config().getHost(), 'uiDevId', device.uuid ? [device.uuid, "path=/", "domain=" + E.Config().getDomain(), "expires=" + E.Config().getCookieLifeTime()].join(';') : null,
                            function () {
                                //console.log('A cookie has been set');
                            },
                            function (error) {
                                //console.log('Error setting cookie: ' + error);
                                U.TError('cserror' + error);
                            }) : false;
                    window.cookieMaster ? cookieMaster.setCookieValue(E.Config().getHost(), 'uiToken', [ro.m.token, "path=/", "domain=" + E.Config().getDomain(), "expires=" + E.Config().getCookieLifeTime()].join(';')) : false;
                }
            }
        });
        ///перехват ошибки стстауса
        EFO.LoginMon().handleStatus = function (success, fail) {
            var ev = EFO.Events.GEM().On('LOGIN_SUCCESS', this, function (x) {
                success(x);
                EFO.Events.GEM().Off(ev);
            });
            EFO.Com().com('DAP.login').done(function (x) {
                x().install(); //показать, но отказ принимать как ошибку
            }).fail(function () {
                U.TError(this._T("RequiredComponentFail"));
                fail();
            });
            return this;
        };
        window.Eve.EFO.Com().setPrimaryUrl('/Com/');
        var LD = Eve.EFO.LDriver2();
        //зашить в дефолты и вызывать только по необходимости
        LD.setSKey('lang').setDefault('ru').setAutoProp('transtoken')
                .setLoadUrl(E.Config().mkurl('/Lang/'))
                .setReportUrl(E.Config().mkurl('/API/Info/Lang/ReportLangError'))
                .setFile('client')
                .setKeepKey('langObject')
                .setListUrl(E.Config().mkurl('/Lang/list_active.json'))
                .setElement(document.createElement('div'));
        LD.loadStatic();
        if (LD.isLoaded()) {
            LD.updateNodes().checkUpdates();
            runApp();
        } else if (LD.isSelected()) {
            LD.loadRemote().ready().done(this, function () {
                LD.updateNodes();//CU не надо - он только что загружен
                runApp();
            });
        } else {
            showSelector();//селектор - отдельный компонент
        }


        function showSelector() {
            EFO.Com().com('langselect')
                    .done(function (x) {
                        x().show(); //дальше он все сам
                        // стек пустой
                    })
                    .fail(function () {
                        alert("ErrorLoadingComponent");
                    });
        }

        function appShowLoader() {
            document.getElementById('appLoader').style.display = 'block';
        }

        function appHideLoader() {
            document.getElementById('appLoader').style.display = 'none';
        }
        function hour() {
            var m = /^mordobox:\/\/excersize\/(.{1,})$/.exec(openurl);
            if (m) {
                EFO.Com().com('excersizeView')
                        .done(function (x) {
                            x().loadAlias(m[1]).show();
                        })
                        .fail(this, this.onRequiredComponentFail);
            }
            openurl = null;
        }

        function runApp() {
            EFO.Request('get', E.Config().mkurl('/API/Client/Ping/Ping'))
                    .done(function () {
                        EFO.Promise.waitForArray([
                            EFO.Com().com('toolbar').done(function (x) {
                                x().install();
                            }),
                            EFO.Com().com('menu').done(function (x) {
                                x().install();
                            }),
                            EFO.Com().com('newBook').done(function (x) {
                                x().install();
                                EFO.Com().com('DAP.login').done(function (y) {
                                    y().removeStack(); //убрать логин из стека
                                });
                                //E.Config().removeStack(x());//последний
                            })
                        ]).done(function () {
                            if (openurl) {
                                hour();
                            }
                            appHideLoader();
                        });
                    })
                    .fail(function () {
                        debugger;
                    });
        }

        window.onerror = function (m) {
            new EveFlash({ICON: "!", IMAGE: "stop", cssclass: "crimson", TITLE: {}._T("ErrorMessageTitle"), TEXT: {}._T(m), CLOSE: false, TO: 7500});
        };

    }

})();