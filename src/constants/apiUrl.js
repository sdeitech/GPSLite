let API_URL = {
  /** api's for authentication including pin */
  LOGIN: '/api/Admin/AuthenticateEmployee_Mobile',
  CHANGE_PASSWORD: '/api/Admin/ChangePassword',
  CREATE_PIN: '/api/Admin/CreatePin_Mobile',
  VERIFY_PIN: '/api/Admin/VerifyPin_mobile',
  CHANGE_PIN: '/api/Admin/ChangePin',
  FORGOT_PIN: '/api/Admin/SendResetPinEmail_mobile',
  FORGOT_PASSWORD: '/api/Admin/SendResetPasswordLink',
  RESET_PASSWORD: '/api/Admin/ResetUserPassword',
  GET_PROFILE_DATA: '/api/Employees/GetEmployeeByUserId_mobile',
  /** api's for jobs  */
  GET_JOBS: '/api/Job/GetjobList_Mobile',
  GET_JOB_INFO: '/api/Job/GetJobById',
  SAVE_FCM_TOKEN: '/api/Admin/SaveFCNToken_mobile',
  START_JOB: '/api/Job/StartJob_mobile',
  DECLINE_JOB: '/api/Job/DeclineJob_mobile',
  DEVICE_DETAILS: '/api/Device/AddDeviceDetail__mobile',
  //api's for Filters
  GET_GROUPS_LIST: '/api/Groups/GetGroupList_Mobile',
  GET_LOCATIONS_LIST: '/api/Region/GetAllStateByCountryId',
  // api's for workflow
  GET_WORKFLOW_DATA: '/api/Activity/GetWorkFlowDetailsList_Mobile',
  RISK_IN_JOB: '/api/Job/Mobile_GetJobRiskProfileDetails',
  SAVE_WORKFLOW_DATA:
    '/api/WorkFlowFilledMobile/SaveWorkFlowDetailsList_Mobile',
  SAVE_CUSTOMER_SATISFACTION:
    '/api/WorkFlowFilledMobile/SaveCustomerSatisfaction_Mobile',
  SAVE_CUSTOMER_FEEDBACK:
    '/api/WorkFlowFilledMobile/SaveCustomerFeedBack_Mobile',
  CHECKIN_OUT: '/api/CheckInandOut/AddUpdateCheckInandOut_Mobile',
  //Alerts
  RAISE_ALERT: '/api/FallALert/SendAlert_Mobile',
  MOBILE_ACTION_FOR_GPS: '/api/MobileAction',
  COMPLETE_JOB: '/api/Job/Mobile_JobCompleted',
  CANCEL_ALERT: '/api/WelfareSafteyAndAlertLogs/CancleAlert_Mobile',
  WELFARE_ALERT:
    '/api/WelfareSafteyAndAlertLogs/AddUpdateWelfareSaftyLogs_Mobile',
  WELFARE_ALERT_CANCEL:
    '/api/WelfareSafteyAndAlertLogs/CancelWelfareAlert_Mobile',
  GET_JOB_ATTACHMENT: '/api/JobAttachment/GetjobAttachmentList',
  GET_WORKFLOW_ATTACHMENTS: '/api/WorflowAttachment/GetWorkflowAttachmentList',
  SEND_MESSAGE: '/api/Chat/send-message',
  GET_MESSAGES: 'api/Chat/get-messages',
  LOGOUT_STATUS: '/api/Admin/LogoutResetStatus',
  REPORT_JOB: '/api/Job/Mobile_AddReportJob',
  GET_CHECKIN_OUT: '/api/CheckInandOut/GetCheckInandOut',
  GET_SOS_ALERT: '/api/SosAlert/GetSosAlert',
  GET_FALL_ALERT: '/api/FallALert/GetFallAlertById/1',
  GET_WELFARE_TIMER_DATA: '/api/WelfareTimer/GetWelfareTimer',
  GET_OVERSPEED_DATA: '/api/OverSpeed/GetOverSpeedData',
  GET_GEOFENCING_DATA: '/api/AdminGeoFencing/GetGeofencing',
  GET_EMERGENCY_BROADCAST_DATA: '/api/EmergencyBroadcast/GetEmergencyBroadcast',
  GET_DEVICE_STATUS: '/api/DeviceStatus/GetDeviceStatus',
  GEOFENCE_STATUS: '/api/GeoFencing/AddGeoFencingStatus_Mobile',
  GET_SUBJOBS_DATA: '/api/SubJobs/GetSubJobById',
  START_SUBJOB: '/api/SubJobs/StartSubJob_Mobile',
  DECLINE_SUBJOB: '/api/SubJobs/DeclineSubJob_Mobile',
  COMPLETE_SUBJOB: '/api/SubJobs/DeclineSubJob_Mobile',
  GET_JOB_HOURS: '/api/Account/GetPlannerDetailById',
};
module.exports = API_URL;
