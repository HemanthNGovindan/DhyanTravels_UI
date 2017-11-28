import { Directive, Input, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[viewmore]'
})
export class ViewmoreDirective {
  @Input('content-length') private maxContentLength: number;
  @Input('content-element') private contentElement: HTMLElement;
  private currentText: string;
  private hideToggle: boolean = true;
  private hideToggles = {};
  private elementText: string;
  private isCollapsed: boolean = true;

  constructor(private element: ElementRef) { }

  /**
   * @inheritDoc
   */
  public ngAfterViewInit() {
    this.elementText = this.contentElement.innerHTML;
    if (!this.hideToggle) {
      this.element.nativeElement.classList.remove('hidden');
    } else {
      this.element.nativeElement.classList.add('hidden');
    }
    this.toggleView();
    if (!this.hideToggle) {
      this.element.nativeElement.classList.remove('hidden');
    } else {
      this.element.nativeElement.classList.add('hidden');
    }
    this.element.nativeElement.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.toggleView();
    });
  }

  /**
   * @inheritDoc
   */
  public ngOnChanges() {
    if (this.elementText) {
      this.toggleView();
    }
    else {
      this.element.nativeElement.querySelector('.more').style.display = "none";
      this.element.nativeElement.querySelector('.less').style.display = "none";
    }
  }


  /**
  * @Toogle view - full elementText or not
  */
  private toggleView(): void {
    this.determineView();
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.element.nativeElement.querySelector('.more').style.display = "none";
      this.element.nativeElement.querySelector('.less').style.display = "inherit";
    } else {
      this.element.nativeElement.querySelector('.more').style.display = "inherit";
      this.element.nativeElement.querySelector('.less').style.display = "none";
    }
  }

  /**
   * Determine view
   */
  private determineView(): void {
    const _elementChange = document.getElementById(this.contentElement.id);
    if (this.elementText.length <= this.maxContentLength) {
      this.currentText = this.elementText;
      _elementChange.innerHTML = this.currentText;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed === true) {
      this.currentText = this.elementText.substring(0, this.maxContentLength) + '...';
      _elementChange.innerHTML = this.currentText;
    } else if (this.isCollapsed === false) {
      this.currentText = this.elementText;
      _elementChange.innerHTML = this.currentText;
    }
  }

}
