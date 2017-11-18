(function () {
    window.Eve = window.Eve || {};
    window.Eve.EFO = window.Eve.EFO || {};
    window.Eve.EFO.Ready = window.Eve.EFO.Ready || [];
    window.Eve.EFO.Ready.push(ready);
    function ready() {
        var E = window.Eve, EFO = E.EFO, U = EFO.U, APS = Array.prototype.slice;
        EFO.videoSwitch ? false : initPlugin();

        function initPlugin() {
            var PAR = EFO.flatController, PARP = PAR.prototype;
            var MC = '<?=$this->MC?>', MD = '<?=$this->MD?>', FQCN = '<?=$this->FQCN?>';
            var TPLS = null;
            /*<?=$this->includeTemplates('TPLS')?>*/
            var ST = null;
            /*<?=$this->includeStyles('ST')?>*/;
            EFO.StyleDriver().setStyles(MD, ST).installStyles(MD);
            EFO.TemplateManager().addObject(TPLS, MC);// префикс класса
            //  EFO.ImageManager().install([MC, 'icon'].join('.'));

            function videoSwitch() {
                return (videoSwitch.is(this) ? this.init : videoSwitch.F).apply(this, APS.call(arguments));
            }
            videoSwitch.xInheritE(PAR);
            var F = videoSwitch;
            F.mixines = ['Roleable', 'Loaderable', 'Commandable', 'Monitorable'];
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
                this.handle.find('video').each(function () {
                    window.clearTimeout(this.whto);
                });
                this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('select', MC), this));
                this.getRole('slowContainer').hide();
                this.imageIndex = null;
                return this;
            };

            F.prototype.setData = function ($images, stamp) {
                $images = U.safeArray($images);
                this.clear();
                if ($images.length) {
                    this.stamp = stamp;
                    this.images = [].concat($images);
                    this.getRole('videoContainer').html(Mustache.render(EFO.TemplateManager().get('images', MC), this, {loader: EFO.TemplateManager().get('loader', MC)}));
                    this.indexImages();
                    this.updateNavigation();
                    this.getRole('navblock').show();
                    this.getRole('slowContainer').show();
                    this.setIndex(0, 0);
                }

                return this;
            };

            F.prototype.indexImages = function () {
                this.imageIndex = [null, null, null, //00 10 20    n = y*3+x
                    null, null, null, //01 11 21
                    null, null, null];//02 12 22
                for (var i = 0; i < this.images.length; i++) {
                    var x = this.images[i];
                    var co = x.yindex * 3 + parseInt(x.xindex);
                    this.imageIndex[co] = x;
                }
                this.currentIndex = [1, 1];
                return this;
            };

            F.prototype.updateNavigation = function () {
                var ci = this.currentIndex[0] + 3 * this.currentIndex[1];
                var remap = {'m1m1': {x: -1, y: -1}, 'nnm1': {x: 0, y: -1}, 'p1m1': {x: +1, y: -1}, 'm1nn': {x: -1, y: 0}, 'p1nn': {x: +1, y: 0}, 'm1p1': {x: -1, y: +1}, 'nnp1': {x: 0, y: +1}, 'p1p1': {x: +1, y: +1}};
                this.handle.find('.' + MC + 'Arrow').hide().each(function () {
                    this.offsetWidth;
                });
                for (var k in remap) {
                    if (remap.hasOwnProperty(k)) {
                        var ofs = remap[k].x + remap[k].y * 3;
                        var tx = this.currentIndex[0] + remap[k].x;
                        var ty = this.currentIndex[1] + remap[k].y;
                        this.handle.find('.' + MC + 'ArrowTo' + k)[this.imageIndex[ci + ofs] && tx >= 0 && tx <= 2 && ty >= 0 && ty <= 2 ? 'show' : 'hide']();
                    }
                }
                this.onChanged();
                return this;
            };

            F.prototype.onCommandNavTo = function (t) {
                this.setIndex(t.data('x'), t.data('y'));
                return this;
            };


            F.prototype.setIndex = function (dx, dy) {
                var di = parseInt(dx) + 3 * dy;
                var ci = this.currentIndex[0] + 3 * this.currentIndex[1];
                var tcx = this.currentIndex[0] + parseInt(dx);
                var tcy = this.currentIndex[1] + parseInt(dy);
                if (this.imageIndex[ci + di] && tcx >= 0 && tcx <= 2 && tcy >= 0 && tcy <= 2) {
                    var ofs = ci + di;
                    var classes = ['LeftUp', 'MiddleUp', 'RightUp', 'LeftMiddle', 'MiddleMiddle', 'RightMiddle', 'LeftDown', 'MiddleDown', 'RightDown'];
                    this.currentIndex[0] = this.currentIndex[0] + parseInt(dx);
                    this.currentIndex[1] = this.currentIndex[1] + parseInt(dy);
                    var ClassToRemove = [];
                    for (var i = 0; i < classes.length; i++) {
                        ClassToRemove.push(MC + 'Video' + classes[i]);
                    }
                    this.getRole('videoContainer')
                            .removeClass(ClassToRemove.join(' '))
                            .addClass(MC + 'Video' + classes[ofs]);
                    this.updateNavigation();
                }
                return this;
            };

            F.prototype.onChanged = function () {
                var cstate = E.Config().getSlowSwitchPreset();
                var self = this;
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
            //<editor-fold defaultstate="collapsed" desc="renderers">
            F.prototype.slowSwitch = function () {
                return E.Config().getSlowSwitchPreset();
            };

            F.prototype._createLoader = function () {
                return this._createLoaderInternal.bindToObject(this);
            };

            F.prototype.onCommandReplay = function () {
                this.onChanged();
                return this;
            };

            F.prototype.videoOnLoad = function (x) {

            };

            F.prototype.setVideoTagVisible = function (x) {
                window.clearTimeout(x.whto);
                var self = this;
                var tc = x.currentTime;
                x.whto = window.setTimeout(function () {
                    if (((x.currentTime === tc) || (tc === 0 && x.currentTime < 1)) && !x.paused) {
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

            F.prototype.setVideoTagInvisible = function (x) {
                x.pause();
                window.clearTimeout(x.whto);
            };

            F.prototype._createLoaderInternal = function (a, b) {
                var url = b(a);
                var id = [MC, "vid", U.UID()].join('');
                var fullUrl = [E.Config().mkurl(url), "600_600.webm"].join('');
                var token = localStorage.getItem('uiToken') + "&nowritecookie=1&uiDevId=" + device.uuid;
                var self = this;
                if (window.videoLoader) {
                            window.videoLoader.loadVideo(fullUrl, token, U.IntMoreOr(this.stamp, 0, 0),
                            function (m) { //success  
                                //alert('oaded,queueing');
                                self.mkVideoWithSource(m,id);
//                                var vq = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>');
//                                var v = vq.get(0);
//                                v.oncanplaythrough = function () {
//                                    jQuery('#' + id).html('').append(v);
//                                    var cstate = E.Config().getSlowSwitchPreset();
//                                    this.oncanplaythrough = null;
//                                    if (jQuery(this).is(':visible')) {
//                                        self.setVideoTagVisible(this);
//                                    } else {
//                                        self.setVideoTagInvisible(this);
//                                    }
//                                };
//                                v.onerror = function (z) {
//                                    jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                                };
//                                jQuery(v).append(['<source src="', m, '" type="video/webm" />'].join(''));
                            },
                            function (e) {//error
                                alert(e);
                                jQuery('#' + id).html({}._T("ErrorVideoLoading"));
                            }
                    );
                } else {
                    var url = E.Config().mkurlfullvideo([b(a), "600_600.webm?nowritecookie=1"].join(''));
                    self.mkVideoWithSource(url,id);
//                    var v = jQuery('<video loop  webkit-playsinline playsinline preload="auto" ></video>').get(0);
//                    v.onerror = function (z) {
//                        jQuery('#' + id).html({}._T("ErrorVideoLoading"));
//                    };
//                    v.oncanplaythrough = function () {
//                        jQuery('#' + id).html('').append(this);
//                        this.oncanplay = null;
//                        this.oncanplaythrough = null;
//
//                        if (jQuery(this).is(':visible')) {
//                            self.setVideoTagVisible(this);
//
//                        } else {
//                            self.setVideoTagInvisible(this);
//                        }
//
//                    };
//                    jQuery(v).append(['<source src="', url.replace('.mp4', '.webm'), '" type="video/webm" /><source src="', url, '" type="video/mp4" />'].join(''));
                }
                return id;

            };

            F.prototype.mkVideoWithSource = function (url, containerId) {                
                E.Config().getQueue().addTask(this, this.mkVideoSourceDo, {url: url, id: containerId});
                E.Config().getQueue().next();
                //alert('queued');
                return this;
            };

            F.prototype.mkVideoSourceDo = function (task) {
                //alert('task launchd');
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
                    //alert('task complete');
                    console.log(E.Config().getQueue()._tasks);
                    task.complete();
                    
                };
                vid.onerror = function (z) {
                    jQuery("#" + task.getParam('id')).html({}._T("ErrorVideoLoading"));
                    //alert('taskError');
                    task.error();
                    
                };
                vij.append(['<source src="', task.getParam('url'), '" type="video/webm" />'].join(''));
            };
            //</editor-fold>
            EFO.videoSwitch = F;
        }
    }
})();