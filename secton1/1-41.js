function double(f) {
  return x => f(f(x));
}

function inc(x) {
  return x + 1;
}

console.log( double(double(double))(inc)(5) );
// ↑階上になりそう。^2^2^2^2^2...