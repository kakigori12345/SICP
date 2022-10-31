function cont_frac(n, d, k) {
  function fraction(i) {
    return i > k  
      ? 0
      : n(i) / (d(i) + fraction(i+1));
  }
  return fraction(1);
}

console.log(cont_frac(i=>1, i=>1, 20));
