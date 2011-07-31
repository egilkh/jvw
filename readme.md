JSVariableWatch

A loopy variable watcher.

Every X ms it will check for modifications to a variable.

Usage:

    var j = new JVW();
    j.add('nameOfVariable', function (varName, oldValue, newValue) {
    	// do stuff when a variable changes.
    });

