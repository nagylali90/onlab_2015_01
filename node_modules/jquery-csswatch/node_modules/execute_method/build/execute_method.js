
/*
 * Execute Method
 * (c) 2012-2014 Leif Ringstad
 *
 * Source: http://github.com/leifcr/execute_method
 */
var ExecuteMethod;

ExecuteMethod = {
  getFunctionsAndProperties: function(str) {
    var arr, i, ret;
    arr = str.split(".");
    i = 0;
    ret = [];
    while (i < arr.length) {
      ret.push(ExecuteMethod.getFunctionAndParameters(arr[i]));
      i++;
    }
    return ret;
  },
  getFunctionAndParameters: function(str) {
    var func, isfunc, params;
    if (ExecuteMethod.isFunction(str)) {
      params = str.substring(str.indexOf("(") + 1, str.indexOf(")"));
      if (params.length > 0) {
        params = ExecuteMethod.splitAndTypeCastParameters(params);
      } else {
        params = [];
      }
      func = str.substring(0, str.indexOf("\("));
      isfunc = true;
    } else {
      func = str;
      params = null;
      isfunc = false;
    }
    return {
      func: func,
      params: params,
      isfunc: isfunc
    };
  },
  splitAndTypeCastParameters: function(params) {
    var arr, i, ret;
    arr = params.split(",");
    ret = [];
    i = 0;
    ret = [];
    while (i < arr.length) {
      ret.push(ExecuteMethod.typecastParameter(arr[i]));
      i++;
    }
    return ret;
  },
  isFunction: function(str) {
    if (ExecuteMethod.regexIndexOf(str, /(\([\d|\D]+\))|(\(\))/, 0) !== -1) {
      return true;
    }
    return false;
  },
  regexIndexOf: function(string, regex, startpos) {
    var indexOf;
    indexOf = string.substring(startpos || 0).search(regex);
    if (indexOf >= 0) {
      return indexOf + (startpos || 0);
    } else {
      return indexOf;
    }
  },
  typecastParameter: function(param) {
    param = param.trim();
    param = param.replace(/^"/, "");
    param = param.replace(/"$/m, "");
    if (param.search(/^\d+$/) === 0) {
      return parseInt(param);
    } else if (param.search(/^\d+\.\d+$/) === 0) {
      return parseFloat(param);
    } else if (param === "false") {
      return false;
    } else if (param === "true") {
      return true;
    }
    return param;
  },
  executeSingleFunction: function(func, params, context, _that) {
    return context[func].apply(_that, params);
  },
  getSingleProperty: function(property, context) {
    return context[property];
  },

  /*
   * @param {String} Provide a string on what to execute (e.g. this.is.something(true).to_run()
   *                 or myFunction().property or myFunction())
   * @param {Object} Provide a object to run the string provided on
   * @param {Object} Provide an object that points to the "this" pointer which
   */
  executeMethodByFunctionName: function(str, context) {
    var current_context, current_val, func_data, i;
    func_data = ExecuteMethod.getFunctionsAndProperties(str);
    i = 0;
    current_context = context;
    current_val = null;
    while (i < func_data.length) {
      if (func_data[i]["isfunc"] === true) {
        current_context = ExecuteMethod.executeSingleFunction(func_data[i]["func"], func_data[i]["params"], current_context, context);
      } else {
        current_context = ExecuteMethod.getSingleProperty(func_data[i]["func"], current_context);
      }
      i++;
    }
    return current_context;
  }
};

if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

if (window.ExecuteMethod === "undefined" || window.ExecuteMethod === null || window.ExecuteMethod === void 0) {
  window.ExecuteMethod = ExecuteMethod;
}

//# sourceMappingURL=execute_method.js.map
