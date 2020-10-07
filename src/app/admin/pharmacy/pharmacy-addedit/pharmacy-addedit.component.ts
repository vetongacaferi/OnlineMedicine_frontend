import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PharmacyService } from '../pharmacy.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-pharmacy-addedit',
  templateUrl: './pharmacy-addedit.component.html',
  styleUrls: ['./pharmacy-addedit.component.css']
})
export class PharmacyAddEditComponent implements OnInit {
  
  pharmacyAddEditForm: FormGroup;

  id:number;


  constructor(
    private fb: FormBuilder,
     private pharmacyService: PharmacyService,
     private router: Router,
     private route: ActivatedRoute,
     ) { 
    this.pharmacyAddEditForm = this.fb.group({
      pharmacyName: [''],
      photo: [''],
      Address: '',
      Latitude: '',
      Longtitude: ''
    });

  }

  ngOnInit() {

    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.pharmacyService.getPharmacy(this.id).subscribe(
      result =>{
        console.log(result);
        this.updatePharmacyForm(result);
      }
    );
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.pharmacyAddEditForm.value);

    console.log('id:', this.id);
    if(this.id === 0 )
    {
      this.pharmacyService.addPharmacy(this.pharmacyAddEditForm.value).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin/pharmacy']);
      });
    }
    else{
      this.pharmacyService.updatePharmacy(this.id, this.pharmacyAddEditForm.value).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin/pharmacy']);
      });
    }
  
  }

  
  updatePharmacyForm(editvalues: any) {
    this.pharmacyAddEditForm.patchValue({
      pharmacyName: editvalues.pharmacyName,
      photo: editvalues.photo
    });
  }

  receiveLocation($event) {
    console.log('location: ', $event);

    this.pharmacyAddEditForm.patchValue({
      Latitude: $event.lat,
      Longtitude:  $event.lng
    });
  }
  

}
