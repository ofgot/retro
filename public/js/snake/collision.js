import { Coord } from './coords.js';

export function checkWallCollision(head, width, height, tileSize) {
  const sceneRect = new Rectangle(
    new Coord(0, 0),
    new Coord(width, height),
  );

  const headRect = new Rectangle(
    new Coord(head.x * tileSize, head.y * tileSize),
    new Coord((head.x + 1) * tileSize, (head.y + 1) * tileSize),
  );

  //console.log(head, sceneRect, headRect);

  return Rectangle.isInside(headRect, sceneRect);
}

export function checkSelfCollision(coords) {
  const [head, ...body] = coords;
  return body.some((segment) => segment.x === head.x && segment.y === head.y);
}

export class Rectangle {
  /**
   * @param {Coord} topLeftCoordinate
   * @param {Coord} bottomRightCoordinate
   */
  constructor(topLeftCoordinate, bottomRightCoordinate) {
    this.topLeftCoordinate = topLeftCoordinate;
    this.bottomRightCoordinate = bottomRightCoordinate;
  }

  /**
   * Checks whether the inner rectangle is fully within the bounds of the outer rectangle.
   *
   * @param {Rectangle} inner - The rectangle to check
   * @param {Rectangle} outer - The boundary rectangle
   * @returns {boolean} True if the inner rectangle is within bounds, false if it collides with the boundary.
   */
  static isInside(inner, outer) {
    return !(
        inner.topLeftCoordinate.x >= outer.topLeftCoordinate.x &&
        inner.topLeftCoordinate.y >= outer.topLeftCoordinate.y &&
        inner.bottomRightCoordinate.x <= outer.bottomRightCoordinate.x &&
        inner.bottomRightCoordinate.y <= outer.bottomRightCoordinate.y
    );
  }
}



/**
 * Checks whether two rectangles collide.
 *
 * @param {Rectangle} rect1
 * @param {Rectangle} rect2
 * @returns {boolean} True if the rectangles collide, false otherwise.
 */
export function doRectanglesCollide(rect1, rect2) {
  // If one rectangle is to the left of the other
  if (
      rect1.bottomRightCoordinate.x < rect2.topLeftCoordinate.x ||
      rect2.bottomRightCoordinate.x < rect1.topLeftCoordinate.x
  ) {
    return false;
  }

  // If one rectangle is above the other
  return !(rect1.topLeftCoordinate.y > rect2.bottomRightCoordinate.y ||
      rect2.topLeftCoordinate.y > rect1.bottomRightCoordinate.y);
}

/**
 * Checks if snake ate food.
 *
 * @param {Rectangle} rect1
 * @param {Rectangle} rect2
 * @returns {boolean} True if the rectangles collide, false otherwise.
 */
export function isFoodEaten(snakeHead, food, tileSize) {
  const headRect = new Rectangle(
      new Coord(snakeHead.x * tileSize, snakeHead.y * tileSize),
      new Coord((snakeHead.x + 1) * tileSize, (snakeHead.y + 1) * tileSize)
  );

  const foodRect = new Rectangle(
      new Coord(food.position.x * tileSize, food.position.y * tileSize),
      new Coord((food.position.x + 1) * tileSize, (food.position.y + 1) * tileSize)
  );

  return doRectanglesCollide(headRect, foodRect);
}
