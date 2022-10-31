// 1-42
function compose(f, g) {
  return x => f(g(x));
}

function square(x) {
  return x * x;
}
function inc(x) {
  return x + 1;
}

const value = compose(square, inc)(6);
console.log(value);


