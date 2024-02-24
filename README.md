<!--

@license Apache-2.0

Copyright (c) 2023 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# seq2multislice

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Convert a multidimensional subsequence string to a [`MultiSlice`][@stdlib/slice/multi] object.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->



<section class="usage">

## Usage

```javascript
import seq2multislice from 'https://cdn.jsdelivr.net/gh/stdlib-js/slice-base-seq2multislice@deno/mod.js';
```

<a name="main"></a>

#### seq2multislice( str, shape, strict )

Converts a multidimensional subsequence string to a [`MultiSlice`][@stdlib/slice/multi] object, where `shape` specifies the maximum allowed slice shape.

```javascript
var s = seq2multislice( ':5', [ 10 ], false );
// returns <MultiSlice>

var s0 = s.data[ 0 ];
// returns <Slice>

var v = s0.start;
// returns 0

v = s0.stop;
// returns 5

v = s0.step;
// returns 1
```

A multidimensional subsequence string is a comma-separated list of single-dimension indexing expressions (i.e., integers and/or [subsequence strings][@stdlib/slice/base/seq2slice]). For example, the following

```text
2
:
2:
:10
2:10
::-1
10:2:-1
:2:
2:10:
2::2
:10:2
:, :, :
1, 2, 3
0:10, 1:20:2, ::-1
...
:, ..., 2
```

are all valid multidimensional subsequence strings. The function returns an error object if provided an invalid subsequence string.

```javascript
var s = seq2multislice( '1:2:3:4', [ 10 ], false );
// returns { 'code': 'ERR_SLICE_INVALID_SUBSEQUENCE' }
```

When `strict` is `true`, the function returns an error object if a subsequence string resolves to a slice exceeding index bounds.

```javascript
var s = seq2multislice( '10:20', [ 10 ], true );
// returns { 'code': 'ERR_SLICE_OUT_OF_BOUNDS' }
```

A returned error object may have one of the following error codes:

-   **ERR_SLICE_INVALID_SUBSEQUENCE**: a subsequence string is invalid.
-   **ERR_SLICE_INVALID_INCREMENT**: a subsequence string must have a non-zero increment.
-   **ERR_SLICE_OUT_OF_BOUNDS**: a subsequence string resolves to a slice exceeding index bounds.
-   **ERR_SLICE_TOO_MANY_DIMENSIONS**: a subsequence string has more dimensions than the provided shape.
-   **ERR_SLICE_INSUFFICIENT_DIMENSIONS**: a subsequence string has too few dimensions.
-   **ERR_SLICE_INVALID_ELLIPSIS**: a subsequence string must only contain at most one ellipsis.

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   Providing a single nonnegative integer `i` as a single-dimension index indexes the same elements as the subsequence `i:i+1`.
-   Providing a single negative integer `i` as a single-dimension index indexes the same elements as the subsequence `n+i:n+i+i`, where `n` is the dimension size.
-   While integers index the same elements as equivalent subsequences, providing an integer as a single-dimension index indicates to reduce the number of dimensions by one (e.g., if the provided shape corresponds to an array having rank `2`, then `rank(A)-1 == rank(A['0,:'])`). In contrast, providing a subsequence indicates to retain a respective dimension (e.g., if the provided shape corresponds to an array having rank `2`, then `rank(A) == rank(A[':,:'])`).
-   A multidimensional subsequence string can only contain **one** ellipsis ('...') operator. An ellipsis indicates to apply `:` to each dimension necessary to index all dimensions (e.g., if `A` has rank `4`, `A['1:, ..., 2:5'] == A['1:, :, :, 2:5']`).
-   Except in the case of providing a single ellipsis, the number of single-dimension indexing expressions must equal the number of dimensions in the input shape.

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
import seq2multislice from 'https://cdn.jsdelivr.net/gh/stdlib-js/slice-base-seq2multislice@deno/mod.js';

var s = seq2multislice( ':,:,:', [ 10, 10, 10 ], false );
var d = s.data;
// returns [ <Slice>, <Slice>, <Slice> ]

s = seq2multislice( '3,2:10,:', [ 10, 10, 10 ], false );
d = s.data;
// returns [ 3, <Slice>, <Slice> ]

s = seq2multislice( '2,2:,-5', [ 10, 10, 10 ], false );
d = s.data;
// returns [ 2, <Slice>, -5 ]

s = seq2multislice( '::-2,-1,...,:', [ 10, 10, 10, 10, 10, 10 ], false );
d = s.data;
// returns [ <Slice>, -1, <Slice>, <Slice>, <Slice>, <Slice> ]

s = seq2multislice( 'foo,bar', [ 10, 10 ], false );
// returns { 'code': 'ERR_SLICE_INVALID_SUBSEQUENCE' }
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/slice-base-seq2multislice.svg
[npm-url]: https://npmjs.org/package/@stdlib/slice-base-seq2multislice

[test-image]: https://github.com/stdlib-js/slice-base-seq2multislice/actions/workflows/test.yml/badge.svg?branch=v0.2.1
[test-url]: https://github.com/stdlib-js/slice-base-seq2multislice/actions/workflows/test.yml?query=branch:v0.2.1

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/slice-base-seq2multislice/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/slice-base-seq2multislice?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/slice-base-seq2multislice.svg
[dependencies-url]: https://david-dm.org/stdlib-js/slice-base-seq2multislice/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/slice-base-seq2multislice/tree/deno
[deno-readme]: https://github.com/stdlib-js/slice-base-seq2multislice/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/slice-base-seq2multislice/tree/umd
[umd-readme]: https://github.com/stdlib-js/slice-base-seq2multislice/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/slice-base-seq2multislice/tree/esm
[esm-readme]: https://github.com/stdlib-js/slice-base-seq2multislice/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/slice-base-seq2multislice/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/slice-base-seq2multislice/main/LICENSE

[@stdlib/slice/multi]: https://github.com/stdlib-js/slice-multi/tree/deno

[@stdlib/slice/base/seq2slice]: https://github.com/stdlib-js/slice-base-seq2slice/tree/deno

</section>

<!-- /.links -->
