import {
  Injectable
} from '@angular/core';

@Injectable()
export class AppStorageService {

  user: any = '';

  projects: any = [{
    name: 'This is public project 1',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'public',
    visibilityIcon: 'public'
  }, {
    name: 'This is internal project 2',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'internal',
    visibilityIcon: 'enhanced_encryption'
  }, {
    name: 'This is private project 3 and this has a very long name as compared to others',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'private',
    visibilityIcon: 'security'
  }, {
    name: 'This is public project 4',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'public',
    visibilityIcon: 'public'
  }, {
    name: 'This is internal project 5',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'internal',
    visibilityIcon: 'enhanced_encryption'
  }, {
    name: 'This is private project 6',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'private',
    visibilityIcon: 'security'
  }, {
    name: 'This is public project 7',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'public',
    visibilityIcon: 'public'
  }, {
    name: 'This is internal project 8',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'internal',
    visibilityIcon: 'enhanced_encryption'
  }, {
    name: 'This is private project 9',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'private',
    visibilityIcon: 'security'
  }, {
    name: 'This is public project 10',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'public',
    visibilityIcon: 'public'
  }, {
    name: 'This is internal project 11',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'internal',
    visibilityIcon: 'enhanced_encryption'
  }, {
    name: 'This is private project 12',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    visibility: 'private',
    visibilityIcon: 'security'
  }];

  milestones: any = [{
    name: 'This is a milestone 1',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeline: {
      from: 'Tue, Oct 01, \'19',
      to: 'Tue, Oct 22, \'19'
    }
  }, {
    name: 'This is another milestone 2',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeline: {
      from: 'Wed, Oct 02, \'19',
      to: 'Mon, Oct 21, \'19'
    }
  }, {
    name: 'This is yet just another milestone 3',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeline: {
      from: 'Thu, Oct 03, \'19',
      to: 'Sun, Oct 20, \'19'
    }
  }, {
    name: 'No more milestones 4',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeline: {
      from: 'Fri, Oct 04, \'19',
      to: 'Sat, Oct 19, \'19'
    }
  }, {
    name: 'Enough milestones 5',
    // tslint:disable-next-line: max-line-length
    description: 'This is just a description, nothing to read. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    timeline: {
      from: 'Sat, Oct 05, \'19',
      to: 'Fri, Oct 18, \'19'
    }
  }];

  headerText: any = 'Circuit';
  selectedProjectId: any = null;
  selectedMilestoneId: any = null;

  constructor() {}

}
