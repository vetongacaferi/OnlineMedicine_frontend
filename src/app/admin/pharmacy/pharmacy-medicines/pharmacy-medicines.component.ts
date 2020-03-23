import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PharmacyService } from '../pharmacy.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pharmacy-medicines',
  templateUrl: './pharmacy-medicines.component.html',
  styleUrls: ['./pharmacy-medicines.component.css']
})
export class PharmacyMedicinesComponent implements OnInit {
  form: FormGroup;
  id:number;
  pharmacyMedicineList:any;

  constructor( private fb: FormBuilder,
    private pharmacyService: PharmacyService,
    private router: Router,
    private route: ActivatedRoute,
    ) { 
  }


  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      items: this.fb.array([])
    });

    this.pharmacyService.getPharmacyMedicines(this.id).subscribe(
      result =>{
        console.log('famarmancy medicines: ',result);
        this.pharmacyMedicineList=result;
        this.initFormArray(result);
      }
    )



  }


  // medicineItem():FormGroup {
  //   return this.fb.group({
  //     id: '',
  //     name: '',
  //     isSelected:''

  //   })
  // }
  

  
  createForms(item): FormGroup {
    console.log('item:', item);
    const formGroup: FormGroup = new FormGroup(
      {
        id: new FormControl(item.id),
        name: new FormControl(item.name),
        Quantity: new FormControl(item.quantity),
        isSelected: new FormControl(item.isSelected),
      }
    );
    return formGroup;
  }

  initFormArray(items: any[]) {
    const formArray = this.form.get('items') as FormArray;
    items.map(item => {
      formArray.push(this.createForms(item));
    });
    this.form.setControl('items', formArray);
  }

  get items() {
    return this.form.get('items') as FormArray;
  }



  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.form.value);
    const formData = Object.assign({}, this.form.value);

    this.pharmacyService.updatePharmacyMedicines(this.id, formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin/pharmacy']);
    });
  }

}
