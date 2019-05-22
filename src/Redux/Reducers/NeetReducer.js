const initialState = {
  isFetchingLogin: false,
  error: false,
  testDetail: '',
  isFetchingSave: false,
  isFetchingSaveSpcl: false,
  isFetchingSkip: false,
  isFetchingStartSpcl: false,
  isFetchingStartModel: false,
  // incompleteDetail: '',
  lastTestInfo: '',
  notificationDetail: [],
  studentInfo: '',
  fatherInfo: '',
  motherInfo: '',
  pendingTestID: " ",
  typeOfTest: '',
  //-----------Pincode Details---------//
  PincodeFetchDetails: '',
  districtheadId: '',

  // --chapter wise test dropdown list
  chapterList: [],

  // chapter Report
  chapterReportDetail: [],

  // --Subject Wise test module
  subjectList: [],
  subjectFullDetails: '',
  subjectTestQuestions: [],
  _subjectIdSave: '',

  //---Assesment Wise Test Module ----///
  assesmentList: [],
  AssesmentFullDetails: '',
  assessmentTestQuestions: [],
  _saveAssesSubjectId: '',
  _saveAssesmentId: '',

  // --Special test list dropdown
  specialTestList: [],
  specialTestList: [],

  // --Neet Model test
  neetModelTestQuestions: [],
  questionStatus: '',
  nextQuestionId: '',
  previousQuestionId: '',
  _saveTestDetailId: '',

  // ------------------question and answer images for zoom view--
  QuestionZoomImage: '',
  answerImageZoom: '',
  //Special test--
  SpecialTestFullDetails: '',
  specialTestQuestions: [],
  _saveSpecialTestId: '',
  specialTestAnswerImage: '',
  specialTestQuestionImage: '',

  //---Special test Ranking-----///
  rankingPosition: [],

  //----Quick Reports Details-------///
  testQuickReport: "",
  quickReportSubject: "",
  quickReportAssesment: "",
  quickReportModelTest: "",
  quickReportSpecialTest: "",
  chapterFullDetails: '',
  ChapterQuestions: [],
  Skiplist: [],

  SubjectId: "",
  ChapterId: "",
  Skiplist_QuestionNumber: 0,
  questioId: '',
  Skiplist_data: "",

  SummaryreportDetail: [],
  ViewSummaryreportDetail: [],
  SummaryreportDetail_SummaryId: "",


  AssessmentTest_ReportDetails: [],
  SubjectReportDetail: [],
  NEET_ReportDetail: [],
  Special_ReportDetail: [],
  Revise_ReportDetail: [],
  SpecialTest_TestDetailId: 0,


  ChapterTimeTaken_Seconds: 1000,
  AssesmentTimeTaken_Seconds: 1000,
  SubjectTimeTaken_Seconds: 1000,
  SpecialTimeTaken_Seconds: 10800000,
  NeetTimeTaken_Seconds: 10800000,
  nextQuestionIdSpcl: "",
  previousQuestionIdSpcl: "",
  questionStatusSpcl: "",

  Chapter_TimeTakenStatus: true,
  Assessment_TimeTakenStatus: true,
  Subject_TimeTakenStatus: true,
  Special_TimeTakenStatus: true,
  NEETModel_TimeTakenStatus: true,

  StudentMobileNumber: '',
  HscYearDropdown: [],
  Examvalidation: true,
  SpecialTestStatus: true,

  Notification_DetailArray: [],
  Background_Variable_Chapter: "",
  paymentLink: '',
  Skiplist_SkipListQuestionId:0,
  Skip_Valid:""
};

export default function NeetReducer(state = initialState, action) {
  switch (action.type) {

    // ----------------------------------- Student Registration and Login ----------------------------------------//

    case "onRegistration":
      return {
        ...state,
        isFetching: true
      };
    case "onRegistration_SUCCESS":
      return {
        ...state,
        isFetching: false,
        studentregistration_Deatils: action.studentregistration_Deatils,
        StudentMobileNumber: action.StudentMobileNumber
      };
    case "onRegistration_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //------------------------------ Login ----------------------------------

    case "onLoginAction":
      return {
        ...state,
        isFetchingLogin: true
      };
    case "onLoginAction_SUCCESS":
      return {
        ...state,
        isFetchingLogin: false,

      };
    case "onLoginAction_FAILURE":
      return {
        ...state,
        isFetchingLogin: false,
        StudentMobileNumber: action.StudentMobileNumber
      };

    // ----------------------------------- Student Registration Pincode Fetch Details----------------------------------------//
    case "onPincodeDetails":
      return {
        ...state,
        isFetching: true
      };
    case "onPincodeDetails_SUCCESS":
      return {
        ...state,
        PincodeFetchDetails: action.PincodeFetchDetails,
        districtheadId: action.districtheadId
      };
    case "onPincodeDetails_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // ---------------------------------------------Dashboard Student Test Details--------------------------------------- 
    case "testDetailDashboard":
      return {
        ...state,
        isFetching: true
      };
    case "testDetailDashboard_SUCCESS":
      return {
        ...state,
        testDetail: action.testDetail,
        Examvalidation: action.Examvalidation,
        lastTestInfo: action.lastTestInfo
      };
    case "testDetailDashboard_FAILURE":
      return {
        ...state,
        isFetching: false
      };
    case "AttendIncompleteTest":
      return {
        ...state,
        isFetching: false,
        pendingTestID: action.pendingTestID
      };

    // ---------------------------------------------Notification Details--------------------------------------- 
    case "notificationDetail":
      return {
        ...state,
        isFetching: true
      };
    case "notificationDetail_SUCCESS":
      return {
        ...state,
        notificationDetail: action.notificationDetail,
        // Notification_DetailArray:action.Notification_DetailArray

      };
    case "notificationDetail_FAILURE":
      return {
        ...state,
        isFetching: false,
        notificationDetail: action.notificationDetail
      };

    // ---------------------------------------------Profile Details--------------------------------------- 
    case "profileDetail":
      return {
        ...state,
        isFetching: true
      };
    case "profileDetail_SUCCESS":
      return {
        ...state,
        studentInfo: action.studentInfo,
        fatherInfo: action.fatherInfo,
        motherInfo: action.motherInfo
      };
    case "profileDetail_FAILURE":
      return {
        ...state,
        isFetching: false
      };


    // ---------------------------------------------chapter wise test modules--------------------------------------- 
    case "chaptersLists":
      return {
        ...state,
        isFetching: true
      };
    case "chaptersLists_SUCCESS":
      return {
        ...state,
        chapterList: action.chapterList,
      };
    case "chaptersLists_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // ---------------------------------------------Subject wise test modules--------------------------------------- 
    case "subjectDropdown":
      return {
        ...state,
        isFetching: true
      };
    case "subjectDropdown_SUCCESS":
      return {
        ...state,
        subjectList: action.subjectList,
      };
    case "subjectDropdown_FAILURE":
      return {
        ...state,
        isFetching: false
      };
    // 
    case "subjectWiseTest":
      return {
        ...state,
        isFetching: true
      };
    case "subjectWiseTest_SUCCESS":
      return {
        ...state,
        subjectFullDetails: action.subjectFullDetails,
        subjectTestQuestions: action.subjectTestQuestions,
        _subjectIdSave: action._subjectIdSave,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds
      };
    case "subjectWiseTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // 
    case "subjectWiseSaved":
      return {
        ...state,
        isFetching: true
      };
    case "subjectWiseSaved_SUCCESS":
      return {
        ...state,
        subjectTestQuestions: action.subjectTestQuestions,
        _subjectIdSave: action._subjectIdSave,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds,
        Subject_TimeTakenStatus: action.Subject_TimeTakenStatus,
        subjectFullDetails: action.subjectFullDetails
      };
    case "subjectWiseSaved_FAILURE":
      return {
        ...state,
        isFetching: false
      };


    // ---------------------------------------------Assesment wise test modules--------------------------------------- 
    case "assesmentLists":
      return {
        ...state,
        isFetching: true
      };
    case "assesmentLists_SUCCESS":
      return {
        ...state,
        assesmentList: action.assesmentList,
      };
    case "assesmentLists_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //
    case "onAssessmentTest":
      return {
        ...state,
        isFetching: true
      };
    case "onAssessmentTest_SUCCESS":
      return {
        ...state,
        AssesmentFullDetails: action.AssesmentFullDetails,
        assessmentTestQuestions: action.assessmentTestQuestions,
        _saveAssesSubjectId: action._saveAssesSubjectId,
        _saveAssesmentId: action._saveAssesmentId,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds
      };
    case "onAssessmentTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };
    //
    case "onAssessmentSaveTest":
      return {
        ...state,
        isFetching: true
      };
    case "onAssessmentSaveTest_SUCCESS":
      return {
        ...state,
        _saveAssesSubjectId: action._saveAssesSubjectId,
        _saveAssesmentId: action._saveAssesmentId,
        assessmentTestQuestions: action.assessmentTestQuestions,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds,
        Assessment_TimeTakenStatus: action.Assessment_TimeTakenStatus,
        AssesmentFullDetails: action.AssesmentFullDetails,
        isFetching: true
      };
    case "onAssessmentSaveTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // -------------------------------Special test module----------------------------------------------------------

    case "specialTestLists":
      return {
        ...state,
        isFetching: true
      };
    case "specialTestLists_SUCCESS":
      return {
        ...state,
        specialTestList: action.specialTestList,
      };
    case "specialTestLists_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // 
    case "StartSpecialTest":
      return {
        ...state,
        isFetchingStartSpcl: true
      };
    case "StartSpecialTest_SUCCESS":
      return {
        ...state,
        SpecialTestFullDetails: action.SpecialTestFullDetails,
        specialTestQuestions: action.specialTestQuestions,
        _saveSpecialTestId: action._saveSpecialTestId,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        nextQuestionIdSpcl: action.nextQuestionIdSpcl,
        previousQuestionIdSpcl: action.previousQuestionIdSpcl,
        questionStatusSpcl: action.questionStatusSpcl,
        isFetchingStartSpcl: action.isFetchingStartSpcl,
      };
    case "StartSpecialTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // after save next question
    case "saveSpecialTest":
      return {
        ...state,
        isFetchingSaveSpcl: true
      };
    case "saveSpecialTest_SUCCESS":
      return {
        ...state,
        specialTestQuestions: action.specialTestQuestions,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        Special_TimeTakenStatus: action.Special_TimeTakenStatus,
        _saveSpecialTestId: action._saveSpecialTestId,
        SpecialTestFullDetails: action.SpecialTestFullDetails,
        nextQuestionIdSpcl: action.nextQuestionIdSpcl,
        previousQuestionIdSpcl: action.previousQuestionIdSpcl,
        questionStatusSpcl: action.questionStatusSpcl,
        isFetchingSaveSpcl: false
      };
    case "saveSpecialTest_FAILURE":
      return {
        ...state,
        isFetchingSaveSpcl: false
      };

    // -------------------------------Neet Model test module----------------------------------------------------------

    case "onStartNeetModelTest":
      return {
        ...state,
        isFetchingStartModel: true,
        _saveTestDetailId: ''
      };
    case "onStartNeetModelTest_SUCCESS":
      return {
        ...state,
        neetModelTestQuestions: action.neetModelTestQuestions,
        _saveTestDetailId: action._saveTestDetailId,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,
        questionStatus: action.questionStatus,
        nextQuestionId: action.nextQuestionId,
        previousQuestionId: action.previousQuestionId,
        isFetchingStartModel: false
      };
    case "onStartNeetModelTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };
    // save
    case "onSaveNeetModelTest":
      return {
        ...state,
        isFetchingSave: true
      };
    case "onSaveNeetModelTest_SUCCESS":
      return {
        ...state,
        isFetchingSave: false,
        neetModelTestQuestions: action.neetModelTestQuestions,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,
        NEETModel_TimeTakenStatus: action.NEETModel_TimeTakenStatus,
        questionStatus: action.questionStatus,
        nextQuestionId: action.nextQuestionId,
        previousQuestionId: action.previousQuestionId,
      };
    case "onSaveNeetModelTest_FAILURE":
      return {
        ...state,
        isFetchingSave: false,
      };

    // ----------------------------Question and images module-----------------------------------------

    case "questionImage":
      return {
        ...state,
        isFetching: true
      };
    case "questionImage_SUCCESS":
      return {
        ...state,
        QuestionZoomImage: action.questionImage,
      };
    case "questionImage_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // 
    case "answerImage":
      return {
        ...state,
        isFetching: true
      };
    case "answerImage_SUCCESS":
      return {
        ...state,
        answerImageZoom: action.answerImageZoom,
      };
    case "answerImage_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // special test

    case "answerImageSpecialTest":
      return {
        ...state,
        isFetching: true
      };
    case "answerImageSpecialTest_SUCCESS":
      return {
        ...state,
        specialTestAnswerImage: action.specialTestZoomImage,
      };
    case "answerImageSpecialTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // 
    case "imageQuesSpecialTest":
      return {
        ...state,
        isFetching: true
      };
    case "imageQuesSpecialTest_SUCCESS":
      return {
        ...state,
        specialTestQuestionImage: action.questionImageSpecialTest,
      };
    case "imageQuesSpecialTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //-----------------------Chapter Quick Report------------------- //     
    case "onTestReports":
      return {
        ...state,
        isFetching: true
      };
    case "onTestReports_SUCCESS":
      return {
        ...state,
        testQuickReport: action.testQuickReport,
      };
    case "onTestReports_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    // chaper Report

    case "onReportForChapter":
      return {
        ...state,
        isFetching: true
      };
    case "onReportForChapter_SUCCESS":
      return {
        ...state,
        chapterReportDetail: action.chapterReportDetail,
        lastTestInfo: action.lastTestInfo,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,

      };
    case "onReportForChapter_FAILURE":
      return {
        ...state,
        isFetching: false,
        chapterReportDetail: action.chapterReportDetail
      };

    //-----------------------Subject Quick Report------------------- //     
    case "onQuickReportSubject":
      return {
        ...state,
        isFetching: true
      };
    case "onQuickReportSubject_SUCCESS":
      return {
        ...state,
        quickReportSubject: action.quickReportSubject,
        lastTestInfo: action.lastTestInfo,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,

      };
    case "onQuickReportSubject_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //-----------------------Assesment Quick Report------------------- //     
    case "onQuickReportAssesment":
      return {
        ...state,
        isFetching: true
      };
    case "onQuickReportAssesment_SUCCESS":
      return {
        ...state,
        quickReportAssesment: action.quickReportAssesment,
        lastTestInfo: action.lastTestInfo,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,

      };
    case "onQuickReportAssesment_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //-----------------------Model Test Quick Report------------------- //     
    case "onQuickReportModelTest":
      return {
        ...state,
        isFetching: true
      };
    case "onQuickReportModelTest_SUCCESS":
      return {
        ...state,
        quickReportModelTest: action.quickReportModelTest,
        lastTestInfo: action.lastTestInfo,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,
        // neetModelTestQuestions: [],
        // _saveTestDetailId: "",
        // questionStatus: "",
        // nextQuestionId: "",
        // previousQuestionId: "",

      };
    case "onQuickReportModelTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //-----------------------Model Test Quick Report------------------- //     
    case "onQuickReportSpecialTest":
      return {
        ...state,
        isFetching: true
      };
    case "onQuickReportSpecialTest_SUCCESS":
      return {
        ...state,
        quickReportSpecialTest: action.quickReportSpecialTest,
        SpecialTest_TestDetailId: action.SpecialTest_TestDetailId,
        lastTestInfo: action.lastTestInfo,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,
        SpecialTestStatus: action.SpecialTestStatus

      };
    case "onQuickReportSpecialTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //-----------------------Special Test Ranking Position Module------------------- //     
    case "onRankingPosition":
      return {
        ...state,
        isFetching: true
      };
    case "onRankingPosition_SUCCESS":
      return {
        ...state,
        rankingPosition: action.rankingPosition,
      };
    case "onRankingPosition_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //-----------------------Model Test Quick Report------------------- //     
    case "startChapterWiseTest":
      return {
        ...state,
        isFetching: true
      };
    case "startChapterWiseTest_SUCCESS":
      return {
        ...state,
        chapterFullDetails: action.chapterFullDetails,
        ChapterQuestions: action.ChapterQuestions,
        SubjectId: action.SubjectId,
        ChapterId: action.ChapterId,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds
      };
    case "startChapterWiseTest_FAILURE":
      return {
        ...state,
        isFetching: false
      };


    //-----------------------Model StartChapterTest_SaveAction------------------- //     
    case "StartChapterTest_SaveAction":
      return {
        ...state,
        isFetching: true
      };
    case "StartChapterTest_SaveAction_SUCCESS":
      return {
        ...state,
        ChapterQuestions: action.ChapterQuestions,
        SubjectId: action.SubjectId,
        ChapterId: action.ChapterId,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds,
        Chapter_TimeTakenStatus: action.Chapter_TimeTakenStatus,
        chapterFullDetails: action.chapterFullDetails
      };
    case "StartChapterTest_SaveAction_FAILURE":
      return {
        ...state,
        isFetching: false
      };

    //-----------------------Model StartChapterTest_SaveAction------------------- //     
    // case "AllSkipList_Action":
    //   return {
    //     ...state,
    //     isFetching: true
    //   };
    // case "AllSkipList_Action_SUCCESS":
    //   return {
    //     ...state,
    //     Skiplist: action.Skiplist,
    //   };
    // case "AllSkipList_Action_FAILURE":
    //   return {
    //     ...state,
    //     isFetching: false
    //   };

    //-----------------------Skip list Array------------------- //     

    //-----------------------Model StartChapterTest_SaveAction------------------- //     
    case "AllSkipList_Action":
      return {
        ...state,
        isFetchingSkip: true
      };
    case "AllSkipList_Action_SUCCESS":
      return {
        ...state,
        Skiplist: action.Skiplist,
        Skiplist_data: action.Skiplist_data,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,
        Skiplist_SkipListQuestionId:action.Skiplist_SkipListQuestionId,
        Skip_Valid:action.Skip_Valid,
        isFetchingSkip: false
      };
    case "AllSkipList_Action_FAILURE":
      return {
        ...state,
        isFetchingSkip: false
      };


    case "SkiplistArray":
      return {
        ...state,
        Skiplist_QuestionNumber: action.Skiplist_QuestionNumber,
      };


    case "SkiplistArrayReducer_ClearAction":
      return {
        ...state,
        Skiplist_QuestionNumber: action.Skiplist_QuestionNumber_Clear
      };

    case "skipListQusID":
      return {
        ...state,
        questioId: action.questioId
      };

    // skipListQusID




    //-----------------------Model StartChapterTest_SaveAction------------------- //     
    case "AllSummaryReportAction":
      return {
        ...state,
        isFetching: true
      };
    case "AllSummaryReportAction_SUCCESS":
      return {
        ...state,
        SummaryreportDetail: action.SummaryreportDetail,
        SummaryreportDetail_SummaryId: action.SummaryreportDetail_SummaryId
      };
    case "AllSummaryReportAction_FAILURE":
      return {
        ...state,
        isFetching: false
      };


    //-----------------------Model StartChapterTest_SaveAction------------------- //     
    case "AllSummaryDetailsReportAction":
      return {
        ...state,
        isFetching: true
      };
    case "AllSummaryDetailsReportAction_SUCCESS":
      return {
        ...state,
        ViewSummaryreportDetail: action.ViewSummaryreportDetail,
      };
    case "AllSummaryDetailsReportAction_FAILURE":
      return {
        ...state,
        isFetching: false
      };


    //-----------------------Report_AssessmentTestAction------------------- //     
    case "Report_AssessmentTestAction":
      return {
        ...state,
        isFetching: true
      };
    case "Report_AssessmentTestAction_SUCCESS":
      return {
        ...state,
        AssessmentTest_ReportDetails: action.AssessmentTest_ReportDetails,
      };
    case "Report_AssessmentTestAction_FAILURE":
      return {
        ...state,
        isFetching: false,
        AssessmentTest_ReportDetails: action.AssessmentTest_ReportDetails,

      };

    //-----------------------Report_SubjectestAction------------------- //     
    case "Report_SubjectestAction":
      return {
        ...state,
        isFetching: true
      };
    case "Report_SubjectestAction_SUCCESS":
      return {
        ...state,
        SubjectReportDetail: action.SubjectReportDetail,
      };
    case "Report_SubjectestAction_FAILURE":
      return {
        ...state,
        isFetching: false,
        SubjectReportDetail: action.SubjectReportDetail,

      };


    //-----------------------Report_NEETTestAction------------------- //     
    case "Report_NEETTestAction":
      return {
        ...state,
        isFetching: true
      };
    case "Report_NEETTestAction_SUCCESS":
      return {
        ...state,
        NEET_ReportDetail: action.NEET_ReportDetail,
      };
    case "Report_NEETTestAction_FAILURE":
      return {
        ...state,
        isFetching: false,
        NEET_ReportDetail: action.NEET_ReportDetail,

      };


    //-----------------------Report_SpecialTestAction------------------- //     
    case "Report_SpecialTestAction":
      return {
        ...state,
        isFetching: true
      };
    case "Report_SpecialTestAction_SUCCESS":
      return {
        ...state,
        Special_ReportDetail: action.Special_ReportDetail,
      };
    case "Report_SpecialTestAction_FAILURE":
      return {
        ...state,
        isFetching: false,
        Special_ReportDetail: action.Special_ReportDetail,
      };

    //-----------------------Report_ReviseSearchAction------------------- //     
    case "Report_ReviseSearchAction":
      return {
        ...state,
        isFetching: true
      };
    case "Report_ReviseSearchAction_SUCCESS":
      return {
        ...state,
        ViewSummaryreportDetail: action.ViewSummaryreportDetail,
      };
    case "Report_ReviseSearchAction_FAILURE":
      return {
        ...state,
        isFetching: false,
        ViewSummaryreportDetail: action.ViewSummaryreportDetail,
      };

    //-----------------------Report_ReviseSearchAction------------------- //     
    case "AllCancelTest_Action":
      return {
        ...state,
        isFetching: true
      };
    case "AllCancelTest_Action_SUCCESS":
      return {
        ...state,
        lastTestInfo: action.lastTestInfo,
        ChapterTimeTaken_Seconds: action.ChapterTimeTaken_Seconds,
        AssesmentTimeTaken_Seconds: action.AssesmentTimeTaken_Seconds,
        SubjectTimeTaken_Seconds: action.SubjectTimeTaken_Seconds,
        SpecialTimeTaken_Seconds: action.SpecialTimeTaken_Seconds,
        NeetTimeTaken_Seconds: action.NeetTimeTaken_Seconds,
      };
    case "AllCancelTest_Action_FAILURE":
      return {
        ...state,
        isFetching: false,
      };

    //-----------------------HscYear For registration------------------- //     
    case "hscYearDropDown_Action":
      return {
        ...state,
        isFetching: true
      };
    case "hscYearDropDown_Action_SUCCESS":
      return {
        ...state,
        HscYearDropdown: action.HscYearDropdown,
      };
    case "hscYearDropDown_Action_FAILURE":
      return {
        ...state,
        isFetching: false,
      };


    case "Background_Variable_Chapter":
      return {
        ...state,
        Background_Variable_Chapter: action.Background_Variable_Chapter,
      };
    //--Getting payment url from Otp verification response----
    case "onOtpVerify_Action":
      return {
        ...state,
        isFetching: true
      };
    case "onOtpVerify_SUCCESS":
      return {
        ...state,
        paymentLink: action.paymentLink,
      };
    case "onOtpVerify_Action_FAILURE":
      return {
        ...state,
        isFetching: false,
      };

    // Non payed user login payment link
    case "nonPayedUser":
      return {
        ...state,
        paymentLink: action.paymentLink,
      };

    default:
      return state;
  }
}
