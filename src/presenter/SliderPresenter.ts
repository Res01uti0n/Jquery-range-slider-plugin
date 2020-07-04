import { SliderTemplate } from "../view/SliderTemplate";
import { Slider } from "../model/Slider";
import { ISliderSettings } from "../model/SliderSettings";
import { SliderTemplateRange } from "../view/SliderTemplateRange";

export class SliderPresenter {
  public model: Slider;
  public view: any;

  constructor(rootElement: any, options: ISliderSettings) {
    this.model = new Slider(options);
    let isRange = this.model.settings.settings.range;

    if (isRange) {
      this.view = new SliderTemplateRange(
        rootElement,
        this.model.settings.settings.orientation,
        this.model.settings.settings.followerPoint
      );
    } else {
      this.view = new SliderTemplate(
        rootElement,
        this.model.settings.settings.orientation,
        this.model.settings.settings.followerPoint
      );
    }

    let onChangePointer = (event: any) => {
      let currThumb = event.detail;
      let curPosInPixels: number = currThumb.currPos;
      let curPosInVal: number = this.calculateCurrPosFromPixelsToValue(
        curPosInPixels
      );
      let curPosInValWithStep = this.model.setPointerPosition(curPosInVal);
      let curPosInPercentsWithStep = this.getCurrPosFromValueToPercents(
        curPosInValWithStep
      );

      this.render(currThumb, curPosInPercentsWithStep);
      this.setFollowerPointValue(currThumb, curPosInValWithStep);
    };

    this.view.slider.addEventListener("changePointer", onChangePointer);
  }

  initStartValue() {
    if (this.model.settings.settings.range) {
      let curPosInValues: number[] = this.model.settings.settings.values;
      let curPosInValsWithStep: number[] = this.model.setPointerPosition(
        curPosInValues
      );

      let curPosInPercentsWithStep: number[] = [0, 0];
      curPosInPercentsWithStep[0] = this.getCurrPosFromValueToPercents(
        curPosInValsWithStep[0]
      );
      curPosInPercentsWithStep[1] = this.getCurrPosFromValueToPercents(
        curPosInValsWithStep[1]
      );

      this.render(this.view.thumb1, curPosInPercentsWithStep[0]);
      this.render(this.view.thumb2, curPosInPercentsWithStep[1]);
      this.setFollowerPointValue(this.view.thumb1, curPosInValsWithStep[0]);
      this.setFollowerPointValue(this.view.thumb2, curPosInValsWithStep[1]);
      this.view.initRangeLine();
      this.view.thumb1.currPos = this.calculateFromPercentsToPixels(
        curPosInPercentsWithStep[0]
      );
      this.view.thumb2.currPos = this.calculateFromPercentsToPixels(
        curPosInPercentsWithStep[1]
      );
    } else {
      let curPosInValue: number = this.model.settings.settings.value;
      let curPosInValWithStep: number = this.model.setPointerPosition(
        curPosInValue
      );
      let curPosInPercentsWithStep: number = this.getCurrPosFromValueToPercents(
        curPosInValWithStep
      );
      this.render(this.view.thumb, curPosInPercentsWithStep);
      this.setFollowerPointValue(this.view.thumb, curPosInValWithStep);
      this.view.thumb.currPos = this.calculateFromPercentsToPixels(
        curPosInPercentsWithStep
      );
    }
  }

  render(curThumb: SliderPointer, curPos: number) {
    curThumb.renderCurrentPosInPercents(curPos);
  }

  setFollowerPointValue(curThumb: SliderPointer, currPosInValWithStep: number) {
    if (this.model.settings.settings.followerPoint) {
      if (curThumb.followerPoint) {
        curThumb.followerPoint.setValue(currPosInValWithStep);
      } else {
        curThumb.createFollowerPoint();
        curThumb.followerPoint.setValue(currPosInValWithStep);
      }
    } else {
      curThumb.deleteFollowerPiont();
    }
  }

  calculateCurrPosFromPixelsToValue(curPosInPixels: number) {
    let minVal: number = this.model.settings.settings.minVal;
    let maxVal: number = this.model.settings.settings.maxVal;
    let rangeVal: number = maxVal - minVal;
    let rangePixels: string = "1";

    if (this.model.settings.settings.orientation === "vertical") {
      rangePixels =
        this.view.slider.getBoundingClientRect().height ||
        this.view.slider.style.height;
    } else {
      rangePixels =
        this.view.slider.getBoundingClientRect().width ||
        this.view.slider.style.width;
    }

    let curPosInPercents: number =
      (curPosInPixels * 100) / parseInt(rangePixels, 10);
    let curPosInVal: number = (rangeVal * curPosInPercents) / 100;

    return curPosInVal + minVal;
  }

  getCurrPosFromValueToPercents(curPosInValue: number) {
    let minVal: number = this.model.settings.settings.minVal;
    let maxVal: number = this.model.settings.settings.maxVal;
    let rangeVal: number = maxVal - minVal;

    let currPosInPercents: number = ((curPosInValue - minVal) * 100) / rangeVal;

    return currPosInPercents;
  }

  calculateFromPercentsToPixels(curPosInPercents: number) {
    let rangePixels: string = "1";
    if (this.model.settings.settings.orientation === "vertical") {
      rangePixels =
        this.view.slider.getBoundingClientRect().height ||
        this.view.slider.style.height;
    } else {
      rangePixels =
        this.view.slider.getBoundingClientRect().width ||
        this.view.slider.style.width;
    }
    let currPosInPixels: number =
      (curPosInPercents * parseInt(rangePixels, 10)) / 100;

    return currPosInPixels;
  }
}
