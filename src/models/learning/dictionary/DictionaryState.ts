import { CategoryView, Term } from "models/learning/dictionary/Term";
import { DictionaryFilter } from "./DictionaryFilter";
import { Constructor } from "./Constructor";
import { Trainings } from "./Trainings";
import { Stats } from "./Stats";

export type DictionaryState = {
    pending: boolean;
    terms: Term[];
    categories: CategoryView[];
    error: string | null;
    filter: DictionaryFilter;
    constructor: Constructor;
    trainings: Trainings;
    stats: Stats;
};
