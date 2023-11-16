/*
*  该类中提供一系列的函数，根据游戏规则判断各种情况
*
* */
import {MoveDirection, Point, Shape} from './types'
import GameConfig from './GameConfig'
import {SquareGroup} from './SquareGroup'

function isPoint(obj:any):obj is Point{
  return typeof obj.x !== 'undefined';
  
}
export class TetrisRule {
  /*
  * @params
  * shape {Shape}
  * */
  static canIMove(shape: Shape, targetPoint: Point): boolean {
    
    // 边界判断
    const targetPoints: Point[] = shape.map(item => {
      return {
        x: item.x + targetPoint.x,
        y: item.y + targetPoint.y
      }
    })
    // 判断是否超出边界
    const res = targetPoints.some(point => {
      //   是否超出了边界
      return point.x < 0 || GameConfig.panelSize.width - 1 < point.x || point.y < 0 || GameConfig.panelSize.height - 1 < point.y
    })
    return !res
  }
  
  // static move(teris: SquareGroup, targetPoint: Point): boolean {
  //   if (this.canIMove(teris.shape, targetPoint)) {
  //     teris.centerPoint = targetPoint
  //     return true
  //   }
  //   return false
  // }
  static move(teris:SquareGroup,targetPoint:Point):boolean;
  static move(teris:SquareGroup,direction:MoveDirection):boolean;
  static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection): boolean {
    if(isPoint(targetPointOrDirection)){
      //  如果是点，表示向下移动
      if(this.canIMove(teris.shape, targetPointOrDirection)){
        teris.centerPoint = targetPointOrDirection
        return true
      }
      return false;
    }else {
      const direction = targetPointOrDirection;
      let targetPoint:Point;
      if(direction === MoveDirection.down){
        targetPoint = {
          x: teris.centerPoint.x,
          y: teris.centerPoint.y + 1
        }
      }
      else if(direction === MoveDirection.right){
        targetPoint = {
          x: teris.centerPoint.x + 1,
          y: teris.centerPoint.y
        }
      }
      else{
        targetPoint = {
          x: teris.centerPoint.x - 1,
          y: teris.centerPoint.y
        }
      }
      return this.move(teris, targetPoint)
    }
  }
  /**
  * 将当前方块移动到目标方向的终点
  * @params teris
  * @params direction
  * */
  static moveDirectly(teris:SquareGroup,direction:MoveDirection){
    while(this.move(teris, direction)){
    }
  }
  
  static rotate(teris:SquareGroup){
   const newShape = teris.afterRotateShape()
      if(this.canIMove(newShape, teris.centerPoint)){
        teris.rotate()
        return true
      }
      return false
  }
}
