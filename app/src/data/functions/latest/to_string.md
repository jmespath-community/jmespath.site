---
title: "to_string"
description: "* string - Returns the passed in value."
topic: "conversion"
signature: "to_string(arg: any) -> string"
version: "latest"
---

## Description


* string - Returns the passed in value.


* number/array/object/boolean - The JSON encoded value of the object.  The
JSON encoder should emit the encoded JSON value without adding any additional
new lines.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `arg` | `any` |  |


## Returns

**Type:** `string`

## Examples

```code
search(to_string(2), null) -> "2"
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
| `to_string('foo')` | `"foo"` |
| `to_string(1.2)` | `"1.2"` |
| `to_string([0, 1])` | `"[0,1]"` |

