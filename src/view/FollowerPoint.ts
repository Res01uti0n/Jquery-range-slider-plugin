export class FollowerPoint {
  public elem: any;

  constructor(thumb: any, isVertical: boolean) {
    this.elem = document.createElement("div");

    if (isVertical) {
      this.elem.classList.add("j-slider__follower-point_vertical");
    } else {
      this.elem.classList.add("j-slider__follower-point");
    }

    thumb.appendChild(this.elem);
  }

  destroy() {
    this.elem.remove();
  }

  setValue(value: number) {
    this.elem.innerHTML = value;
  }
}

export default FollowerPoint;
