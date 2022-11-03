function pair(a, b) {
  return {i:a, j:b};
}
function head(p) {
  return p.i;
}
function tail(p) {
  return p.j;
}

//2-7
function make_interval(x, y) {
  return pair(x, y);
}
function lower_bound(interval) {
  return tail(interval);
}
function upper_bound(interval) {
  return head(interval);
}

const x = make_interval(100, 101);
console.log(upper_bound(x));
console.log(lower_bound(x));

