import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { FormService } from './form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { user } from './user.model';

@Component({
    selector: 'Forms',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

@Injectable({ providedIn: 'root' })
export class Form {

    formService: FormService;
    updateUser: user[] = []
    hide = true

    editMode = false
    public id: string
    image: string;
    formData = new FormData();
    userForm = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        mobileNumber: new FormControl(),
        dateOfBirth: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl(),
        photo: new FormControl([''])
    });

    constructor(formService: FormService, private router: Router, private routing: ActivatedRoute) {
        this.formService = formService

    }
    
    ngOnInit() {
        this.id = this.routing.snapshot.paramMap.get('id');
        if (this.id != null) {
            this.updatedUser(this.id);
            this.editMode = true
        }
    }

    onAddPost() {
        if (this.userForm.invalid) {
            return;
        } else if (this.userForm.controls['password'].value != this.userForm.controls['confirmPassword'].value) {
            return;
        } else if (this.userForm.controls['photo'].value == "") {
            console.log(this.userForm.controls['photo'].value)
            alert("Please Upload image");
            return;
        } else {
            if (this.editMode == false) {
                this.getFormData();
                console.log(this.formData)
                this.formService.createUser(this.formData);
                this.router.navigate(['/list']);
            } else {
                this.getFormData();
                this.formService.updateUser(this.id, this.formData);
                this.router.navigate(['/list']);
            }
        }
    }

    updatedUser(userId: string) {
        this.formService.getUser(userId).subscribe((res: any) => {
            this.userForm.patchValue({
                firstName: res.userId.firstName,
                lastName: res.userId.lastName,
                mobileNumber: res.userId.mobileNumber,
                dateOfBirth: new Date(res.userId.dateOfBirth).toISOString().split('T')[0],
                email: res.userId.email,
                password: res.userId.password,
                confirmPassword: res.userId.confirmPassword,
            })
        })
    }

    selectImage(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]
            this.image = file;
        }
    }

    getFormData() {
        this.formData.append('firstName', this.userForm.controls.firstName.value)
        this.formData.append('lastName', this.userForm.controls.lastName.value)
        this.formData.append('mobileNumber', this.userForm.controls.mobileNumber.value)
        this.formData.append('dateOfBirth', this.userForm.controls.dateOfBirth.value)
        this.formData.append('email', this.userForm.controls.email.value)
        this.formData.append('password', this.userForm.controls.password.value)
        this.formData.append('confirmPassword', this.userForm.controls.confirmPassword.value)
        this.formData.append('photo', this.image)
    }
}

