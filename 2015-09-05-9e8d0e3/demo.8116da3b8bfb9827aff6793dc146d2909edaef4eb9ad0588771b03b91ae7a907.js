/**
 * Helper for JMESPath interactive demos
 * Add onclick="demo" to any demo to use this function
 * @param event Click event
 */
function demo(event) {
    const demo = event.currentTarget
    if (event.target !== demo && demo.classList.contains("active")) return true; // Ignore clicking on children when expanded
    const active = demo.classList.toggle("active")
    const query = demo.getElementsByClassName("query").item(0)
    query.focus()
    const result = demo.getElementsByClassName("result").item(0)
    if (active && !result.innerHTML.trim()) {
        demoInput({currentTarget: query})
    }
}

/**
 * Input handler for JMESPath demos. Re-evaluates the query and data.
 * @param event Input event
 */
function demoInput(event) {
    const demo = event.currentTarget.parentElement
    const query = demo.getElementsByClassName("query").item(0)
    const result = demo.getElementsByClassName("result").item(0)
    try {
        const data = JSON.parse(demo.getElementsByClassName("data").item(0).value)
        result.textContent = JSON.stringify(jmespath.search(data, query.value), null, 2).replaceAll(",\n", ",")
    } catch (e) {
        result.textContent = e.message
    }
}
