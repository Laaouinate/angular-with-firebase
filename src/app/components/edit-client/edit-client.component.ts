import { ToastrService } from 'ngx-toastr';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", Validators.required ),
    phone: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email] ),
    balance: new FormControl(0,Validators.pattern('[0-9]*')),

  })

  id: string ="";

  constructor(private toastr: ToastrService,private router: Router,private route:ActivatedRoute, private clientService:ClientService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params.id;
      this.clientService.getOne(params.id)
      .subscribe((res: Client) => this.clientForm.patchValue(res))
    })
  }

  updateClient(){
    let data = {
      ...this.clientForm.value,
      id: this.id
    }
    this.clientService.update(data)
        .then(() => {
          this.toastr.info('Client est modifié avec succès', 'Modifier', {
            positionClass: 'toast-bottom-left'
          })

          this.router.navigate(['/clients']);
        })
        .catch(err => this.toastr.error(err.message, 'Erreur',{
          positionClass: 'toast-bottom-left'
        }))
  }

}
