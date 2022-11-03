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


// 2-11
console.log('--- 2-11 ---');
function p(n) {
  return n >= 0;
}
function n(n) {
  return ! p(n);
}
function the_trouble_maker(xl, xu, yl, yu) {
  const p1 = xl * yl;
  const p2 = xl * yu;
  const p3 = xu * yl;
  const p4 = xu * yu;
  return make_interval(Math.min(p1, p2, p3, p4),
                Math.max(p1, p2, p3, p4));
}
function mul_interval_new(x, y) {  
  const xl = lower_bound(x);
  const xu = upper_bound(x);
  const yl = lower_bound(y);
  const yu = upper_bound(y);
  return p(xl) && p(xu) && p(yl) && p(yu)  
         ? make_interval(xl * yl, xu * yu)
         : p(xl) && p(xu) && n(yl) && p(yu)  
         ? make_interval(xu * yl, xu * yu)
         : p(xl) && p(xu) && n(yl) && n(yu)  
         ? make_interval(xu * yl, xl * yu)
         : n(xl) && p(xu) && p(yl) && p(yu)  
         ? make_interval(xl * yu, xu * yu)
         : n(xl) && p(xu) && n(yl) && n(yu)  
         ? make_interval(xu * yl, xl * yl)
         : n(xl) && n(xu) && p(yl) && p(yu)  
         ? make_interval(xl * yu, xu * yl)
         : n(xl) && n(xu) && n(yl) && p(yu)  
         ? make_interval(xl * yu, xl * yl)
         : n(xl) && n(xu) && n(yl) && n(yu)  
         ? make_interval(xu * yu, xl * yl)
         : n(xl) && p(xu) && n(yl) && p(yu)  
         ? the_trouble_maker(xl, xu, yl, yu)
         : error("lower larger than upper");
}

{
  for(var i = 0; i < 100000; ++i) {
    const x = make_rand_interval();
    const y = make_rand_interval();
    const res1 = mul_interval_new(x,y);
    const res2 = mul_interval(x,y);
    
    if(!comp_interval(res1, res2)){
      console.log('--------------');
      console.log('[' + lower_bound(x) + ' ' + upper_bound(x) + ']'
                + '[' + lower_bound(y) + ' ' + upper_bound(y) + ']');
      console.log(res1);
      console.log(res2);                
    }
  }
}

function make_rand_interval() {
  function make_num() {
    const b1 = (Math.round(Math.random() * 10) % 2) === 0;
    const pm = b1 ? 1 : -1;
    return pm * Math.round(Math.random() * 10);
  }
  const x = make_num();
  const y = make_num();

  if(x > y) {
    return make_interval(y, x);
  }
  return make_interval(x, y);
}

function comp_interval(x, y) {
  return lower_bound(x) === lower_bound(y)
    ? upper_bound(x) === upper_bound(y)
    : false;
}
