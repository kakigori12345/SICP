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
console.log('--- 2-7 ---');
function make_interval(x, y) {
  return pair(x, y);
}
function lower_bound(interval) {
  return tail(interval);
}
function upper_bound(interval) {
  return head(interval);
}

{
  const x = make_interval(100, 101);
  console.log(upper_bound(x));
  console.log(lower_bound(x));
}


// 2-8
console.log('--- 2-8 ---');
function sub_interval(x, y) {
  const max = upper_bound(x) - lower_bound(y);
  const min = lower_bound(x) - upper_bound(y);
  return make_interval(min, max);
}

{
  const a = make_interval(10, 20);
  const b = make_interval(2, 4);
  const sub = sub_interval(a, b);
  console.log(lower_bound(sub) + ' ' + upper_bound(sub));
}
