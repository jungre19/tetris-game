import {SquareGroup} from './SquareGroup'

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IViewer {
  show(): void;
  remove(): void;
}
/*
* 方块组合形状
* */
export type Shape = Point[];
export enum MoveDirection {
  left,
  right,
  down
}

export enum GameStatus {
    init,
    playing,
    pause,
    over
}

export interface GameViewer {
  /**
   *
   * @param teris 下一个方块对象
   */
  showNext(tetris:SquareGroup):void;
  /**
   *
   * @param teris 切换的方块对象
   */
  switch(tetris:SquareGroup):void;
}
