import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-user.component.html',
  styleUrl: './formulario-user.component.css'
})
export class FormularioUserComponent {
  tipo: string = "Nuevo";
  usuarioForm: FormGroup;
  userServicio = inject(UserServiceService);
  router = inject(Router);
  activatedRouter = inject(ActivatedRoute);
  constructor() {
    this.usuarioForm = new FormGroup({
      first_name: new FormControl('', [Validators.required,
      Validators.minLength(3)]),
      last_name: new FormControl('', [Validators.required,
      Validators.minLength(2)]),
      username: new FormControl('', [Validators.required,
      Validators.minLength(8)]),
      email: new FormControl('', [Validators.required,
      Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      image: new FormControl('', [Validators.required, Validators.pattern(/^[\w-.]+([\w-]+\.)+[\w-]{2,4}$/)]),
    }, []);
  }
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(async (params: any) => {
      if (params._id) {
        const responsActualizar = await this.userServicio.getById(params._id);
        this.usuarioForm = new FormGroup({
          _id: new FormControl(responsActualizar._id),
          first_name: new FormControl(responsActualizar.first_name, [
            Validators.required,
            Validators.minLength(3)]),
          last_name: new FormControl(responsActualizar.last_name, [
            Validators.required,
            Validators.minLength(2)]),
          username: new FormControl(responsActualizar.username, [
            Validators.required,
            Validators.minLength(8)]),
          email: new FormControl(responsActualizar.email, [
            Validators.required,
            Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
          image: new FormControl(responsActualizar.image, [Validators.required,]),
        }, []);
      }
    });
    console.log(this.usuarioForm.valid);
  }

  async getDataUser() {

    if (this.usuarioForm.value._id) {
      const responseUpdate = await this.userServicio.update(this.usuarioForm.value);
      if (responseUpdate.id) {
        alert('Se ha Actualizado el usuario:' + responseUpdate.first_name + " " + responseUpdate.last_name);
        this.router.navigate(['/usuarios']);
      } else {
        alert('Hay un error en la insercción del usuario');
      }
    } else {
      const response = await this.userServicio.insert(this.usuarioForm.value);
      if (response.id) {
        alert('Se ha creaado un nuevo usuario:' + response.first_name + " " + response.last_name);
        this.router.navigate(['/usuarios']);
      } else {
        alert('Hay un error en la insercción del usuario');
      }
    }
  }
}
