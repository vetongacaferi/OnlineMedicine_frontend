import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,  } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  imgURL: any;
  constructor(private fb: FormBuilder) {
  
   }

  ngOnInit(): void {
    this.createProfileForm();

  }

  createProfileForm(): FormGroup{
    return this.profileForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['',  Validators.required],
      userName: ['', [ Validators.required, Validators.minLength(4)]],
      city:[''],
      state:[''],
      zip:['']
    });
  }

  handleFileInput(files: FileList) {
    if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    // this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  // this.imagePath = files;
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }}


  updateProfile(): void {
    this.profileForm.patchValue({
      // firstName: 'Nancy',
      // address: {
      //   street: '123 Drew Street'
      // }
    });
  }


  onSubmit(): void{
    console.log(this.profileForm.value);

  }

}
