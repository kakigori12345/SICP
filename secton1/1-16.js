function expt(b, n) {
  return fast_expt_2(1, b, n);
}

function fast_expt_2(value, b, n) {
  return n===0
    ? value
    : is_even(n)
    ? fast_expt_2(value, b*b, n/2)
    : fast_expt_2(value*b, b, n-1);
}

function is_even(n) {
  return n%2 === 0;
}

function square(x) {
  return x * x;
}

console.log(expt(2, 8));
