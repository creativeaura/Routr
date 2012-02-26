/**
 * Gauravity JS Routing System
 * 
 * version 1.0
 * @author Gaurav Jassal <gaurav@jassal.me>
 * @namespace Gauravity/Routes''""
 */
(function () {
  var G = {},
    lasthash = '',
    routes = [],
    changeCallbacks = [];
  G.Routes = {};
  
  /*
   * Utiliy Functions for routes
   *
   * getIeVersion() 
   * @return number (IE Browser Version)
   *
   * Function returns the type of object 
   * getTypeOf()''
   * @params value (Object | String | Number | RegEx)
   * @return String
   * 
   * Function returns is the input value is a regular Express
   * pattern or not.
   *
   * isRegex()
   * @params (String | RegEx)
   * @return Bool
   */
  function getIeVersion() {
    var rv = -1,
      ua = navigator.userAgent,
      re = new RegExp("MSIE ([0-9]{1,}[0-9]{0,})");
    if (navigator.appName === 'Microsoft Internet Explorer') {
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv;
  }
  function getTypeOf(val) {
    return Object.prototype.toString.call(val);
  }

  function isRegex(val) {
    return (getTypeOf(val) === '[object RegExp]');
  }
  /*
   * Routes Pattern Class
   * @constructor
   */
  function RoutesPattern(pattern, callback) {
    this.isRegexPattern = isRegex(pattern);
    this.pattern = pattern;
    this.callback = callback;
    this.params = pattern.match(/(:([a-z\-A-Z]+)){1,}/ig) || [];
    this.matched = function (h){
      return this.pattern===h;
    };
    this.lookNamedParams = function (hash) {
      var split_name = hash.split('/'),
        paramsObject = {},
        pat_url,
        hash_url,
        i,''
        j,
        p;
      split_name.splice(0, 1);
      if ((this.params.length > 0) && (split_name.length - 1 === this.params.length)) {
        pat_url = this.pattern.substring(0, this.pattern.indexOf(this.params[0]));
        hash_url = hash.substring(0, pat_url.length);
        i = this.params.length;
        if (pat_url === hash_url) {
          for (j = 0; j < i; j += 1) {
            p = this.params[j];
            paramsObject[p.substring(1, p.length)] = split_name[j + 1];
          }
          return paramsObject;
        }
      }
      return false;
    };
  }
  /* 
   * Event callback triggered on hash change 
   *
   */
  var onHashUpdate = function(){
    //console.log('-> [onhashchange] internal ::: ' + window.location.hash);
    var hash = window.location.hash.substring(1,window.location.hash.length);
    
    for(var i in routes){
      if( !routes[i].isRegexPattern ){
        // Simple Match
        if(hash === routes[i].pattern){
          //console.log('-> Pattern Matched for ',hash);
          if (routes[i].callback && typeof(routes[i].callback) === "function") {
            routes[i].callback.call(this ,hash);
          }
        }else{
          // Lookup for Named Params
          var nameparams = routes[i].lookNamedParams(hash);

          if(nameparams){
            routes[i].callback.call(this ,nameparams);
          }
        }
      }
    }
    // Public events 
    publishCallbacks();
  };

  /*
   * Publish all subscribed callbacks
   */

  var publishCallbacks = function(){
    for(var c in changeCallbacks){
      changeCallbacks[c].call(this,window.location.hash);
    }
  }
  
  /*
   * Monitoring hash change for IE browsers
   *
   * IE 6,7 and 9 don't trigger onhashchange
   */
  var monitorHashChange = function(){
    if(lasthash !== window.location.hash){
      lasthash = window.location.hash;
      onHashUpdate();
    }
  }
  
  if (("onhashchange" in window) && (getIeVersion() < 0)) {
    window.onhashchange = onHashUpdate;  
  }else{
    setInterval(monitorHashChange,100);
  }

  G.Routes.addRoute = function (pattern,callback){
    var _route = new RoutesPattern(pattern,callback);
    routes.push(_route);
  }

  G.Routes.change = function(callback){
    changeCallbacks.push(callback);
    //console.log('-> callback subscribed');
  }

  window.Gauravity = window.G = G;
})();