import idleGif from '../../assets/animals/fox/idle.gif';
import walkGif from '../../assets/animals/fox/walk.gif';
import swipeGif from '../../assets/animals/fox/swipe.gif';
import lieGif from '../../assets/animals/fox/lie.gif';
import runGif from '../../assets/animals/fox/run.gif';
const fox = {
    sprites: { idle: idleGif, walk: walkGif, swipe: swipeGif, lie: lieGif, run: runGif },
    behavior: {
        canJump: true,
        canSleep: true,
        canRun: true,
        actionProbabilities: { walk: 0.4, stop: 0.3, sleep: 0.2, run: 0.1 }
    }
};
export default fox;
