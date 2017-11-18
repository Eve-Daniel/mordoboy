(function () {
    if (!/^file/.test(window.location.href)) {
        
       
        
        function ADLER32(data){           
            var MOD_ADLER = 65521;
            var a = 1, b = 0;
            var index;
            for (index = 0; index < data.length; ++index) {
                a = (a + data.charCodeAt(index)) % MOD_ADLER;
                b = (b + a) % MOD_ADLER;
            }
            var adler = a | (b << 16);
            return ["ADLR32:", adler].join('');
        }
        function cmark(){
            var t = window.localStorage.getItem('cmark');
            if(!t){
                t=genCmark();
                window.localStorage.setItem('cmark',t);
            }
            return t;
        }
        
        function genCmark(){
            var d = new Date();
            return ADLER32([
                navigator.userAgent,
                d.getFullYear(),
                d.getTime()
            ].join('.'));
        }
        
         window.device={
            uuid:ADLER32([navigator.userAgent,cmark()].join(''))
        };
        
        var event = document.createEvent('Event');
        event.initEvent('deviceready', true, true);
        document.dispatchEvent(event);
    }
})();