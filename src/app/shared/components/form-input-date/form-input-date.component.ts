import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $:any;
declare var moment:any;

@Component({
  selector: 'app-form-input-date',
  templateUrl: './form-input-date.component.html',
  styleUrls: ['./form-input-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:FormInputDateComponent
    }
  ]
})
export class FormInputDateComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() value:String="";

  touched = false;

  disabled = false;
  onChange: any = (value)=>{};
  onTouched: any= (value)=>{};

  constructor() { }
 
  ngAfterViewInit(): void {
    var date_select_field = $('input[name="datetimepicker"]');
    /*moment.locale('uk');*/
    if (date_select_field.length) {
      var start = moment().subtract(29, 'days');
      date_select_field.daterangepicker({
        minDate: '12/05/1900',
        startDate: start,
        autoUpdateInput: true,
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
          format: 'DD/MM/YYYY'
        }
      });
      date_select_field.on('focus',  (e) =>{
        $(e.target).closest('.form-group').addClass('is-focused');
      });
      date_select_field.on('apply.daterangepicker', (e, picker)=> {
        // this.form.controls[e.target.getAttribute("formcontrolname")].setValue(picker.startDate.format('DD/MM/YYYY'))
        $(e.target).val(picker.startDate.format('DD/MM/YYYY'));
        this.setValue(picker.startDate.format('DD/MM/YYYY'))        
        $(e.target).closest('.form-group').addClass('is-focused');
      });
      date_select_field.on('hide.daterangepicker', function () {
        if ('' === $(this).val()) {
          $(this).closest('.form-group').removeClass('is-focused');
        }
      });

    }
  }

  ngOnInit(): void {
  }
  setValue(value)
  {
    this.value=value;
    this.onChange(value);
  }
  writeValue(obj: string): void {
    this.value=obj;
  }
  registerOnChange(fn: any): void {
    this.onChange=fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched=fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled=isDisabled
  }
  
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
