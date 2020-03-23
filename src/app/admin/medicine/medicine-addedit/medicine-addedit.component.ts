import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicineService } from '../medicine.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medicine-addedit',
  templateUrl: './medicine-addedit.component.html',
  styleUrls: ['./medicine-addedit.component.css']
})
export class MedicineAddeditComponent implements OnInit {

  medicineAddEditForm: FormGroup;
  id:number =0;

  medicineEdit:any;


  constructor(
    private fb: FormBuilder,
     private medicineService: MedicineService,
     private router: Router,
     private route: ActivatedRoute,
     ) { 
    this.medicineAddEditForm = this.fb.group({
      medicineId: ['0'],
      name: [''],
      manufacture: [''],
      supplier: [''],
      description: ['']
    });

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    if(this.id != 0)
    {
      this.medicineService.getMedicine(this.id).subscribe(
        result =>{
          console.log(result);
          this.medicineEdit = result;
          this.updateMedicineForm(this.medicineEdit);
        }
      );
  
    }
    
   
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.medicineAddEditForm.value);

    this.medicineService.addeditMedicine(this.medicineAddEditForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/admin/medicine']);
    });
  }

  
  updateMedicineForm(editvalues: any) {
    this.medicineAddEditForm.patchValue({
      medicineId: editvalues.id,
      name: editvalues.name,
      manufacture: editvalues.manufacture,
      supplier: editvalues.supplier,
      description: editvalues.description
    });
  }


}
