function tan_cf(x, k) {
  function cont_frac(n, d, k) {
    function fraction(i) {
      return i > k  
        ? 0
        : n(i) / (d(i) - x * fraction(i+1));
    }
    return fraction(k);
  }
  return cont_frac(i=>x, i=>1+2*i, 0);
}

console.log(tan_cf(Math.PI, 14));

