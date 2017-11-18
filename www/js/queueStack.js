(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EReady);

    function EReady() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice;
        EFO.queueStack ? false : initPlugin();
        function initPlugin() {

            function queueStack() {
                return (queueStack.is(this) ? this.init : queueStack.F).apply(this, APS.call(arguments));
            }
            U.FixCon(queueStack);
            var F = queueStack;


            F.prototype._tasks = null;

            F.prototype.init = function () {
                this.clear();
                return this;
            };

            F.prototype.clear = function () {
                this._tasks = [];
                return this;
            };

            /**
             * ставит задание в очердь.
             * !задание может быть асинхронным, пожтому к следующему заданию не перходим, пока нет сигнала от самого задания
             * (оно должно выставить себе флажок "выполнено" и вызвать метод next)
             * @param {Object} context  -- контекст выполнения
             * @param {Function} callable -- функция задания
             * @param {Object|null} argobj  -- допаргументы - POJO.содержит номер ордера и други поля, понятные callable
             * @param {boolean} shift [false] - добавить задание в начало очереди
             * @returns {queueStack}
             */
            F.prototype.addTask = function (context, callable, argobj, shift) {
                var task = new Task(context, callable, U.safeObject(argobj));
                if (task && task.isValid()) {
                    U.anyBool(shift, false) ? this._shiftTask(task) : this._pushTask(task);
                    return task;
                }
                return null;
            };

            /**
             * 
             * @param {Task} task
             * @returns {EFO.queueStack}
             */
            F.prototype._shiftTask = function (task) {
                this._tasks = [task._setState(TASKSTATES.QUEUED)].concat(this._tasks);
                return this;
            };

            F.prototype._pushTask = function (task) {
                this._tasks.push(task._setState(TASKSTATES.QUEUED));
                return this;
            };

            F.prototype.next = function () {
                var lc = this._removeFinishedTasks();
                //queueStack - блокирован, все рано не работает
                if (true||lc === 0) { // если нет других запущенных
                    this._nextInternal();
                }
                return this;
            };

            F.prototype._nextInternal = function () {
                for (var i = 0; i < this._tasks.length; i++) {
                    if (this._tasks[i].state === TASKSTATES.QUEUED) {
                        this._tasks[i].run(this);
                        break;
                    }
                }
                return this;
            };

            F.prototype._removeFinishedTasks = function () {
                var ns = [];
                var lc = 0;
                for (var i = 0; i < this._tasks.length; i++) {
                    this._tasks[i].canRemove() ? this._tasks[i].onRemove() : ns.push(this._tasks[i]);
                    this._tasks[i].state === TASKSTATES.RUNNING ? lc++ : false;
                }
                this._tasks = ns;
                return lc;
            };






            var TASKSTATES = {
                "INITIAL": 0,
                "QUEUED": 100,
                "RUNNING": 200,
                "FINISHED": 300,
                "FINISHEDERROR": 400
            };
            function Task(co, ca, arg) {
                return (Task.is(this) ? this.init : Task.F).apply(this, APS.call(arguments));
            }
            U.FixCon(Task);

            Task.prototype.args = null;
            Task.prototype.context = null;
            Task.prototype.callable = null;
            Task.prototype.state = null;
            Task.prototype.queue = null; // родительская очередь (для отзывов)

            Task.prototype.init = function (co, ca, arg) {
                this.args = U.safeObject(arg);
                this.context = U.isObject(co) ? co : null;
                this.callable = U.isCallable(ca) ? ca : null;
                this.state = TASKSTATES.INITIAL;
                return this;
            };

            Task.prototype.isValid = function () {
                return this.context && this.callable && (this.state === TASKSTATES.INITIAL) ? true : false;
            };

            /**
             * запускает текущую задачу на выполнение
             * @param {EFO.queueStack} queue
             * @returns {undefined}
             */
            Task.prototype.run = function (queue) {
                queueStack.is(queue) ? false : U.Error('queueStack required');
                this.state === TASKSTATES.QUEUED ? false : U.Error('wrongState');
                this.queue = queue;
                this.state = TASKSTATES.RUNNING;
                try {
                    this._runInternal();
                } catch (e) {// в случае ошибки - пометить таск как завершенный, вызвать некст и выкинуть TError
                    this.state = TASKSTATES.FINISHEDERROR;
                    this.queue.next();
                    U.TError(e.message);
                }
                return this;
            };

            Task.prototype._runInternal = function () {
                this.callable.apply(this.context, [this]);
            };

            Task.prototype.canLaunch = function () {
                return this.state === TASKSTATES.QUEUED ? true : false;
            };

            Task.prototype.canRemove = function () {
                return (this.state === TASKSTATES.FINISHED || this.state === TASKSTATES.FINISHEDERROR) ? true : false;
            };

            Task.prototype.complete = function () {
                this.state = TASKSTATES.FINISHED;
                this.queue.next();
            };

            Task.prototype.error = function () {
                this.state = TASKSTATES.FINISHEDERROR;
                this.queue.next();
            };

            Task.prototype.getParam = function (n) {
                return this.args && (n in this.args) ? this.args[n] : void(0);
            };

            Task.prototype._setState = function (x) {
                U.IntMoreOr(x, 0, 0) > this.state ? false : U.Error("LowerState");
                this.state = x;
                return this;
            };

            /**
             * 
             * @param {Task} task
             * @returns {any}
             */
            Task.prototype.callback_signature = function (task) {
                U.Error("Abstract");
                task.complete();
                task.error();
            };

            Task.prototype.onRemove = function () {
                var c = this.getParam('onRemove');
                if (U.isCallable(c)) {
                    try {
                        c.apply(this.context, [this]);
                    } catch (e) {

                    }
                }
                this.callable = null;
                this.context = null;
                this.args = null;
                this.queue = null;
                return this;
            };






            F.task_class = Task;
            EFO.queueStack = F;
        }
    }
})();