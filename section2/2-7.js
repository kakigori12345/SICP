function pair(a, b) {
  return {low:a, high:b};
}
function tail(p) {
  return p.high;
}
function head(p) {
  return p.low;
}

//2-7
console.log('--- 2-7 ---');
function make_interval(x, y) {
  return pair(x, y);
}
function lower_bound(interval) {
  return head(interval);
}
function upper_bound(interval) {
  return tail(interval);
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


//2-10
console.log('--- 2-10 ---');
function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y);
  const p2 = lower_bound(x) * upper_bound(y);
  const p3 = upper_bound(x) * lower_bound(y);
  const p4 = upper_bound(x) * upper_bound(y);
  return make_interval(Math.min(p1, p2, p3, p4),
                       Math.max(p1, p2, p3, p4));
}

function div_interval(x, y) {
  if(upper_bound(y) >= 0 && lower_bound(y) <= 0) {
    console.log('Error');
    return;
  }
  return mul_interval(x, make_interval(1 / upper_bound(y),
                                       1 / lower_bound(y)));
}

{
  const x = make_interval(1, 4);
  const y = make_interval(-2, 4);
  const div = div_interval(x, y);
  console.log(div);
}

