type ID = string | number;
type Int = number;
type Float = number;
type Boolean = boolean;
type String = string;

export interface Breadcrumb {
  name: String;
  handle: String;
  type: String;
}
export interface Image {
  url: string;
  alt: string;
  height: Int;
  width: Int;
  orderNumber: Int | null;
  originalWidth: Int;
  originalHeight: Int;
  createdAt: Date;
  updatedAt: Date;
}
export namespace Blog {
  export type BlogCategory = any;
  export interface ArticleCard {
    id: ID;
    title: string;
    url: string;
    createdAt: string;
    score: Float | null;
    fragment: String | null;
  }
  export interface NavigationItem {
    title: String;
    url: String;
    active: true | null;
    itIsloop: Boolean | null;
  }
  export interface BlogArticleNavigation {
    prev: NavigationItem | null;
    next: NavigationItem | null;
    nearestSiblings: NavigationItem[] | null;
  }
  export interface Article {
    id: ID;
    title: string;
    url: string;
    textHtml: string;
    published: Boolean;
    orderNumber: Int;
    category: BlogCategory;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    breadcrumbs?: Breadcrumb[];
    navigation: BlogArticleNavigation;
  }
  export interface ArticleDraft {
    id: ID | null;
    title: String | null;
    handle: String | null;
    autoHandleSlug: String | null;
    text: String;
    textHtml: String;
    textRawDraftContentState: String | null;
    published: Boolean;
    orderNumber: Int | null;
    blogCategoryId: ID | null;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    existingArticleId: ID | null;
    existingArticle: Article | null;
    url: string | null;
    isCreatePage: Boolean;
  }
}
export namespace Management {
  export interface Manager {
    id: ID;
    friendlyName: string;
    isManager: boolean;
    isAdmin: boolean;
    created: Date;
    updated: Date;
  }
  export interface ManagerTokenResponse {
    success: boolean;
    error: string | null;
    manager: Manager;
  }
}
