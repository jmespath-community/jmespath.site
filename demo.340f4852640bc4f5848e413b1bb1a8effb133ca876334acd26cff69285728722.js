/**
 * Helper for JMESPath interactive demos
 * Add onclick="demo" to any demo to use this function
 * @param event Click event
 */

function demo(event) {
    doDemo(event, query => demoInput({ currentTarget: query }));
}

function doDemo(event, fun) {

    const demo = event.currentTarget
    if (event.target !== demo && demo.classList.contains("active")) return true; // Ignore clicking on children when expanded
    const active = demo.classList.toggle("active")
    const query = demo.getElementsByClassName("query").item(0)
    query.focus()
    const result = demo.getElementsByClassName("result").item(0)
    if (active && !result.innerHTML.trim()) {
        fun({ currentTarget: query })
    }
}

function jp(data, expression) {
    const json = jmespath.search(data, expression);
    return json;
}

function formatJson(searched) {
    console.log(searched);
    const text = JSON.stringify(searched, null, 2)
        // Collapse to a single line any array/object that contains
        // only scalars and/or empty structures.
        .replaceAll(
            /^([ \t]*)(.*)([\[{]\n(?:\1[ \t]+(?:".*"|:[ \t]*|[-0-9.+a-z]+|\[\]|\{\})+,?\n)*\1[\]}])/gm,
            (match, indent, name, value) => {
                const singleLine = indent + name + value.replaceAll(/\n\s*/g, " ")
                // Impose an arbitrary maximum of 100 code points.
                return [...singleLine].length <= 100 ? singleLine : match
            }
        );
    return text;
}

function resizeResultTextAreaToFit(demo) {

    const result = demo.getElementsByClassName("result").item(0)

    // Size height to fit content.
    result.style.height = null;
    result.rows = result.value.split("\n").length;
    result.scrollTop = 1;
    while (result.scrollTop > 0) {
        const oldHeight = result.clientHeight;
        result.rows++;
        if (result.clientHeight === oldHeight) {
            // Height didn't change, so bail out.
            break;
        }
        result.scrollTop = 1;
    }
}

/**
 * Input handler for JMESPath demos. Re-evaluates the query and data.
 * using client-side JavaScript implementation
 * @param event Input event
 */
function demoInput(event) {
    const demo = event.currentTarget.parentElement;
    demoInputImpl(demo, (json, query, result) => {
        // compute JMESPath expression using local JavaScript implementation
        const searched = jp(json, query.value);
        result.value = formatJson(searched);
    })
}

/**
 * Input handler for JMESPath demos. Re-evaluates the query and data.
 * @param event Input event
 */
function demoInputImpl(demo, fun) {
    const dataInput = demo.getElementsByClassName("data").item(0);
    const queryInput = demo.getElementsByClassName("query").item(0)
    const resultTextArea = demo.getElementsByClassName("result").item(0)
    try {
        const json = JSON.parse(dataInput.value)
        fun(json, queryInput, resultTextArea);
    } catch (e) {
        resultTextArea.value = e.message
    }

    resizeResultTextAreaToFit(demo);
}