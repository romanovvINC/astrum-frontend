import { RootState } from "Redux/store";
import { KnowledgeState } from "models/knowledge/KnowledgeState";
import { YoutrackProjectInfo } from "models/knowledge/YoutrackProjectInfo";
import { KnowledgeArticleInfo } from "models/knowledge/KnowledgeArticleInfo";

export const knowledgeSelectors = {
    getKnowledgeState: (state: RootState): KnowledgeState => state.KnowledgeReducer,

    getKnowledgeProjectInfo: (state: RootState): YoutrackProjectInfo => state.KnowledgeReducer.projectInfo,

    getKnowledgeArticleInfo: (state: RootState): KnowledgeArticleInfo => state.KnowledgeReducer.articleInfo,
};
