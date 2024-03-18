import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './botones.component.html',
  styleUrl: './botones.component.css'
})
export class BotonesComponent {

  @Input() parent: string = "";
  @Input() idSerie: string = "";
  usuariServicio = inject(UserServiceService);

  async borrarSerie(id: string) {
    console.log(id);
    let response = confirm('Seguro que quieres borrar este usuario?');
    if (response) {
      let confimdelete = await this.usuariServicio.delete(id);
      alert('Se ha borrado correctamente el usuario: ' + confimdelete.first_name + " " + confimdelete.last_name);
    }
  }
}
