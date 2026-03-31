---
title: "to_array"
description: "* array - Returns the passed in value."
topic: "conversion"
signature: "to_array(arg: any) -> array"
version: "latest"
---

## Description

* array - Returns the passed in value.
* number/string/object/boolean/null - Returns a one element array containing
the passed in argument.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `arg` | `any` |  |


## Returns

**Type:** `array`

## Examples

```code
search(to_array([1, 2]), null) -> [1,2]
```

```code
search(to_array('string'), null) -> ["string"]
```

```code
search(to_array(0), null) -> [0]
```

```code
search(to_array(true), null) -> [true]
```

```code
search(to_array([object Object]), null) -> [{"foo":"bar"}]
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
| `to_array('foo')` | `["foo"]` |
| `to_array(0)` | `[0]` |
| `to_array(objects)` | `[{"foo":"bar","bar":"baz"}]` |
| `to_array([1, 2, 3])` | `[1,2,3]` |
| `to_array(false)` | `[false]` |

