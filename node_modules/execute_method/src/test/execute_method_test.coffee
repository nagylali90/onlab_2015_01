# test1 = "offset().left"
# test2 = "outerOffset(false).top"
# test3 = "css('specialcase')"
# test4 = "width()"
# test5 = "something.this.do(\"multi\", 5, false, \"cow\")"

# document.write("<b>test1:</b><pre>")
# document.write(JSON.stringify(ExecuteMethod.getFunctionsAndProperties(test1), null, 2))
# document.write("</pre><b>test2:</b><pre>")
# document.write(JSON.stringify(ExecuteMethod.getFunctionsAndProperties(test2), null, 2))
# document.write("</pre><b>test3:</b><pre>")
# document.write(JSON.stringify(ExecuteMethod.getFunctionsAndProperties(test3), null, 2))
# document.write("</pre><b>test4:</b><pre>")
# document.write(JSON.stringify(ExecuteMethod.getFunctionsAndProperties(test4), null, 2))
# document.write("</pre><b>test5:</b><pre>")
# document.write(JSON.stringify(ExecuteMethod.getFunctionsAndProperties(test5), null, 2))
# document.write("</pre>")


# QUnit.jsDump.HTML = false;
module 'single functions'
  # expect(0)

test 'the string should be trimmed', 1, ->
  str = " something ! "
  equal(str.trim(), "something !")

test 'string should typecast to boolean from string', 2, ->
  # this test will fail, as this *isn't* how to append to an array
  equal(ExecuteMethod.typecastParameter("false"), false)
  equal(ExecuteMethod.typecastParameter("true"), true)

test 'string should typecast to integer from string', 3, ->
  # this test will fail, as this *isn't* how to append to an array
  equal(ExecuteMethod.typecastParameter("1"), 1)
  equal(ExecuteMethod.typecastParameter("0"), 0)
  equal(ExecuteMethod.typecastParameter("5934589348534"), 5934589348534)

test 'string should typecast to float from string', 3, ->
  # this test will fail, as this *isn't* how to append to an array
  equal(ExecuteMethod.typecastParameter("1.1"), 1.1)
  equal(ExecuteMethod.typecastParameter("0.53"), 0.53)
  equal(ExecuteMethod.typecastParameter("3423423.432432"), 3423423.432432)

test 'string should return the string when typcasting', 2, ->
  # this test will fail, as this *isn't* how to append to an array
  equal(ExecuteMethod.typecastParameter(
    "This is not a number or bool or float"),
    "This is not a number or bool or float"
    )
  equal(ExecuteMethod.typecastParameter(
    "\"super \"word inside\" dash\""),
    "super \"word inside\" dash"
    )

test 'parameters should be split and typecasted', 1, ->
  deepEqual(ExecuteMethod.splitAndTypeCastParameters(
    "5, true, apples, 3.14"),
    [5, true, "apples", 3.14]
    )

test 'test if it is a function', 3, ->
  equal(ExecuteMethod.isFunction("property"), false)
  equal(ExecuteMethod.isFunction("myMethod()"), true)
  equal(ExecuteMethod.isFunction("myMethodWithParameters(false, \"superb\")"), true)

test 'get function and parameters', 5, ->
  deepEqual(ExecuteMethod.getFunctionAndParameters(
    "property"),
    {func: "property", params: null, isfunc: false}
    )
  deepEqual(ExecuteMethod.getFunctionAndParameters(
    "myMethod()"), {func: "myMethod", params: [], isfunc: true})
  deepEqual(ExecuteMethod.getFunctionAndParameters(
    "myMethod(false)"),
    {func: "myMethod", params: [false], isfunc: true})
  deepEqual(ExecuteMethod.getFunctionAndParameters(
    "myMethod(false, \"superb\")"),
    {func: "myMethod", params: [false, "superb"], isfunc: true}
    )
  deepEqual(ExecuteMethod.getFunctionAndParameters(
    "myMethod(false, \"superb\", 3.14, 42)"),
    {func: "myMethod", params: [false, "superb", 3.14, 42], isfunc: true}
    )


module 'test execution', {
  setup: ->
    window.AnimalTest = {
      type_of_animals: "cows"
      candostuff: ->
        "yes"
      cows:
        first:
          name: "george"
          dostuff: -> "eat"
        second:
          name: "peter"
          dostuff: ->
            {eat: "grass", sleep:"standing"}
        third:
          name: "ole"
          dostuff: (stufftodo, shouldidoit) ->
            return null unless shouldidoit
            stufftodo
    }
}

test 'getSingleProperty', 1, ->
  equal(ExecuteMethod.getSingleProperty("type_of_animals", AnimalTest), "cows")

test 'executeSingleFunction', 1, ->
  equal(ExecuteMethod.executeSingleFunction("candostuff", [], AnimalTest), "yes")

test 'executeMethodByFunctionName', 11, ->
  equal(ExecuteMethod.executeMethodByFunctionName("type_of_animals", AnimalTest), "cows")
  equal(ExecuteMethod.executeMethodByFunctionName("candostuff()", AnimalTest), "yes")
  equal(ExecuteMethod.executeMethodByFunctionName("cows.first.name", AnimalTest), "george")
  equal(ExecuteMethod.executeMethodByFunctionName("cows.first.dostuff()", AnimalTest), "eat")
  equal(ExecuteMethod.executeMethodByFunctionName("cows.second.name", AnimalTest), "peter")
  deepEqual(ExecuteMethod.executeMethodByFunctionName("cows.second.dostuff()", AnimalTest),
    {eat: "grass", sleep:"standing"}
    )
  equal(ExecuteMethod.executeMethodByFunctionName("cows.second.dostuff().eat", AnimalTest),
    "grass"
    )
  equal(ExecuteMethod.executeMethodByFunctionName("cows.second.dostuff().sleep", AnimalTest),
    "standing"
    )
  equal(ExecuteMethod.executeMethodByFunctionName("cows.third.name", AnimalTest), "ole")
  equal(ExecuteMethod.executeMethodByFunctionName("cows.third.dostuff(\"run\", false)", AnimalTest),
    null)
  equal(ExecuteMethod.executeMethodByFunctionName(
    "cows.third.dostuff(\"run\", true)",
    AnimalTest), "run")
