function test () {
  console.log('x');
  requestAnimationFrame(test);
}
test();