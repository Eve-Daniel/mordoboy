(function () {

    /**** 
     *CONFIGURATION 
     */
    var DOMAIN = "mordoboy.ironstar.pw";
    var HOST = "https://" + DOMAIN;
//    if(/^http.*/.test(window.location.href)){
//        HOST="//";
//    };



    var E = window.Eve, EFO = E.EFO, U = EFO.U, H = null;
    function Config() {
        return Config.is(H) ? H : Config.is(this) ? this.init() : Config.F();
    }
    U.FixCon(Config);

    var F = Config;

    F.prototype.stack = null;
    F.prototype.userInfo = null;
    F.prototype.mainurl = null;
    F.prototype.init = function () {
        H = this;
        this.mainurl = HOST.replace(/\/{1,}$/, '') + '/';
        this.registerListener();
        this.stack = [];
        return this;
    };

    F.prototype.getHost = function () {
        return HOST;
    };

    F.prototype.getDomain = function () {
        return DOMAIN;
    };

    F.prototype.getQueue = function () {
        if (!this.queue) {
            this.queue = EFO.queueStack();
        }
        return this.queue;
    };

    F.prototype.getCookieLifeTime = function () {
        var d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        d.toUTCString();
//        return [
//            [d.getFullYear(),
//                this.pad(d.getMonth()+1),
//                this.pad(d.getDate())].join('-'), 'T',
//            [this.pad(d.getHours()),
//                this.pad(d.getMinutes()),
//                '00.000Z'
//            ].join(':')
//
//        ].join('');
    };

    F.prototype.pad = function (x) {
        var c = x.toString();
        return c.length > 1 ? c : ['0', c].join('');
    };

    F.prototype.mkurl = function (x) {
        return [this.mainurl, x.replace(/^\/{1,}/, '')].join('');
    };

    F.prototype.mkurlfull = function (x) {
        //  var session = localStorage.getItem('session');
        // var token = localStorage.getItem('uiToken');
        //  var devid = device.uuid;
        //, '?session_name=', session, '&uiToken=', token
//        if(/192\.168/.test(window.location.href)){
//            return [this.mainurl, x.replace(/^\/{1,}/,''), '?uiToken=',token].join('');
//        }
        return [this.mainurl, x.replace(/^\/{1,}/, '')].join('');
    };
    F.prototype.mkurlfullvideo = function (x) {
        var session = localStorage.getItem('session');
        var token = localStorage.getItem('uiToken');
        var devid = device.uuid;
        //, '?session_name=', session, '&uiToken=', token
        if (/192\.168/.test(window.location.href)) {
            return [this.mainurl, x.replace(/^\/{1,}/, ''), '&uiToken=', token].join('');
        }
        return [this.mainurl, x.replace(/^\/{1,}/, '')].join('');
    };

    F.prototype.registerListener = function () {
        EFO.Request.getRequestOptions().registerPostprocessor(this, this.onPostprocessor);
        //document.addEventListener('backbutton', this.onBackButton.bindToObject(this));
        return this;

    };

    F.prototype.pushComponent = function (x) {
        U.Error('deprecated');
        this.stack.length && this.stack[this.stack.length - 1] === x ? false : this.stack.push(x);
        return this;
    };

    F.prototype.popSilent = function () {
        U.Error('deprecated');
        this.stack = this.stack.slice(0, this.stack.length - 1);
        return this;
    };

    F.prototype.pop = function () {
        U.Error('deprecated');
        if (this.stack.length) {
            this.stack[this.stack.length - 1].stackHide();
            this.popSilent();
            this.stack.length ? this.stack[this.stack.length - 1].stackShow() : false;
        }
        return this;
    };

    F.prototype.removeStack = function (x) {
        U.Error('deprecated');
        var t = [];
        for (var i = 0; i < this.stack.length; i++) {
            this.stack[i] === x ? false : t.push(this.stack[i]);
        }
        this.stack = t;
        return this;
    };

    F.prototype.onBackButton = function () {
        U.Error('deprecated');
        var x = this.stack.length;
        try {
            x ? this.pop() : navigator.app.exitApp();
        } catch (e) {

        }
        return x ? false : true;

    };

    F.prototype.getLang = function () {
        return localStorage.getItem('lang');
    };

    F.prototype.getSlowSwitchPreset = function () {
        return U.anyBool(localStorage.getItem('slowswitch'), false);
    };

    F.prototype.setSlowSwitch = function (x) {
        localStorage.setItem('slowswitch', U.anyBool(x, false) ? "1" : "0");
        EFO.Events.GEM().Run('SLOWSWITCH_STATE');
        return this;
    };


    F.prototype.onPostprocessor = function (rq, d) {
        if (U.isObject(d) && U.isObject(d.d) && U.isObject(d.d.userInfo)) {
            this.userInfo = JSON.parse(JSON.stringify(d.d.userInfo));
            EFO.Events.GEM().Run('USERINFO_UPDT', this.userInfo);
        }
        return this;
    };

    E.Config = Config;

})();