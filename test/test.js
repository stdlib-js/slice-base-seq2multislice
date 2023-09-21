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

/* eslint-disable new-cap */

'use strict';

// MODULES //

var tape = require( 'tape' );
var isMultiSlice = require( '@stdlib/assert-is-multi-slice' );
var isSlice = require( '@stdlib/assert-is-slice' );
var S = require( '@stdlib/slice-ctor' );
var seq2multislice = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof seq2multislice, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an error object if provided a first argument which is not a valid subsequence string', function test( t ) {
	var expected;
	var values;
	var shape;
	var i;

	shape = [ 10 ];

	values = [
		'foo',
		'bar',
		'foo,bar',
		'end+2',
		'end*2',
		'1/end',
		'1-end',
		':end+2',
		':end*2',
		':1/end',
		':1-end',
		'::end',
		'::1s',
		'1s::',
		':1s:',
		's1::',
		':s1:',
		'::s1',
		':end+2',
		'end+2:',
		'a',
		'3.14',
		'3.14:',
		'3.14::',
		':3.14',
		':3.14:',
		'::2/2',
		'::2-1',
		'::2*2',
		'2*2',
		'2*2:',
		'2*2::',
		':2+2',
		':2+2:',
		'end',
		' ',
		'_',
		'-',
		'-::',
		':-',
		'-:',
		'::-',
		'+::',
		':+',
		'+:',
		'::+',
		'end-:',
		'end/:',
		':end-',
		':end/',
		'end-1s:',
		'end/1s:',
		':end-1s',
		':end/1s'
	];
	expected = {
		'code': 'ERR_SLICE_INVALID_SUBSEQUENCE'
	};
	for ( i = 0; i < values.length; i++ ) {
		t.deepEqual( seq2multislice( values[ i ], shape, false ), expected, 'returns expected value when provided ' + values[ i ] );
		t.deepEqual( seq2multislice( values[ i ], shape, true ), expected, 'returns expected value when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function returns an error object if provided a first argument which is not a valid subsequence string (out-of-bounds, non-strict)', function test( t ) {
	var expected;
	var values;
	var shape;
	var i;

	shape = [ 10 ];

	values = [
		'end/0.5:',
		':end/0.5',
		'end/0.5::',
		':end/0.5:'
	];
	expected = {
		'code': 'ERR_SLICE_INVALID_SUBSEQUENCE'
	};
	for ( i = 0; i < values.length; i++ ) {
		t.deepEqual( seq2multislice( values[ i ], shape, false ), expected, 'returns expected value when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function returns an error object if provided a first argument which is not a valid subsequence string (out-of-bounds, strict)', function test( t ) {
	var expected;
	var values;
	var shape;
	var i;

	shape = [ 10 ];

	values = [
		'40:',
		':40',
		'-40:',
		':-40',
		'1:40',
		'1:40:2',
		'1:40:-2',
		'1:-40:-2',
		':40:2',
		'-40::2',
		'-40:-100',
		'-40:-100:-2',
		'-40:100',
		'-40:100:2',
		'40:-100:2',
		'40:-100:-2',
		'end/0.5:',
		':end/0.5',
		'end/0.5::',
		':end/0.5:',
		'end-20:',
		'end-20::5',
		':end-20',
		':end-20:5',
		'40',
		'-20',
		'1000',
		'-1000'
	];
	expected = {
		'code': 'ERR_SLICE_OUT_OF_BOUNDS'
	};
	for ( i = 0; i < values.length; i++ ) {
		t.deepEqual( seq2multislice( values[ i ], shape, true ), expected, 'returns expected value when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function returns an error object if provided a first argument which is not a valid subsequence string (zero increment)', function test( t ) {
	var expected;
	var values;
	var shape;
	var i;

	shape = [ 10 ];

	values = [
		'::0',
		'1:2:0',
		'1::0',
		':2:0',
		'end::0',
		':end:0',
		'end:end:0'
	];
	expected = {
		'code': 'ERR_SLICE_INVALID_INCREMENT'
	};
	for ( i = 0; i < values.length; i++ ) {
		t.deepEqual( seq2multislice( values[ i ], shape, false ), expected, 'returns expected value when provided ' + values[ i ] );
		t.deepEqual( seq2multislice( values[ i ], shape, true ), expected, 'returns expected value when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function returns an error object if provided a first argument which is not a valid subsequence string (too many dimensions)', function test( t ) {
	var expected;
	var values;
	var shape;
	var i;

	shape = [ 10 ];

	values = [
		'1,2',
		'1,2,3',
		'1,2,3,4',
		':,:',
		':,:,:'
	];
	expected = {
		'code': 'ERR_SLICE_TOO_MANY_DIMENSIONS'
	};
	for ( i = 0; i < values.length; i++ ) {
		t.deepEqual( seq2multislice( values[ i ], shape, false ), expected, 'returns expected value when provided ' + values[ i ] );
		t.deepEqual( seq2multislice( values[ i ], shape, true ), expected, 'returns expected value when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function returns an error object if provided a first argument which is not a valid subsequence string (insufficient dimensions)', function test( t ) {
	var expected;
	var values;
	var shape;
	var i;

	shape = [ 10, 10, 10 ];

	values = [
		'1',
		'1,2',
		':',
		':,:'
	];
	expected = {
		'code': 'ERR_SLICE_INSUFFICIENT_DIMENSIONS'
	};
	for ( i = 0; i < values.length; i++ ) {
		t.deepEqual( seq2multislice( values[ i ], shape, false ), expected, 'returns expected value when provided ' + values[ i ] );
		t.deepEqual( seq2multislice( values[ i ], shape, true ), expected, 'returns expected value when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function returns an error object if provided a first argument which is not a valid subsequence string (ellipsis)', function test( t ) {
	var expected;
	var values;
	var shape;
	var i;

	shape = [ 10, 10, 10 ];

	values = [
		'..., ..., ...',
		'1, ..., ...',
		'..., 1, ...',
		'..., ..., 1'
	];
	expected = {
		'code': 'ERR_SLICE_INVALID_ELLIPSIS'
	};
	for ( i = 0; i < values.length; i++ ) {
		t.deepEqual( seq2multislice( values[ i ], shape, false ), expected, 'returns expected value when provided ' + values[ i ] );
		t.deepEqual( seq2multislice( values[ i ], shape, true ), expected, 'returns expected value when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function converts a subsequence string to a MultiSlice object (1d)', function test( t ) {
	var expected;
	var actual;
	var values;
	var args;
	var data;
	var str;
	var v;
	var s;
	var i;
	var j;

	values = [
		// [ <input_arguments>, <expected_values> ]
		[ [ ':', [ 10 ], false ], [ S( 0, 10, 1 ) ] ],
		[ [ ':', [ 0 ], false ], [ S( 0, 0, 1 ) ] ],
		[ [ ':', [ 5 ], false ], [ S( 0, 5, 1 ) ] ],

		[ [ '::', [ 10 ], false ], [ S( 0, 10, 1 ) ] ],
		[ [ '::', [ 0 ], false ], [ S( 0, 0, 1 ) ] ],
		[ [ '::', [ 5 ], false ], [ S( 0, 5, 1 ) ] ],

		[ [ '2:4', [ 10 ], false ], [ S( 2, 4, 1 ) ] ],
		[ [ '2:4', [ 0 ], false ], [ S( 0, 0, 1 ) ] ],
		[ [ '2:4', [ 5 ], false ], [ S( 2, 4, 1 ) ] ],

		[ [ '2', [ 10 ], false ], [ 2 ] ],
		[ [ '2', [ 0 ], false ], [ 2 ] ],
		[ [ '2', [ 5 ], false ], [ 2 ] ],

		[ [ '...', [ 10 ], false ], [ S( 0, 10, 1 ) ] ],
		[ [ '...', [ 0 ], false ], [ S( 0, 0, 1 ) ] ],
		[ [ '...', [ 5 ], false ], [ S( 0, 5, 1 ) ] ],

		[ [ ':,...', [ 10 ], false ], [ S( 0, 10, 1 ) ] ],
		[ [ ':,...', [ 0 ], false ], [ S( 0, 0, 1 ) ] ],
		[ [ ':,...', [ 5 ], false ], [ S( 0, 5, 1 ) ] ],

		[ [ '...,2', [ 10 ], false ], [ 2 ] ],
		[ [ '...,2', [ 0 ], false ], [ 2 ] ],
		[ [ '...,2', [ 5 ], false ], [ 2 ] ]
	];

	for ( i = 0; i < values.length; i++ ) {
		args = values[ i ][ 0 ];
		actual = seq2multislice.apply( null, args );
		data = actual.data;

		expected = values[ i ][ 1 ];
		str = JSON.stringify( values[ i ] );

		t.strictEqual( isMultiSlice( actual ), true, 'returns expected value. args: ' + str );
		t.strictEqual( data.length, expected.length, 'returns expected value' );
		for ( j = 0; j < expected.length; j++ ) {
			s = data[ j ];
			v = expected[ j ];
			if ( isSlice( v ) ) {
				t.strictEqual( s.start, v.start, 'returns expected value. j: ' + j );
				t.strictEqual( s.stop, v.stop, 'returns expected value. j: ' + j );
				t.strictEqual( s.step, v.step, 'returns expected value. j: ' + j );
			} else {
				t.strictEqual( s, v, 'returns expected value. j: ' + j );
			}
		}
	}
	t.end();
});

tape( 'the function converts a subsequence string to a MultiSlice object (2d)', function test( t ) {
	var expected;
	var actual;
	var values;
	var args;
	var data;
	var str;
	var v;
	var s;
	var i;
	var j;

	values = [
		// [ <input_arguments>, <expected_values> ]
		[ [ ':,:', [ 10, 11 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ) ] ],
		[ [ ':,1', [ 0, 2 ], false ], [ S( 0, 0, 1 ), 1 ] ],
		[ [ '1,:', [ 5, 3 ], false ], [ 1, S( 0, 3, 1 ) ] ],

		[ [ '::,::', [ 10, 11 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ) ] ],
		[ [ '::,1', [ 0, 2 ], false ], [ S( 0, 0, 1 ), 1 ] ],
		[ [ '1,::', [ 5, 3 ], false ], [ 1, S( 0, 3, 1 ) ] ],

		[ [ '2:4,5::-1', [ 10, 11 ], false ], [ S( 2, 4, 1 ), S( 5, null, -1 ) ] ],
		[ [ '2:4,:', [ 0, 2 ], false ], [ S( 0, 0, 1 ), S( 0, 2, 1 ) ] ],
		[ [ ':,2:4', [ 5, 3 ], false ], [ S( 0, 5, 1 ), S( 2, 3, 1 ) ] ],

		[ [ '2,3', [ 10, 11 ], false ], [ 2, 3 ] ],
		[ [ '2,1', [ 0, 2 ], false ], [ 2, 1 ] ],
		[ [ '3,2', [ 5, 3 ], false ], [ 3, 2 ] ],

		[ [ '...', [ 10, 11 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ) ] ],
		[ [ '...', [ 0, 2 ], false ], [ S( 0, 0, 1 ), S( 0, 2, 1 ) ] ],
		[ [ '...', [ 5, 3 ], false ], [ S( 0, 5, 1 ), S( 0, 3, 1 ) ] ],

		[ [ ':,...', [ 10, 11 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ) ] ],
		[ [ ':,...', [ 0, 2 ], false ], [ S( 0, 0, 1 ), S( 0, 2, 1 ) ] ],
		[ [ ':,...', [ 5, 3 ], false ], [ S( 0, 5, 1 ), S( 0, 3, 1 ) ] ],

		[ [ '...,2', [ 10, 11 ], false ], [ S( 0, 10, 1 ), 2 ] ],
		[ [ '...,2', [ 0, 2 ], false ], [ S( 0, 0, 1 ), 2 ] ],
		[ [ '...,2', [ 5, 3 ], false ], [ S( 0, 5, 1 ), 2 ] ]
	];

	for ( i = 0; i < values.length; i++ ) {
		args = values[ i ][ 0 ];
		actual = seq2multislice.apply( null, args );
		data = actual.data;

		expected = values[ i ][ 1 ];
		str = JSON.stringify( values[ i ] );

		t.strictEqual( isMultiSlice( actual ), true, 'returns expected value. args: ' + str );
		t.strictEqual( data.length, expected.length, 'returns expected value' );
		for ( j = 0; j < expected.length; j++ ) {
			s = data[ j ];
			v = expected[ j ];
			if ( isSlice( v ) ) {
				t.strictEqual( s.start, v.start, 'returns expected value. j: ' + j );
				t.strictEqual( s.stop, v.stop, 'returns expected value. j: ' + j );
				t.strictEqual( s.step, v.step, 'returns expected value. j: ' + j );
			} else {
				t.strictEqual( s, v, 'returns expected value. j: ' + j );
			}
		}
	}
	t.end();
});

tape( 'the function converts a subsequence string to a MultiSlice object (3d)', function test( t ) {
	var expected;
	var actual;
	var values;
	var args;
	var data;
	var str;
	var v;
	var s;
	var i;
	var j;

	values = [
		// [ <input_arguments>, <expected_values> ]
		[ [ ':,:,:', [ 10, 11, 12 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ), S( 0, 12, 1 ) ] ],
		[ [ ':,1,:', [ 0, 2, 2 ], false ], [ S( 0, 0, 1 ), 1, S( 0, 2, 1 ) ] ],
		[ [ '1,:,2', [ 5, 3, 4 ], false ], [ 1, S( 0, 3, 1 ), 2 ] ],

		[ [ '::,::,::', [ 10, 11, 12 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ), S( 0, 12, 1 ) ] ],
		[ [ '::,1,::-1', [ 0, 2, 2 ], false ], [ S( 0, 0, 1 ), 1, S( 1, null, -1 ) ] ],
		[ [ '1,::,1:4', [ 5, 3, 4 ], false ], [ 1, S( 0, 3, 1 ), S( 1, 4, 1 ) ] ],

		[ [ '2:4,5::-1,2', [ 10, 11, 12 ], false ], [ S( 2, 4, 1 ), S( 5, null, -1 ), 2 ] ],
		[ [ '2:4,:,end/2::-1', [ 0, 2, 2 ], false ], [ S( 0, 0, 1 ), S( 0, 2, 1 ), S( 0, null, -1 ) ] ],
		[ [ ':,2:4,1', [ 5, 3, 4 ], false ], [ S( 0, 5, 1 ), S( 2, 3, 1 ), 1 ] ],

		[ [ '2,3,4', [ 10, 11, 12 ], false ], [ 2, 3, 4 ] ],
		[ [ '2,1,0', [ 0, 2, 2 ], false ], [ 2, 1, 0 ] ],
		[ [ '3,2,1', [ 5, 3, 4 ], false ], [ 3, 2, 1 ] ],

		[ [ '...', [ 10, 11, 12 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ), S( 0, 12, 1 ) ] ],
		[ [ '...', [ 0, 2, 2 ], false ], [ S( 0, 0, 1 ), S( 0, 2, 1 ), S( 0, 2, 1 ) ] ],
		[ [ '...', [ 5, 3, 4 ], false ], [ S( 0, 5, 1 ), S( 0, 3, 1 ), S( 0, 4, 1 ) ] ],

		[ [ ':,...', [ 10, 11, 12 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ), S( 0, 12, 1 ) ] ],
		[ [ ':,...', [ 0, 2, 2 ], false ], [ S( 0, 0, 1 ), S( 0, 2, 1 ), S( 0, 2, 1 ) ] ],
		[ [ ':,...', [ 5, 3, 4 ], false ], [ S( 0, 5, 1 ), S( 0, 3, 1 ), S( 0, 4, 1 ) ] ],

		[ [ '...,2', [ 10, 11, 12 ], false ], [ S( 0, 10, 1 ), S( 0, 11, 1 ), 2 ] ],
		[ [ '...,2', [ 0, 2, 2 ], false ], [ S( 0, 0, 1 ), S( 0, 2, 1 ), 2 ] ],
		[ [ '...,2', [ 5, 3, 4 ], false ], [ S( 0, 5, 1 ), S( 0, 3, 1 ), 2 ] ],

		[ [ '-1,...,-2', [ 10, 11, 12 ], false ], [ -1, S( 0, 11, 1 ), -2 ] ],
		[ [ '-2,...,-2', [ 0, 2, 2 ], false ], [ -2, S( 0, 2, 1 ), -2 ] ],
		[ [ '-3,...,-2', [ 5, 3, 4 ], false ], [ -3, S( 0, 3, 1 ), -2 ] ]
	];

	for ( i = 0; i < values.length; i++ ) {
		args = values[ i ][ 0 ];
		actual = seq2multislice.apply( null, args );
		data = actual.data;

		expected = values[ i ][ 1 ];
		str = JSON.stringify( values[ i ] );

		t.strictEqual( isMultiSlice( actual ), true, 'returns expected value. args: ' + str );
		t.strictEqual( data.length, expected.length, 'returns expected value' );
		for ( j = 0; j < expected.length; j++ ) {
			s = data[ j ];
			v = expected[ j ];
			if ( isSlice( v ) ) {
				t.strictEqual( s.start, v.start, 'returns expected value. j: ' + j );
				t.strictEqual( s.stop, v.stop, 'returns expected value. j: ' + j );
				t.strictEqual( s.step, v.step, 'returns expected value. j: ' + j );
			} else {
				t.strictEqual( s, v, 'returns expected value. j: ' + j );
			}
		}
	}
	t.end();
});
