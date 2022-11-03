// 2.5
function pair(a,b) {
  return (2**a)*(3**b);
}
function head(z) {
  while(z%3===0){
    z /= 3;
  }
  return Math.log2(z);
}
function tail(z) {
  while(z%2===0){
    z /=2;
  }
  return mylog(3, z);
}

function mylog(base, x) {
  return Math.log2(x) / Math.log2(base);
}

const x = pair(3,5);
console.log(x);
console.log(head(x));
console.log(tail(x));
