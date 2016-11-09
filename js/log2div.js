// rewrite console methods to output logs to div
// and define method window.clearConsole()
(function() {
    var loggerDiv = document.getElementById('log');
    if (!loggerDiv) {
        return; // nothing to do
    }
    var _divLog = function() {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'object') {
                loggerDiv.innerHTML += JSON.stringify(arguments[i]) + ' ';
            } else {
                loggerDiv.innerHTML += arguments[i] + ' ';
            }
        }
        loggerDiv.innerHTML += '</br>';
    }

    var logIndex = 0;
    var _trace = function (type, args) {
        if (!args.length) {
            return; //nothing to log
        }

        var date = new Date();
        var strTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
        logIndex++;
        var prefix = '[' + logIndex + '] ' + strTime + ' [' + type.toUpperCase() + '] ';

        args = Array.prototype.slice.apply(args);
        args.unshift(prefix);
        //Function.apply.call(console[type], console, args);
        _divLog.apply(window, args); //output log to div
    };

    var _log = (...params) => _trace("log", params);
    var _info = (...params) => _trace("info", params);
    var _warn = (...params) => _trace("warn", params);
    var _error = (...params) => _trace("error", params);

    console.log = _log;
    console.info = _info;
    console.warn = _warn;
    console.error = _error;

    var _clearConsole = () => {
        loggerDiv.innerHTML = '';
    };
    window.clearConsole = _clearConsole;
})();