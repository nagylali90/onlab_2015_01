/*
    Usage: 
    $ele.on('style', function(e, prop, value) {
        if (prop == 'left') {
            console.debug('new value for left: ' + value);
        }
    });
*/
// This plugin also throws events for individual style properties incase the entire 'style' attribute is removed
(function() {
    var ev = new $.Event('style');

    // trigger 'style' event when a css property changes because a new style value is applied
    var origCss = $.fn.css;
    $.fn.css = function(prop, value) {
        if (isSimpleAssignment(prop, value)) {
            this.trigger(ev, [prop, value]);
        }
        return origCss.apply(this, arguments);

        // true if: $ele.css('prop', 'some value' || 1234)
        function isSimpleAssignment(prop, value) {
            return $.type(prop) === 'string' && ($.type(value) === 'undefined' || $.type(value) === 'null' || $.type(value) === 'string' || $.type(value) === 'number');
        }
    };

    // trigger 'style' event when all css properties change (and revert back to inherited) because the style attribute is removed
    var origRemoveAttr = $.fn.removeAttr;
    $.fn.removeAttr = function(attr) {
        if (attr === 'style') {
            var ele = this;
            $.each(ele.styleProperties(), function(index, cssProperty) {
                ele.removeStyle(cssProperty); // remove so we can get the original value
                ele.trigger(ev, [cssProperty, ele.css(cssProperty)]);
            });
        }
        // by now all classes are gone, but perhaps jquery wants to fire some event
        return origRemoveAttr.apply(this, arguments);
    };

    // helper plugins to iterate and remove individual css styles
    $.fn.styleProperties = function() {
        var styleProperties = [];
        var styles = $(this).attr('style').split("; ");
        for (var i in styles) {
            styleProperties.push(styles[i].split(": ")[0]);
        }
        return styleProperties;
    };

    $.fn.removeStyle = function(style) {
        var search = new RegExp(style + '[^;]+;?', 'g');

        return this.each(function() {
            $(this).attr('style', function(i, style) {
                return style.replace(search, '');
            });
        });
    };
})();