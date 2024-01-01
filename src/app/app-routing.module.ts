import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ListViewComponent} from "../components/list-view/list-view.component";
import {ShellComponent} from "../views/shell/shell.component";

const routes: Routes = [
  {path: '', component: ShellComponent},
  {path: 'target/:targetName', component: ListViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
