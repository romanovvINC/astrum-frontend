import { AxiosResponse } from "axios";
import baseApi from "Api/BaseApi";
import { Term, CategoryView } from "models/learning/dictionary/Term";
import { StatsSummary, StatsTests } from "models/learning/dictionary/Stats";
import {
    StartPracticeRequestType,
    FinishPracticeRequestType,
    CheckAnswerRequestType,
} from "./store/actionTypes/PracticesTypes";
import { GetStatsTestsRequestType } from "./store/actionTypes/StatsTypes";
import { FlashCardsPractice, Practice, CheckAnswer } from "models/learning/dictionary/Practice";
import { PostConstructorRequestType } from "./store/actionTypes/ConstructorTypes";

export const getTermsList = (): Promise<AxiosResponse<Term[]>> => {
    return baseApi.get("/itdictionary/terms");
};

export const getTermById = (id: string): Promise<AxiosResponse<Term>> => {
    return baseApi.get(`/itdictionary/terms/${id}`);
};

export const getCategoriesList = (): Promise<AxiosResponse<CategoryView[]>> => {
    return baseApi.get("/itdictionary/categories");
};

export const searchTerms = (query: string): Promise<AxiosResponse<Term[]>> => {
    return baseApi.get(`/itdictionary/terms/search?substring=${query}`);
};

export const getConstructor = (): Promise<AxiosResponse<Term[]>> => {
    return baseApi.get("/itdictionary/constructor");
};

export const startFlashCardsPractice = (data: StartPracticeRequestType): Promise<AxiosResponse<FlashCardsPractice>> => {
    return baseApi.post("/itdictionary/practices/flashcards/start", data);
};

export const getConstructorSelected = (userId: string): Promise<AxiosResponse<Term[]>> => {
    return baseApi.get(`/itdictionary/constructor/${userId}/selected`);
};

export const postConstructor = (data: PostConstructorRequestType): Promise<AxiosResponse<void>> => {
    return baseApi.post("/itdictionary/constructor", data);
};

export const startPractice = (data: StartPracticeRequestType): Promise<AxiosResponse<Practice>> => {
    return baseApi.post("/itdictionary/practices/test/start", data);
};

export const finishPractice = (data: FinishPracticeRequestType): Promise<AxiosResponse<void>> => {
    return baseApi.put("/itdictionary/practices/finish", data);
};

export const checkAnswer = (data: CheckAnswerRequestType): Promise<AxiosResponse<CheckAnswer>> => {
    return baseApi.put("/itdictionary/practices/test/check", data);
};

export const getStatsSummary = (userId: string): Promise<AxiosResponse<StatsSummary>> => {
    return baseApi.get(`/itdictionary/stats/${userId}/summary`);
};

export const getStatsTests = ({ type, userId }: GetStatsTestsRequestType): Promise<AxiosResponse<StatsTests>> => {
    return baseApi.get(`itdictionary/stats/${userId}/tests?type=${type}`);
};
