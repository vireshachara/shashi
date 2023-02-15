import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project';

  reactiveform: any;

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  country: string = '';
  hobbies: string = '';
  skills: string = '';

  formStatus;

  constructor(private sharedService : SharedService){}

  ngOnInit() {
    this.reactiveform = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(10),this.noSpaceAllowed]),
        lastname: new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(8),this.noSpaceAllowed]),
        email: new FormControl(null, [Validators.required, Validators.email], this.emailNotAllowed),
        password: new FormControl(null, [Validators.required,Validators.minLength(6)]),
        // confirmpassword : new FormControl('', [Validators.required, Validators.minLength(6)]),
      }),
      gender: new FormControl('male', Validators.required),
      country: new FormControl('india', Validators.required),
      hobbies: new FormControl('', Validators.required),
      skills: new FormArray([
        new FormControl(null, Validators.required),
        // new FormControl(null, Validators.required),
        // new FormControl(null, Validators.required),
      ]),
    });

    // ValueChanges
    // this.reactiveform.get('personalDetails.firstname').valueChanges.subscribe((value)=> {
    //   console.log(value);
    // })
    // this.reactiveform.valueChanges.subscribe((value)=> {
    //   console.log(value);
    // })

    // statusChanges
    this.reactiveform.statusChanges.subscribe((data)=> {
      console.log(data);
      this.formStatus = data;
    })

    // setTimeout(() => {
    //   this.reactiveform.setValue({
    //     personalDetails: {
    //       firstname : '',
    //       lastname : '',
    //       email : '555viresh@gmail.com',
    //       password : '',
    //     },
    //     gender : 'male',
    //     country : 'india',
    //     hobbies : '',
    //     skills : ['']
    //   })
    // }, 3000);

    setTimeout(() => {
      this.reactiveform.patchValue({
        personalDetails: {
          email : '555viresh@gmail.com',
        },
        gender : 'male',
        country : 'india',
        
      })
    }, 3000);

  }

  onSubmit() {
    console.log(this.reactiveform);
    if (this.reactiveform.valid) {
      alert('Reactive form submitted Successfully');
    } else {
      alert(' There is an error in the form');
    }
    this.reactiveform.reset({
      gender : 'male',
      country : 'india',
    });

    // this.sharedService.postForm(this.reactiveform)
  }

  addSkills() {
    <FormArray>(this.reactiveform.get('skills').push(new FormControl(null, Validators.required)));
  }

  //Custom validators
  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    } else {
      return null;
    }
  }

  //Custom async validators
  emailNotAllowed(control: FormControl): Promise<any> | Observable<any> {
    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'vireshachara18@gmail.com') {
          resolve({ emailNotAllowed: true });
        } else {
          resolve(null)
        }
      }, 5000)
    });
    return response;
  }

}
