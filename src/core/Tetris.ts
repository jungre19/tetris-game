import {Point, Shape} from './types'
import {getRandom} from './utils'
import {SquareGroup} from './SquareGroup'
export class TShape extends SquareGroup {
  constructor(_centerPoint:Point,_color:string) {
    super([ {x: 0, y: 0},{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}],_centerPoint,_color);
  }
}
export class LShape extends SquareGroup {
  constructor(_centerPoint:Point,_color:string) {
    super([{x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}],_centerPoint,_color);
  }
}
export class LMirrorShape extends SquareGroup {
  constructor(_centerPoint:Point,_color:string) {
    super([{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}],_centerPoint,_color);
  }
}
export class SShapeShape extends SquareGroup {
  constructor(_centerPoint:Point,_color:string) {
    super([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 1}],_centerPoint,_color);
  }
  rotate() {
    super.rotate()
    this.isClock = !this.isClock
  }
}
export class SMirrorShape extends SquareGroup {
  constructor(_centerPoint:Point,_color:string) {
    super([{x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],_centerPoint,_color);
  }
  rotate() {
    super.rotate()
    this.isClock = !this.isClock
  }
}
export class SquareShape extends SquareGroup {
  constructor(_centerPoint:Point,_color:string) {
    super([{x: 0, y: 0}, {x: -1, y: -1}, {x: 0, y: -1}, {x: -1, y: 0}],_centerPoint,_color);
  }
  afterRotateShape(): Shape {
    return this.shape
  }
}
export class LineShape extends SquareGroup {
  constructor(_centerPoint:Point,_color:string) {
    super([{x: 0, y: -1}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],_centerPoint,_color);
  }
}
// export const TShape: Shape = [{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 0}]
// export const LShape: Shape = [{x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}]
// export const LMirrorShape: Shape = [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}]
// export const SShapeShape: Shape = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 1}]
// export const SMirrorShape: Shape = [{x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
// export const SquareShape: Shape = [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]
// export const LineShape: Shape = [{x: 0, y: -1}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}]
// export const LineMirrorShape: Shape = [{x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]

export const shapes = [
  TShape,
  LShape,
  LMirrorShape,
  SShapeShape,
  SMirrorShape,
  SquareShape,
  LineShape,
]

export const colors: string[] = [
  'red', 'yellow', 'pink', 'green', 'red', 'purple', 'orange'
]

/*
* 随机产生一个俄罗斯方块
* 颜色随机
* 形状随机
*
* */
export function createTetris(centerPoint: Point): SquareGroup {
  const index = getRandom(0, shapes.length)
  const colorIndex = getRandom(0, shapes.length)
  const Shape = shapes[index]
  const color = colors[colorIndex]
  return new Shape(centerPoint, color)
}
