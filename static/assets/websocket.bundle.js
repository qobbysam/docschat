(()=>{"use strict";function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},o(e)}function e(e,t){for(var n=0;n<t.length;n++){var c=t[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==o(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var c=n.call(e,"string");if("object"!==o(c))return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(c.key),"symbol"===o(i)?i:String(i)),c)}var i}var t=new(function(){function o(e){!function(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),this.companyId=e,this.socket=null}var t,n;return t=o,(n=[{key:"connect",value:function(){var o="https:"===window.location.protocol?"wss":"ws",e="".concat(o,"://").concat(window.location.host,"/ws/socket/").concat(this.companyId,"/");this.socket=new WebSocket(e),this.socket.onopen=function(){console.log("Connected to WebSocket server")},this.socket.onmessage=function(o){console.log("Received message:",o.data)},this.socket.onerror=function(o){console.log("Error",o),console.log(e)},this.socket.onclose=function(o){console.log("WebSocket connection closed:",o)}}},{key:"send",value:function(o){this.socket&&this.socket.readyState===WebSocket.OPEN?this.socket.send(o):console.log("WebSocket connection is not open")}},{key:"close",value:function(){this.socket&&this.socket.close()}}])&&e(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),o}())(window.ConfigVars.companyid);t.connect(),t.socket.onmessage=function(o){var e;e=o.data,console.log("Received message:",e)}})();