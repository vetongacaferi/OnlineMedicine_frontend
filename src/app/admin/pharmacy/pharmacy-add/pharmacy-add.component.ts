import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PharmacyService } from '../pharmacy.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-pharmacy-add',
  templateUrl: './pharmacy-add.component.html',
  styleUrls: ['./pharmacy-add.component.css']
})
export class PharmacyAddComponent implements OnInit {
  
  pharmacyAddForm: FormGroup;



  constructor(
    private fb: FormBuilder,
     private pharmacy: PharmacyService,
     private router: Router
     ) { 
    this.pharmacyAddForm = this.fb.group({
      pharmacyName: [''],
      photo: [''],
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.pharmacyAddForm.value);

    this.pharmacy.addPharmacy(this.pharmacyAddForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin/pharmacy']);
    });
  }

}
