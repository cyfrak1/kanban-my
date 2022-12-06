import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor( private element : ElementRef) { }
  @HostListener('wheel',['$event'])
  onMouseWheel( event : WheelEvent ) : void {
    if(event.deltaY < 0){
      this.element.nativeElement.scrollLeft += 100;
    }
    else{
      this.element.nativeElement.scrollLeft -= 100;
    }
    // console.log(this.element.nativeElement.scrollLeft)
  }
}
