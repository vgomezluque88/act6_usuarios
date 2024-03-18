import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { BotonesComponent } from '../../components/botones/botones.component';
import { Iuser } from '../../interfaces/iuser.interfaces';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [BotonesComponent],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {

  //Capturamos el id del usuario
  activateRouter = inject(ActivatedRoute);
  userService = inject(UserServiceService);
  unUsuario!: Iuser;

  ngOnInit(): void {
    this.activateRouter.params.subscribe(async (params: any) => {
      try {
        let response = await this.userService.getById(params._id);
        this.unUsuario = response;
        console.log(response);

      } catch (error) {
        console.log(error);
      }
    });
  }
}
