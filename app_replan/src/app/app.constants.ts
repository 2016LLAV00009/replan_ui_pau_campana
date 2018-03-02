export class AppConstants {

  public static urlAPI = 'http://replan-api.herokuapp.com/replan/projects/';
  public static urlAPIUser = 'http://localhost:3001/api';

  public static loginURL = '/login';
  public static registerURL = '/signup';
  public static confirmationURL = '/confirmation';  
  public static validateAgainURL = '/valdiate_again';  
  public static generate_passwordURL = '/generate_password';  
  public static modify_passwordURL = '/modify_password';  

  public static LOW_FEATURE_EFFORT = 5;
  public static HIGH_FEATURE_EFFORT = 30;

  public static LOW_RESOURCE_AVAILABILITY = 0;
  public static MEDIUM_RESOURCE_AVAILABILITY = 25;
  public static HIGH_RESOURCE_AVAILABILITY = 50;

}
