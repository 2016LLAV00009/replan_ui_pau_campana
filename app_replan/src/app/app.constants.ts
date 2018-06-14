export class AppConstants {

  public static urlAPI = 'http://replan-api.herokuapp.com/replan/projects/';
  public static urlAPIUser = 'http://localhost:3001/api';

  public static loginURL = '/auth/login';
  public static registerURL = '/auth/signup';
  public static confirmationURL = '/auth/confirmation';  
  public static validateAgainURL = '/auth/confirmation_again';  


  public static generate_passwordURL = '/user/generate_password';  
  public static modify_passwordURL = '/user/modify_password';  
  public static update_accountURL = '/user/update_account';   
  public static getAllUsersURL = '/users'; 

  public static createProjectURL = '/project/create'; 
  public static getProjectByUserURL = '/project/by_user';   
  public static searchProjectURL = '/project/search';
  public static addMemberURL = '/project/member/add'; 
  public static removeMemberURL = '/project/member/remove';
  public static answerProposalURL = '/project/answer_proposal'; 
  public static getAllProjectsURL = '/projects'; 

  public static getUserNotificationsURL = '/notification/user'; 

 

  
  

  public static LOW_FEATURE_EFFORT = 5;
  public static HIGH_FEATURE_EFFORT = 30;

  public static LOW_RESOURCE_AVAILABILITY = 0;
  public static MEDIUM_RESOURCE_AVAILABILITY = 25;
  public static HIGH_RESOURCE_AVAILABILITY = 50;

}
