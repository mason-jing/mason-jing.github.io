import "i18next";
import type { PageContent } from "../types";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: {
            translation: PageContent;
        };
    }
}
