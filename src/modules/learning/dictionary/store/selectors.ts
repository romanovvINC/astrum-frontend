import { RootState } from "Redux/store";
import { DictionaryFilter } from "models/learning/dictionary/DictionaryFilter";
import { DictionaryState } from "models/learning/dictionary/DictionaryState";
import { Constructor } from "models/learning/dictionary/Constructor";
import { FlashTraining, Training } from "models/learning/dictionary/Trainings";
import { Stats } from "models/learning/dictionary/Stats";

export const dictionarySelectors = {
    getDictionaryState: (state: RootState): DictionaryState => state.DictionaryReducer,

    getDictionaryFilter: (state: RootState): DictionaryFilter => state.DictionaryReducer.filter,

    getConstructor: (state: RootState): Constructor => state.DictionaryReducer.constructor,

    getFlashTraining: (state: RootState): FlashTraining => state.DictionaryReducer.trainings.flash,

    getPractice: (state: RootState): Training => state.DictionaryReducer.trainings.practice,

    getStats: (state: RootState): Stats => state.DictionaryReducer.stats,
};
