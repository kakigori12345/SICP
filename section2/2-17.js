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

function length(items) {
  function length_iter(a, count) {
      return is_null(a)
             ? count
             : length_iter(tail(a), count + 1);
  }
  return length_iter(items, 0);
}

function append(list1, list2) {
  return is_null(list1)
         ? list2
         : pair(head(list1), append(tail(list1), list2));
}

{
  console.log('--- リスト ---');
  const squares = list(1, 4, 9, 16, 25);
  console.log(squares);
  for(var i = 0; i < 5; i++) {
    console.log(list_ref(squares, i));
  }
  console.log('--- 長さ ---');
  const odds = list(1, 3, 5, 7);
  console.log(length(odds));
  console.log('--- 連結 ---');
  const renketu = append(squares, odds);
  for(var i = 0; i < 9; i++) {
    console.log(list_ref(renketu, i));
  }
}

// 2-17
console.log('------ 2-17 ------');

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


// 2-18
console.log('------ 2-18 ------');

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

function get_string(items) {
  return is_null(items)
    ? ''
    : head(items) + ' ' + get_string(tail(items));
}

{
  const list_ = list(23, 72, 149, 23, 43, 5, 5, 23, 2323, 434);
  const reverse_ = reverse(list_);
  console.log( get_string(list_) );
  console.log( get_string(reverse_) );
}
