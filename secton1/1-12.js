function Triangle(depth) {
  return TriangleIter(1, depth);
}

function TriangleIter(sum, depth) {
  if(depth == 1) {
    return sum;
  }
  return sum + TriangleIter(sum, depth-1) + TriangleIter(sum, depth-1);
}

if(process.argv.length < 3) {
  console.log('--- 引数なし ---\n')
  console.log(Triangle(2));
}
else {
  arg = process.argv[2];
  console.log(`--- 引数あり: ${arg} ---\n`)
  console.log(Triangle(arg));
}
