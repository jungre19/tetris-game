import {Game} from './core/Game'
import {GamePageViewer} from './core/viewer/GamePageViewer'
import $ from 'jquery'
var g = new Game(new GamePageViewer());
// g.start()
$("#switchSquare").click(function(){
  g.bugSwitchSquare()
})

$('#btnStart').click(() => {
  g.start()
})

$('#btnPause').click(() => {
  g.pause()
})


$('#btnDown').click(() => {
  g.controlDown()
})
$('#btnLeft').click(() => {
  g.controlLeft()
})
$('#btnRight').click(() => {
  g.controlRight()
})
$('#rotateClock').click(()=>{
  g.controlRotate()
})
