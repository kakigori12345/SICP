// ★sicp の playground 環境で実行する

import { heart, stack, beside, flip_vert, show } from 'rune';
// 2-44
console.log('------ 2-44 ------');
function up_split(painter, n) {
    if(n===0) {
        return painter;
    }
    else {
        const smaller = up_split(painter, n-1);
        return stack(beside(smaller, smaller), painter);
    }
}
show(up_split(heart, 4));


// 2-45
console.log('------ 2-45 ------');
function split(left, right){
  function splitter(painter, n) {
      if(n===0) {
          return painter;
      }
      else {
          const smaller = splitter(painter, n-1);
          return left(painter, right(smaller, smaller));
      }
  }
  return splitter;
}

{
  const right_split = split(beside, stack);
  const up_split = split(stack, beside);
  show(right_split(heart, 4));
}

// 2-46
console.log('------ 2-46 ------');



// 2-47
console.log('------ 2-47 ------');
function make_vect(x,y) {
    return pair(x, y);
}

function add_vect(x, y) {
    return pair((head(x) + head(y)), (tail(x) + tail(y)));
}

function sub_vect(x, y) {
    return pair((head(x) - head(y)), (tail(x) - tail(y)));
}

function scale_vect(v, c) {
    return pair(head(v)*c, tail(v)*c);
}

const x = make_vect(1,2);
const y = make_vect(2,3);
add_vect(x,y);
sub_vect(x,y);
scale_vect(x, 3);
scale_vect(y, 3);


// 2-48
//console.log('------ 2-48 ------');



// 2-49
//console.log('------ 2-49 ------');



// 2-50
//console.log('------ 2-50 ------');



// 2-51
//console.log('------ 2-51 ------');



// 2-52
//console.log('------ 2-52 ------');



