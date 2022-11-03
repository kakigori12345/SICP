// 2-6

//const one = f => x => f(x);
function one_f(f) {
  function x_(x) {
    return f(x);
  }
  return x_;
}

//const two = f => x => f(f(x));
function two_f(f) {
  function x_(x) {
    return f(f(x));
  }
  return x_;
}

// function plus(n, m) {
//     return f => x => n(f)(m(f)(x));
// }
function plus_f(n,m) {
  function func(f) {
    function x_(x) {
      return n(f)(m(f)(x));
    }
    return x_;
  }
  return func;
}

// testing

const three = plus_f(one_f, two_f);

function church_to_number(c) {
  function f(n) {
    console.log('f is called');
    return n + 1;
  }
  return c(f)(0);
}
console.log(church_to_number(three));
