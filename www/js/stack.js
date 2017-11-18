(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EFOReady);
    function EFOReady() {
        window.Eve.appStack ? false : initPlugin();
        function initPlugin() {
            var E = window.Eve, EFO = E.EFO, U = EFO.U, H = null, APS = Array.prototype.slice;
            function AppStack() {
                return AppStack.is(H) ? H : ((AppStack.is(this) ? this.init : AppStack.F).apply(this, APS.call(arguments)));
            }
            U.FixCon(AppStack);
            var F = AppStack;

            F.prototype.s = null;
            F.prototype.menuInt = null; //интерцептор для меню - оно есть всегда

            F.prototype.init = function () {
                H = this;
                this.s = [];
                document.addEventListener('backbutton', this.onBackButton.bindToObject(this));
                return this;
            };

            //push - если текущий есть в стеке - очистить стек до текущего
            // если нет - вставить
            // pop - если текущий - последний - выйти
            // иначе - извлечь последний, спрятать, показать предыдущий
            // back - передать вержнему компоненту на обработку
            // если обработает сам - ничего
            //иначе - pop
            //remove - если переданный компонент есть в стеке - убрать.
            //если переданный был последним - выполнить те же действия что и при POP


            F.prototype.onBackButton = function () {                
                if (U.isCallable(this.menuInt)) {
                    this.menuInt();
                    return this; // если установлен перехватчик - вызвать его
                }
                var x = this.getTopComponent();
                if (x) {
                    var r = false;
                    try {
                        r = x.stackOnBackButton(); //спросить у компонента - не хочет ли он сам обработать
                    } catch (e) {
                        r = false;
                    }
                    if (r) {
                        //this.pop(); //если ок - ничего не делать
                        return this;
                    }
                }
                return this.pop(); //вытолкнуть верхний компонент
            };

            F.prototype.pop = function () {
                var x = this.s.pop();
                if (x) {
                    x.stackOnPopPushOver(); //уведомляем компонент, что он покинул вершину стека (вынут или перекрыт)
                    var y = this.getTopComponent();
                    if (y) {
                        y.onTopStack(); // уведомляем компонен что он на вершине стека
                        return this;
                    }
                }
                navigator.app.exitApp(); // если больше нет компонентов - выходим
                return this;
            };

            F.prototype.getTopComponent = function () { //возвращает верхний компонент, не извлекая его из стека
                if (U.isArray(this.s) && this.s.length) {
                    return this.s[this.s.length - 1];
                }
                return null;
            };

            F.prototype.push = function (x) { //засовываем компонент в стек                
                var f = null;
                //ищем предыдущий вариант этого компонента
                for (var i = 0; i < this.s.length; i++) {
                    if (this.s[i] === x) {
                        f = this.s[i];
                        break;
                    }
                }
                if (f) { //найдена педыдущая
                    while (this.getTopComponent() !== x) {
                        this.pop(); //извлекаем все вышележащие
                    }
                } else {
                    var lt = this.getTopComponent();
                    if (lt) {
                        lt.stackOnPopPushOver(); // предыдущий - покинул вершину
                    }
                    this.s.push(x);
                    x.onTopStack(); //текущий занял вершину
                }
                return this;
            };

            F.prototype.remove = function (x) {
                var tx = this.getTopComponent();
                if (tx === x) {
                    return this.pop();
                } //если удаляемый - на вершине - вызвать pop
                var ts = [];
                for (var i = 0; i < this.s.length; i++) {
                    if (this.s[i] !== x) {
                        ts.push(this.s[i]);
                    }
                }
                this.s = ts;
                /// если в результате стек опустел - выйти
                if (!this.s.length) {
                    navigator.app.exitApp();
                }
                return this;
            };


            F.prototype.setMenuInt = function (x) {
                this.menuInt = U.isCallable(x) ? x : null;
                return this;
            };
            
            /*
             * Интерфейс стека
             * компонент:
             * stackOnBackButton - ret false - default,true-no default. opt
             * stackOnPopPushOver = Компонент покинул вершину. спрятать
             * onTopStack - компонент на вершине стека. показать
             * 
             * стек:
             * setMenuInt - установить перехватчик меню
             * remove - удалить указанный компонент
             * push - указанный компонент - на вершину
             * pop - компонент с вершины - убрать и вернуть предыдущий
             * 
             */



              F(); //это чтобыстек стразу







            E.appStack = F;
            window.__testback = F().onBackButton.bindToObject(F());
        }
    }

})();