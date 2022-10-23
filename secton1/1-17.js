function expt(a, b) {
  return fast_expt(0, a, b);
}

function fast_expt(a, b, n) {
  return n === 0
    ? a
    : is_even(n)
    ? fast_expt(a, double(b), halve(n))
    : fast_expt(a+b, b, n-1);
}

function is_even(n) {
  return n%2 === 0;
}

function double(x) {
  return x * 2;
}

function halve(x) {
  return x / 2;
}

console.log(expt(4, 3));
console.log(expt(16, 3));
console.log(expt(52, 4));
console.log(expt(3, 17));
