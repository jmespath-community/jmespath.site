---
title: "keys"
description: "Returns an array containing the keys of the provided object."
topic: "collections"
signature: "keys(obj: object) -> array"
version: "2015-09-05-9e8d0e3"
---

## Description

Returns an array containing the keys of the provided object.
Note that because JSON hashes are inheritently unordered, the
keys associated with the provided object `obj` are inheritently
unordered.  Implementations are not required to return keys in
any specific order.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `obj` | `object` |  |


## Returns

**Type:** `array`

## Examples

```code
search(keys(@), {"foo":"baz","bar":"bam"}) -> ["foo","bar"]
```

```code
search(keys(@), {}) -> []
```

```code
search(keys(@), false) -> ERROR: invalid-type
```

```code
search(keys(@), ["b","a","c"]) -> ERROR: invalid-type
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
| `keys(foo)` | `ERROR: invalid-type` |
| `keys(strings)` | `ERROR: invalid-type` |
| `keys(false)` | `ERROR: invalid-type` |
| `keys(empty_hash)` | `[]` |

