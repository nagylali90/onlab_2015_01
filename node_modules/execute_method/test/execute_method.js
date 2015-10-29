module('single functions');

test('the string should be trimmed', 1, function() {
  var str;
  str = " something ! ";
  return equal(str.trim(), "something !");
});

test('string should typecast to boolean from string', 2, function() {
  equal(ExecuteMethod.typecastParameter("false"), false);
  return equal(ExecuteMethod.typecastParameter("true"), true);
});

test('string should typecast to integer from string', 3, function() {
  equal(ExecuteMethod.typecastParameter("1"), 1);
  equal(ExecuteMethod.typecastParameter("0"), 0);
  return equal(ExecuteMethod.typecastParameter("5934589348534"), 5934589348534);
});

test('string should typecast to float from string', 3, function() {
  equal(ExecuteMethod.typecastParameter("1.1"), 1.1);
  equal(ExecuteMethod.typecastParameter("0.53"), 0.53);
  return equal(ExecuteMethod.typecastParameter("3423423.432432"), 3423423.432432);
});

test('string should return the string when typcasting', 2, function() {
  equal(ExecuteMethod.typecastParameter("This is not a number or bool or float"), "This is not a number or bool or float");
  return equal(ExecuteMethod.typecastParameter("\"super \"word inside\" dash\""), "super \"word inside\" dash");
});

test('parameters should be split and typecasted', 1, function() {
  return deepEqual(ExecuteMethod.splitAndTypeCastParameters("5, true, apples, 3.14"), [5, true, "apples", 3.14]);
});

test('test if it is a function', 3, function() {
  equal(ExecuteMethod.isFunction("property"), false);
  equal(ExecuteMethod.isFunction("myMethod()"), true);
  return equal(ExecuteMethod.isFunction("myMethodWithParameters(false, \"superb\")"), true);
});

test('get function and parameters', 5, function() {
  deepEqual(ExecuteMethod.getFunctionAndParameters("property"), {
    func: "property",
    params: null,
    isfunc: false
  });
  deepEqual(ExecuteMethod.getFunctionAndParameters("myMethod()"), {
    func: "myMethod",
    params: [],
    isfunc: true
  });
  deepEqual(ExecuteMethod.getFunctionAndParameters("myMethod(false)"), {
    func: "myMethod",
    params: [false],
    isfunc: true
  });
  deepEqual(ExecuteMethod.getFunctionAndParameters("myMethod(false, \"superb\")"), {
    func: "myMethod",
    params: [false, "superb"],
    isfunc: true
  });
  return deepEqual(ExecuteMethod.getFunctionAndParameters("myMethod(false, \"superb\", 3.14, 42)"), {
    func: "myMethod",
    params: [false, "superb", 3.14, 42],
    isfunc: true
  });
});

module('test execution', {
  setup: function() {
    return window.AnimalTest = {
      type_of_animals: "cows",
      candostuff: function() {
        return "yes";
      },
      cows: {
        first: {
          name: "george",
          dostuff: function() {
            return "eat";
          }
        },
        second: {
          name: "peter",
          dostuff: function() {
            return {
              eat: "grass",
              sleep: "standing"
            };
          }
        },
        third: {
          name: "ole",
          dostuff: function(stufftodo, shouldidoit) {
            if (!shouldidoit) {
              return null;
            }
            return stufftodo;
          }
        }
      }
    };
  }
});

test('getSingleProperty', 1, function() {
  return equal(ExecuteMethod.getSingleProperty("type_of_animals", AnimalTest), "cows");
});

test('executeSingleFunction', 1, function() {
  return equal(ExecuteMethod.executeSingleFunction("candostuff", [], AnimalTest), "yes");
});

test('executeMethodByFunctionName', 11, function() {
  equal(ExecuteMethod.executeMethodByFunctionName("type_of_animals", AnimalTest), "cows");
  equal(ExecuteMethod.executeMethodByFunctionName("candostuff()", AnimalTest), "yes");
  equal(ExecuteMethod.executeMethodByFunctionName("cows.first.name", AnimalTest), "george");
  equal(ExecuteMethod.executeMethodByFunctionName("cows.first.dostuff()", AnimalTest), "eat");
  equal(ExecuteMethod.executeMethodByFunctionName("cows.second.name", AnimalTest), "peter");
  deepEqual(ExecuteMethod.executeMethodByFunctionName("cows.second.dostuff()", AnimalTest), {
    eat: "grass",
    sleep: "standing"
  });
  equal(ExecuteMethod.executeMethodByFunctionName("cows.second.dostuff().eat", AnimalTest), "grass");
  equal(ExecuteMethod.executeMethodByFunctionName("cows.second.dostuff().sleep", AnimalTest), "standing");
  equal(ExecuteMethod.executeMethodByFunctionName("cows.third.name", AnimalTest), "ole");
  equal(ExecuteMethod.executeMethodByFunctionName("cows.third.dostuff(\"run\", false)", AnimalTest), null);
  return equal(ExecuteMethod.executeMethodByFunctionName("cows.third.dostuff(\"run\", true)", AnimalTest), "run");
});

//# sourceMappingURL=execute_method.js.map
