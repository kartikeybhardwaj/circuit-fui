import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.css']
})
export class AddMilestoneComponent implements OnInit {
  milestone: any = {};

  milestoneMetas: any = [];
  selectedMeta: any = {};

  isAdding = false;

  timeline: any = '';

  constructor(
    public appInfo: AppStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params && activatedRouteSnapshot.params.projectId) {
      appInfo.selectedProjectId = activatedRouteSnapshot.params.projectId;
    }
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Add Milestone';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.milestone = {
      title: '',
      description: '',
      timeline: {},
      milestoneMetaId: '',
      fields: {},
      meta: {
        addedBy: '1234567890',
        addedOn: new Date(),
        lastUpdatedBy: '1234567890',
        lastUpdatedOn: new Date()
      }
    };
    this.getMilestoneMetas().then(
      (response) => {},
      (error) => {}
    );
  }

  changedMilestoneMetaId(event: any): void {
    this.milestone.fields = {};
  }

  getMilestoneMetas(): any {
    return new Promise((resolve, reject) => {
      const milestoneMetas = [{
        _id: '1234567890',
        title: 'None',
        description: 'nothing in here',
        fields: []
      }, {
        _id: '1234567890',
        title: 'meta 1',
        description: 'nothing in here',
        fields: [{
          key: 'select 1',
          valueType: 'select',
          value: ['MongoDB', 'Express.js', 'Angular', 'Node.js']
        }, {
          key: 'select 2',
          valueType: 'select',
          value: ['MongoDB', 'Express.js', 'React.js', 'Node.js']
        }, {
          key: 'enter here',
          valueType: 'input',
          value: 'default value'
        }]
      }, {
        _id: '0987654321',
        title: 'meta 2',
        description: 'nothing in here',
        fields: [{
          key: 'select 1',
          valueType: 'select',
          value: ['MongoDB', 'Express.js', 'Angular', 'Node.js']
        }, {
          key: 'select 2',
          valueType: 'select',
          value: ['MongoDB', 'Express.js', 'React.js', 'Node.js']
        }, {
          key: 'enter here',
          valueType: 'input',
          value: 'default value'
        }]
      }];
      this.milestoneMetas = milestoneMetas;
      this.selectedMeta = this.milestoneMetas[0];
      resolve(true);
    });
  }

  addMilestone(): void {
    this.isAdding = true;
    setTimeout(() => {
      this.isAdding = false;
    }, 3000);
  }

}
