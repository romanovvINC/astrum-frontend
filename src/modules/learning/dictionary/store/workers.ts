import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import {
    getTermsSuccess,
    getTermsFailure,
    getTermByIdSuccess,
    getTermByIdFailure,
    getCategoriesSuccess,
    getCategoriesFailure,
    searchTermsSuccess,
    searchTermsFailure,
    getConstructorSuccess,
    getConstructorFailure,
    getConstructorSelectedSuccess,
    getConstructorSelectedFailure,
    postConstructorSuccess,
    postConstructorFailure,
    startFlashCardsPracticeSuccess,
    startFlashCardsPracticeFailure,
    startPracticeSuccess,
    startPracticeFailure,
    finishPracticeSuccess,
    finishPracticeFailure,
    checkAnswerSuccess,
    checkAnswerFailure,
    getStatsSummaryFailure,
    getStatsSummarySuccess,
    getStatsTestsSuccess,
    getStatsTestsFailure,
    finishFlashPracticeSuccess,
    finishFlashPracticeFailure,
} from "./index";
import { CategoryView, Term } from "models/learning/dictionary/Term";
import {
    getTermsList,
    getTermById,
    getCategoriesList,
    searchTerms,
    getConstructor,
    getConstructorSelected,
    startFlashCardsPractice,
    postConstructor,
    startPractice,
    finishPractice,
    checkAnswer,
    getStatsSummary,
    getStatsTests,
} from "../api";
import { SearchTermsRequest } from "./actionTypes/SearchTermsRequest";
import { GetTermByIdRequest } from "./actionTypes/GetTermByIdRequest";
import { StartPracticeRequest, CheckAnswerRequest, FinishPracticeRequest } from "./actionTypes/PracticesTypes";
import { FlashCardsPractice, Practice, CheckAnswer } from "models/learning/dictionary/Practice";
import { GetConstructorSelectedRequest, PostConstructorRequest } from "./actionTypes/ConstructorTypes";
import { StatsSummary, StatsTests } from "models/learning/dictionary/Stats";
import { GetStatsTestsRequest, GetStatsSummaryRequest } from "./actionTypes/StatsTypes";
import { notification } from "Utils/Notification";

export function* getTermsWorker() {
    const response: AxiosResponse<Term[]> = yield call(getTermsList);

    if (response) {
        yield put(getTermsSuccess(response.data));
    } else {
        yield put(getTermsFailure("error"));
    }
}

export function* getTermByIdWorker({ payload }: GetTermByIdRequest) {
    const response: AxiosResponse<Term> = yield call(getTermById, payload);

    if (response) {
        yield put(getTermByIdSuccess(response.data));
    } else {
        yield put(getTermByIdFailure("error"));
    }
}

export function* getCategoriesWorker() {
    const response: AxiosResponse<CategoryView[]> = yield call(getCategoriesList);

    if (response) {
        yield put(getCategoriesSuccess(response.data));
    } else {
        yield put(getCategoriesFailure("error"));
    }
}

export function* searchTermsWorker({ payload }: SearchTermsRequest) {
    const response: AxiosResponse<Term[]> = yield call(searchTerms, payload);

    if (response) {
        yield put(searchTermsSuccess(response.data));
    } else {
        yield put(searchTermsFailure("error"));
    }
}

export function* getConstructorWorker() {
    const response: AxiosResponse<Term[]> = yield call(getConstructor);

    if (response) {
        yield put(getConstructorSuccess(response.data));
    } else {
        yield put(getConstructorFailure("error"));
    }
}

export function* getConstructorSelectedWorker({ payload }: GetConstructorSelectedRequest) {
    const response: AxiosResponse<Term[]> = yield call(getConstructorSelected, payload);

    if (response) {
        yield put(getConstructorSelectedSuccess(response.data));
    } else {
        yield put(getConstructorSelectedFailure("error"));
    }
}

export function* postConstructorWorker({ payload }: PostConstructorRequest) {
    const response: AxiosResponse<void> = yield call(postConstructor, payload);

    if (response.status === 200) {
        yield put(postConstructorSuccess());
        yield call(notification, "Сохранено!", " ", "success");
    } else {
        yield put(postConstructorFailure("error"));
    }
}

export function* startFlashCardsPracticeWorker({ payload }: StartPracticeRequest) {
    const response: AxiosResponse<FlashCardsPractice> = yield call(startFlashCardsPractice, payload);

    if (response) {
        yield put(startFlashCardsPracticeSuccess(response.data));
    } else {
        yield put(startFlashCardsPracticeFailure("error"));
    }
}

export function* startPracticeWorker({ payload }: StartPracticeRequest) {
    const response: AxiosResponse<Practice> = yield call(startPractice, payload);

    if (response) {
        yield put(startPracticeSuccess(response.data));
    } else {
        yield put(startPracticeFailure("error"));
    }
}

export function* finishPracticeWorker({ payload }: FinishPracticeRequest) {
    const response: AxiosResponse<void> = yield call(finishPractice, payload);

    if (response) {
        yield put(finishPracticeSuccess());
    } else {
        yield put(finishPracticeFailure("error"));
    }
}

export function* finishFlashPracticeWorker({ payload }: FinishPracticeRequest) {
    const response: AxiosResponse<void> = yield call(finishPractice, payload);

    if (response) {
        yield put(finishFlashPracticeSuccess());
    } else {
        yield put(finishFlashPracticeFailure("error"));
    }
}

export function* checkAnswerWorker({ payload }: CheckAnswerRequest) {
    const response: AxiosResponse<CheckAnswer> = yield call(checkAnswer, payload);

    if (response) {
        yield put(checkAnswerSuccess(response.data));
    } else {
        yield put(checkAnswerFailure("error"));
    }
}

export function* getStatsSummaryWorker({ payload }: GetStatsSummaryRequest) {
    const response: AxiosResponse<StatsSummary> = yield call(getStatsSummary, payload);

    if (response) {
        yield put(getStatsSummarySuccess(response.data));
    } else {
        yield put(getStatsSummaryFailure("error"));
    }
}

export function* getStatsTestsWorker({ payload }: GetStatsTestsRequest) {
    const response1: AxiosResponse<StatsTests> = yield call(getStatsTests, {
        userId: payload.userId,
        type: payload.practiceTypes[0],
    });
    const response2: AxiosResponse<StatsTests> = yield call(getStatsTests, {
        userId: payload.userId,
        type: payload.practiceTypes[1],
    });

    if (response1 && response2) {
        yield put(getStatsTestsSuccess([response1.data, response2.data]));
    } else {
        yield put(getStatsTestsFailure("error"));
    }
}
