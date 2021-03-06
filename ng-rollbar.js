(function(angular){
  angular.module('tandibar/ng-rollbar', []);

  angular.module('tandibar/ng-rollbar').config(['$provide', function($provide) {
    $provide.decorator("$exceptionHandler", function($delegate, $window) {
      return function (exception, cause) {
        if($window.Rollbar) {
          $window.Rollbar.error(exception, {cause: cause});
        }
        $delegate(exception, cause);
      };
    });
  }]);

  angular.module('tandibar/ng-rollbar').provider('Rollbar', function RollbarProvider() {
    var rollbarProvider = this;

    this.init = function(config) {
      var _rollbarConfig = config;
      /* jshint ignore:start */
      // using https://github.com/rollbar/rollbar.js/blob/v1.4.4/dist/rollbar.snippet.js
      !function(r){function t(e){if(o[e])return o[e].exports;var n=o[e]={exports:{},id:e,loaded:!1};return r[e].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=r,t.c=o,t.p="",t(0)}([function(r,t,o){"use strict";var e=o(1).Rollbar,n=o(2),a="https://d37gvrvc0wt4s1.cloudfront.net/js/v1.4/rollbar.min.js";_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||a;var i=e.init(window,_rollbarConfig),l=n(i,_rollbarConfig);i.loadFull(window,document,!1,_rollbarConfig,l)},function(r,t){"use strict";function o(){var r=window.console;r&&"function"==typeof r.log&&r.log.apply(r,arguments)}function e(r){this.shimId=++u,this.notifier=null,this.parentShim=r,this.logger=o,this._rollbarOldOnError=null}function n(r,t,o){window._rollbarWrappedError&&(o[4]||(o[4]=window._rollbarWrappedError),o[5]||(o[5]=window._rollbarWrappedError._rollbarContext),window._rollbarWrappedError=null),r.uncaughtError.apply(r,o),t&&t.apply(window,o)}function a(r){var t=e;return l(function(){if(this.notifier)return this.notifier[r].apply(this.notifier,arguments);var o=this,e="scope"===r;e&&(o=new t(this));var n=Array.prototype.slice.call(arguments,0),a={shim:o,method:r,args:n,ts:new Date};return window._rollbarShimQueue.push(a),e?o:void 0})}function i(r,t){if(t.hasOwnProperty&&t.hasOwnProperty("addEventListener")){var o=t.addEventListener;t.addEventListener=function(t,e,n){o.call(this,t,r.wrap(e),n)};var e=t.removeEventListener;t.removeEventListener=function(r,t,o){e.call(this,r,t&&t._wrapped?t._wrapped:t,o)}}}function l(r,t){return t=t||o,function(){try{return r.apply(this,arguments)}catch(o){t("Rollbar internal error:",o)}}}var u=0;e.init=function(r,t){var o=t.globalAlias||"Rollbar";if("object"==typeof r[o])return r[o];r._rollbarShimQueue=[],r._rollbarWrappedError=null,t=t||{};var a=new e;return l(function(){if(a.configure(t),t.captureUncaught){a._rollbarOldOnError=r.onerror,r.onerror=function(){var r=Array.prototype.slice.call(arguments,0);n(a,a._rollbarOldOnError,r)};var e,l,u="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(e=0;e<u.length;++e)l=u[e],r[l]&&r[l].prototype&&i(a,r[l].prototype)}return r[o]=a,a},a.logger)()},e.prototype.loadFull=function(r,t,o,e,n){var a=function(){var t;if(void 0===r._rollbarPayloadQueue){var o,e,a,i;for(t=new Error("rollbar.js did not load");o=r._rollbarShimQueue.shift();)for(a=o.args,i=0;i<a.length;++i)if(e=a[i],"function"==typeof e){e(t);break}}"function"==typeof n&&n(t)},i=t.createElement("script"),u=t.getElementsByTagName("script")[0];i.src=e.rollbarJsUrl,i.async=!o,i.onload=l(a,this.logger),u.parentNode.insertBefore(i,u)},e.prototype.wrap=function(r,t){try{var o;if(o="function"==typeof t?t:function(){return t||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._wrapped){r._wrapped=function(){try{return r.apply(this,arguments)}catch(t){throw t._rollbarContext=o()||{},t._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=t,t}},r._wrapped._isWrap=!0;for(var e in r)r.hasOwnProperty(e)&&(r._wrapped[e]=r[e])}return r._wrapped}catch(n){return r}};for(var s="log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","),p=0;p<s.length;++p)e.prototype[s[p]]=a(s[p]);r.exports={Rollbar:e,_rollbarWindowOnError:n}},function(r,t){"use strict";r.exports=function(r,t){return function(o){if(!o&&!window._rollbarInitialized){var e=window.RollbarNotifier,n=t||{},a=n.globalAlias||"Rollbar",i=window.Rollbar.init(n,r);i._processShimQueue(window._rollbarShimQueue||[]),window[a]=i,window._rollbarInitialized=!0,e.processPayloads()}}}}]);
      /* jshint ignore:end */
    };

    getter.$inject = ['$window'];
    function getter($window) {
      return {
        Rollbar: $window.Rollbar,

        configure: $window.Rollbar.configure,

        critical: $window.Rollbar.critical,
        error: $window.Rollbar.error,
        warning: $window.Rollbar.warning,
        info: $window.Rollbar.info,
        debug: $window.Rollbar.debug,

        scope: $window.Rollbar.scope,

        verbose: function (boolean) {
          if (boolean === undefined) { boolean = true; }
          $window.Rollbar.configure({ verbose: boolean });
        },
        enable: function () {
          $window.Rollbar.configure({ enabled: true });
        },
        disable: function () {
          $window.Rollbar.configure({ enabled: false });
        }
      };
    };

    this.$get = getter;
  });

})
(angular);
