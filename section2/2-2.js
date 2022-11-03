//2-2 

// point
function make_point(x, y) {
  return {x_:x, y_:y};
}

function x_point(p) {
  return p.x_;
}

function y_point(p) {
  return p.y_;
}

// segment
function make_segment(p1, p2) {
  return {start_:p1, end_:p2};
}

function start_segment(line) {
  return line.start_;
}

function end_segment(line) {
  return line.end_;
}

// returns line's midpoint
function midpoint_segment(line) {
  const x_mid = (x_point(start_segment(line))
                 + x_point(end_segment(line)))
                 / 2;
  const y_mid = ( y_point(start_segment(line))
                 + y_point(end_segment(line)))
                 / 2;
  return make_point(x_mid, y_mid);                 
}

function print_point(p) {
  return display("(" + stringify(x_point(p)) + ", "
                     + stringify(y_point(p)) +        ")");
}

function display(content) {
  console.log(content);
}

function stringify(x) {
  return x;
}

//------------------
{
  const p1 = make_point(10, 30);
  const p2 = make_point(50, 60);
  const segment = make_segment(p1, p2);
  const mid_point = midpoint_segment(segment);
  print_point(mid_point);
}


// 2-3
function make_rectangle(top_left_point, bottom_right_point){
  return {top_left: top_left_point, bottom_right: bottom_right_point};
}
function get_horizontal(rectangle) {
  return x_point(rectangle.bottom_right) - x_point(rectangle.top_left);
}
function get_vertical(rectangle) {
  return y_point(rectangle.top_left) - y_point(rectangle.bottom_right);
}

function perimiter(rectangle) {
  const horizontal = get_horizontal(rectangle);
  const vertical = get_vertical(rectangle);
  return 2 * (horizontal + vertical);
}
function area(rectangle) {
  const horizontal = get_horizontal(rectangle);
  const vertical = get_vertical(rectangle);
  return horizontal * vertical;
}

function display_rectangle(rectangle) {
  console.log("perimiter: " + perimiter(rectangle));
  console.log("area: " + area(rectangle));
}

//-------------
{
  const p1 = make_point(2, 8);
  const p2 = make_point(8, 2);
  const rec = make_rectangle(p1, p2);
  display_rectangle(rec);
}