import { ISliderSettings } from "./model/ISliderSettings";
import { SliderPresenter } from "./presenter/SliderPresenter";
import { SliderPresenterAPI } from "./presenter/SliderPresenterAPI";
import "./view/styles.css";

declare global {
  interface Window {
    $: JQuery;
  }
  interface JQuery {
    slider: () => JQuery<Element> | void;
  }
}

(function initialization($: JQueryStatic) {
  const sliders: SliderPresenter[] = [];

  $.fn.slider = function getStart(...args: any) {
    if (typeof args[0] === "object" || args[0] === undefined) {
      const settings: ISliderSettings = args[0];
      return this.each((i: number, val: object) => {
        const htmlElem = val;
        return sliders.push(new SliderPresenter(htmlElem, settings));
      });
    }

    if (typeof args[0] === "string") {
      const [option, setting, value, valuesOneOfTwoVals] = args;

      let returnValue: any;
      this.map((i: number, val: object) => {
        const htmlElem = val;
        sliders.forEach((htmlItem) => {
          if (htmlItem.view.slider === htmlElem) {
            returnValue = SliderPresenterAPI.enterPoint({
              valuesOneOfTwoVals,
              value,
              option,
              setting,
              slider: htmlItem,
            });
          }
        });
      });
      return returnValue;
    }
  };
})(jQuery);
