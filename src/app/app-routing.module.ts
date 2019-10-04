import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ProjectsComponent
} from './projects/projects.component';
import {
  PageNotFoundComponent
} from './page-not-found/page-not-found.component';
import {
  UnauthorizedAccessComponent
} from './unauthorized-access/unauthorized-access.component';
import {
  MilestonesComponent
} from './milestones/milestones.component';

const routes: Routes = [{
  path: 'projects',
  component: ProjectsComponent
}, {
  path: 'milestones',
  component: MilestonesComponent
}, {
  path: 'unauthorized-access',
  component: UnauthorizedAccessComponent
}, {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
