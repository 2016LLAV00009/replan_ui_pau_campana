import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { replanAPIUserService } from '../../services/replanAPIUser.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


declare var $: any;


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  currentUser: User;
  showError = false;
  carouselProjectFound = false;
  errorMessage = "";
  token: string;
  formProject: FormGroup;
  projects:  any[] = [];
  projectsFound:  any[] = [];
  subprojects: any[] = [];
  showedprojects: any[] = [];
  showedprojectsFound: any[] = [];
  number_projects;
  filter: string;
  canSearch: boolean;
  page: number;
  pageFound: number;
  constructor(private _replanAPIUserService: replanAPIUserService,
    private router: Router) { 

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.formProject = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'is_private': new FormControl(false),
      'effort_unit': new FormControl('', Validators.required),
      'hours_per_effort_unit': new FormControl('', Validators.required),
      'hours_per_week_and_full_time_resource': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.canSearch = true;
    const self = this;
    this.filter = "all";
    this.page = 0;
    $('#loading_for_projects_search').hide();
    $('#loading_for_projects_table').hide();
    $('#loading_for_projects').show();
    $('#addProjectDiv').addClass('margin_to_loading');
    this._replanAPIUserService.getUserProjects()
    .subscribe( data => {
      console.log(data)
      $('#loading_for_projects').hide();
      this.projects = data;
      this.subprojects = data;
      this.changePage(0);
      this.number_projects = this.projects.length;

    },  error => {
      console.log(error)
      $('#error-modal').modal();
      $('#error-text').text('Error loading projects data. Try it again later.');
      $('#loading_for_projects').hide();
    })
  }


  goToProject(id) {
    console.log("dins: " + id); 
  }

  createProject() {
    $('#add-project-modal').modal();
  }

  
  addNewProject() {
    $('#add-project-modal').modal('hide');
    $('.projects-span').text('');
    $('#loading_for_projects_table').show();
    $('#carouselProject').hide();
    this._replanAPIUserService.addProject(JSON.stringify(this.formProject.value))
    .subscribe( data => {
      this.clearModal();
      this._replanAPIUserService.getUserProjects()


      .subscribe( data2 => {
        $('#loading_for_projects_table').hide();
        this.projects = data2;
        this.updateList(this.filter);
        this.number_projects = this.projects.length;
        $('#carouselProject').show();
  
      },  error => {
        this.clearModal();
        console.log(error)
        $('#error-modal').modal();
        $('#error-text').text('Error loading projects data. Try it again later.');
        $('#loading_for_projects_table').hide();
      })


    },  error => {
      console.log(error)
      $('#error-modal').modal();
      $('#error-text').text('Error creating the project. Try it again later.');
      $('#loading_for_projects_table').hide();
    })
  }

  updateList(filter_type) {
    this.filter = filter_type;
    if (filter_type == "owner") {
      document.getElementById("button_owner").classList.remove('button_border');
      document.getElementById("button_owner").classList.add('button_border_pressed');
      document.getElementById("button_member").classList.remove('button_border_pressed');
      document.getElementById("button_member").classList.add('button_border');
      document.getElementById("button_all").classList.remove('button_border_pressed');
      document.getElementById("button_all").classList.add('button_border');
    }
    else if (filter_type == "member") {
      document.getElementById("button_member").classList.remove('button_border');
      document.getElementById("button_member").classList.add('button_border_pressed');
      document.getElementById("button_owner").classList.remove('button_border_pressed');
      document.getElementById("button_owner").classList.add('button_border');
      document.getElementById("button_all").classList.remove('button_border_pressed');
      document.getElementById("button_all").classList.add('button_border');
    }
    else if (filter_type == "all"){
      document.getElementById("button_all").classList.remove('button_border');
      document.getElementById("button_all").classList.add('button_border_pressed');
      document.getElementById("button_owner").classList.remove('button_border_pressed');
      document.getElementById("button_owner").classList.add('button_border');
      document.getElementById("button_member").classList.remove('button_border_pressed');
      document.getElementById("button_member").classList.add('button_border');
    }
    var i;
    var new_array = [];
    if (filter_type == "all") this.subprojects = this.projects;
    else {
      var is_owner = (filter_type == "owner");
      for (i = 0; i < this.projects.length; i++) {
        if (this.projects[i].owner == is_owner) new_array.push(this.projects[i]);
      };
      this.subprojects = new_array;
    }
    this.changePage(0);
  }

  clearModal() {
    $('#nameProject').val('');
    $('#effort_unit').val('');
    $('#hours_per_effort_unit').val('');
    $('#hours_per_week_and_full_time_resource').val('');
    $('#descriptionProject').val('');
    $('#is_private').val(false);
  }

  search() {
    this.canSearch = false;
    this.showError = false;
    $('#carouselProjectFound').hide();
    $('#loading_for_projects_search').hide();
    var inputValue = (<HTMLInputElement>document.getElementById("search")).value;
    this._replanAPIUserService.searchProjects(inputValue)
    .subscribe( data => {
      this.carouselProjectFound = true;
      console.log("correcte")
      console.log(data)
      this.projectsFound = data;
      this.changePageFound(0);
      $('#loading_for_projects_search').hide();
      this.canSearch = true;


    },  error => {
      this.carouselProjectFound = false;
      console.log("error")
      console.log(error)
      this.showError = true;
      this.errorMessage = error.message;
      $('#loading_for_projects_search').hide();
      this.canSearch = true;
    })
  }

  changePage(num) {
    if (num <= 0) {
      this.page = 0;
      this.showedprojects = this.subprojects.slice(this.page *5, (this.page *5)+5); 
    }
    else if ((num*5) < this.subprojects.length){
      this.page = num;
      this.showedprojects = this.subprojects.slice(this.page *5, (this.page *5)+5); 
    }
   // while(this.showedprojects.length < 5) this.showedprojects.push([]);
  }

  changePageFound(num) {
    if (num <= 0) {
      this.pageFound = 0;
      this.showedprojectsFound = this.projectsFound.slice(this.pageFound *3, (this.pageFound *3)+3); 
    }
    else if ((num*3) < this.projectsFound.length){
      this.pageFound = num;
      this.showedprojectsFound = this.projectsFound.slice(this.pageFound *3, (this.pageFound *3) + 3); 
    }
   // while(this.showedprojects.length < 5) this.showedprojects.push([]);
  }

}
