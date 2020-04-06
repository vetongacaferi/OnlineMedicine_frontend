import { ProfileService } from './profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

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
    private _sanitizer: DomSanitizer
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
      zip: '',
      file:''
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

  handleFileInput(event) {
    let files = event.target.files;

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
    // this.imgURL = reader.result; 
    this.profileForm.get('file').setValue(reader.result);
  }
  event.target.value = '';

}


  removeImage(): void
  {
    this.profileForm.get('file').setValue('');
  }


  updateProfile(result): void {
    this.profileForm.patchValue({
      firstName:  this.formConvertString(result.firstname),
      lastName:  this.formConvertString(result.lastname),
      userName:  this.formConvertString(result.username),
      city:  this.formConvertString(result.city),
      state:  this.formConvertString(result.state),
      zip: this.formConvertString(result.zipcode),
      file: this.formConvertString(result.file)
    });
  }


  onSubmit(): void{
    const formData = Object.assign({}, this.profileForm.value);
    console.log('formData:', formData);
    if(this.profileForm.valid)
    {
      this.profileService.updateProfile(formData).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin/dashboard']);
      }); 
    }
    else
    {
      console.log('invalid form', this.profileForm);
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


  formConvertString(value: any): string
  {
    if(!value || value == undefined || value == null)
    {
      return '';
    }

    return value;

  }

  sanitizeImg(url): SafeUrl{
    return this._sanitizer.bypassSecurityTrustUrl(url);
 }

}
