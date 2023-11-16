/*
* 方块组合类
* */
import {Square} from './Square'
import {Point, Shape} from './types'

export class SquareGroup {
//   方块数组
  private _squares: readonly Square[]= [];
  public get shape(){
    return this._shape
  }
  public get squares(){
    return this._squares
  }
  public set squares(v) {
    this._squares = v
  }
  public get centerPoint():Point{
   return  this._centerPoint
  }
  public set centerPoint(val:Point){
    this._centerPoint = val;
    this.setSquarePoint()
  }
  constructor(private _shape:Shape,private _centerPoint:Point,private _color:string) {
    const arr:Square[] = [];
    this._shape.forEach(point=>{
      const sq = new Square();
      sq.color = this._color;
      arr.push(sq)
    })
    this._squares = arr;
    this.setSquarePoint()
  }
  
  /*
  * 根据中心点坐标，以及形状，设置每一个小方块的坐标
  * */
  
  private setSquarePoint(){
    this._shape.forEach((point,i)=>{
      this._squares[i].point = {
        x: this._centerPoint.x + point.x,
        y: this._centerPoint.y + point.y
      }
    })
  }
  //  旋转方向是否为顺时针
   isClock:boolean = true;
  afterRotateShape():Shape{
    return this._shape.map(point=>{
      if(this.isClock){
        return {
          x: -point.y,
          y: point.x
        }
      }else {
        return {
          x: point.y,
          y: -point.x
        }
      }
    })
  }
  
  rotate(){
    const newShape = this.afterRotateShape();
    this._shape = newShape;
    this.setSquarePoint()
  }
}
