---
title: "group_by"
description: "Groups an array of objects $elements using an expression $expr as the group key."
topic: "collections"
signature: "group_by(elements: array[object], expr: expression->string) -> object"
version: "latest"
---

## Description

Groups an array of objects `$elements` using an expression `$expr` as the group key.
The `$expr` expression is applied to each element in the array `$elements` and the 
resulting value is used as a group key.

The result is an object whose keys are the unique set of string keys and whose respective values are an array of objects array matching the group criteria.

Objects that do not match the group criteria are discarded from the output.
This includes objects for which applying the `$expr` expression evaluates to `null`.

If the result of applying the `$expr` expression against the current array element
results in type other than `string` or `null`, an `invalid-type` error MUST be raised.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `elements` | `array[object]` |  |
| `expr` | `expression->string` |  |


## Returns

**Type:** `object`

## Examples

```code
search(group_by(items, &nodeName), {"items":[{"spec":{"nodeName":"node_01","other":"values_01"}},{"spec":{"nodeName":"node_02","other":"values_02"}},{"spec":{"nodeName":"node_03","other":"values_03"}},{"spec":{"nodeName":"node_01","other":"values_04"}}]}) -> {"nodeName":{"node_01":[{"spec":{"nodeName":"node_01","other":"values_01"}},{"spec":{"nodeName":"node_01","other":"values_04"}}],"node_02":[{"spec":{"nodeName":"node_02","other":"values_02"}}],"node_03":[{"spec":{"nodeName":"node_03","other":"values_03"}}]}}
```

Given the following JSON input:

```json
{
  "array": [
    {
      "b": true,
      "name": "one"
    },
    {
      "b": false,
      "name": "two"
    },
    {
      "b": false
    }
  ]
}
```

| Expression | Result |
|------------|--------|
| `group_by(array, &name)` | `[{"age":10,"age_str":"10","bool":true,"name":3},{"age":20,"age_str":"20","bool":true,"name":"a","extra":"foo"},{"age":30,"age_str":"30","bool":true,"name":"c"},{"age":40,"age_str":"40","bool":false,"name":"b","extra":"bar"},{"age":50,"age_str":"50","bool":false,"name":"d"}]` |
| `group_by(array, &b)` | `ERROR: invalid-type` |

