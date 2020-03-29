import { ProfileService } from './profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profileData: any;

  imgURL: any;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    ) {
  
   }

  ngOnInit(): void {
    this.createProfileForm();
    this.getProfileData();
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


  getProfileData(): void{
    this.profileService.getProfile()
    .subscribe( result =>{
       console.log('result:', result);
       this.profileData = result;
       this.updateProfile(result);
    })
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


  updateProfile(result): void {
    this.profileForm.patchValue({
      firstName: result.firstname,
      lastName: result.lastname,
      userName: result.username,
      city: result.city,
      state: result.state,
      zip: result.zipcode
    });
  }


  onSubmit(): void{
    const formData = Object.assign({}, this.profileForm.value);

    if(this.profileForm.valid)
    {
      this.profileService.updateProfile(formData).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin/dashboard']);
      }); 
    }
    else
    {
      this.markFormGroupTouched(this.profileForm);
    }
   
   }

   private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
