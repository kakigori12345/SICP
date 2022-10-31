// function tan_cf(x, k) {
//   function cont_frac(n, d, k) {
//     function fraction(i) {
//       return i > k  
//         ? 0
//         : n(i) / (d(i) - x * fraction(i+1));
//     }
//     return fraction(k);
//   }
//   return cont_frac(i=>x, i=>1+2*i, 0);
// }

function cont_frac(n, d, k) {
  function fraction(i) {
    return i > k  
      ? 0
      : n(i) / (d(i) + fraction(i+1));
  }
  return fraction(1);
}

function tan_cf(x, k) {
  return cont_frac( i => i===1 ? x : -x*x,
                    i => 2 * i - 1,
                    k);
}
console.log(tan_cf(Math.PI, 14));

