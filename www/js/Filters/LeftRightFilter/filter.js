(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(EFOReady);
    function EFOReady() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice ;
        window.Eve.ConFil = window.Eve.ConFil || {};
        var CF = E.ConFil;
        window.Eve.ConFil.Ready = window.Eve.ConFil.Ready || [];
        CF.Ready.push(CFReady);
        function CFReady() {
            var PAR = CF.AbstractFilter, PARP = PAR.prototype;
            CF.leftRightFilter ? false : initPlugin();
            
            function initPlugin() {
                var MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
                function Filter() {
                    return (Filter.is(this)?this.init:Filter.F).apply(this,APS.call(arguments));
                }
                Filter.xInheritE(PAR);
                var TPLS = null;
                /*<?=$this->includeTemplates('TPLS')?>*/
                var ST = null;
                /*<?=$this->includeStyles('ST')?>*/;
                EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
                EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
                var F = Filter; //миксины не наследубтся!
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
                //</editor-fold>


                

                F.prototype.getFilterTemplate = function () {
                    return EFO.TemplateManager().get('filter',MC);
                };

                
                CF.leftRightFilter =F;

            }
        }



    }
})();