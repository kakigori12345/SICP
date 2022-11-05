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

function count_leaves(x) {
  return is_null(x)
         ? 0
         : ! is_pair(x)
         ? 1
         : count_leaves(head(x)) + count_leaves(tail(x));
}

{
  console.log(count_leaves(pair(list(1, 2), list(3, 4))));
  console.log(is_pair(list(1,2,3)));
  console.log(is_pair(3));
}


// 2-24
//console.log('------ 2-24 ------');



// 2-25
console.log('------ 2-25 ------');
{
  const list1 = list(1, 3, list(5, 7), 9)
  const list2 = list(list(7))
  const list3 = list(1, list(2, list(3, list(4, list(5, list(6, 7))))))

  // list1: [1, [3, [5, [7,null]], [9,null]]]
  console.log(head(tail(head(tail(tail(list1))))));
  // list2: 
  console.log( head(head(list2)) );
  // list3:
  console.log( head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(list3)))))))))))) );
}

// 2-26
//console.log('------ 2-26 ------');



// 2-27
//console.log('------ 2-27 ------');



// 2-28
//console.log('------ 2-28 ------');



// 2-29
//console.log('------ 2-29 ------');



// 2-30
//console.log('------ 2-30 ------');



// 2-31
//console.log('------ 2-31 ------');



// 2-32
//console.log('------ 2-32 ------');

