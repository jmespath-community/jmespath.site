.. _func-from_items:

from_items
----------

::

    object from_items(array[array[any]] $arg)

Returns an object from the provided array of key value pairs. This function
is the inverse of :ref:`func-items`.

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``[["one", 1], ["two", 2]]``
    - ``from_items(@)``
    - ``{"one": 1, "two": 2}``


