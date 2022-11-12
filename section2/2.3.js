// 2.5.3
// 1
// ["a", ["b", ["c". null]]]

// 2
// [["george", null], null]

// 3
// [["x1", ["x2",null]], [["y1", ["y2", null]], null]]
// ↓
// [["y1", ["y2", null]], null]

// 4
// ["x1", ["x2",null]]
// ↓
// ["x2",null]

// 5
// null

// 6
// ["red", ["shoes", ["blue", ["socks", null]]]]


//2.5.4
function equal(a, b) {
  if(is_pair(a)) {
    if(is_pair(b)) {
      //両方ペア
      return equal(head(a), head(b)) && equal(tail(a), tail(b));
    }
  }
  else if(is_pair(b)) {
    //bだけペアなので等しくない
    return false;
  }
  else {
    //両方ペアでない
    return a === b;
  }
}

// 2.55
console.log( '"' === "" );


// xy * (3+x)  /dx  =  3xy + yx^2 /dx  =  3y + 2xy

function exp(base, exponent) {
  return exponent * (base ** (exponent-1));
}


// 2.3.4

//2.68
// SICP JS 2.3.4

function make_leaf(symbol, weight) {
  return list("leaf", symbol, weight);
}
function is_leaf(object) {
  return head(object) === "leaf";
}
function symbol_leaf(x) { return head(tail(x)); }

function weight_leaf(x) { return head(tail(tail(x))); }

function left_branch(tree) { return head(tail(tree)); }

function right_branch(tree) { return head(tail(tail(tree))); }

function symbols(tree) {
  return is_leaf(tree)
         ? list(symbol_leaf(tree))
         : head(tail(tail(tail(tree))));
}
function weight(tree) {
  return is_leaf(tree)
         ? weight_leaf(tree)
         : head(tail(tail(tail(tail(tree)))));
}

function make_code_tree(left, right) {
  return list("code_tree", left, right,
              append(symbols(left), symbols(right)),
              weight(left) + weight(right));
}

function decode(bits, tree) {
  function decode_1(bits, current_branch) {
      if (is_null(bits)) {
          return null;
      } else {
          const next_branch = choose_branch(head(bits),
                                            current_branch);
          return is_leaf(next_branch)
                 ? pair(symbol_leaf(next_branch),
                        decode_1(tail(bits), tree))
                 : decode_1(tail(bits), next_branch);
      }
  }
  return decode_1(bits, tree);
}

function choose_branch(bit, branch) {
  return bit === 0
         ? left_branch(branch)
         : bit === 1
         ? right_branch(branch)
         : error(bit, "bad bit -- choose_branch");
}


function encode(message, tree) {
  return is_null(message)
         ? null
         : append(encode_symbol(head(message), tree),
                  encode(tail(message), tree));
}

function encode_symbol(message, tree) {
  function search(tree, target, bit_result) {
      let result = null;
      { //left
          const bit_left = append(bit_result, list(0));
          const tree_left = left_branch(tree);
          if(is_leaf(tree_left)) {
              if(symbol_leaf(tree_left) === target) {
                  result = bit_left;
              }
              else {
                  result = null;
              }
          }
          else {
              result = search(tree_left, target, bit_left);
          }
      }
      if(result !== null) {
          return result;
      }
      { //right
          const bit_right = append(bit_result, list(1));
          const tree_right = right_branch(tree);
          if(is_leaf(tree_right)) {
              if(symbol_leaf(tree_right) === target) {
                  result = bit_right;
              }
              else {
                  result = null;
              }
          }
          else {
              result = search(tree_right, target, bit_right);
          }
      }
      if(result === null) {
          //error
      }
      return result;
  }
  
  if(is_null(message)) {
      return null;
  }
  
  let bit_results = null;
  bit_results = search(tree, head(message), bit_results);
  return append(bit_results, encode_symbol(tail(message), tree));
}


{
  // decode sample
  const sample_tree = make_code_tree(make_leaf("A", 4),
                                     make_code_tree(make_leaf("B", 2),
                                                    make_code_tree(
                                                        make_leaf("D", 1),
                                                        make_leaf("C", 1))));
  const sample_message = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0);
  decode(sample_message, sample_tree);

  // encode sample
  const decoded = ["A", ["D", ["A", ["B", ["B", ["C", ["A", null]]]]]]];
  encode_symbol(decoded, sample_tree);
}



