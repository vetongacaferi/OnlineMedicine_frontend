import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { Role } from './_models/role';
import { LoginComponent } from './login/login.component';
import { MedicineComponent } from './admin/medicine/medicine-list/medicine.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PharmacyComponent } from './admin/pharmacy/pharmacy-list/pharmacy.component';
import { PharmacyAddComponent } from './admin/pharmacy/pharmacy-add/pharmacy-add.component';
import { PharmacyEditComponent } from './admin/pharmacy/pharmacy-edit/pharmacy-edit.component';
import { MedicineAddeditComponent } from './admin/medicine/medicine-addedit/medicine-addedit.component';
import { PharmacyMedicinesComponent } from './admin/pharmacy/pharmacy-medicines/pharmacy-medicines.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
    // {
    //     path: '',
    //     component: AdminComponent,
    //     canActivate: [AuthGuard]
    // },
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { 
        path: 'admin', component: AdminComponent,  canActivate: [AuthGuard], 
       // data: { roles: [Role.Admin] } 
       children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },// data: { roles: [Role.Admin] } 
        { path: 'medicine', component: MedicineComponent, canActivate: [AuthGuard],},
        { path: 'medicine/add', component: MedicineAddeditComponent, canActivate: [AuthGuard],},        
        { path: 'medicine/edit/:id', component: MedicineAddeditComponent, canActivate: [AuthGuard],},        
        { path: 'pharmacy', component: PharmacyComponent, canActivate: [AuthGuard], },
        { path: 'pharmacy/add', component: PharmacyAddComponent, canActivate: [AuthGuard], },
        { path: 'pharmacy/edit/:id', component: PharmacyEditComponent, canActivate: [AuthGuard], },
        { path: 'pharmacy/medicines/:id', component: PharmacyMedicinesComponent, canActivate: [AuthGuard], },
       ]

    },
   
    
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'register', 
        component: RegisterComponent 
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);