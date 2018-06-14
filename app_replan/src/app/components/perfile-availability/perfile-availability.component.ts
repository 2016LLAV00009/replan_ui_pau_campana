import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../services/globaldata.service';
import { Router } from '@angular/router';
import { replanAPIService} from '../../services/replanAPI.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-perfile-availability',
  templateUrl: './perfile-availability.component.html',
  styleUrls: ['./perfile-availability.component.css']
})
export class PerfileAvailabilityComponent implements OnInit {
  model: any = {};
  loading = false;
  errorMessage : string;
  showError : boolean;
  showCorrect: boolean;
  availability: any;
  idProject: any;
  currentUser: User;
  carregant: boolean;
  resources: any;

  constructor(
    private router: Router,
    private _replanAPIService: replanAPIService
    
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idProject = 129;
    this.carregant = true;
  }

  ngOnInit() {
    this.showError = false;
    this.showCorrect = false;
  
    this._replanAPIService.getResourcesProject(this.idProject).subscribe( data => {
      this.carregant = false;
    if (data.toString() === 'e') {
      this.showError = true;
      this.errorMessage = "ERROR: Can not get the actual availability";
    }
    this.resources = data;
    var trobat = false;
    var i = 0;
    while (!trobat && i < this.resources.length) {
      if (this.resources[i].id == Number(this.currentUser.resource)) {
        this.model.availability = this.resources[i].availability;
        trobat = true;
      }
      i = i+1;
    }
    if (!trobat) {
      this.showError = true;
      this.errorMessage = "ERROR: Can not get the actual availability";
    }
  });
  }

  updateInformation() {
    this.showError = false;
    this.showCorrect = false;
    if (this.model.availability > 100 || this.model.availability < 0) {
      console.log("error");
      this.showError = true;
      this.errorMessage = "ERROR: The number has to be in the range of 0 to 100";
    }
    else {
      this.showError = false;
      this.showCorrect = false;
      this.loading = true;
      var jsonDataObj = {
        'availability': Number(this.model.availability)
      };
      this._replanAPIService.editResource(JSON.stringify(jsonDataObj), this.idProject, Number(this.currentUser.resource))
      .subscribe( data => {
        this.loading = false;
        if (data.toString() === 'e') {
          this.showError = true;
          this.errorMessage = "ERROR: Can not update the availability";
        }
        else {
          this.errorMessage = "Availability updated succesfully";
          this.showCorrect = true;
        }
        });
    }  
  }



}
