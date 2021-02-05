import  {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {user} from '../form/user.model';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class FormService{

    public users : user []=[];
   

    private userUpdated=new Subject<user[]>();

    constructor(private http : HttpClient){

    }
    url="http://localhost:8080/user/";
    createUser(data){
        this.http.post(this.url+"createuser",data).subscribe(data=>{
            console.log(data)
        })
    }

    getAllUser(){
        return this.http.get(this.url);
    }
    getUser(userId : string){
        return this.http.get(this.url+userId);
    }
    deleteUser(userId : string){
        return this.http.delete(this.url+userId);
    }
    updateUser(userId:string,data){
        this.http.patch(this.url+userId,data).subscribe(res=>{
            console.log(res);
        })
    }
   
}