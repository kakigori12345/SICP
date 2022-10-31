
// cited from here

function search_for_primes(a, b) {
  var now = get_time();
  var count = 0;
  for(var i = a; i < b; i++) {
    if(!timed_prime_test(i)) {
      count++;
    }
    if(count === 10000) {
      break;
    }
  }

  const elapsed = get_time() - now;
  console.log("-------------");
  console.log("合計：" + elapsed);
}

function timed_prime_test(n) {
  return start_prime_test(n, get_time());
}

function start_prime_test(n, start_time) {
  return is_prime(n)
         ? report_prime(get_time() - start_time, n)
         : true;
}

function report_prime(elapsed_time, result) {
  console.log(result + ": " + elapsed_time);
  return false;
}

function is_prime(n) {
  return fast_is_prime(n, Math.floor(Math.log(n)));
}

function fermat_test(n) {
  function try_it(a) {
      return expmod(a, n, n) === a;
  }
  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function fast_is_prime(n, times) {
  return times === 0
         ? true
         : fermat_test(n)
         ? fast_is_prime(n, times - 1)
         : false;
}

function expmod(base, exp, m) {
  return exp === 0
         ? 1
         : is_even(exp)
         ? square(expmod(base, exp / 2, m)) % m
         : (base * expmod(base, exp - 1, m)) % m;
}


// cited until here

function square(x) {
  return x * x;
}

function display(n) {
  console.log(n);
}

function get_time() {
  return performance.now();
}

function is_even(n) {
  return n%2 === 0;
}


search_for_primes(560, 2822);
