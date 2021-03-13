(function ($) {

    // Declaración del plugin.
    $.fn.numericInput = function (options) {
        if ($(this).attr('skip-validation') !== undefined)
            return this;
        $.fn.numericInput.defaultOptions = {
            isFloat: false,
            negative: false,
            required: false,
            validclass: '',
            invalidclass: '',
            debug: false
        };
        options = {
            isFloat: $(this).attr('float') === undefined ? false : $(this).attr('float').toLowerCase() == 'true' ? true : false,
            negative: $(this).attr('negative') === undefined ? false : $(this).attr('negative').toLowerCase() == 'true' ? true : false,
            required: $(this).attr('required') !== undefined ? true : false,
            validclass: $(this).attr('validclass') === undefined ? '' : $(this).attr('validclass'),
            invalidclass: $(this).attr('invalidclass') === undefined ? '' : $(this).attr('invalidclass'),
            debug: $(this).attr('debug') === undefined ? false : $(this).attr('debug').toLowerCase() == 'true' ? true : false
        };
        // Obtenemos los parámetros.
        options = $.extend({}, $.fn.numericInput.defaultOptions, options);
        if (options.debug)
            console.log(options);

        if (options.required) {
            $(this).removeClass(options.validclass);
            $(this).addClass(options.invalidclass);
            $(this).attr('is-valid', 'false');
        } else {
            $(this).removeClass(options.invalidclass);
            $(this).addClass(options.validclass);
            $(this).attr('is-valid', 'true');
        }

        $(this).on('keypress', function (e) {
            if (options.debug) {
                console.log(e.which + ':' + String.fromCharCode(e.which));
            }
            var ok = (e.which == 45 && options.negative && $(this).val().toString().length == 0) || (e.which >= 48 && e.which <= 57) || (e.which == 46 && options.isFloat && $(this).val().toString().indexOf(".") == -1);
            var aux = $(this).val();
            var length = $(this).val().length + (ok ? 1 : 0);
            if (length > 0) {
                $(this).removeClass(options.invalidclass);
                $(this).addClass(options.validclass);
            } else {
                $(this).removeClass(options.validclass);
                $(this).addClass(options.invalidclass);
            }
            if (ok) {
                if (options.debug) {
                    console.log(e.which + ':' + String.fromCharCode(e.which));
                }
            } else {
                return false;
            }

        });

        $(this).on('change', function (e) {
            if(options.debug)
                console.log($(this).val());
            var val = parseFloat($(this).val());
            var min = parseFloat($(this).attr('min'));
            var max = parseFloat($(this).attr('max'));
            var minvalidation = (isNaN(min) ? true : val >= min);
            var maxvalidation = (isNaN(max) ? true : val <= max);
            var valid = $(this).val().toString().length > 0 || !options.required && minvalidation && maxvalidation;
            if (valid) {
                $(this).removeClass(options.invalidclass);
                $(this).addClass(options.validclass);
            } else {
                $(this).removeClass(options.validclass);
                $(this).addClass(options.invalidclass);
            }
            $(this).attr('is-valid', valid.toString());
            if ($(this).val().endsWith('.')) {
                $(this).val($(this).val().substr(0, $(this).val().length - 1));
            }
        });

        return this;
    }

})(jQuery);

(function ($) {

    // Declaración del plugin.
    $.fn.selectInput = function (list, value) {
        $.fn.selectInput.defaultOptions = {
            validclass: '',
            invalidclass: '',
            textfield: 'Name',
            valuefield: 'Id',
            emptyfield: '',
            emptyfieldvalue: '',
            hideemptyfield: false,
            required: false,
            debug: false
        };
        options = {
            validclass: $(this).attr('validclass') === undefined ? '' : $(this).attr('validclass'),
            invalidclass: $(this).attr('invalidclass') === undefined ? '' : $(this).attr('invalidclass'),
            textfield: $(this).attr('textfield') === undefined ? 'Name' : $(this).attr('textfield'),
            valuefield: $(this).attr('valuefield') === undefined ? 'Id' : $(this).attr('valuefield'),
            emptyfield: $(this).attr('emptyfield') === undefined ? '' : $(this).attr('emptyfield'),
            emptyfieldvalue: $(this).attr('emptyfieldvalue') === undefined ? '' : $(this).attr('emptyfieldvalue'),
            required: $(this).attr('required') !== undefined ? true : false,
            hideemptyfield: $(this).attr('hideemptyfield') === undefined ? false : $(this).attr('hideemptyfield').toLowerCase() == 'true' ? true : false,
            debug: $(this).attr('debug') === undefined ? false : $(this).attr('debug').toLowerCase() == 'true' ? true : false
        };
        options = $.extend({}, $.fn.selectInput.defaultOptions, options);
        if (options.debug)
            console.log(options);
        $(this).html('');
        var html = '';
        if (options.emptyfield != '') {
            html += "<option value='" + options.emptyfieldvalue + "' " + (options.hideemptyfield ? 'style="display:none"' : '') + ">" + options.emptyfield + "</option>"
        }
        if (list !== undefined) {
            $.each(list, function (i, v) {
                if (options.debug)
                    console.log("<option value='" + v[options.valuefield] + "'>" + v[options.textfield] + "</option>");
                html += "<option value='" + v[options.valuefield] + "'>" + v[options.textfield] + "</option>";
            });
        }
        if (options.required && $(this).attr('skip-validation') === undefined) {
            $(this).removeClass(options.validclass);
            $(this).addClass(options.invalidclass);
            $(this).attr('is-valid', 'false');
        } else {
            $(this).removeClass(options.invalidclass);
            $(this).addClass(options.validclass);
            $(this).attr('is-valid', 'true');
        }
        if (html != '')
            $(this).html(html);
        $(this).on('change', function (e) {
            options.emptyfieldvalue = $(this).attr('emptyfieldvalue') === undefined ? '' : $(this).attr('emptyfieldvalue');
            var val = $(this).val();
            var required = $(this).attr('required') !== undefined ? true : false;
            if (options.debug)
                console.log(val);
            var valid = (required ? val != null && val != options.emptyfieldvalue : true || $(this).attr('skip-validation') !== undefined);
            if (valid) {
                $(this).removeClass(options.invalidclass);
                $(this).addClass(options.validclass);
                $(this).attr('is-valid', 'true');
            } else {
                $(this).removeClass(options.validclass);
                $(this).addClass(options.invalidclass);
                $(this).attr('is-valid', 'false');
            }
        });
        if (value !== undefined) {
            var valid = value != null && value != options.emptyfieldvalue || !options.required;
            if (valid) {
                $(this).removeClass(options.invalidclass);
                $(this).addClass(options.validclass);
            } else {
                $(this).removeClass(options.validclass);
                $(this).addClass(options.invalidclass);
            }
            $(this).attr('is-valid', valid.toString());
            $(this).val(value);
        } else {
            //$(this).attr('is-valid', 'false');
        }
        return this;
    }

})(jQuery);
(function ($) {
    $.fn.validateInputs = function () {
        var inputs = $(this).find('input:not([type="hidden"]), select, textarea');
        var valids = $(this).find('[is-valid="true"]');
        var skiped = $(this).find('[skip-validation]');
        return inputs.length == (valids.length + skiped.length);
    };
})(jQuery);
(function ($) {
    $.fn.checkboxInput = function () {
        if ($(this).attr('skip-validation') !== undefined)
            return this;
        $(this).attr('is-valid', 'true');
    }
    return this;
})(jQuery);
(function ($) {
    $.fn.simpleInput = function () {
        if ($(this).attr('skip-validation') !== undefined)
            return this;
        $.fn.simpleInput.defaultOptions = {
            validclass: '',
            invalidclass: '',
            minlength: 0,
            maxlength: 0,
            required: false,
        };

        var options = {
            validclass: $(this).attr('validclass') === undefined ? '' : $(this).attr('validclass'),
            invalidclass: $(this).attr('invalidclass') === undefined ? '' : $(this).attr('invalidclass'),
            minlength: $(this).attr('minlength') === undefined ? 0 : parseInt($(this).attr('minlength')),
            maxlength: $(this).attr('maxlength') === undefined ? 0 : parseInt($(this).attr('maxlength')),
            required: $(this).attr('required') !== undefined ? true : false,
        };
        options = $.extend({}, $.fn.simpleInput.defaultOptions, options);

        if (options.minlength < 0)
            options.minlength = 0;
        if (options.maxlength < 0)
            options.maxlength = 0;
        if (options.minlength > options.maxlength) {
            var aux = options.maxlength;
            options.maxlength = options.minlength;
            options.minlength = options.maxlength;
        }

        if (options.required) {
            $(this).removeClass(options.validclass);
            $(this).addClass(options.invalidclass);
            $(this).attr('is-valid', 'false');
        } else {
            $(this).removeClass(options.invalidclass);
            $(this).addClass(options.validclass);
            $(this).attr('is-valid', 'true');
        }

        $(this).on('change', function (e) {
            var val = $(this).val();
            var valid = ((options.required ? val.length > 0 : true) && val.length >= options.minlength && (val.length <= options.maxlength || options.maxlength == 0));
            if (valid) {
                $(this).removeClass(options.invalidclass);
                $(this).addClass(options.validclass);
                $(this).attr('is-valid', 'true');
            } else {
                $(this).removeClass(options.validclass);
                $(this).addClass(options.invalidclass);
                $(this).attr('is-valid', 'false');
            }
        });


        return this;
    };
})(jQuery);
(function ($) {
    $.fn.initInputs = function () {
        // Change number inputs for numeric
        var numberInputs = $(this).find('input[type="number"]').map(function (i, e) {
            if ($(e).attr('skip-validation') === undefined) {
                $(e).attr('type', 'numeric');
            }
        });
        $(this).find('input[type="numeric"]').map(function (i, e) {
            if ($(e).attr('skip-validation') === undefined) {
                $(e).numericInput();
            }
        });
        //Initialice selects
        $(this).find('select').map(function (i, e) {
            if ($(e).attr('skip-validation') === undefined) {
                $(e).selectInput();
            }
        });
        // Initialice text inputs
        $(this).find('input[type="text"]').map(function (i, e) {
            if ($(e).attr('skip-validation') === undefined) {
                $(e).simpleInput();
            }
        });
        // Initialice checkbox
        $(this).find('input[type="checkbox"]').map(function (i, e) {
            if ($(e).attr('skip-validation') === undefined) {
                $(e).checkboxInput();
            }
        });
        // Initialice password
        $(this).find('input[type="password"]').map(function (i, e) {
            if ($(e).attr('skip-validation') === undefined) {
                $(e).attr('required', '');
                $(e).simpleInput();
            }
        });
        $(this).find('textarea').map(function (i, e) {
            if ($(e).attr('skip-validation') === undefined) {
                $(e).simpleInput();
            }
        });
    };
})(jQuery);
(function ($) {
    var originalVal = $.fn.val;
    $.fn.val = function (value) {
        if (arguments.length >= 1) {
            // setter invoked, do processing
            var aux = originalVal.call(this, value);
            $(this).trigger('change');
            return aux;
        }
        //getter invoked do processing
        return originalVal.call(this);
    };
})(jQuery);