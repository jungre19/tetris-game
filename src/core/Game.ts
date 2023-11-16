import {GameStatus, GameViewer, MoveDirection} from './types'
import {SquareGroup} from './SquareGroup'
import {createTetris} from './Tetris'
import {TetrisRule} from './TetrisRule'
import GameConfig from './GameConfig'

export class Game {
  // 游戏状态
  _gameStatus: GameStatus = GameStatus.init
  // 玩家正在操作的方块
  private _curTetris?: SquareGroup
  // 计时器
  private _timer?: number
  // 自动下落的间隔时间
  private _duration: number = 1000
  
  // 下一个方块
  private _nextTetris: SquareGroup = createTetris({x: 0, y: 0})
  
  constructor(private _viewer: GameViewer
  ) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
    this._viewer.showNext(this._nextTetris)
  }
  controlLeft() {
    if(this._curTetris&&this._gameStatus===GameStatus.playing){
      TetrisRule.move(this._curTetris,MoveDirection.left)
    }
  }
  controlRight() {
    if(this._curTetris&&this._gameStatus===GameStatus.playing){
      TetrisRule.move(this._curTetris,MoveDirection.right)
    }
  }
  controlDown() {
    if(this._curTetris&&this._gameStatus===GameStatus.playing){
      TetrisRule.moveDirectly(this._curTetris,MoveDirection.down)
      // this.hitBottom()
    }
  }
  controlRotate() {
    if(this._curTetris&&this._gameStatus===GameStatus.playing){
      TetrisRule.rotate(this._curTetris)
    }
  }
  /**
   * 游戏开始
   * */
  start() {
    if (this._gameStatus === GameStatus.playing) {
      return
    }
    this._gameStatus = GameStatus.playing
    if (!this._curTetris) {
      this.switchSquare()
    }
    this.dropSquare()
  }
  /**
   * @method
   * @param {type} argName - description
   * @description:
   * @author: yangyi
   * @date: 2023/11/11
   */
  
  pause():void{
    if(this._gameStatus === GameStatus.playing){
      this._gameStatus = GameStatus.pause;
      clearInterval(this._timer)
      this._timer = undefined
    }
  }
  // 方块自由下落
  dropSquare() {
    if (this._timer || this._gameStatus !== GameStatus.playing) {
      return
    }
    this._timer = window.setInterval(() => {
      if (this._curTetris) {
        TetrisRule.move(this._curTetris, MoveDirection.down)
      }
    }, this._duration)
  }
  
  // 切换方块
  private switchSquare() {
    this._curTetris = this._nextTetris
    this._viewer.switch(this._curTetris)
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris)
    this._nextTetris = createTetris({x: 0, y: 0})
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
    this._viewer.showNext(this._nextTetris)
  }
  
  public bugSwitchSquare() {
    this._nextTetris.squares.forEach(sq => {
      sq.viewer?.remove();
    })
    this._nextTetris = createTetris({x: 0, y: 0})
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
    this._viewer.showNext(this._nextTetris)
  }
  
  /**
   * @method resetCenterPoint
   * @param width  {number}- description
   * @param tetris {SquareGroup}
   * @description: 重置中心点，让该方块出现在区域的中上方
   * @author: yangyi
   * @date: 2023/11/9
   */
  public resetCenterPoint(width: number, tetris: SquareGroup) {
    const x = Math.ceil(width / 2)
    const y = 0
    tetris.centerPoint = {x, y}
    while (tetris.squares.some(sq => sq.point.y < 0)) {
      tetris.squares.forEach(sq => sq.point = {x: sq.point.x, y: sq.point.y + 1})
    }
  }
}
