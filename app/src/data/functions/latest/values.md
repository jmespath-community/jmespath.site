---
title: "values"
description: "Returns the values of the provided object."
topic: "collections"
signature: "values(obj: object) -> array"
version: "latest"
---

## Description

Returns the values of the provided object.
Note that because JSON hashes are inheritently unordered, the
values associated with the provided object `obj` are inheritently
unordered.  Implementations are not required to return values in
any specific order.  For example, given the input:

```
{"a": "first", "b": "second", "c": "third"}
```

The expression `values(@)` could have any of these return values:


* `["first", "second", "third"]`


* `["first", "third", "second"]`


* `["second", "first", "third"]`


* `["second", "third", "first"]`


* `["third", "first", "second"]`


* `["third", "second", "first"]`

If you would like a specific order, consider using the
`sort` or `sort_by` functions.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `obj` | `object` |  |


## Returns

**Type:** `array`

## Examples

```code
search(values(@), {"foo":"baz","bar":"bam"}) -> ["baz","bam"]
```

```code
search(values(@), ["a","b"]) -> ERROR: invalid-type
```

```code
search(values(@), false) -> ERROR: invalid-type
```

```code
search(values(foo), {"foo":-1,"zero":0,"numbers":[-1,3,4,5],"array":[-1,3,4,5,"a","100"],"strings":["a","b","c"],"decimals":[1.01,1.2,-1.5],"str":"Str","false":false,"empty_list":[],"empty_hash":{},"objects":{"foo":"bar","bar":"baz"},"null_key":null}) -> ERROR: invalid-type
```

