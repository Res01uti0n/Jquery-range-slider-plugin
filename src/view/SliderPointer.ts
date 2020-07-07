// eslint-disable-next-line import/no-named-as-default
import FollowerPoint from './FollowerPoint';

class SliderPointer {
  public thumbHTMLElem: any;

  public sliderHTMLElem: any;

  public curPos: number;

  public isVertical: boolean;

  public followerPoint: FollowerPoint;

  constructor(elemHTML: any, sliderHTML:any, isVertical: boolean) {
    this.thumbHTMLElem = elemHTML;
    this.sliderHTMLElem = sliderHTML;
    this.isVertical = isVertical;
  }

  setCurPos(newCurrPos: number) {
    this.curPos = newCurrPos;

    this.sliderHTMLElem.dispatchEvent(new CustomEvent('changePointer', {
      bubbles: true,
      detail: this,
    }));
  }

  createEventListeners(anotherPointer?: SliderPointer) {
    this.thumbHTMLElem.onmousedown = (event:any) => {
      event.preventDefault();

      const shift: number = this.isVertical
        ? event.clientY - this.thumbHTMLElem.getBoundingClientRect().top
        : event.clientX - this.thumbHTMLElem.getBoundingClientRect().left;

      let rightEdge: number = this.isVertical
        ? this.sliderHTMLElem.offsetHeight
        : this.sliderHTMLElem.offsetWidth;

      let leftEdge: number = 0;

      // eslint-disable-next-line no-shadow
      const onMouseMove = (event:any) => {
        if (anotherPointer) {
          if (this.curPos < anotherPointer.curPos) {
            rightEdge = anotherPointer.curPos;
          } else if (this.curPos > anotherPointer.curPos) {
            leftEdge = anotherPointer.curPos;
          }
        }
        let newLeft: number = this.isVertical
          ? event.clientY - shift - this.sliderHTMLElem.getBoundingClientRect().top
          : event.clientX - shift - this.sliderHTMLElem.getBoundingClientRect().left;
        if (newLeft < leftEdge) {
          newLeft = leftEdge;
        }
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        this.setCurPos(newLeft);
      };

      const onMouseUp = () => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    this.thumbHTMLElem.ondragstart = function onDragStart() {
      return false;
    };
  }

  renderCurrentPosInPixels(newPos:number) {
    const widthOrHeight: string = this.isVertical
      ? this.sliderHTMLElem.getBoundingClientRect().height || this.sliderHTMLElem.style.height
      : this.sliderHTMLElem.getBoundingClientRect().width || this.sliderHTMLElem.style.width;
    const newPosition = newPos * 100 / parseInt(widthOrHeight, 10);
    return this.renderCurrentPosInPercents(newPosition);
  }

  renderCurrentPosInPercents(newPos: number) {
    const newCssLeftOrTop: string = this.isVertical
      ? this.thumbHTMLElem.style.top = `${newPos}%`
      : this.thumbHTMLElem.style.left = `${newPos}%`;
    return newCssLeftOrTop;
  }


  createFollowerPoint() {
    if (this.isVertical) {
      this.sliderHTMLElem.classList.add('j-plugin-slider_with-point_vertical');
    } else {
      this.sliderHTMLElem.classList.add('j-plugin-slider_with-point');
    }
    this.followerPoint = new FollowerPoint(this.thumbHTMLElem, this.isVertical);
  }

  deleteFollowerPoint() {
    if (this.followerPoint !== undefined) {
      this.followerPoint.destroy();
      this.followerPoint = undefined;
      this.sliderHTMLElem.classList.remove('j-plugin-slider_with-point');
      this.sliderHTMLElem.classList.remove('j-plugin-slider_with-point_vertical');
    }
  }
}
export {
  SliderPointer,
};
export default SliderPointer;
