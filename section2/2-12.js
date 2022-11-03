function pair(a, b) {
  return {low:a, high:b};
}
function tail(p) {
  return p.high;
}
function head(p) {
  return p.low;
}

function make_interval(x, y) {
  return pair(x, y);
}
function lower_bound(interval) {
  return head(interval);
}
function upper_bound(interval) {
  return tail(interval);
}


function make_center_width(c, w) {
  return make_interval(c - w, c + w);
}
function center(i) {
  return (lower_bound(i) + upper_bound(i)) / 2;
}
function width(i) {
  return (upper_bound(i) - lower_bound(i)) / 2;
}

{
  const my_interval = make_center_width(1, 0.5);
  console.log(center(my_interval));
  console.log(width(my_interval));
}

// 2-12
console.log('------ 2-12 ------');

function make_center_percent(center, percent) {
  const width = center * percent / 100;
  return make_center_width(center, width);
}
function percent(i) {
  return width(i) / center(i) * 100;
}

{
  console.log(make_center_percent(10, 8));
  const center = make_center_width(10, 1);
  console.log(percent(center));
}