
export function checkWallCollision(head, width, height, tileSize) {
  const cols = width / tileSize;
  const rows = height / tileSize;

  return head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows;
}

export function checkSelfCollision(coords) {
  const [head, ...body] = coords;
  return body.some(segment => segment.x === head.x && segment.y === head.y);
}
