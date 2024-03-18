import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Iuser } from '../../interfaces/iuser.interfaces';
import { UserCardComponent } from '../user-card/user-card.component';
import { RouterLink } from '@angular/router';
import { NavUsuariosComponent } from '../nav-usuarios/nav-usuarios.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, RouterLink, NavUsuariosComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  userServicio = inject(UserServiceService);
  arrUserResult: Iuser[] = [];

  ngOnInit(): void {
    this.userServicio.getAll().subscribe((data: any) => {
      this.arrUserResult = data.results;
    })


  }
}
