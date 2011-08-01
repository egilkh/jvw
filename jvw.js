/*
 * jvw.js, JSVariableWatcher, a loopy variable watcher.
 *
 * author: Egil Hanger (egilkh@gmail.com)
 *
 * Note: works with globals, or it should at least.
 * Note:	In places where usage need for speed or precision is needed it's probably
			better to create a system where changes get checked on a more variable way.
			Might try something like different timeout for different queues of variables.
 */

var JVW = function (customTimeout) {
	// vars to check on each run
	var vars = [];

	self = this; // scopeify this

	// lower to make more 'responsive'
	this.timeout = customTimeout || 250;

	this.add = function (varName, func) {
		if (vars[varName] != null) {
			return false;
		} else {
			if (typeof (func) === "function") {
				vars.push({
					vn: varName,
					f: func,
					vv: objFromName(varName)
				});
			} else {
				return false;
			}
			return true;
		}
	};

	this.remove = function (varName) {
		if (typeof(vars[varName]) == "undefined") {
			return true; // item didn't exist, safe to tell user it doen't exist
		} else {
			var index = -1;
			for (var i = 0; i < vars.length; i++) {
				if (vars[i].vn == varName) {
					index = i;
					break;
				}
			}
			if (index > -1) {
				vars = arrayRemove(vars, index);
				return true;
			}
		}
		return false;
	};

	this.isWatching = function (varName) {
		return vars[varName] != null;
	};

	// simple loop over that checkes for change and fires
	// the function assosiated.
	var checkVars = function () {
		for (var i = 0; i < vars.length; i++) {
			if (vars[i]) {
				var nv = objFromName(vars[i].vn);
				if (vars[i].vv !== nv) {
					vars[i].f.call(null, vars[i].vn, vars[i].vv, nv);
					vars[i].vv = nv;
				}
			}
		}

		setTimeout(checkVars, self.timeout);
	};

	// takes a variable name and returns it's value.
	// based on invokeCommandString from Chromium
	var objFromName = function (str) {
		var obj = window;
		var components = str.split('.');
		for (var i = 0; i < components.length; i++) {
			obj = obj[components[i]];
		}
		return obj;
	};

	// Array Remove - By John Resig (MIT Licensed)
	var arrayRemove = function (array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	};

	setTimeout(checkVars, self.timeout); // start it
};
