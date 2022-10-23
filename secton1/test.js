// recursive
function func3(n) {
  if(n < 3) {
    return n;
  }
  return func3(n-1) + 2 * func3(n-2) + 3 * func3(n-3);
}

// iterative
function func3Iter(n) {
  return func3_iter(2, 1, 0, n-2);
}
function func3_iter(a, b, c, count) {
  return count === 0
    ? a
    : func3_iter(a+2*b+3*c, a, b, count-1);
}

console.log(func3(2));
console.log(func3Iter(2));
