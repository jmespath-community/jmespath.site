---
---

{{% section class="try-it" %}}
# Try it Out!

Enter an expression in the search box to see JMESPath in action.

The expression is evaluated against the JSON data and the result is shown in the result pane.

To learn more about JMESPath, check out the [Tutorial](#tutorial) and [Examples](#examples)

Have questions? [Come chat with us](https://gitter.im/jmespath/chat)

Have a feature request? [Contribute](https://github.com/jmespath-community/jmespath.spec/discussions)
{{% /section %}}

```jmespath {.active }
locations[?state == 'WA'].name | sort(@) | {WashingtonCities: join(', ', @)}
{
  "locations": [
    {"name": "Seattle", "state": "WA"},
    {"name": "New York", "state": "NY"},
    {"name": "Bellevue", "state": "WA"},
    {"name": "Olympia", "state": "WA"}
  ]
}
```
{{% section %}}
# Complete ABNF Specification

The JMESPath language is described in an ABNF grammar with a complete specification. This ensures that the language
syntax is precisely defined.
{{% /section %}}
{{% section %}}
# Compliance Test Suite

JMESPath has a full suite of data driven testcases. This ensures parity for multiple libraries, and makes it easy for
developers to implement JMESPath in their language of choice.
{{% /section %}}
{{% section %}}
# Libraries in Multiple Languages

Each JMESPath library passes a complete suite of compliance tests to ensure they work as intended. There are libraries
in multiple languages including python, php, javascript and lua.
{{% /section %}}
