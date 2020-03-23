import { Component, OnInit } from '@angular/core';
import { PharmacyService } from '../pharmacy.service';
import { PharmacyList } from '../pharmacy.model';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  pharmaciesList: PharmacyList[];

  constructor(private pharmacyService: PharmacyService) { }
  
  ngOnInit() {
    this.getPharmacies();
  }

  getPharmacies(): void {
    this.pharmacyService.getPharamacies()
    .subscribe(result => {
      this.pharmaciesList = result;
      console.log(result);
    });
  }

  deletePharmacy() : void
  {
    alert("delete pharmacy");
  }

}
