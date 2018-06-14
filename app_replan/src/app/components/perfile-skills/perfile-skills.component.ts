import { Component, OnInit } from '@angular/core';
import { replanAPIService } from '../../services/replanAPI.service';
import { GlobalDataService } from '../../services/globaldata.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from '../../app.constants';
import { CustomValidators } from 'ng2-validation';
import {DndModule} from 'ng2-dnd';
import { User } from '../../models/user';


declare var $: any;


@Component({
  selector: 'app-perfile-skills',
  templateUrl: './perfile-skills.component.html',
  styleUrls: ['./perfile-skills.component.css']
})
export class PerfileSkillsComponent implements OnInit {

  currentUser: User;
  formSkill: FormGroup;
  recomendation: any;
  idProject: any;
  project: any;
  resources: any;
  resourceToEdit: any;
  skills: any;
  skillsNotAssigned: any;
  skillsToAssign: any;
  skillsModified: any;

  constructor(private _replanAPIService: replanAPIService,
    private globaldata: GlobalDataService,
    private activatedRoute: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idProject = 129;
    this.recomendation = " ";
    this.globaldata.setCurrentProjectId(this.idProject);

    this.formSkill = new FormGroup({
      'name': new FormControl(''),
      'description': new FormControl(''),
    });


    
}



ngOnInit() {
  const self = this;
  $('#loading_for_project').show();
  $('#loading_for_resources').hide();
  $('#loading_for_skills').hide();
  $('.project-information-container').hide();
  this._replanAPIService.getProject(this.idProject)
  .subscribe( data => {
    if (data.toString() === 'e') {
      $('#error-modal').modal();
      $('#error-text').text('Error loading data. Try it again later.');
    }
    this.project = data;
  });
  this._replanAPIService.getResourcesProject(this.idProject)
  .subscribe( data => {
    if (data.toString() === 'e') {
      $('#error-modal').modal();
      $('#error-text').text('Error loading project resources data. Try it again later.');
    }
    this.resources = data;
    if (this.resources.length === 0) {
      $('.resources-span').text('No resources found');
    }
  });
  this._replanAPIService.getSkillsProject(this.idProject)
  .subscribe( data => {
    if (data.toString() === 'e') {
      $('#error-modal').modal();
      $('#error-text').text('Error loading skills data. Try it again later.');
    }
    this.skills = data;
    if (this.skills.length === 0) {
      $('.skills-span').text('No skills found');
    }
    $('#loading_for_project').hide();
    $('.project-information-container').show();
  });

  $('.nav-settings').siblings().removeClass('active');
  $('.nav-settings').addClass('active');
  $('#add-skill-modal').on('hidden.bs.modal', function (e) {
    self.clearAddSkillModal();
  });
  $('#add-resource-modal').on('hidden.bs.modal', function (e) {
    self.clearAddResourceModal();
  });
}


getClass(availability: string) {
  const num = parseFloat(availability);
  if (num >= AppConstants.LOW_RESOURCE_AVAILABILITY && num <= AppConstants.MEDIUM_RESOURCE_AVAILABILITY) {
    return 'card-danger';
  } else if (num > AppConstants.MEDIUM_RESOURCE_AVAILABILITY && num <= AppConstants.HIGH_RESOURCE_AVAILABILITY) {
    return 'card-warning';
  } else {
      return 'card-success';
  }
}

deleteSkill(id: number) {
  $('#loading_for_skills').show();
  $('#addSkillDiv').addClass('margin_to_loading');
  $('.skills-container').hide();
  $('#loading_for_resources').show();
  $('#addResourceDiv').addClass('margin_to_loading');
  $('.resources-container').hide();
  this._replanAPIService.deleteSkillFromProject(this.idProject, id)
    .subscribe( data => {
      if (data.toString() === 'e') {
        $('#error-modal').modal();
        $('#error-text').text('Error deleting the skill. Try it again later.');
      }
      this._replanAPIService.getSkillsProject(this.idProject)
      .subscribe( data2 => {
        if (data2.toString() === 'e') {
          $('#error-modal').modal();
          $('#error-text').text('Error loading skills data. Try it again later.');
        }
        $('#loading_for_skills').hide();
        $('#addSkillDiv').removeClass('margin_to_loading');
        $('.skills-container').show();
        this.skills = data2;
        if (this.skills.length === 0) {
          $('.skills-span').text('No skills found');
        }
      });
      this._replanAPIService.getResourcesProject(this.idProject)
      .subscribe( data3 => {
        if (data3.toString() === 'e') {
          $('#error-modal').modal();
          $('#error-text').text('Error loading resources data. Try it again later.');
        }
        this.resources = data3;
        if (this.resources.length === 0) {
          $('.resources-span').text('No resources found');
        }
        $('#loading_for_resources').hide();
        $('#addResourceDiv').removeClass('margin_to_loading');
        $('.resources-container').show();
      });
    });
}

addSkillModal() {
  $('#add-skill-modal').modal();
}

addNewSkill() {
  $('#add-skill-modal').modal('hide');
  $('.skills-span').text('');
  $('#loading_for_skills').show();
  $('#addSkillDiv').addClass('margin_to_loading');
  $('.skills-container').hide();
  this._replanAPIService.addSkillToProject(JSON.stringify(this.formSkill.value), this.idProject)
      .subscribe( data => {
        if (data.toString() === 'e') {
          $('#error-modal').modal();
          $('#error-text').text('Error creating the skill. Try it again later.');
        }
        this._replanAPIService.getSkillsProject(this.idProject)
        .subscribe( data2 => {
          if (data2.toString() === 'e') {
            $('#error-modal').modal();
            $('#error-text').text('Error loading skills data. Try it again later.');
          }
          $('#loading_for_skills').hide();
          $('#addSkillDiv').removeClass('margin_to_loading');
          $('.skills-container').show();
          this.skills = data2;
          if (this.skills.length === 0) {
            $('.skills-span').text('No skills found');
          }
        });
      });
}

addResourceModal() {
  this.recomendation = " ";
  const self = this;
  this.skillsModified = false;
  this.skillsNotAssigned = [];
  this.skillsToAssign = [];
  this.skills.forEach(skill => {
    self.skillsNotAssigned.push(skill);
  });
  $('#add-resource-modal').modal();
}


editResource() {
  var idResource = this.currentUser.resource;
  const self = this;
  this.skillsModified = false;
  this.skillsNotAssigned = [];
  this.skillsToAssign = [];
  this.resourceToEdit = this.resources.filter(f => f.id == idResource)[0];
  this.resourceToEdit.skills.forEach(skill => {
    this.skillsToAssign.push(skill);
  });
  this.skills.forEach(skill => {
    if (!self.skillsToAssign.some(x => x.id === skill.id )) {
      self.skillsNotAssigned.push(skill);
    }
  });
  $('#edit-resource-modal').modal();
  if (this.resourceToEdit !== undefined) {
  }
}

editResourceAPI() {
  $('#edit-resource-modal').modal('hide');
  $('#loading_for_resources').show();
  $('#addResourceDiv').addClass('margin_to_loading');
  $('.resources-container').hide();
  if (this.skillsModified) {
    this._replanAPIService.deleteSkillsFromResource(this.idProject, this.resourceToEdit.id, this.resourceToEdit.skills)
      .subscribe( data2 => {
        if (data2.toString() === 'e') {
          $('#error-modal').modal();
          $('#error-text').text('Error editing the resource. Try it again later.');
        }
        const objArray = [];
        this.skillsToAssign.forEach(skill => {
          const obj = {
            skill_id: skill.id
          };
          objArray.push(obj);
        });
        this._replanAPIService.addSkillsToResource(JSON.stringify(objArray), this.idProject, this.resourceToEdit.id)
        .subscribe( data3 => {
          if (data3.toString() === 'e') {
            $('#error-modal').modal();
            $('#error-text').text('Error editing the resource. Try it again later.');
          }
          this._replanAPIService.getResourcesProject(this.idProject)
          .subscribe( data4 => {
            if (data4.toString() === 'e') {
              $('#error-modal').modal();
              $('#error-text').text('Error loading resources data. Try it again later.');
            }
            this.resources = data4;
            if (this.resources.length === 0) {
              $('.resources-span').text('No resources found');
            }
            $('#loading_for_resources').hide();
            $('#addResourceDiv').removeClass('margin_to_loading');
            $('.resources-container').show();
          });
        });
      });

  } else {
    this._replanAPIService.getResourcesProject(this.idProject)
    .subscribe( data2 => {
      if (data2.toString() === 'e') {
        $('#error-modal').modal();
        $('#error-text').text('Error loading resources data. Try it again later.');
      }
      this.resources = data2;
      if (this.resources.length === 0) {
        $('.resources-span').text('No resources found');
      }
      $('#loading_for_resources').hide();
      $('#addResourceDiv').removeClass('margin_to_loading');
      $('.resources-container').show();
    });
  }
}

transferSkill($event: any) {
  this.skillsModified = true;
  this.skillsNotAssigned = this.skillsNotAssigned.filter(obj => obj !== $event.dragData);
  this.skillsToAssign.push($event.dragData);
}

removeSkill($event: any) {
  this.skillsModified = true;
  this.skillsToAssign = this.skillsToAssign.filter(obj => obj !== $event.dragData);
  this.skillsNotAssigned.push($event.dragData);
}

allowDropFunction(skills: any) {
  return (dragData: any) => !skills.some(skill => skill === dragData);
}

deleteSkillResource(skillid: number) {

  this._replanAPIService.deleteSkillsFromResource(this.idProject,  Number(this.currentUser.resource), skillid)
  .subscribe( data2 => {
    if (data2.toString() === 'e') {
      $('#error-modal').modal();
      $('#error-text').text('Error editing the resource. Try it again later.');
    }
    this._replanAPIService.getResourcesProject(this.idProject)
    .subscribe( data => {
      if (data.toString() === 'e') {
        $('#error-modal').modal();
        $('#error-text').text('Error loading project resources data. Try it again later.');
      }
      this.resources = data;
      if (this.resources.length === 0) {
        $('.resources-span').text('No resources found');
      }
    })
  });


}

deleteResource(id: number) {
  $('#loading_for_resources').show();
  $('#addResourceDiv').addClass('margin_to_loading');
  $('.resources-container').hide();
  this._replanAPIService.deleteResourceFromProject(this.idProject, id)
    .subscribe( data => {
      if (data.toString() === 'e') {
        $('#error-modal').modal();
        $('#error-text').text('Error deleting the resource. Try it again later.');
      }
      this._replanAPIService.getResourcesProject(this.idProject)
        .subscribe( data2 => {
          if (data2.toString() === 'e') {
            $('#error-modal').modal();
            $('#error-text').text('Error loading resources data. Try it again later.');
          }
          $('#loading_for_resources').hide();
          $('#addResourceDiv').removeClass('margin_to_loading');
          $('.resources-container').show();
          this.resources = data2;
          if (this.resources.length === 0) {
            $('.resources-span').text('No resources found');
          }
        });
    });
}

clearAddSkillModal() {
  $('#nameSkill').val('');
  $('#descriptionSkill').val('');
}

clearAddResourceModal() {
  $('#nameResource').val('');
  $('#availabilityResource').val('');
  $('#descriptionResource').val('');
}


similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
}
//edit distance algorithm
editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
onSearchChange(searchValue : string ) {
  this.recomendation = " ";
  var max = 0;
  var value_max = "0";
  this.skills.forEach(skill => {
    var s = this.similarity(searchValue, skill.name);
    if (s > max) {
      max = s;
      value_max = skill.name;
    }
  });
  if (max > 0.7) this.recomendation = "Do you mean: " + value_max + "? It already exists";
  }  
  

}