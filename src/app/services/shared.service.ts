import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http : HttpClient) { }

  formDetails = ({
        personalDetails: {
          firstname : '',
          lastname : '',
          email : '',
          password : '',
        },
        gender : '',
        country : '',
        hobbies : '',
        skills : []
      })

  postForm(formDetails : any){
    this.http.post<any>("https://angularproject2022-default-rtdb.firebaseio.com/prducts.json", formDetails).subscribe((data)=> {
      console.log(data)
    })
  }


}
