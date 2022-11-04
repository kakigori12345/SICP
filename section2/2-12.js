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


// 2-14
console.log('------ 2-14 ------');

function print_interval(i) {
  return "[ "  + lower_bound(i) + 
         " , " + upper_bound(i) + " ]";
}

function add_interval(x, y) {
  return make_interval(lower_bound(x) + lower_bound(y),
                       upper_bound(x) + upper_bound(y));
}

function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y);
  const p2 = lower_bound(x) * upper_bound(y);
  const p3 = upper_bound(x) * lower_bound(y);
  const p4 = upper_bound(x) * upper_bound(y);
  return make_interval(Math.min(p1, p2, p3, p4),
                       Math.max(p1, p2, p3, p4));
}

function div_interval(x, y) {
  return mul_interval(x, make_interval(1 / upper_bound(y),
                                       1 / lower_bound(y)));
}

function par1(r1, r2) {
  return div_interval(mul_interval(r1, r2),
                      add_interval(r1, r2));
}
function par2(r1, r2) {
  const one = make_interval(1, 1);
  return div_interval(one,
                      add_interval(div_interval(one, r1),
                                   div_interval(one, r2)));
}

{
  const p1 = par1(pair(4, 6), pair(7, 8));
  const p2 = par2(pair(4, 6), pair(7, 8));
  console.log(print_interval(p1) + ': ' + percent(p1));
  console.log(print_interval(p2) + ': ' + percent(p2));

  const p1_p1 = div_interval(p1, p1);
  const p1_p2 = div_interval(p1, p2);
  const p2_p2 = div_interval(p2, p2);
  console.log(print_interval(p1_p1));
  console.log(print_interval(p1_p2));
  console.log(print_interval(p2_p2));
}