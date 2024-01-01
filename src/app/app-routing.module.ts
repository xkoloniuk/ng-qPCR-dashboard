import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {ListViewComponent} from "../components/list-view/list-view.component";
import {ShellComponent} from "../views/shell/shell.component";
import {select, Store} from "@ngrx/store";
import {selectFilesByTarget} from "./store/app.selectors";
import {map, take} from "rxjs";
import {RunViewComponent} from "../components/run-view/run-view.component";

function targetExists(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

const router = inject(Router)
  const targetName = route.paramMap.get('targetName');


  // Check if the item exists (replace this with your actual check)
  const itemExists = checkTargetExists(targetName);

  if (itemExists) {
    return true;
  } else {
    console.log('redirect')
    // Redirect to Home if the item doesn't exist
    router.navigate(['/']);
    return false;
  }
}

  function checkTargetExists(targetName: string | null) {
    const store = inject(Store)
    console.log(targetName)
    if (targetName) {
     return  store.pipe(select(selectFilesByTarget(targetName)), take(1), map(data => {
       console.log(data)
       console.log(store)
       if (data) {
         return true
       } else {
         return false
       }
     }))
    }
    return false
  }

const routes: Routes = [
  {path: '', component: ShellComponent},
  {path: 'target/:targetName', component: ListViewComponent, canActivate: [targetExists]},
  {path: 'run/:runName', component: RunViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
