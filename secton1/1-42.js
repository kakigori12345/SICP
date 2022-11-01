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

{
  console.log('--1-42--');
  const value = compose(square, inc)(6);
  console.log(value);
}

// 1-43
function repeated(func, repeat_num) {
  var retval = func;
  for(var i = 0; i < repeat_num; ++i) {
    retval = compose(func, func);
  }
  return retval;
}

{
  console.log('--1-43--');
  const value = repeated(square, 2)(5);
  console.log(value);
}


// 1-44
const dx = 0.00001;

function smooth(f) {
  return x => (f(x-dx) + f(x) + f(x+dx)) / 3;
}


{
  console.log('--1-44--');
  const value = smooth(square)(6);
  console.log(value);
}


// 1-45
const tolerance = 0.00001;
function fixed_point(f, first_guess) {
    function close_enough(x, y) {
        return abs(x - y) < tolerance;
    }
    function try_with(guess) {
        const next = f(guess);
        return close_enough(guess, next)
               ? next
               : try_with(next);
    }
    return try_with(first_guess);
}
function abs(x) {
  return x < 0
    ? -x
    : x;
}
function average_damp(f) {
  return x => average(x, f(x));
}
function average(a,b) {
  return (a + b) / 2;
}


// 1-46
function iterative_improve(good_enough, improve) {
  function iterate(x) {
    return good_enough(x)
    ? x
    : iterate(improve(x));
  }
  return iterate;
}

function sqrt_iter(x) {
  return iterative_improve(
    y => (y < tolerance),
    y => average_damp(y, n => n/y),
  )(x);
}

{
  console.log(sqrt_iter(5));
}
