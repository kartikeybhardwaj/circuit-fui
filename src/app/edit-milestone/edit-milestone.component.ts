import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

@Component({
  selector: 'app-edit-milestone',
  templateUrl: './edit-milestone.component.html',
  styleUrls: ['./edit-milestone.component.css']
})
export class EditMilestoneComponent implements OnInit {
  milestone: any = {};

  milestoneMetas: any = [];
  selectedMeta: any = {};

  isUpdating = false;

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
      index: 1,
      _id: '0',
      title: 'this is some title',
      description: 'this is some description',
      timeline: {
        begin: new Date(),
        end: new Date()
      },
      pulsesList: [{
        _id: '1234567890',
        title: 'pulse title 1'
      }, {
        _id: '1234567890',
        title: 'pulse title 2'
      }],
      pulsesListCount: 2,
      milestoneMetaId: '2',
      fields: [{
        key: 'select 1',
        'select 1': 'Angular'
      }, {
        key: 'select 2',
        'select 2': 'React.js'
      }, {
        key: 'enter here',
        'enter here': 'some value here'
      }],
      meta: {
        addedBy: 'some user',
        addedOn: this.appInfo.getLongDate(new Date().getTime()),
        lastUpdatedBy: 'some user',
        lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
      }
    };
    this.getMilestoneMetas().then(
      (milestoneMetas) => {
        this.milestoneMetas = milestoneMetas;
        this.milestoneMetas.some(meta => {
          if (meta._id === this.milestone.milestoneMetaId) {
            this.selectedMeta = meta;
            return true;
          }
        });
      },
      (error) => {}
    );
  }

  changedMilestoneMetaId(event: any): void {
    this.milestone.fields = {};
  }

  getMilestoneMetas(): any {
    return new Promise((resolve, reject) => {
      const milestoneMetas = [{
        _id: '0',
        title: 'None',
        description: 'nothing in here',
        fields: []
      }, {
        _id: '1',
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
        _id: '2',
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
      resolve(milestoneMetas);
    });
  }

  updateMilestone(): void {
    this.isUpdating = true;
    setTimeout(() => {
      this.isUpdating = false;
    }, 3000);
  }

}
