---
title: "not_null"
description: "Returns the first argument that does not resolve to null."
topic: "misc"
signature: "not_null(argument: any, ..?: any) -> any"
version: "2015-09-05-9e8d0e3"
---

## Description

Returns the first argument that does not resolve to `null`.  This function
accepts one or more arguments, and will evaluate them in order until a
non null argument is encounted.  If all arguments values resolve to `null`,
then a value of `null` is returned.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `argument` | `any` |  |


### Optional

| Name | Type | Description |
|------|------|-------------|
| `..` | `any` |  |


## Returns

**Type:** `any`

## Examples

```code
search(not_null(no_exist, a, b, c, d), {"a":null,"b":null,"c":[],"d":"foo"}) -> []
```

```code
search(not_null(a, b, null, d, c), {"a":null,"b":null,"c":[],"d":"foo"}) -> "foo"
```

```code
search(not_null(a, b), {"a":null,"b":null,"c":[],"d":"foo"}) -> null
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
| `not_null(unknown_key, str)` | `"Str"` |
| `not_null(unknown_key, foo.bar, empty_list, str)` | `[]` |
| `not_null(unknown_key, null_key, empty_list, str)` | `[]` |
| `not_null(all, expressions, are_null)` | `null` |
| `not_null()` | `ERROR: invalid-arity` |

