import { BannerResponse } from "./BannerResponse";
import { FeedPostResponse } from "./FeedPostResponse";
import { WidgetResponse } from "./WidgetResponse";

export type NewsResponse = {
    banners: BannerResponse[];
    posts: FeedPostResponse[];
    widgets: WidgetResponse[];
};
