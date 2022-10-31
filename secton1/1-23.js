
function next(test_divisor) {
  if(test_divisor === 2) {
    return 3;
  }
  return test_divisor + 2;
}



// cited from here

function search_for_primes(a, b) {
  var count = 0;
  for(var i = a; i < b; i++) {
    if(!timed_prime_test(i)) {
      count++;
    }
    if(count === 3) {
      break;
    }
  }
}

function timed_prime_test(n) {
  display(n);
  return start_prime_test(n, get_time());
}

function start_prime_test(n, start_time) {
  return is_prime(n)
         ? report_prime(get_time() - start_time)
         : true;
}

function report_prime(elapsed_time) {
  display(" *** ");
  display(elapsed_time);
  return false;
}

function smallest_divisor(n) {
  return find_divisor(n, 2);
}
function find_divisor(n, test_divisor) {
  return square(test_divisor) > n
         ? n
         : divides(test_divisor, n)
         ? test_divisor
         : find_divisor(n, next(test_divisor));
}
function divides(a, b) {
  return b % a === 0;
}

function is_prime(n) {
  return n === smallest_divisor(n);
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


search_for_primes(10000000, 1000000000);