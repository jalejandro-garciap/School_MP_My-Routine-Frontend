import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginCredential } from '../../interfaces/login.interface';
import { Trim } from 'src/app/shared/utils/trim.class';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output()
  public onDataForm:EventEmitter<LoginCredential> = new EventEmitter();

  public form:FormGroup = this._fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required]
  });

  constructor(private _fb:FormBuilder) {}

  onSubmit():void {

    if(this.form.invalid) {
      return;
    }

    this.onDataForm.emit( Trim.trimProperties(this.form.value) );
  }

}
