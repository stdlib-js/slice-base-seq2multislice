/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var trim = require( '@stdlib/string-base-trim' );
var Slice = require( '@stdlib/slice-ctor' );
var MultiSlice = require( '@stdlib/slice-multi' );
var seq2slice = require( '@stdlib/slice-base-seq2slice' );
var eInvalidEllipsis = require( './error_invalid_ellipsis.js' );
var eInsufficientDimensions = require( './error_insufficient_dimensions.js' );
var eTooManyDimensions = require( './error_too_many_dimensions.js' );
var eOutOfBounds = require( './error_out_of_bounds.js' );
var RE_SUBSEQ_SEP = require( './re_subseq_sep.js' );
var RE_INTEGER = require( './re_integer.js' );


// MAIN //

/**
* Converts a multidimensional subsequence string to a MultiSlice object.
*
* ## Notes
*
* -   A multidimensional subsequence string is a comma-separated list of single-dimension indexing expressions (i.e., integers and/or subsequence strings). For example, the following
*
*     ```text
*     2
*     :
*     2:
*     :10
*     2:10
*     ::-1
*     10:2:-1
*     :2:
*     2:10:
*     2::2
*     :10:2
*     :, :, :
*     1, 2, 3
*     0:10, 1:20:2, ::-1
*     ...
*     :, ..., 2
*     ```
*
*     are all valid multidimensional subsequence strings.
*
* -   Providing a single nonnegative integer `i` as a single-dimension index indexes the same elements as the subsequence `i:i+1`.
*
* -   Providing a single negative integer `i` as a single-dimension index indexes the same elements as the subsequence `n+i:n+i+i`, where `n` is the dimension size.
*
* -   While integers index the same elements as equivalent subsequences, providing an integer as a single-dimension index indicates to reduce the number of dimensions by one (e.g., if the provided shape corresponds to an array having rank `2`, then `rank(A)-1 == rank(A['0,:'])`). In contrast, providing a subsequence indicates to retain a respective dimension (e.g., if the provided shape corresponds to an array having rank `2`, then `rank(A) == rank(A[':,:'])`).
*
* -   A multidimensional subsequence string can only contain **one** ellipsis ('...') operator. An ellipsis indicates to apply `:` to each dimension necessary to index all dimensions (e.g., if `A` has rank `4`, `A['1:, ..., 2:5'] == A['1:, :, :, 2:5']`).
*
* -   Except in the case of providing a single ellipsis, the number of single-dimension indexing expressions must equal the number of dimensions in the input shape.
*
* -   The function returns an error object if provided an invalid subsequence string.
*
* -   If `strict` is `true`, the function returns an error object if a single-dimension index expression which exceeds index bounds.
*
* @param {string} str - input string
* @param {NonNegativeIntegerArray} shape - maximum allowed slice shape
* @param {boolean} strict - boolean indicating whether to enforce strict bounds checking
* @returns {(MultiSlice|Object)} MultiSlice object or an error object
*
* @example
* var s = seq2multislice( '0:10:2', [ 10 ], false );
* // returns <MultiSlice>
*
* var data = s.data;
* // returns [ <Slice> ]
*
* var s0 = data[ 0 ];
* // returns <Slice>
*
* var v = s0.start;
* // returns 0
*
* v = s0.stop;
* // returns 10
*
* v = s0.step;
* // returns 2
*
* @example
* var s = seq2multislice( 'end-3::-1', [ 10 ], false );
* // returns <MultiSlice>
*
* var data = s.data;
* // returns [ <Slice> ]
*
* var s0 = data[ 0 ];
* // returns <Slice>
*
* var v = s0.start;
* // returns 7
*
* v = s0.stop;
* // returns null
*
* v = s0.step;
* // returns -1
*
* @example
* var s = seq2multislice( '2,0:10:2,-4', [ 10, 10, 10 ], false );
* // returns <MultiSlice>
*
* var data = s.data;
* // returns [ 2, <Slice>, -4 ]
*
* @example
* var s = seq2multislice( '::-2,...,:', [ 10, 10, 10, 10, 10 ], false );
* // returns <MultiSlice>
*
* var data = s.data;
* // returns [ <Slice>, <Slice>, <Slice>, <Slice>, <Slice> ]
*
* var s1 = data[ 1 ];
* // returns <Slice>
*
* var v = s1.start;
* // returns 0
*
* v = s1.stop;
* // returns 10
*
* v = s1.step;
* // returns 1
*/
function seq2multislice( str, shape, strict ) {
	var parts;
	var args;
	var FLG;
	var len;
	var N;
	var M;
	var s;
	var i;
	var j;
	var k;

	N = shape.length;

	parts = trim( str ).split( RE_SUBSEQ_SEP );
	M = parts.length;

	FLG = false;
	args = [];
	j = 0; // dual pointer as `parts.length` may not equal `shape.length` due to the ellipsis operator
	for ( i = 0; i < M; i++ ) {
		s = parts[ i ];

		// Case: ellipsis operator
		if ( s === '...' ) {
			// Only allow a single usage of the ellipsis operator...
			if ( FLG ) {
				return eInvalidEllipsis();
			}
			FLG = true;
			for ( k = 0; k < N-M+1; k++ ) {
				args.push( new Slice( 0, shape[ j ], 1 ) );
				j += 1;
			}
			continue;
		}
		len = shape[ j ];

		// Case: integer index
		if ( RE_INTEGER.test( s ) ) {
			s = parseInt( s, 10 );
			if ( strict ) {
				if ( s < 0 ) {
					if ( len + s < 0 ) {
						return eOutOfBounds();
					}
				} else if ( s >= len ) {
					return eOutOfBounds();
				}
			}
			j += 1;
		}
		// Case: subsequence
		else {
			s = seq2slice( s, len, strict );
			if ( s.code ) {
				return s;
			}
			j += 1;
		}
		args.push( s );
	}
	// Verify that we've been provided the right number of slice dimensions...
	if ( args.length !== N ) {
		if ( args.length < N ) {
			return eInsufficientDimensions();
		}
		return eTooManyDimensions();
	}
	return MultiSlice.apply( null, args );
}


// EXPORTS //

module.exports = seq2multislice;
