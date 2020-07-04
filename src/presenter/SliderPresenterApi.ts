import { SliderTemplate } from "../view/SliderTemplate";
import { SliderTemplateRange } from "../view/SliderTemplateRange";
import { SliderPresenter } from "./SliderPresenter";

export class SliderPresenterAPI {
  static slider: SliderPresenter;

  static enterPoint(
    slider: SliderPresenter,
    option: string,
    setting: string,
    value: string | number | number[] | boolean,
    valuesOneOfTwoVals?: number
  ) {
    if (option !== "option") throw "First parameter should be 'option'";
    let currReturn: string | number | number[] | boolean;
    if (value !== undefined) {
      switch (setting) {
        case "range":
          currReturn = this.setRange(<boolean>value);
          break;
        case "minVal":
          currReturn = this.setMinVal(<number>value);
          break;
        case "maxVal":
          currReturn = this.setMaxVal(<number>value);
          break;
        case "stepVal":
          currReturn = this.setStepVal(<number>value);
          break;
        case "orientation":
          currReturn = this.setOrientation(<string>value);
          break;
        case "value":
          currReturn = this.setValue(<number>value);
          break;
        case "values":
          if (valuesOneOfTwoVals === undefined && typeof value !== "number") {
            currReturn = this.setValues(<number[]>value);
          } else if (
            valuesOneOfTwoVals === undefined &&
            typeof value === "number"
          ) {
            currReturn = this.getValues(value);
          } else {
            currReturn = this.setValues(valuesOneOfTwoVals, <number>value);
          }
        case "followerPoint":
          currReturn = this.setFollowerPoint(<boolean>value);
          break;
      }
    } else {
      switch (setting) {
        case "range":
          currReturn = this.getRange();
          break;
        case "minVal":
          currReturn = this.getMinVal();
          break;
        case "maxVal":
          currReturn = this.getMaxVal();
          break;
        case "stepVal":
          currReturn = this.getStepVal();
          break;
        case "orientation":
          currReturn = this.getOrientation();
          break;
        case "value":
          currReturn = this.getValue();
          break;
        case "values":
          currReturn = this.getValues();
        case "followerPoint":
          currReturn = this.getFollowerPoint();
          break;
      }
    }

    return currReturn;
  }

  static getFollowerPoint(): boolean {
    return this.slider.model.settings.settings.range;
  }

  static setFollowerPoint(newVal: boolean): boolean {
    newVal = this.slider.model.settings.setFollowerPoint(newVal);
    this.slider.initStartValue();
    return newVal;
  }

  static getRange(): boolean {
    return this.slider.model.settings.settings.followerPoint;
  }

  static setRange(newVal: boolean): boolean {
    newVal = this.slider.model.settings.setRange(newVal);
    let rootElement = this.slider.view.slider;
    this.slider.view.destroy();

    if (newVal) {
      this.slider.view = new SliderTemplateRange(
        rootElement,
        this.slider.model.settings.settings.orientation,
        this.slider.model.settings.settings.followerPoint
      );
      this.slider.model.settings.settings.value = undefined;
    } else {
      this.slider.view = new SliderTemplate(
        rootElement,
        this.slider.model.settings.settings.orientation,
        this.slider.model.settings.settings.followerPoint
      );
      this.slider.model.settings.settings.values = undefined;
    }

    this.slider.initStartValue();
    return newVal;
  }

  static getMinVal(): number {
    return this.slider.model.settings.settings.minVal;
  }

  static setMinVal(newVal: number): number {
    newVal = this.slider.model.settings.setMinVal(newVal);
    this.slider.initStartValue();
    return newVal;
  }

  static getMaxVal(): number {
    return this.slider.model.settings.settings.maxVal;
  }

  static setMaxVal(newVal: number): number {
    newVal = this.slider.model.settings.setMaxVal(newVal);
    this.slider.initStartValue();
    return newVal;
  }

  static getStepVal(): number {
    return this.slider.model.settings.settings.stepVal;
  }

  static setStepVal(newVal: number): number {
    newVal = this.slider.model.settings.setStepVal(newVal);
    this.slider.initStartValue();
    return newVal;
  }

  static getValue(): number {
    return this.slider.model.settings.settings.value;
  }

  static setValue(newVal: number): number {
    newVal = this.slider.model.settings.setValue(newVal);
    this.slider.initStartValue();
    return newVal;
  }

  static getOrientation(): string {
    return this.slider.model.settings.settings.orientation;
  }

  static setOrientation(newVal: string): string {
    newVal = this.slider.model.settings.setOrientation(newVal);
    let rootElement = this.slider.view.slider;
    this.slider.view.destroy();

    if (this.slider.model.settings.settings.range) {
      this.slider.view = new SliderTemplateRange(
        rootElement,
        this.slider.model.settings.settings.orientation,
        this.slider.model.settings.settings.followerPoint
      );
    } else {
      this.slider.view = new SliderTemplate(
        rootElement,
        this.slider.model.settings.settings.orientation,
        this.slider.model.settings.settings.followerPoint
      );
    }

    this.slider.initStartValue();
    return newVal;
  }

  static getValues(numberCurrent?: number): number[] | number {
    if (numberCurrent === undefined)
      return this.slider.model.settings.settings.values;
    else return this.slider.model.settings.settings.values[numberCurrent];
  }

  static setValues(
    newVal: number[] | number,
    numberCurrent?: number
  ): number[] | number {
    if (numberCurrent === undefined) {
      newVal = this.slider.model.settings.setValues(<number[]>newVal);
      this.slider.initStartValue();
      return newVal;
    } else {
      let tmp: number[] = this.slider.model.settings.settings.values;
      tmp[numberCurrent] = <number>newVal;
      newVal = this.slider.model.settings.setValues(<number[]>tmp);
    }

    this.slider.initStartValue();
    return this.slider.model.settings.settings.values[numberCurrent];
  }
}

export default SliderPresenterAPI;