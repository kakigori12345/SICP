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
  function map_ () {

  }

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
//console.log('------ 2-37 ------');



// 2-38
//console.log('------ 2-38 ------');




// 2-39
//console.log('------ 2-39 ------');




// 2-40
//console.log('------ 2-40 ------');




// 2-41
//console.log('------ 2-41 ------');




// 2-42
//console.log('------ 2-42 ------');




// 2-43
//console.log('------ 2-43 ------');

