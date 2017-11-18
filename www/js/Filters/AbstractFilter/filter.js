(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EFOReady);
    function EFOReady() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice, PAR = EFO.flatController, PARP = PAR.prototype;
        window.Eve.ConFil = window.Eve.ConFil || {};
        var CF = E.ConFil;
        window.Eve.ConFil.Ready = window.Eve.ConFil.Ready || [];
        window.Eve.ConFil.AbstractFilter ? false : initPlugin();
        function initPlugin() {
            var MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
            function AbstractFilter() {
                U.AbstractError();
            }
            AbstractFilter.xInheritE(PAR);
            var TPLS = null;
            /*<?=$this->includeTemplates('TPLS')?>*/
            var ST = null;
            /*<?=$this->includeStyles('ST')?>*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
            var F = AbstractFilter;
            F.mixines = ['Roleable', 'Commandable', 'Monitorable', 'Callbackable'];
            U.initMixines(F);
            F.prototype.MD = MD;
            //<editor-fold defaultstate="collapsed" desc="overrides">
            F.prototype.getCssClass = function () {
                return MC;
            };
            F.prototype.getControllerAlias = function () {
                return MC;
            };
            F.prototype.getContentTemplate = function () {
                return EFO.TemplateManager().get([MC, 'Main'].join('.'));
            };

            F.prototype.onInit = function () {
                PARP.onInit.apply(this, APS.call(arguments));
                this.isZoneActive = this._isZoneActive.bindToObject(this);
                this.getNameForZone = this._getNameForZone.bindToObject(this);
                return this;
            };
            //</editor-fold>


            F.prototype.install = function (container, items) {
                var activeZones = [];
                items = U.safeArray(items);
                this.zoneNames={};
                for (var i = 0; i < items.length; i++) {
                    var xi = U.IntMoreOr(items[i].info.filter_value, 0, null);
                    xi ? activeZones.push(xi) : false;
                    this.zoneNames["P"+xi]=items[i].info.name;
                }
                
                this.setContainer(container);
                this.updateZonesContent(activeZones);
                
                if (activeZones.length) {
                    this.setZoneHilight(activeZones[0]);
                    this.runCallback(activeZones[0]);
                }
                return this;
            };

            F.prototype.updateZonesContent = function (activeZones) {                
                var t = this.getFilterTemplate();
                this.activeZones = activeZones;
                this.getRole('filter_content').html(Mustache.render(t, this));
                return this;
            };

            F.prototype.getFilterTemplate = function () {
                return '';
            };

            F.prototype.onCommandSetZone = function (t) {
                //репорт родителю                  
                var id = U.IntMoreOr(t.data('zoneId'));
                var fid = null;
                for (var i = 0; i < this.activeZones.length; i++) {
                    if (this.activeZones[i] === id) {
                        fid = this.activeZones[i];
                        break;
                    }
                }
                if (fid) {
                    this.setZoneHilight(fid);
                    this.runCallback(fid);

                }
            };

            F.prototype._isZoneActive = function () {
                return this.isZoneActiveReal.bindToObject(this);
            };
            F.prototype._getNameForZone = function(){
                return this.getNameForZoneReal.bindToObject(this);
            };
            
            F.prototype.getNameForZoneReal = function(a,b){
                var z = U.IntMoreOr(b(a));
                if (z) {
                    var P = "P"+z;
                    if(U.NEString(this.zoneNames[P],null)){
                        return U.NEString(this.zoneNames[P],null);
                    }
                }
                return "---";
            };

            F.prototype.isZoneActiveReal = function (a, b) {
                
                var z = U.IntMoreOr(b(a));
                if (z) {
                    for (var i = 0; i < this.activeZones.length; i++) {
                        if (this.activeZones[i] === z) {
                            return '';
                        }
                    }
                }
                return 'disabled';
            };

            F.prototype.clear = function () {
                this.activeZones = [];
                this.getRole('filter_content').html('');
                this.clearCallbacks();
                this.handle.remove();
                this.handle = null;
                return this;
            };

            F.prototype.setZoneHilight = function (fid) {
                this.handle.find('.' + this.getCssClass() + 'Hilighted').removeClass(this.getCssClass() + 'Hilighted');
                this.handle.find('.' + this.getCssClass() + 'ZoneX' + fid).addClass(this.getCssClass() + 'Hilighted');
                return this;
            };

            CF.AbstractFilter = F;








            if (U.isArray(CF.Ready)) {
                var i = [].concat(CF.Ready);
                CF.Ready = {
                    push: function (x) {
                        if (U.isCallable(x)) {
                            try {
                                x();
                            } catch (e) {
                                U.TError(e.message);
                            }
                        }
                    }
                };
                for (var j = 0; j < i.length; j++) {
                    CF.Ready.push(i[j]);
                }
            }

        }


    }
})();