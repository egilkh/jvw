# JSVariableWatcher

A loopy variable watcher.

Every X (250 by default) ms it will check for modifications to a variable and
run the associated function.

I haven't done much testing of it. Your milage may vary.

## Usage

    var j = new JVW();
    j.add('nameOfVariable', function (varName, oldValue, newValue) {
    	// do stuff when variable changes.
    });

    j.remove('nameOfvariable');

