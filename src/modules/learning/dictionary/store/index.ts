import { createSlice } from "@reduxjs/toolkit";
import { DictionaryState } from "models/learning/dictionary/DictionaryState";
import { GetTermsSuccess, GetTermsFailure, GetTermByIdSuccess, GetTermByIdFailure } from "./actionTypes/GetTermsTypes";
import { GetCategoriesSuccess, GetCategoriesFailure } from "./actionTypes/GetCategoriesTypes";
import { SearchTermsRequest } from "./actionTypes/SearchTermsRequest";
import { SetFilterCategoryType, SetFilterSortingType } from "./actionTypes/SetFilterTypes";
import {
    SetConstructorCategoryType,
    SetConstructorCheckedValuesType,
    SetConstructorIsCheckedAllType,
} from "./actionTypes/SetConstructorTypes";
import {
    SetFlashAnswerType,
    SetFlashCurrentCardType,
    SetFlashIsFinishedType,
    SetFlashIsStartedType,
    SetFlashPositionType,
} from "./actionTypes/FlashTrainingTypes";
import { GetTermByIdRequest } from "./actionTypes/GetTermByIdRequest";
import {
    GetConstructorFailure,
    GetConstructorSelectedRequest,
    GetConstructorSuccess,
    PostConstructorFailure,
    PostConstructorRequest,
} from "./actionTypes/ConstructorTypes";
import {
    StartPracticeFailure,
    StartPracticeRequest,
    StartFlashCardsPracticeSuccess,
    StartPracticeSuccess,
    SetPracticePositionType,
    CheckAnswerFailure,
    CheckAnswerRequest,
    CheckAnswerSuccess,
    FinishPracticeRequest,
    FinishPracticeFailure,
    SetStartedPracticeType,
    SetFinishedPracticeType,
    SetCorrectAnswerOption,
} from "./actionTypes/PracticesTypes";
import {
    GetStatsSummaryRequest,
    GetStatsSummarySuccess,
    GetStatsSummaryFailure,
    GetStatsTestsRequest,
    GetStatsTestsSuccess,
    GetStatsTestsFailure,
} from "./actionTypes/StatsTypes";

const initialState: DictionaryState = {
    pending: false,
    terms: [],
    categories: [],
    error: null,
    filter: { filterCategories: [], sorting: "" },
    constructor: {
        checkedValues: [],
        isCheckedAll: false,
        pending: false,
        error: null,
    },
    trainings: {
        flash: {
            pending: false,
            isFinished: false,
            isStarted: false,
            error: null,
            practiceId: "",
            termIds: [],
            correctAnswers: [],
            partlyAnswers: [],
            wrongAnswers: [],
            position: 0,
            currentCard: {
                id: "",
                name: "",
                definition: "",
                category: {
                    id: "",
                    name: "",
                },
            },
        },
        practice: {
            position: 0,
            pending: false,
            startedPractice: null,
            finishedPractice: null,
            error: null,
            questions: [],
            practiceId: "",
            checkingPending: false,
            checkingResults: [],
            answeredPages: [],
            correctAmount: 0,
        },
    },
    stats: {
        summaryPending: false,
        testsPending: false,
        error: null,
        summary: {
            countCompleted: 0,
            practices: [],
        },
        tests: [],
    },
};

export const dictionaryReducer = createSlice({
    name: "dictionary",
    initialState,
    reducers: {
        getTermsRequest: state => {
            state.pending = true;
            state.error = null;
        },
        getTermsSuccess: (state, action: GetTermsSuccess) => {
            state.pending = false;
            state.terms = action.payload;
        },
        getTermsFailure: (state, action: GetTermsFailure) => {
            state.pending = false;
            state.error = action.payload;
        },

        getTermByIdRequest: (state, action: GetTermByIdRequest) => {
            state.trainings.flash.pending = true;
            state.trainings.flash.error = null;
        },
        getTermByIdSuccess: (state, action: GetTermByIdSuccess) => {
            state.trainings.flash.pending = false;
            state.trainings.flash.currentCard = action.payload;
        },
        getTermByIdFailure: (state, action: GetTermByIdFailure) => {
            state.trainings.flash.pending = false;
            state.trainings.flash.error = action.payload;
        },

        getCategoriesRequest: state => {
            state.pending = true;
            state.error = null;
        },
        getCategoriesSuccess: (state, action: GetCategoriesSuccess) => {
            state.pending = false;
            state.categories = action.payload;
        },
        getCategoriesFailure: (state, action: GetCategoriesFailure) => {
            state.pending = false;
            state.error = action.payload;
        },

        searchTermsRequest: (state, action: SearchTermsRequest) => {
            state.pending = true;
            state.error = null;
        },
        searchTermsSuccess: (state, action: GetTermsSuccess) => {
            state.pending = false;
            state.terms = action.payload;
        },
        searchTermsFailure: (state, action: GetTermsFailure) => {
            state.pending = false;
            state.error = action.payload;
        },

        getConstructorRequest: state => {
            state.constructor.pending = true;
            state.constructor.error = null;
        },
        getConstructorSuccess: (state, action: GetConstructorSuccess) => {
            state.constructor.pending = false;
        },
        getConstructorFailure: (state, action: GetConstructorFailure) => {
            state.constructor.pending = false;
            state.constructor.error = action.payload;
        },

        getConstructorSelectedRequest: (state, action: GetConstructorSelectedRequest) => {
            state.constructor.pending = true;
            state.constructor.error = null;
        },
        getConstructorSelectedSuccess: (state, action: GetConstructorSuccess) => {
            state.constructor.pending = false;
            state.constructor.checkedValues = action.payload;
        },
        getConstructorSelectedFailure: (state, action: GetConstructorFailure) => {
            state.constructor.pending = false;
            state.constructor.error = action.payload;
        },

        postConstructorRequest: (state, action: PostConstructorRequest) => {
            state.constructor.pending = true;
            state.constructor.error = null;
        },
        postConstructorSuccess: state => {
            state.constructor.pending = false;
        },
        postConstructorFailure: (state, action: PostConstructorFailure) => {
            state.constructor.pending = false;
            state.constructor.error = action.payload;
        },

        startPracticeRequest: (state, action: StartPracticeRequest) => {
            state.trainings.practice.pending = true;
            state.trainings.practice.error = null;
        },
        startPracticeSuccess: (state, action: StartPracticeSuccess) => {
            state.trainings.practice.pending = false;
            state.trainings.practice.questions = action.payload.questions;
            state.trainings.practice.practiceId = action.payload.practiceId;
        },
        startPracticeFailure: (state, action: StartPracticeFailure) => {
            state.trainings.practice.pending = false;
            state.trainings.practice.error = action.payload;
        },

        finishPracticeRequest: (state, action: FinishPracticeRequest) => {
            state.trainings.practice.pending = true;
            state.trainings.practice.error = null;
        },
        finishPracticeSuccess: state => {
            state.trainings.practice.pending = false;
        },
        finishPracticeFailure: (state, action: FinishPracticeFailure) => {
            state.trainings.practice.pending = false;
            state.trainings.practice.error = action.payload;
        },

        finishFlashPracticeRequest: (state, action: FinishPracticeRequest) => {
            state.trainings.flash.pending = true;
            state.trainings.flash.error = null;
        },
        finishFlashPracticeSuccess: state => {
            state.trainings.flash.pending = false;
            state.trainings.flash.isFinished = true;
        },
        finishFlashPracticeFailure: (state, action: FinishPracticeFailure) => {
            state.trainings.flash.pending = false;
            state.trainings.flash.error = action.payload;
        },

        checkAnswerRequest: (state, action: CheckAnswerRequest) => {
            state.trainings.practice.checkingPending = true;
            state.trainings.practice.error = null;
            if (action.payload.position) {
                state.trainings.practice.answeredPages.push(action.payload.position);
            }
        },
        checkAnswerSuccess: (state, action: CheckAnswerSuccess) => {
            const { checkingResult, questionId } = action.payload;
            state.trainings.practice.checkingPending = false;
            state.trainings.practice.checkingResults.push({
                questionId,
                result: checkingResult,
            });
            if (checkingResult === true) {
                state.trainings.practice.correctAmount += 1;
            }
        },
        checkAnswerFailure: (state, action: CheckAnswerFailure) => {
            state.trainings.practice.checkingPending = false;
            state.trainings.practice.error = action.payload;
            state.trainings.practice.answeredPages.pop();
        },

        setFilterSorting: (state, action: SetFilterSortingType) => {
            state.filter.sorting = action.payload;
        },
        setFilterCategory: (state, action: SetConstructorCategoryType) => {
            state.filter.filterCategories.push(action.payload);
        },
        deleteFilterCategory: (state, action: SetConstructorCategoryType) => {
            const index = state.filter.filterCategories.indexOf(action.payload);
            if (index > -1) {
                state.filter.filterCategories.splice(index, 1);
            }
        },

        setConstructorCheckedValues: (state, action: SetConstructorCheckedValuesType) => {
            state.constructor.checkedValues = action.payload;
        },
        setConstructorIsCheckedAll: (state, action: SetConstructorIsCheckedAllType) => {
            state.constructor.isCheckedAll = action.payload;
        },

        startFlashCardsPracticeRequest: (state, action: StartPracticeRequest) => {
            state.trainings.flash.pending = true;
            state.trainings.flash.error = null;
        },
        startFlashCardsPracticeSuccess: (state, action: StartFlashCardsPracticeSuccess) => {
            state.trainings.flash.pending = false;
            state.trainings.flash.termIds = action.payload.termIds;
            state.trainings.flash.practiceId = action.payload.id;
            state.trainings.flash.isStarted = true;
        },
        startFlashCardsPracticeFailure: (state, action: StartPracticeFailure) => {
            state.trainings.flash.pending = false;
            state.trainings.flash.error = action.payload;
        },

        setFlashPosition: (state, action: SetFlashPositionType) => {
            state.trainings.flash.position = action.payload;
        },
        setFlashCorrectAnswer: (state, action: SetFlashAnswerType) => {
            state.trainings.flash.correctAnswers.push(action.payload);
        },
        setFlashPartlyAnswer: (state, action: SetFlashAnswerType) => {
            state.trainings.flash.partlyAnswers.push(action.payload);
        },
        setFlashWrongAnswer: (state, action: SetFlashAnswerType) => {
            state.trainings.flash.wrongAnswers.push(action.payload);
        },
        setFlashDefault: state => {
            state.trainings.flash = initialState.trainings.flash;
        },

        setPracticePosition: (state, action: SetPracticePositionType) => {
            state.trainings.practice.position = action.payload;
        },
        setStartedPractice: (state, action: SetStartedPracticeType) => {
            state.trainings.practice.startedPractice = action.payload;
        },
        setFinishedPractice: (state, action: SetFinishedPracticeType) => {
            state.trainings.practice.finishedPractice = action.payload;
        },
        setCorrectAnswerOption: (state, action: SetCorrectAnswerOption) => {
            state.trainings.practice.questions.forEach(question => {
                if (question.id === action.payload.questionId) {
                    if (action.payload.rightAnswer) {
                        question.rightAnswer = action.payload.rightAnswer;
                    }

                    question.answerOptions.forEach(answer => {
                        if (answer.id === action.payload.answerId) {
                            answer.correct = action.payload.result;
                        }
                    });
                }
            });
        },
        setPracticeDefault: state => {
            state.trainings.practice = initialState.trainings.practice;
        },

        getStatsSummaryRequest: (state, action: GetStatsSummaryRequest) => {
            state.stats.summaryPending = true;
        },
        getStatsSummarySuccess: (state, action: GetStatsSummarySuccess) => {
            state.stats.summaryPending = false;
            state.stats.summary = action.payload;
        },
        getStatsSummaryFailure: (state, action: GetStatsSummaryFailure) => {
            state.stats.summaryPending = false;
            state.stats.error = action.payload;
        },

        getStatsTestsRequest: (state, action: GetStatsTestsRequest) => {
            state.stats.testsPending = true;
        },
        getStatsTestsSuccess: (state, action: GetStatsTestsSuccess) => {
            state.stats.testsPending = false;
            state.stats.tests = action.payload;
        },
        getStatsTestsFailure: (state, action: GetStatsTestsFailure) => {
            state.stats.testsPending = false;
            state.stats.error = action.payload;
        },
    },
});

export const {
    getTermsRequest,
    getTermsSuccess,
    getTermsFailure,

    getTermByIdRequest,
    getTermByIdSuccess,
    getTermByIdFailure,

    getCategoriesRequest,
    getCategoriesSuccess,
    getCategoriesFailure,

    searchTermsRequest,
    searchTermsSuccess,
    searchTermsFailure,

    getConstructorRequest,
    getConstructorSuccess,
    getConstructorFailure,

    getConstructorSelectedRequest,
    getConstructorSelectedSuccess,
    getConstructorSelectedFailure,

    postConstructorRequest,
    postConstructorSuccess,
    postConstructorFailure,

    startPracticeRequest,
    startPracticeSuccess,
    startPracticeFailure,

    finishPracticeRequest,
    finishPracticeSuccess,
    finishPracticeFailure,

    finishFlashPracticeRequest,
    finishFlashPracticeSuccess,
    finishFlashPracticeFailure,

    checkAnswerRequest,
    checkAnswerSuccess,
    checkAnswerFailure,

    setFilterSorting,
    setFilterCategory,
    deleteFilterCategory,

    setConstructorCheckedValues,
    setConstructorIsCheckedAll,

    startFlashCardsPracticeRequest,
    startFlashCardsPracticeSuccess,
    startFlashCardsPracticeFailure,

    setFlashPosition,
    setFlashCorrectAnswer,
    setFlashPartlyAnswer,
    setFlashWrongAnswer,
    setFlashDefault,

    setPracticePosition,
    setStartedPractice,
    setFinishedPractice,
    setCorrectAnswerOption,
    setPracticeDefault,

    getStatsSummaryRequest,
    getStatsSummarySuccess,
    getStatsSummaryFailure,

    getStatsTestsRequest,
    getStatsTestsSuccess,
    getStatsTestsFailure,
} = dictionaryReducer.actions;

export default dictionaryReducer.reducer;
