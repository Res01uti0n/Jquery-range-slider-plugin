import { isArray } from 'util';
import { SliderSettings } from './SliderSettings';


class Slider {
  public settings: SliderSettings;

  constructor(sett?: object) {
    this.settings = new SliderSettings(sett);
  }

  setSettings(sett: object) {
    this.settings = new SliderSettings(sett);
  }

  calcPointerPosition(pos: number[]): number[];

  calcPointerPosition(pos: number): number;

  calcPointerPosition(pos: any) {
    const { minVal } = this.settings.settings;
    const step:number = this.settings.settings.stepVal;

    if (isArray(pos)) {
      const firstCurVal = pos[0] - minVal;
      const secondCurVal = pos[1] - minVal;
      let curVals:number[] = [firstCurVal, secondCurVal];

      const firstCurValWithoutStep = Math.round(curVals[0] / step);
      const secondCurValWithoutStep = Math.round(curVals[1] / step);

      const currentStep:number[] = [firstCurValWithoutStep, secondCurValWithoutStep];

      const firstCurValWithStep = (currentStep[0] * step) + minVal;
      const secondCurValWithStep = (currentStep[1] * step) + minVal;
      curVals = [firstCurValWithStep, secondCurValWithStep];

      this.settings.settings.values = curVals;
      return curVals;
    }

    let curVal:number = pos - minVal;
    const currentStep:number = Math.round(curVal / step);
    curVal = currentStep * step;
    curVal += minVal;
    this.settings.settings.value = curVal;
    return curVal;
  }
}

export {
  Slider,
};

export default Slider;
