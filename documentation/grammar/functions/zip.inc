.. _func-zip:

zip
---

::

    array[array[any]] zip([array[any] $arg, [, array[any] $...]])

Accepts 1 or more arrays as arguments and returns an array of arrays in which
the *i-th* array contains the *i-th* element from each of the argument arrays.
The returned array is truncated to the length of the shortest argument array.

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Expression
    - Result
  * - ``zip(`["a", "b"]`, `[1, 2]`)``
    - ``[["a", 1], ["b", 2]]``
  * - ``zip(`["a", "b", "c"]`, `[1, 2]`)``
    - ``[["a", 1], ["b", 2]]``


