import { all, call, takeLatest } from "redux-saga/effects";
import {
    getTermsRequest,
    getCategoriesRequest,
    searchTermsRequest,
    getTermByIdRequest,
    getConstructorRequest,
    getConstructorSelectedRequest,
    postConstructorRequest,
    startFlashCardsPracticeRequest,
    startPracticeRequest,
    finishPracticeRequest,
    checkAnswerRequest,
    getStatsSummaryRequest,
    getStatsTestsRequest,
    finishFlashPracticeRequest,
} from "./index";
import {
    getCategoriesWorker,
    getTermsWorker,
    searchTermsWorker,
    getTermByIdWorker,
    getConstructorWorker,
    getConstructorSelectedWorker,
    postConstructorWorker,
    startFlashCardsPracticeWorker,
    startPracticeWorker,
    finishPracticeWorker,
    finishFlashPracticeWorker,
    checkAnswerWorker,
    getStatsSummaryWorker,
    getStatsTestsWorker,
} from "./workers";

function* getTermsWatcher() {
    yield takeLatest(getTermsRequest, getTermsWorker);
}

function* getTermByIdWatcher() {
    yield takeLatest(getTermByIdRequest, getTermByIdWorker);
}

function* getCategoriesWatcher() {
    yield takeLatest(getCategoriesRequest, getCategoriesWorker);
}

function* searchTermsWatcher() {
    yield takeLatest(searchTermsRequest, searchTermsWorker);
}

function* getConstructorWatcher() {
    yield takeLatest(getConstructorRequest, getConstructorWorker);
}

function* startFlashCardsPracticeWatcher() {
    yield takeLatest(startFlashCardsPracticeRequest, startFlashCardsPracticeWorker);
}

function* getConstructorSelectedWatcher() {
    yield takeLatest(getConstructorSelectedRequest, getConstructorSelectedWorker);
}

function* postConstructorWatcher() {
    yield takeLatest(postConstructorRequest, postConstructorWorker);
}

function* startPracticeWatcher() {
    yield takeLatest(startPracticeRequest, startPracticeWorker);
}

function* finishPracticeWatcher() {
    yield takeLatest(finishPracticeRequest, finishPracticeWorker);
}

function* finishFlashPracticeWatcher() {
    yield takeLatest(finishFlashPracticeRequest, finishFlashPracticeWorker);
}

function* checkAnswerWatcher() {
    yield takeLatest(checkAnswerRequest, checkAnswerWorker);
}

function* getStatsSummaryWatcher() {
    yield takeLatest(getStatsSummaryRequest, getStatsSummaryWorker);
}

function* getStatsTestsWatcher() {
    yield takeLatest(getStatsTestsRequest, getStatsTestsWorker);
}

export function* dictionaryWatcher() {
    yield all([
        call(getTermsWatcher),
        call(getCategoriesWatcher),
        call(searchTermsWatcher),
        call(getTermByIdWatcher),
        call(getConstructorWatcher),
        call(getConstructorSelectedWatcher),
        call(postConstructorWatcher),
        call(startFlashCardsPracticeWatcher),
        call(startPracticeWatcher),
        call(finishPracticeWatcher),
        call(finishFlashPracticeWatcher),
        call(checkAnswerWatcher),
        call(getStatsSummaryWatcher),
        call(getStatsTestsWatcher),
    ]);
}
