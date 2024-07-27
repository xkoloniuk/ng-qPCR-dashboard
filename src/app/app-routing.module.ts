import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {ListViewComponent} from "../components/list-view/list-view.component";
import {ShellComponent} from "../views/shell/shell.component";
import {RunViewComponent} from "../components/run-view/run-view.component";
import {SampleCardComponent} from "../components/sample-card/sample-card.component";
import {SamplesViewComponent} from "../components/samples-view/samples-view.component";
import {Store} from "@ngxs/store";
import {GlobalState} from "./store_xs/store.state";

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
     return  store.selectSnapshot(GlobalState.selectFilesByTarget(targetName))
    }
    return false
  }

const routes: Routes = [
  {path: '', component: ShellComponent},
  {path: 'target/:targetName', component: ListViewComponent, canActivate: [targetExists]},
  {path: 'run/:runName', component: RunViewComponent},
  {path: 'samples/:sample', component: SampleCardComponent},
  {path: 'samples', component: SamplesViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
