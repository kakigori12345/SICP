// cited from here
function smallest_divisor(n) {
  return find_divisor(n, 2);
}
function find_divisor(n, test_divisor) {
  return square(test_divisor) > n
         ? n
         : divides(test_divisor, n)
         ? test_divisor
         : find_divisor(n, test_divisor + 1);
}
function divides(a, b) {
  return b % a === 0;
}
// cited until this

function square(x) {
  return x * x;
}


const x199 = smallest_divisor(199);
const x1999 = smallest_divisor(1999);
const x19999 = smallest_divisor(19999);

console.log(x199);
console.log(x1999);
console.log(x19999);
