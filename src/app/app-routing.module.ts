import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from '../components/list-view/list-view.component';
import { ShellComponent } from '../views/shell/shell.component';
import { RunViewComponent } from '../components/run-view/run-view.component';
import { SampleCardComponent } from '../components/sample-card/sample-card.component';
import { SamplesViewComponent } from '../components/samples-view/samples-view.component';
import { StoreValuesGuard } from './guards/StoreFilesGuard';

const routes: Routes = [
  { path: '', component: ShellComponent },
  {
    path: 'target/:targetName',
    component: ListViewComponent,
    canActivate: [StoreValuesGuard],
  },
  {
    path: 'run/:runName',
    component: RunViewComponent,
    canActivate: [StoreValuesGuard],
  },

  {
    path: 'samples/:sample',
    component: SampleCardComponent,
    canActivate: [StoreValuesGuard],
  },
  {
    path: 'samples',
    component: SamplesViewComponent,
    canActivate: [StoreValuesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
