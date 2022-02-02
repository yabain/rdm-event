import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Evenement } from '../../entities';
import { EvenementBussinessService } from '../../services/evenement-bussiness/evenement-bussiness.service';

declare var $:any;
declare var moment:any;

@Component({
  selector: 'app-form-new-event',
  templateUrl: './form-new-event.component.html',
  styleUrls: ['./form-new-event.component.scss']
})
export class FormNewEventComponent implements OnInit,AfterViewInit {
  form:FormGroup;
  submited:boolean=false;
  constructor(private evenementService:EvenementBussinessService) { }

  ngAfterViewInit(): void {
    var date_select_field = $('input[name="datetimepicker"]');
    /*moment.locale('uk');*/
    if (date_select_field.length) {
      var start = moment().subtract(29, 'days');

      date_select_field.daterangepicker({
        minDate: '12/05/1900',
        startDate: start,
        autoUpdateInput: false,
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
        this.form.controls[e.target.getAttribute("formcontrolname")].setValue(picker.startDate.format('DD/MM/YYYY'))
        $(e.target).val(picker.startDate.format('DD/MM/YYYY'));
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

    this.form=new FormGroup({
      scopeVisibilityAction:new FormControl("",[Validators.required]),
      eventType:new FormControl("",[Validators.required]),
      name:new FormControl("",[Validators.required]),
      place:new FormControl("",[Validators.required]),
      startDate:new FormControl("",[Validators.required]),
      startTime:new FormControl("",[Validators.required]),
      endDate:new FormControl("",[Validators.required]),
      endTime:new FormControl("",[Validators.required]),
      description:new FormControl("",[Validators.required]),
      selectedGroupVisibilityAction:new FormControl("",[Validators.required]),
      
    })
  }

  submit()
  {
    console.log("Value ",this.form.value)

    if(!this.form.valid) return;
    this.submited=true;
    let event:Evenement=new Evenement();
    event.hydrate(this.form.value);
    
    document.querySelector("#btn_submit").textContent="Patientez...";
    (document.querySelector("#btn_submit") as HTMLButtonElement).disabled=true;
    //Créer l'évènement
    this.evenementService.createNewEvent(event)
    .then((result)=>{
      document.querySelector("#btn_submit").textContent="Créer l'évènement";
      (document.querySelector("#btn_submit") as HTMLButtonElement).disabled=false;
      this.submited=false;
    })
  }

}
