import { NavigationActions } from 'react-navigation';

import { Stack } from '../../Router/Stack/navigationConfiguration';

export function stack(state, action) {
  switch (action.type) {

    //-----------Registration module---------
    case 'onRegistration_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'OtpVerification',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    // 
    case 'Verify_Validuser': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'OtpVerification',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // case 'onOtpVerify_SUCCESS': {
    //   const navigationAction = NavigationActions.navigate({
    //     routeName: 'Drawer',
    //   });
    //   return Stack.router.getStateForAction(navigationAction, state);
    // }


    // Login non-Payment status navigation
    case 'nonPayedUser': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'NeetPayment',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    case 'onOtpVerify_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'NeetPayment',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    case 'Invaliduser_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Login',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    //
    case 'onLoginAction_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Drawer',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    //
    case 'onForgotPassword_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Login',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    //-----------Change Password module---------

    case 'onChangePassword_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Dashboard',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // -------starting subject wise test-----------------
    case 'subjectWiseTest_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SubjectTest_Questions',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    // 
    case 'onQuickReportSubject_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SubjectTest_Scorecard',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }


    // -------starting chapter wise test-----------------
    case 'startChapterWiseTest_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'ChapterTest_Questions',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------Special test module------------------
    case 'StartSpecialTest_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SpecialTest_Questions',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // ---------starting neet module test------------------
    case 'onStartNeetModelTest_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'NEETModelTest_Questions',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    case 'onQuickReportModelTest_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'NEETModelTest_Scorecard',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }


    // --------------Cancel test module------------------

    case 'AllCancelTest_Action_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Dashboard',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------Skipped Test_Module------------------

    case 'AllSkipList_Action_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SkippedTest_Module',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------Skipped Test_Module------------------
    case 'onTestReports_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'ChapterTest_Scorecard',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------ChapterTest_SummaryReports Test_Module------------------
    case 'ChapterTest_SummaryReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'ChapterTest_SummaryReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // -----starting assessment test module-------------
    case 'onAssessmentTest_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'AssessmentTest_Questions',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    //Quick report
    case 'onQuickReportAssesment_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'AssessmentTest_Scorecard',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------AssessmentTest_SummaryReports Test_Module------------------
    case 'AssessmentTest_SummaryReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'AssessmentTest_SummaryReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }


    // --------------NEETModelTest_SummaryReports Test_Module------------------
    case 'NEETModelTest_SummaryReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'NEETModelTest_SummaryReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // ----special test module------
    case 'onQuickReportSpecialTest_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SpecialTest_Scorecard',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------SpecialTest_SummaryReports Test_Module------------------
    case 'SpecialTest_SummaryReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SpecialTest_SummaryReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------SubjectTest_SummaryReports Test_Module------------------
    case 'SubjectTest_SummaryReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SubjectTest_SummaryReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------ChapterTest_SummaryDetailReports_Action Test_Module------------------
    case 'ChapterTest_SummaryDetailReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'ChapterTest_DetailReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------AssessmentTest_SummaryReports Test_Module------------------
    case 'AssessmentTest_SummaryDetailReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'AssessmentTest_DetailReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------NEETModelTest_SummaryDetailReports_Action Test_Module------------------
    case 'NEETModelTest_SummaryDetailReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'NEETModelTest_DetailReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------SpecialTest_SummaryDetailReports_Action Test_Module------------------
    case 'SpecialTest_SummaryDetailReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SpecialTest_DetailReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------SubjectTest_SummaryDetailReports_Action Test_Module------------------
    case 'SubjectTest_SummaryDetailReports_Action': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SubjectTest_DetailReports',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }


    // --------------onRankingPosition_SUCCESS Test_Module------------------
    case 'onRankingPosition_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SpecialTest_Ranking',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    // --------------Report_ReviseSearchAction_SUCCESS Test_Module------------------
    case 'Report_ReviseSearchAction_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Revise_Results',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    // --------------Profile update sucess------------------
    case 'studentUpdateProfile_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'MyProfile',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    // --------------incomplete test navigation------------------
    case 'AttendIncompleteTest': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'SkippedTest_Module',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    // --------------Notification navigation------------------
    case 'notificationDetail_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Notification',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }
    // --------------Profile navigation------------------
    case 'profileDetail_SUCCESS': {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Profile',
      });
      return Stack.router.getStateForAction(navigationAction, state);
    }

    default: return Stack.router.getStateForAction(action, state);
  }
}

