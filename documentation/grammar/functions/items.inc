.. _func-items:

items
-----

::

    array[array[any]] items(object $obj)

Returns a an array of key value pairs for the provided object ``$obj``. Each
pair is a 2-item array with the first item being the key and the second item
being the value. This function is the inverse of :ref:`func-to-object`.
Note that because JSON hashes are inheritently unordered, the key value pairs
of the provided object ``$obj`` are inheritently unordered.  Implementations
are not required to return values in any specific order.  For example, given
the input::

    {"a": "first", "b": "second", "c": "third"}

The expression ``items(@)`` could have any of these return values:

* ``[["a", "first"], ["b", "second"], ["c", "third"]]``
* ``[["a", "first"], ["c", "third"], ["b", "second"]]``
* ``[["b", "second"], ["a", "first"], ["c", "third"]]``
* ``[["b", "second"], ["c", "third"], ["a", "first"]]``
* ``[["c", "third"], ["a", "first"], ["b", "second"]]``
* ``[["c", "third"], ["b", "second"], ["a", "first"]]``

If you would like a specific order, consider using the ``sort_by`` function.

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``{"a": "first", "b": "second"}``
    - ``items(@)``
    - ``[["b", "second"], ["a", "first"]]``
  * - ``{"z": "last", "b": "second"}``
    - ``sort_by(items(@), &[0])``
    - ``[["b", "second"], ["z", "last"]]``
  * - ``{"z": "last", "b": "second"}``
    - ``sort_by(items(@), &[1])``
    - ``[["z", "last"], ["b", "second"]]``


.. _func-join:

join
----

::

    string join(string $glue, array[string] $stringsarray)

Returns all of the elements from the provided ``$stringsarray`` array joined
together using the ``$glue`` argument as a separator between each.


.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``["a", "b"]``
    - ``join(`, `, @)``
    - "a, b"
  * - ``["a", "b"]``
    - ``join(````, @)``
    - "ab"
  * - ``["a", false, "b"]``
    - ``join(`, `, @)``
    - ``<error: invalid-type>``
  * - ``[false]``
    - ``join(`, `, @)``
    - ``<error: invalid-type>``

.. _func-keys:

keys
----

::

    array keys(object $obj)

Returns an array containing the keys of the provided object.
Note that because JSON hashes are inheritently unordered, the
keys associated with the provided object ``obj`` are inheritently
unordered.  Implementations are not required to return keys in
any specific order.

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``{"foo": "baz", "bar": "bam"}``
    - ``keys(@)``
    - ``["foo", "bar"]``
  * - ``{}``
    - ``keys(@)``
    - ``[]``
  * - ``false``
    - ``keys(@)``
    - ``<error: invalid-type>``
  * - ``[b, a, c]``
    - ``keys(@)``
    - ``<error: invalid-type>``


.. _func-length:

length
------

::

    number length(string|array|object $subject)

Returns the length of the given argument using the following types rules:

1. string: returns the number of code points in the string
2. array: returns the number of elements in the array
3. object: returns the number of key-value pairs in the object

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - n/a
    - ``length(`abc`)``
    - 3
  * - "current"
    - ``length(@)``
    - 7
  * - "current"
    - ``length(not_there)``
    - ``<error: invalid-type>``
  * - ``["a", "b", "c"]``
    - ``length(@)``
    - 3
  * - ``[]``
    - ``length(@)``
    - 0
  * - ``{}``
    - ``length(@)``
    - 0
  * - ``{"foo": "bar", "baz": "bam"}``
    - ``length(@)``
    - 2

.. _func-map:

map
---

::

    array[any] map(expression->any->any expr, array[any] elements)

Apply the ``expr`` to every element in the ``elements`` array
and return the array of results.  An ``elements`` of length
N will produce a return array of length N.

Unlike a projection, (``[*].bar``), ``map()`` will include
the result of applying the ``expr`` for every element in the
``elements`` array, even if the result if ``null``.

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``{"array": [{"foo": "a"}, {"foo": "b"}, {}, [], {"foo": "f"}]}``
    - ``map(&foo, array)``
    - ``["a", "b", null, null, "f"]``
  * - ``[[1, 2, 3, [4]], [5, 6, 7, [8, 9]]]``
    - ``map(&[], @)``
    - ``[[1, 2, 3, 4], [5, 6, 7, 8, 9]]``


.. _func-max:

max
---

::

    number max(array[number]|array[string] $collection)

Returns the highest found number in the provided array argument.

An empty array will produce a return value of null.

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``[10, 15]``
    - ``max(@)``
    - 15
  * - ``["a", "b"]``
    - ``max(@)``
    - "b"
  * - ``["a", 2, "b"]``
    - ``max(@)``
    - ``<error: invalid-type>``
  * - ``[10, false, 20]``
    - ``max(@)``
    - ``<error: invalid-type>``


.. _func-max-by:

max_by
------

::

    max_by(array elements, expression->number|expression->string expr)

Return the maximum element in an array using the expression ``expr`` as the
comparison key.  The entire maximum element is returned.
Below are several examples using the ``people`` array (defined above) as the
given input.


.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Expression
    - Result
  * - ``max_by(people, &age)``
    - ``{"age": 50, "age_str": "50", "bool": false, "name": "d"}``
  * - ``max_by(people, &age).age``
    - 50
  * - ``max_by(people, &to_number(age_str))``
    - ``{"age": 50, "age_str": "50", "bool": false, "name": "d"}``
  * - ``max_by(people, &age_str)``
    - <error: invalid-type>
  * - ``max_by(people, age)``
    - <error: invalid-type>


.. _func-merge:

merge
-----

::

    object merge([object *argument, [, object $...]])

Accepts 0 or more objects as arguments, and returns a single object
with subsequent objects merged.  Each subsequent object's key/value
pairs are added to the preceding object.  This function is used
to combine multiple objects into one.  You can think of this as
the first object being the base object, and each subsequent argument
being overrides that are applied to the base object.


.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Expression
    - Result
  * - ``merge(`{"a": "b"}`, `{"c": "d"}`)``
    - ``{"a": "b", "c": "d"}``
  * - ``merge(`{"a": "b"}`, `{"a": "override"}`)``
    - ``{"a": "override"}``
  * - ``merge(`{"a": "x", "b": "y"}`, `{"b": "override", "c": "z"}`)``
    - ``{"a": "x", "b": "override", "c": "z"}``


.. _func-min:

min
---

::

    number min(array[number]|array[string] $collection)

Returns the lowest found number in the provided ``$collection`` argument.


.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``[10, 15]``
    - ``min(@)``
    - 10
  * - ``["a", "b"]``
    - ``min(@)``
    - "a"
  * - ``["a", 2, "b"]``
    - ``min(@)``
    - ``<error: invalid-type>``
  * - ``[10, false, 20]``
    - ``min(@)``
    - ``<error: invalid-type>``


.. _func-min-by:

min_by
------

::

    min_by(array elements, expression->number|expression->string expr)

Return the minimum element in an array using the expression ``expr`` as the
comparison key.  The entire maximum element is returned.
Below are several examples using the ``people`` array (defined above) as the
given input.


.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Expression
    - Result
  * - ``min_by(people, &age)``
    - ``{"age": 10, "age_str": "10", "bool": true, "name": 3}``
  * - ``min_by(people, &age).age``
    - 10
  * - ``min_by(people, &to_number(age_str))``
    - ``{"age": 10, "age_str": "10", "bool": true, "name": 3}``
  * - ``min_by(people, &age_str)``
    - ``<error: invalid-type>``
  * - ``min_by(people, age)``
    - ``<error: invalid-type>``


.. _not_null:

not_null
--------

::

    any not_null([any $argument [, any $...]])

Returns the first argument that does not resolve to ``null``.  This function
accepts one or more arguments, and will evaluate them in order until a
non null argument is encounted.  If all arguments values resolve to ``null``,
then a value of ``null`` is returned.

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``{"a": null, "b": null, "c": [], "d": "foo"}``
    - ``not_null(no_exist, a, b, c, d)``
    - []
  * - ``{"a": null, "b": null, "c": [], "d": "foo"}``
    - ``not_null(a, b, `null`, d, c)``
    - ``"foo"``
  * - ``{"a": null, "b": null, "c": [], "d": "foo"}``
    - ``not_null(a, b)``
    - ``null``


.. _func-reverse:

reverse
-------

::

    array reverse(string|array $argument)

Reverses the order of the ``$argument``.


.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``[0, 1, 2, 3, 4]``
    - ``reverse(@)``
    - ``[4, 3, 2, 1, 0]``
  * - ``[]``
    - ``reverse(@)``
    - ``[]``
  * - ``["a", "b", "c", 1, 2, 3]``
    - ``reverse(@)``
    - ``[3, 2, 1, "c", "b", "a"]``
  * - ``"abcd``
    - ``reverse(@)``
    - ``dcba``


.. _func-sort:

sort
----

::

    array sort(array[number]|array[string] $list)

This function accepts an array ``$list`` argument and returns the sorted
elements of the ``$list`` as an array.

The array must be a list of strings or numbers.  Sorting strings is based on
code points.  Locale is not taken into account.



.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``[b, a, c]``
    - ``sort(@)``
    - ``[a, b, c]``
  * - ``[1, a, c]``
    - ``sort(@)``
    - ``[1, a, c]``
  * - ``[false, [], null]``
    - ``sort(@)``
    - ``[[], null, false]``
  * - ``[[], {}, false]``
    - ``sort(@)``
    - ``[{}, [], false]``
  * - ``{"a": 1, "b": 2}``
    - ``sort(@)``
    - ``null``
  * - ``false``
    - ``sort(@)``
    - ``null``


.. _func-sort-by:

sort_by
-------

::

    sort_by(array elements, expression->number|expression->string expr)

Sort an array using an expression ``expr`` as the sort key.  For each element
in the array of ``elements``, the ``expr`` expression is applied and the
resulting value is used as the key used when sorting the ``elements``.

If the result of evaluating the ``expr`` against the current array element
results in type other than a ``number`` or a ``string``, a type error will
occur.

Below are several examples using the ``people`` array (defined above) as the
given input.  ``sort_by`` follows the same sorting logic as the ``sort``
function.


.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Expression
    - Result
  * - ``sort_by(people, &age)[].age``
    - ``[10, 20, 30, 40, 50]``
  * - ``sort_by(people, &age)[0]``
    - ``{"age": 10, "age_str": "10", "bool": true, "name": 3}``
  * - ``sort_by(people, &to_number(age_str))[0]``
    - ``{"age": 10, "age_str": "10", "bool": true, "name": 3}``


.. _func-starts-with:

starts_with
-----------

::

    boolean starts_with(string $subject, string $prefix)

Returns ``true`` if the ``$subject`` starts with the ``$prefix``, otherwise
this function returns ``false``.

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``foobarbaz``
    - ``starts_with(@, ``foo``)``
    - ``true``
  * - ``foobarbaz``
    - ``starts_with(@, ``baz``)``
    - ``false``
  * - ``foobarbaz``
    - ``starts_with(@, ``f``)``
    - ``true``


.. _func-sum:

sum
---

::

    number sum(array[number] $collection)

Returns the sum of the provided array argument.

An empty array will produce a return value of 0.

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``[10, 15]``
    - ``sum(@)``
    - 25
  * - ``[10, false, 20]``
    - ``max(@)``
    - ``<error: invalid-type>``
  * - ``[10, false, 20]``
    - ``sum([].to_number(@))``
    - 30
  * - ``[]``
    - ``sum(@)``
    - 0


.. _func-to-array:

to_array
---------

::

    array to_array(any $arg)

* array - Returns the passed in value.
* number/string/object/boolean - Returns a one element array containing
  the passed in argument.


.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Expression
    - Result
  * - ``to_array(`[1, 2]`)``
    - ``[1, 2]``
  * - ``to_array(`"string"`)``
    - ``["string"]``
  * - ``to_array(`0`)``
    - ``[0]``
  * - ``to_array(`true`)``
    - ``[true]``
  * - ``to_array(`{"foo": "bar"}`)``
    - ``[{"foo": "bar"}]``


