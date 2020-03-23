import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PharmacyService } from '../pharmacy.service';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-pharmacy-edit',
  templateUrl: './pharmacy-edit.component.html',
  styleUrls: ['./pharmacy-edit.component.css']
})
export class PharmacyEditComponent implements OnInit {
 
  pharmacyEditForm: FormGroup;
  pharmacyEdit:any;
  id:number;

  constructor(
    private fb: FormBuilder,
     private pharmacyService: PharmacyService,
     private router: Router,
     private route: ActivatedRoute,
     ) { 
    this.pharmacyEditForm = this.fb.group({
      pharmacyName: [''],
      photo: [''],
    });

  }

  ngOnInit() {

     this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.pharmacyService.getPharmacy(this.id).subscribe(
      result =>{
        console.log(result);
        this.pharmacyEdit = result;
        this.updatePharmacyForm(this.pharmacyEdit);
      }
    );
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.pharmacyEditForm.value);

    this.pharmacyService.updatePharmacy(this.id, this.pharmacyEditForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin/pharmacy']);
    });
  }


  updatePharmacyForm(editvalues: any) {
    this.pharmacyEditForm.patchValue({
      pharmacyName: editvalues.pharmacyName,
      photo: editvalues.photo
    });
  }

}
