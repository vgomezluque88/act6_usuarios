import { Routes } from '@angular/router';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormularioUserComponent } from './components/formulario-user/formulario-user.component';


export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "usuarios" },
    { path: "usuarios", component: UserListComponent },
    { path: "usuario/:_id", component: ViewUserComponent },
    { path: "nuevo/usuario", component: FormularioUserComponent },
    { path: "update/usuario/:_id", component: FormularioUserComponent },
];
