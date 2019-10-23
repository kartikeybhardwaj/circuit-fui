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
import {
  PulsesComponent
} from './pulses/pulses.component';
import {
  AddProjectComponent
} from './add-project/add-project.component';
import {
  AddMilestoneComponent
} from './add-milestone/add-milestone.component';
import {
  AddPulseComponent
} from './add-pulse/add-pulse.component';
import {
  EditProjectComponent
} from './edit-project/edit-project.component';
import {
  EditMilestoneComponent
} from './edit-milestone/edit-milestone.component';
import {
  EditPulseComponent
} from './edit-pulse/edit-pulse.component';

const routes: Routes = [{
  path: 'projects',
  component: ProjectsComponent
}, {
  path: 'projects/:projectId/milestones',
  component: MilestonesComponent
}, {
  path: 'projects/:projectId/milestones/:milestoneId/pulses',
  component: PulsesComponent
}, {
  path: 'project/add',
  component: AddProjectComponent
}, {
  path: 'project/:projectId/milestone/add',
  component: AddMilestoneComponent
}, {
  path: 'project/:projectId/milestone/:milestoneId/pulse/add',
  component: AddPulseComponent
}, {
  path: 'project/:projectId/edit',
  component: EditProjectComponent
}, {
  path: 'project/:projectId/milestone/:milestoneId/edit',
  component: EditMilestoneComponent
}, {
  path: 'project/:projectId/milestone/:milestoneId/pulse/:pulseId/edit',
  component: EditPulseComponent
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
