import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { user } from '../form/user.model';
import { FormService } from '../form/form.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { Form } from '../form/form.component';
@Component({
  selector: "List-View",
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListView implements OnInit {

  users: user[];


  formService: FormService;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  dataSource = new MatTableDataSource<user>(this.users)


  displayedColumns: string[] = ['FirstName', 'LastName', 'MobileNumber', 'Email', 'Actions'];

  constructor(formService: FormService, private router: Router, private form: Form) {
    this.formService = formService;
    this.form = form;

  }

  ngOnInit() {
    this.dataSource.paginator = this.matPaginator;
    this.getAllUsers()

  }

  getAllUsers() {
    this.formService.getAllUser().subscribe((res: any) => {
      this.dataSource.data = res.users as user[];
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator=this.matPaginator;
  }
  onDelete(userId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.formService.deleteUser(userId).subscribe((res: any) => {
          if (res.status)
            Swal.fire(
              'Deleted!',
              'Your Data has been deleted.',
              'success'
            )
          this.dataSource.data = [];
          this.ngOnInit()
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Data is safe :)',
          'error'
        )
      }
    })

  }

  goToAddUser() {
    this.router.navigate(["/addUser"]);
  }

  onUpdate(userId: string) {
    this.router.navigate(['addUser/', userId])
  }
}