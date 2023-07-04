import { LEVELS } from "../game/levels";

function onSpeedChange(newSpeed) {
    const level1 = LEVELS.find((level) => level.level === 2);
    if (level1) {
        level1.speed = newSpeed;
    }
}

export default onSpeedChange;
