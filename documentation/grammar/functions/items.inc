.. _func-items:

items
-----

::

    array[array[any]] items(object $obj)

Returns a an array of key value pairs for the provided object ``$obj``. Each
pair is a 2-item array with the first item being the key and the second item
being the value. This function is the inverse of :ref:`func-from_items`.
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
