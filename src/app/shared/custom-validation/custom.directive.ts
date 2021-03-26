import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';
export class RegexPattern {
    public static CHASSIS_PATTERN = '^[a-zA-Z0-9]*$';
    public static EMAIL_PATTERN =
      '^([A-Za-z0-9]+)([._-]?[A-Za-z0-9]+)*([A-Za-z0-9]*)@(([A-Za-z]+)([-]?)([A-Za-z]+?))\\.([A-Za-z]{2,3})(\\.[A-Za-z]{2,3})?$';
    public static PASSWORD_PATTERN =
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*]{8,30}';
    public static MOBILE_NUM_PATTERN = '^[0-9]*$';
    public static ALPHABET_PATTERN = '^[a-zA-Z ]*$';
  }

  //   constructor(private _el: ElementRef) { }

  //   @HostListener('input', ['$event']) onInputChange(event) {
  //       const initalValue = this._el.nativeElement.value;

  //       this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z]/g, '');
  //       if (initalValue !== this._el.nativeElement.value) {
  //           event.stopPropagation();
  //       }
  //   }
  // }
  @Directive({
    selector: 'input[numbersOnly]'
  })
  export class NumberDirective {

    constructor(private _el: ElementRef) { }
  
    @HostListener('input', ['$event']) onInputChange(event) {
      const initalValue = this._el.nativeElement.value;
      this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
      if ( initalValue !== this._el.nativeElement.value) {
        event.stopPropagation();
      }
    }
  
  }
  @Directive({
    selector: 'input[alphabet]'
  })
  export class Alphabet {

    constructor(private _el: ElementRef) { }
  
    @HostListener('input', ['$event']) onInputChange(event) {
      const initalValue = this._el.nativeElement.value;
      this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z ]/g, '');
      if ( initalValue !== this._el.nativeElement.value) {
        event.stopPropagation();
      }
    }
  
  }

  @Directive({
    selector: `datemask, [datemask], [dateMask]`
  })
  export class MaskDirective implements OnInit, OnDestroy {
    @HostBinding('class.dateMask') compClass = true;
  
    @Input()
    dateMask = {
      mask: [/[0-3]/, /\d/, '.', /[0-1]/, /\d/, '.', /[0-2]/, /\d/, /\d/, /\d/],
      showMask: false,
      guide: false,
      placeholderChar: '_',
      // keepCharPositions: true,
    };
  
    maskedInputController;
  
    constructor(private element: ElementRef) { }
  
    ngOnInit(): void {
      this.maskedInputController = textMask.maskInput({
        inputElement: this.element.nativeElement,
        ...this.dateMask
      });
    }
  
    ngOnDestroy() {
      this.maskedInputController.destroy();
    }
  }

  @Directive({
    selector: '[capitalizeFirst]'
  })
  export class CapitalizeFirstDirective {
  
    constructor(private ref: ElementRef) {
    }
  
    @HostListener('input', ['$event'])
    onInput(event: any): void {
      if (event.target.value.length === 1) {
        const inputValue = event.target.value;
        this.ref.nativeElement.value = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);
      }
    }
  }
  