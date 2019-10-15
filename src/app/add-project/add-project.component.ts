import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: any = {};
  metas: any = [];
  selectedMeta: any = {};
  fieldSelctedMeta: any = {};

  message = '';
  errorMessage = '';
  isAdding = false;

  constructor(
    public appInfo: AppStorageService,
    private router: Router
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = 'Add Project';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.project = {
      name: '',
      description: '',
      visibility: 'internal',
      meta: '',
      fields: {}
    };
    this.getMetas().then(
      (response) => {
        this.metas = response;
      },
      (error) => {}
    );
  }

  getMetas(): any {
    return new Promise((resolve, reject) => {
      const metas = [{
        _id: '1234567890',
        name: 'meta 1',
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
        name: 'meta 2',
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
      resolve(metas);
    });
  }

  addProject(): void {
    this.message = '';
    this.errorMessage = '';
    this.isAdding = true;
  }

}
