(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(ready);
    function ready() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice;
        EFO.videoSlider ? false : initPlugin();

        function initPlugin() {
            var PAR = EFO.flatController, PARP = PAR.prototype;
            var MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
            var TPLS = null;
            /*<?=$this->includeTemplates('TPLS')?>*/
            var ST = null;
            /*<?=$this->includeStyles('ST')?>*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
           // EFO.ImageManager().install([MC, 'icon'].join('.'));

            function videoSwitch() {
                return (videoSwitch.is(this) ? this.init : videoSwitch.F).apply(this, APS.call(arguments));
            }
            videoSwitch.xInheritE(PAR);
            var F = videoSwitch;
            F.mixines = ['Roleable', 'Commandable', 'Monitorable'];
            U.initMixines(F);
            F.prototype.MD = MD;
            F.prototype.onCommandReplay = function(){
                this.onChanged();
                return this;
            };
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

            F.prototype.enumSubTemplates = function () {
                var x = PARP.enumSubTemplates.apply(this, APS.call(arguments));
                return U.safeArray(x).concat([
                    MC + '.slowSwitch'
                            , MC + '.navi'
                ]);
            };

            F.prototype.onInit = function () {
                PARP.onInit.apply(this, APS.call(arguments));
                EFO.Events.GEM().On('SLOWSWITCH_STATE', this, this.onSlowSwitchState);
                this.createLoader = this._createLoader.bindToObject(this);
                return this;
            };
            //</editor-fold>
            //компонент обеспечивает рендеринг и загрузку видео, наследуем от EFO.flatController
            //<editor-fold defaultstate="collapsed" desc="set-clear-control">
            F.prototype.clear = function () {
                this.images = null;
                this.getRole('navblock').hide();
                this.error = "noExtendedVideo";
                this.handle.find('video').each(function(){
                    window.clearTimeout(this.whto); 
                });
                this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('error', MC), this));
                this.getRole('slowContainer').hide();
                return this;
            };

            F.prototype.setData = function ($images,stamp) {
                $images = U.safeArray($images);
                this.clear();
                if ($images.length) {
                    this.stamp = stamp;
                    this.images = [].concat($images);
                    for(var i = 0;i<this.images.length;i++){
                        this.images[i].xxindex=i;
                    }
                    this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('images', MC), this, {loader: EFO.TemplateManager().get('loader', MC)}));
                    this.images.length>1?this.getRole('navblock').show():false;
                    this.getRole('slowContainer').show();
                }

                return this;
            };

            F.prototype.onCommandNavTo = function (t) {
                var current = this.handle.find('.'+MC+"ActiveImage");
                var index = parseInt(current.data('index'));
                var dir=parseInt(t.data('x'));
                if(dir===-1){
                   index--;    
                }else{
                    index++;
                }
                var next = this.handle.find('[data-index='+index+']');
                if(!next.length){
                    next = dir===-1?this.handle.find('.'+MC+"owWrapper:last"):this.handle.find('.'+MC+"owWrapper:first");
                }
                current.removeClass(MC+"ActiveImage");
                next.addClass(MC+"ActiveImage");
                return this.onChanged();
            };

            F.prototype.onChanged = function () {                
                var self= this;
                this.handle.find('video').each(function () {
                    try {
                        if (jQuery(this).is(':visible')) {
                            self.setVideoTagVisible(this);
                        } else {
                            self.setVideoTagInvisible(this);                            
                        }
                    } catch (e) {

                    }
                });
                return this;
            };
            //</editor-fold>            
            //<editor-fold defaultstate="collapsed" desc="slowSwitch">
            F.prototype.onSlowSwitchState = function () {
                var cstate = E.Config().getSlowSwitchPreset();
                this.getRole('slowswitch').prop('checked', cstate);
                this.handle.find('video').each(function () {
                    this.playbackRate = cstate ? .3 : 1;
                });
                return this;
            };
            F.prototype.onMonitorSlowswitch = function (t) {
                E.Config().setSlowSwitch(t.prop('checked'));
                return this;
            };
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="renderers">
            F.prototype.slowSwitch = function () {
                return E.Config().getSlowSwitchPreset();
            };

            F.prototype._createLoader = function () {
                return this._createLoaderInternal.bindToObject(this);
            };
            
            F.prototype.ifZero = function(){
                return this.xxindex===0?true:false;
            };
            
            F.prototype.setVideoTagVisible = function (x) {
                window.clearTimeout(x.whto);
                var self = this;               
                var tc = x.currentTime;
                x.whto = window.setTimeout(function () {
                    if (((x.currentTime === tc)||(tc===0 && x.currentTime<1)) && !x.paused) {                    
                        x.oncanplaythrough = function () {
                            this.oncanplaythrough = null;
                            if (jQuery(this).is(':visible')) {
                                self.setVideoTagVisible(this);                                
                            } else {
                                self.setVideoTagInvisible(this);                               
                            }
                        };
                        x.load();
                    }
                }, 2000);
                var cstate = E.Config().getSlowSwitchPreset();
                x.play();
                x.playbackRate = cstate ? .3 : 1;
            };
            
            F.prototype.setVideoTagInvisible = function(x){
                x.pause();
                window.clearTimeout(x.whto);
            };

            F.prototype._createLoaderInternal = function (a, b) {                
                //https://mordoboy.ironstar.pw/PVideoFly/EXCEXT/N104/A104N0P/500_500.mp4?a=a1508024353449
                var url = "/PVideoFly/EXCEXT/N"+b(a);
                var id = [MC, "videx", U.UID()].join('');
                var fullUrl = [E.Config().mkurl(url), "/600_600.webm"].join('');
                var token = localStorage.getItem('uiToken') + "&nowritecookie=1&uiDevId=" + device.uuid;
                var self = this;
                if (window.videoLoader) {
                    window.videoLoader.loadVideo(fullUrl, token, U.IntMoreOr(this.stamp, 0, 0),
                            function (m) { //success
                                self.mkVideoWithSource(m,id);
//                                var vq = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>');
//                                var v = vq.get(0);
//                                v.oncanplaythrough = function () {
//                                    jQuery('#' + id).html('').append(v);
//                                    this.oncanplaythrough = null;
//                                    var cstate = E.Config().getSlowSwitchPreset();
//                                    if (jQuery(this).is(':visible')) {                                        
////                                        this.play();
////                                        //jQuery(this).addClass(MC+'Playing');
////                                        this.playbackRate = cstate ? .3 : 1;
//                                        self.setVideoTagVisible(this);
//                                    } else {
//                                        self.setVideoTagInvisible(this);
//                                        //this.pause();
//                                        //jQuery(this).removeClass(MC+'Playing');
//                                    }
//                                };
//                                v.onerror = function (z) {
//                                    jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                                };
//                                jQuery(v).append(['<source src="', m, '" type="video/webm" />'].join(''));
                            },
                            function (e) {//error
                                //alert(e);
                                jQuery('#' + id).html({}._T("ErrorVideoLoading"));
                            }
                    );
                } else {
                    var url = E.Config().mkurlfullvideo([url, "/600_600.webm?nowritecookie=1"].join(''));
                    self.mkVideoWithSource(url,id);
//                    var v = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>').get(0);
//                    v.onerror = function (z) {
//                        jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                    };
//                    v.oncanplaythrough = function () {
//                        jQuery('#' + id).html('').append(this);
//                        this.oncanplay = null;
//                        this.oncanplaythrough = null;
//                        var cstate = E.Config().getSlowSwitchPreset();
//                        if (jQuery(this).is(':visible')) {
//                             self.setVideoTagVisible(this);
//                        } else {
//                            self.setVideoTagInvisible(this);
//                        }
//
//                    };
//               
//                    jQuery(v).append(['<source src="', url.replace('.mp4', '.webm'), '" type="video/webm" /><source src="', url, '" type="video/mp4" />'].join(''));
                }
                return id;

            };
            
            
            F.prototype.mkVideoWithSource = function (url, containerId) {
                E.Config().getQueue().addTask(this, this.mkVideoSourceDo, {url: url, id: containerId});
                E.Config().getQueue().next();
                return this;
            };

            F.prototype.mkVideoSourceDo = function (task) {  
                //alert('vitask launchd');                
                var vis = '<video loop  webkit-playsinline playsinline preload="auto" ></video>';
                var vij = jQuery(vis);
                var vid = vij.get(0);
                var ip = jQuery("#" + task.getParam('id'));
                vid.oncanplaythrough = function () {
                    jQuery("#" + task.getParam('id')).html('').append(this);
                    this.oncanplaythrough = null;
                    if (jQuery(this).is(':visible')) {
                        task.context.setVideoTagVisible(this);
                    } else {
                        task.context.setVideoTagInvisible(this);
                    }
                    //alert('vitaskComplete');
                    task.complete();
                };
                vid.onerror = function (z) {
                    jQuery("#" + task.getParam('id')).html({}._T("ErrorVideoLoading"));
                    task.error();
                };                
                vij.append(['<source src="', task.getParam('url'), '" type="video/webm" />'].join(''));
            };
            //</editor-fold>
            EFO.videoSlider = F;
        }
    }
})();