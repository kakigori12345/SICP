function pair(a, b) {
  return {head:a, tail:b};
}
function tail(p) {
  return p.tail;
}
function head(p) {
  return p.head;
}

function list(...params) {
  // 例外処理
  if(params.length === 1){ 
    return pair(params[0], null);
  }
  if(params.length === 0) {
    console.log('Error!!!');
    return null;
  }

  function list_rec(head, list) {
    const len = list.length;
    if(len === 1) {
      return pair(head, pair(list[0], null));
    }
    return pair(head, list_rec(list[0], list.slice(1)));
  }

  return list_rec(params[0], params.slice(1));
}

function list_ref(items, n) {
  return n === 0
         ? head(items)
         : list_ref(tail(items), n - 1);
}

function is_null(items) {
  return items === null;
}

function get_string(items) {
  return is_null(tail(items))
    ? head(items)
    : head(items) + ' ' + get_string(tail(items));
}
function display_list(items) {
  console.log("list: [" + get_string(items) + "]");
}


function last_pair(items) {
  if( is_null(tail(items)) ) {
    return items;
  }
  return last_pair(tail(items));
}

function remove_tail(items) {
  if(items === null) {
    console.log('ERROOOROROR!!!!!!!!!!!!!!!!!!!!!!');
    return null;
  }

  return is_null(tail(items))
    ? null
    : pair(head(items), remove_tail(tail(items)));
}

function reverse(items) {
  return is_null(tail(items))
    ? pair(head(items), null)
    : pair( head(last_pair(items)), reverse(remove_tail(items)));
}


function is_pair(item) {
  try {
    const a = head(item);
    const b = tail(item);
    if(a === undefined || b === undefined) {
      return false;
    }
  }
  catch(e) {
    return false;
  }
  return true;
}

// function append(list1, list2) {
//   return is_null(list1)
//       ? list2
//       : pair(head(list1), append(tail(list1), list2));
// }

// function map(fun, items) {
//   return is_null(items)
//   ? null
//   : pair(fun(head(items)), 
//   map(fun, tail(items)));
// }

// function count_leaves(x) {
//   return is_null(x)
//          ? 0
//          : ! is_pair(x)
//          ? 1
//          : count_leaves(head(x)) + count_leaves(tail(x));
// }

function display_tree(tree) {
  function map(fun, items) {
    return is_null(items)
    ? null
    : pair(fun(head(items)), 
    map(fun, tail(items)));
  }

  return map(sub_tree => is_pair(sub_tree)
    ? display_tree(sub_tree)
    : console.log(sub_tree)
  , tree);
}

// prime test
function next(test_divisor) {
  if(test_divisor === 2) {
    return 3;
  }
  return test_divisor + 2;
}
function smallest_divisor(n) {
  return find_divisor(n, 2);
}
function find_divisor(n, test_divisor) {
  return square(test_divisor) > n
         ? n
         : divides(test_divisor, n)
         ? test_divisor
         : find_divisor(n, next(test_divisor));
}
function divides(a, b) {
  return b % a === 0;
}
function is_prime(n) {
  return n === smallest_divisor(n);
}
function square(x) {
  return x * x;
}

//-------------------------- ここまで移植 -------------------------------

function accumulate(op, initial, sequence) {
  return is_null(sequence)
         ? initial
         : op(head(sequence), 
              accumulate(op, initial, tail(sequence)));
}

// 2-33
console.log('------ 2-33 ------');

function map(f, sequence) {
  return accumulate((x, y) => pair(f(x),y), 
                    null, sequence);
}
function append(seq1, seq2) {
  return accumulate(pair,  seq2, seq1);
}
function length(sequence) {
  return accumulate((x,y)=>y+1, 0, sequence);
}

{
  const map_value     = map(Math.sqrt, list(1, 2, 3, 4));
  const append_value  = append(list(1, 2, 3), list(4, 5, 6));
  const length_value  = length(list(1, 2, 3, 4));

  console.log('-- map_value --');
  display_tree(map_value);
  console.log('-- append_value --');
  display_tree(append_value);
  console.log('-- length_value --');
  console.log(length_value);
}


// 2-34
console.log('------ 2-34 ------');
function horner_eval(x, coefficient_sequence) {
  return accumulate((this_coeff, higher_terms) => x * higher_terms + this_coeff,
                    0, 
                    coefficient_sequence);
}
{
  console.log( horner_eval(2, list(1, 3, 0, 5, 0, 1)) );
}


// 2-35
console.log('------ 2-35 ------');
function count_leaves(t) {
  return accumulate(
    (x,y)=>x+y, 
    0, 
    map(
      x=>is_pair(x) ? count_leaves(x) : 1, 
      t
    )
  );
}

{
  console.log( count_leaves(list(1, list(3, 4))) );
}



// 2-36
console.log('------ 2-36 ------');

function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
         ? null
         : pair(accumulate(op, init, map(x=>head(x), seqs)), 
                accumulate_n(op, init, map(x=>tail(x), seqs)));
}

{
  const li = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12));
  console.log( accumulate_n((x,y)=>x+y, 0, li) );
}


// 2-37
console.log('------ 2-37 ------');
const plus = (x,y) => x + y;
const times = (x,y) => x * y;

function dot_product(v, w) {
  return accumulate(plus, 0, accumulate_n(times, 1, list(v, w)));
}
function matrix_times_vector(m, v) {
  return map(row=>dot_product(row,v), m);
}
function transpose(mat) {
  return accumulate_n(pair, null, mat);
}
// function matrix_times_matrix(n, m) {
//   const cols = transpose(m);
//   return map(row=>matrix_times_vector(cols, row), n);
// }
function matrix_times_matrix(n, m) {
  const cols = transpose(m);
  return map(x => map(y => dot_product(x, y), cols), n);
}

{
  console.log('-- dot --');
  console.log( dot_product(list(1, 2), list(4,5)) );

  console.log('-- matrrix_times_vector --');
  const m = list( list(1,2), list(3,4), list(1,1) );
  const v = list(5,5);
  console.log( matrix_times_vector(m, v) );

  console.log('-- transpose --');
  const m2 = list( list(1,2), list(3,4) );
  console.log(m2);
  console.log(transpose(m2));

  console.log('-- matrix_times_matrix --');
  const mxm = matrix_times_matrix(m2, m2)
  console.log(mxm);
  display_tree(mxm);
  const m3 = list( list(10, 10, 10), list(10, 10, 10));
  const mxm3 = matrix_times_matrix(m, m3);
  console.log(mxm3);
  display_tree(mxm3);
}


// 2-38
console.log('------ 2-38 ------');

function fold_left(op, initial, sequence) {
  function iter(result, rest) {
      return is_null(rest)
             ? result
             : iter(op(result, head(rest)), 
                    tail(rest));
  }
  return iter(initial, sequence);
}

const fold_right = accumulate;
function divide(x, y) {
    return x / y;
}

{
  const x = fold_left(list, null, list(1, 2, 3));
  console.log(x);
  display_tree(x);

  console.log('-- divide --');
  console.log( fold_right(divide, 1, list(1, 2, 3)) );
  console.log( fold_left(divide, 1, list(1, 2, 3)) );

  console.log('-- list --');
  console.log( fold_right(list, null, list(1, 2, 3)) );
  console.log( fold_left(list, null, list(1, 2, 3)) );

  console.log('-- test --');
  const func = (x, y) => (x + y);
  console.log( fold_right(func, null, list(1, 2, 3)) );
  console.log( fold_left(func, null, list(1, 2, 3)) );
}



// 2-39
console.log('------ 2-39 ------');

function reverse_1(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function reverse_2(sequence) {
  return fold_left((x, y) => pair(y, x), null, sequence);
}

{
  const li = list(1,2,3);
  console.log(reverse_1(li));
  console.log(reverse_2(li));
}


// 2-40
console.log('------ 2-40 ------');
function filter(predicate, sequence) {
  return is_null(sequence)
         ? null
         : predicate(head(sequence))
         ? pair(head(sequence), 
                filter(predicate, tail(sequence)))
         : filter(predicate, tail(sequence));
}
function is_prime_sum(pair) {
  return is_prime(head(pair) + head(tail(pair)));
}
function prime_sum_pairs(n) {
  return map(make_pair_sum, 
             filter(is_prime_sum, unique_pairs(n)));
}
function make_pair_sum(pair) {
  return list(head(pair), head(tail(pair)), 
              head(pair) + head(tail(pair)));
}
function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}
function enumerate_interval(low, high) {
  return low > high
         ? null
         : pair(low,
                enumerate_interval(low + 1, high));
}
function permutations(s) {
  return is_null(s)             // empty set?
         ? list(null)           // sequence containing empty set
         : flatmap(x => map(p => pair(x, p),
                            permutations(remove(x, s))),
                   s);
}
function remove(item, sequence) {
  return filter(x => ! (x === item),
                sequence);
}

function unique_pairs(n) {
  return flatmap(
    i => map( j => list(i, j), 
              enumerate_interval(1, i - 1)),
    enumerate_interval(1, n)
  )
}

{
  const prime_list = prime_sum_pairs(7);
  console.log( prime_list );
  console.log( length(remove(3, list(1, 2, 3, 4, 5))) );
}

// 2-41
console.log('------ 2-41 ------');
// function get_triple(s) {
//   return filter(  x => (x === s), 
//     permutations(enumerate_interval(1, s-1))
//   );
// }
function unique_triples(n) {
  return flatmap(i => flatmap(j => map(k => list(i,j,k),
                                       enumerate_interval(1, j-1)),
                              enumerate_interval(1, i-1)),
                 enumerate_interval(1, n));
}
function triples_that_sum_to(s, n) {
  return filter(items => accumulate(plus, 0, items) === s,
                unique_triples(n));
}

{
  const trip = triples_that_sum_to(10, 8);
  accumulate(x=>console.log(x), null, trip);
}



// 2-42
console.log('------ 2-42 ------');
const empty_board = null;
function queens(board_size) {
  function queen_cols(k) {
      return k === 0
             ? list(empty_board)
             : filter(positions => is_safe(k, positions),
                      flatmap(rest_of_queens =>
                                map(new_row =>
                                      adjoin_position(new_row, k,
                                                      rest_of_queens),
                                    enumerate_interval(1, board_size)),
                              queen_cols(k - 1)));
  }
  return queen_cols(board_size);
}
function is_safe(k, positions) {
  const first_row = head(head(positions));
  const first_col = tail(head(positions));
  return accumulate((pos, so_far) => {
                       const row = head(pos);
                       const col = tail(pos);
                       return so_far &&
                              first_row - first_col !==
                              row - col &&
                              first_row + first_col !==
                              row + col &&
                              first_row !== row;
                    },
                    true, 
                    tail(positions));
}
function adjoin_position(row, col, rest) {
  return pair(pair(row, col), rest);
}

{
  const queen = queens(8);
  // console.log( queen );
  // console.log('-- log --');
  // accumulate(x=>console.log(x), null, queen);
  // console.log('-- display --');
  // accumulate(x=>{console.log('---'); display_tree(x);}, null, queen);
}


// 2-43
console.log('------ 2-43 ------');
function queens_slow(board_size) {
  function queen_cols(k) {
      return k === 0
             ? list(empty_board)
             : filter(positions => is_safe(k, positions),
             flatmap( new_row =>
                        map(rest_of_queens => 
                              adjoin_position(new_row, k, rest_of_queens), 
                            queen_cols(k - 1)), 
                      enumerate_interval(1, board_size)));
  }
  return queen_cols(board_size);
}

{
  const queen = queens_slow(8);
}

