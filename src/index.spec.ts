import * as $ from "jquery";

import { SliderPresenter } from "./Presenter/SliderPresenter";
import { SliderTemplate } from "./view/SliderTemplate";
import { Slider } from "./model/Slider";
import { SliderSettings } from "./model/SliderSettings";

describe("Model / Slider / Test initialization", () => {
  let slider = new Slider();

  it("Should initializate slider object", () => {
    slider.setSettings({
      range: false,
      minVal: 1,
      maxVal: 10,
      stepVal: 1,
    });

    expect(slider.settings).toEqual(
      new SliderSettings({
        range: false,
        minVal: 1,
        maxVal: 10,
        stepVal: 1,
      })
    );
  });

  it("Should change slider settings", () => {
    slider.settings.setMaxVal(150);
    slider.settings.setMinVal(5);

    expect(slider.settings).toEqual(
      new SliderSettings({
        range: false,
        minVal: 5,
        maxVal: 150,
        stepVal: 1,
      })
    );
  });
});

describe("Model / Slider / Test moving", () => {
  let slider = new Slider({
    minVal: 20,
    maxVal: 100,
    stepVal: 2,
  });

  slider.settings.setStepVal(5);

  it("Should change pointer position", () => {
    slider.setPointerPosition(58);
    expect(slider.pointer).toEqual(60);
  });

  it("Should change pointer position", () => {
    slider.setPointerPosition(92);
    expect(slider.pointer).toEqual(90);
  });
});

describe("View / Slider template / Test of setting pointer positions", () => {
  let shadowSlider = document.createElement("div");
  shadowSlider.classList.add("slider");

  let slider = new SliderTemplate(shadowSlider);

  slider.slider.style.cssText = "width: 300px";

  it("Curr position should be set", () => {
    slider.currPos = 150;
    expect(slider.currPos).toEqual(150);
  });

  it("Should update value of curr position on change", () => {
    slider.renderCurrentPos(100);
    expect(slider.thumb.style.left).toEqual("33%");

    slider.renderCurrentPos(236);
    expect(slider.thumb.style.left).toEqual("79%");
  });
});

describe("Presenter / SliderPresenter / Test initialization", () => {
  let shadowSlider = document.createElement("div");
  shadowSlider.classList.add("slider");

  let slider: SliderPresenter = new SliderPresenter(shadowSlider, {
    range: false,
    minVal: 10,
    stepVal: 5,
    maxVal: 100,
  });

  it("Should coincide constructor values", () => {
    expect(slider.model.settings.settings.stepVal).toEqual(5);
  });
});

describe("Presenter / SliderPresenter / Test calculating values", () => {
  let shadowSlider = document.createElement("div");
  shadowSlider.classList.add("slider");

  let slider: SliderPresenter = new SliderPresenter(shadowSlider, {
    range: false,
    minVal: 10,
    maxVal: 100,
    stepVal: 5,
    value: 50,
  });

  it("Value should be calculated to view", () => {
    expect(Math.ceil(parseInt(slider.view.thumb.style.left) / 10)).toEqual(
      Math.ceil((50 * 100) / (100 - 10) / 10)
    );
  });
});
