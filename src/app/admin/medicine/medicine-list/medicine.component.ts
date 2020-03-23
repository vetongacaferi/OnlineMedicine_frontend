import { MedicineService } from './../medicine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  medicinesList: any[];

  constructor(private medicineService: MedicineService) { }
  
  ngOnInit() {
    this.getPharmacies();
  }

  getPharmacies(): void {
    this.medicineService.getMedicines()
    .subscribe(result => {
      this.medicinesList = result;
      console.log(result);
    });
  }
}
