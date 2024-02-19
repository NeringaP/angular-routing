import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { AuthGuardService } from "./auth-guard.service";
import { CanDeactivateGuardService } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent, children: [ //localhost:4200/users
      {path: ':id/:name', component: UserComponent},
    ]}, 
    {
        path: 'servers',
        // canActivate:[AuthGuardService],
        canActivateChild: [AuthGuardService],
        component: ServersComponent,
        children: [
            {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService]},
            {path: ':id', component: ServerComponent, resolve: {serverSmth: ServerResolver}}
        ]
    },
    // {path:'not-found', component: PageNotFoundComponent},
    {path:'not-found', component: ErrorPageComponent, data: {message: 'Page not found :('}},
    {path:'**', redirectTo: '/not-found'},
];
  
@NgModule({
    imports: [
        //RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}