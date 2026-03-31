---
title: "merge"
description: "Accepts 0 or more objects as arguments, and returns a single object"
topic: "collections"
signature: "merge(argument: object, ..?: object) -> object"
version: "2015-09-05-9e8d0e3"
---

## Description

Accepts 0 or more objects as arguments, and returns a single object
with subsequent objects merged.  Each subsequent object’s key/value
pairs are added to the preceding object.  This function is used
to combine multiple objects into one.  You can think of this as
the first object being the base object, and each subsequent argument
being overrides that are applied to the base object.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `argument` | `object` |  |


### Optional

| Name | Type | Description |
|------|------|-------------|
| `..` | `object` |  |


## Returns

**Type:** `object`

## Examples

```code
search(merge([object Object], [object Object]), null) -> {"a":"b","c":"d"}
```

```code
search(merge([object Object], [object Object]), null) -> {"a":"override"}
```

```code
search(merge([object Object], [object Object]), null) -> {"a":"x","b":"override","c":"z"}
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
| `merge([object Object])` | `{}` |
| `merge([object Object], [object Object])` | `{}` |
| `merge([object Object], [object Object])` | `{"a":1,"b":2}` |
| `merge([object Object], [object Object])` | `{"a":2}` |
| `merge([object Object], [object Object], [object Object])` | `{"a":2,"b":2,"c":3,"d":4}` |

