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
  // ↓これだと最後の値しか返せなかった
  // return list_ref(items, length(items)-1);

  if( is_null(tail(items)) ) {
    return items;
  }
  return last_pair(tail(items));
}

{
  const last = last_pair(list(23, 72, 149, 34));
  console.log(last);
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

function append(list1, list2) {
  return is_null(list1)
      ? list2
      : pair(head(list1), append(tail(list1), list2));
}

function map(fun, items) {
  return is_null(items)
  ? null
  : pair(fun(head(items)), 
  map(fun, tail(items)));
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
console.log('------ 2-27 ------');
function deep_reverse(items) {
  return !is_pair(items)
    ? pair(items, null)
    : is_null(tail(items))
      ? is_pair(head(items))
        ? deep_reverse(head(items))
        : head(items)
      : is_pair(head(items))
      ? pair( deep_reverse(tail(items)), pair(deep_reverse(head(items)),null) )
      : pair( deep_reverse(tail(items)), deep_reverse(head(items)) );
}

{
  const x = list( list(1,2), list(3,4) );
  const y = list( list(4,3), list(2,1) );

  console.log(deep_reverse(x));
  console.log(y);
}


// 2-28
console.log('------ 2-28 ------');
function fringe(tree) {
  return is_null(tree)
    ? null
    : is_pair(tree)
      ? append(fringe(head(tree)), fringe(tail(tree)))
      : list(tree);
}

{
  const x = list(list(1, 2), list(3, 4));
  const xx = list(1,2,3,4,1,2,3,4);
  display_list(fringe(x));
  display_list(fringe(list(x, x)));
  display_list(xx);
}


// 2-29
console.log('------ 2-29 ------');

// mobile
function make_mobile(left, right) {
  return list(left, right);
}
function left_branch(mobile) {
  return head(mobile);
}
function right_branch(mobile) {
  return left_branch(tail(mobile))
}

// branch
function make_branch(length, structure) {
  return list(length, structure);
}
function branch_length(branch) {
  return head(branch);
}
function branch_structure(branch) {
  return head(tail(branch));
}

function total_weight(mobile) {
  const left_st = branch_structure(left_branch(mobile));
  const right_st = branch_structure(right_branch(mobile));

  const left_w = is_pair(left_st)
    ? total_weight(left_st)
    : left_st;
  const right_w = is_pair(right_st)
    ? total_weight(right_st)
    : right_st;

  return left_w + right_w;
}

function is_balanced(mobile) {
  const left = left_branch(mobile);
  const left_st = branch_structure(left);
  const right = right_branch(mobile);
  const right_st = branch_structure(right);

  const left_torque = branch_length(left) * 
    is_pair(left_st) ? total_weight(left_st) : left_st;
  const right_torque = branch_length(right) * 
    is_pair(right_st) ? total_weight(right_st) : right_st;

  return left_torque === right_torque;
}

{

} 


// 2-30
console.log('------ 2-30 ------');

function square_tree_1(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
      ? tree ** 2
      : pair( square_tree_1(head(tree)),
              square_tree_1(tail(tree)));
}

function square_tree_2(tree) {
  return map( sub_tree =>  is_pair(sub_tree)
                          ? square_tree_2(sub_tree)
                          : sub_tree ** 2,
              tree);
}

function display_tree(tree) {
  return map(sub_tree => is_pair(sub_tree)
    ? display_tree(sub_tree)
    : console.log(sub_tree)
  , tree);
}

{
  const x = square_tree_2(list(1,
                          list(2, list(3, 4), 5), 
                          list(6, 7)));
  const y = square_tree_2(list(1, list(3,4)));
  console.log('--x--');
  display_tree(x);
  console.log('--y--');
  display_tree(y);
}


// 2-31
console.log('------ 2-31 ------');
function tree_map(func, tree) {
  return map(sub_tree => is_pair(sub_tree)
    ? tree_map(func, sub_tree)
    : func(sub_tree)
  , tree);
}
function square_tree(tree) {
  return tree_map(x=>x**2, tree);
}

{
  const x = square_tree(list(1,
                          list(2, list(3, 4), 5), 
                          list(6, 7)));
  const y = square_tree(list(1, list(3,4)));
  console.log('--x--');
  display_tree(x);
  console.log('--y--');
  display_tree(y);
}


// 2-32
console.log('------ 2-32 ------');
console.log('分からなかった');
