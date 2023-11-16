import {Point,IViewer} from './types'

export class Square {
  private _viewer?: IViewer;
  private _point: Point = {
    x: 0,
    y: 0
  }
  private _color: string = '#0f0';
  public get viewer() {
    return this._viewer;
  }
  public set viewer(val) {
    if(this._viewer){
      this._viewer.remove()
    }
    this._viewer = val;
    if(this._viewer){
      this._viewer.show();
    }
  }
  public get point() {
    return this._point;
  }
  public set point(val) {
    this._point = val;
    if(this._viewer){
      this._viewer.show();
    }
  }
  public get color() {
    return this._color;
  }
  public set color(val) {
    this._color = val;
  }
}
