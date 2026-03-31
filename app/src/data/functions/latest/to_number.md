---
title: "to_number"
description: "* string - Returns the parsed number."
topic: "conversion"
signature: "to_number(arg: any) -> number"
version: "latest"
---

## Description

* string - Returns the parsed number.  Any string that conforms to the
`json-number` production is supported.  Note that the floating number
support will be implementation specific, but implementations should support
at least IEEE 754-2008 binary64 (double precision) numbers, as this is
generally available and widely used.


* number - Returns the passed in value.


* array - null


* object - null


* boolean - null


* null - null


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `arg` | `any` |  |


## Returns

**Type:** `number`

## Examples

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
| `to_number('1.0')` | `1` |
| `to_number('1.1')` | `1.1` |
| `to_number('4')` | `4` |
| `to_number(notanumber)` | `null` |
| `to_number(false)` | `null` |
| `to_number(null)` | `null` |
| `to_number([0])` | `null` |
| `to_number([object Object])` | `null` |

