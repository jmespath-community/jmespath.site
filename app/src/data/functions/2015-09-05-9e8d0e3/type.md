---
title: "type"
description: "Returns the JavaScript type of the given $subject argument as a string"
topic: "misc"
signature: "type(subject: array | object | string | number | boolean | null) -> string"
version: "2015-09-05-9e8d0e3"
---

## Description

Returns the JavaScript type of the given `$subject` argument as a string
value.

The return value MUST be one of the following:

* number
* string
* boolean
* array
* object
* null


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `array, object, string, number, boolean, null` |  |


## Returns

**Type:** `string`

## Examples

```code
search(type(@), "foo") -> "string"
```

```code
search(type(@), true) -> "boolean"
```

```code
search(type(@), false) -> "boolean"
```

```code
search(type(@), null) -> "null"
```

```code
search(type(@), 123) -> "number"
```

```code
search(type(@), 123.05) -> "number"
```

```code
search(type(@), ["abc"]) -> "array"
```

```code
search(type(@), {"abc":"123"}) -> "object"
```

Given the following JSON input:

```json
{
  "foo": -1,
  "zero": 0,
  "numbers": [
    -1,
    3,
    4,
    5
  ],
  "array": [
    -1,
    3,
    4,
    5,
    "a",
    "100"
  ],
  "strings": [
    "a",
    "b",
    "c"
  ],
  "decimals": [
    1.01,
    1.2,
    -1.5
  ],
  "str": "Str",
  "false": false,
  "empty_list": [],
  "empty_hash": {},
  "objects": {
    "foo": "bar",
    "bar": "baz"
  },
  "null_key": null
}
```

| Expression | Result |
|------------|--------|
| `type(abc)` | `"string"` |
| `type(1)` | `"number"` |
| `type(2)` | `"number"` |
| `type(true)` | `"boolean"` |
| `type(false)` | `"boolean"` |
| `type(null)` | `"null"` |
| `type([0])` | `"array"` |
| `type([object Object])` | `"object"` |
| `type(@)` | `"object"` |

