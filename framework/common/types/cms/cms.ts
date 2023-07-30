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
  height: number;
  width: number;
  orderNumber?: Int | null;
  originalWidth?: number | null;
  originalHeight?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  imageId?: ID;
}
export namespace Blog {
  export type BlogCategory = any;
  export interface ArticleCard {
    id: ID;
    title: string;
    url: string;
    displayingPageUrl: string;
    publishedAt: string;
    score: Float | null;
    fragment: String | null;
    image: Image | null;
  }
  export interface NavigationItem {
    title: String;
    url: String;
    active: true | null;
    itIsloop: Boolean | null;
    image: Image | null;
  }
  export interface BlogArticleNavigation {
    prev: NavigationItem | null;
    next: NavigationItem | null;
    nearestSiblings: NavigationItem[] | null;
  }
  export interface Article {
    id: ID;
    title: String;
    url: String;
    absURL: String;
    textHtml: String;
    renderHtml: String;
    keyTextHtml: String;
    h2: String;
    unPublished: Boolean;
    notSearchable: Boolean;
    notInList: Boolean;
    orderNumber: Int;
    category: BlogCategory;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | string;
    breadcrumbs?: Breadcrumb[];
    navigation: BlogArticleNavigation;
    imageId: ID | null;
    image: Image | null;
    secondImageId: ID | null;
    secondImage: Image | null;
  }
  export interface ArticleDraft {
    id: ID | null;
    title: String | null;
    handle: String | null;
    autoHandleSlug: String | null;
    absURL: String | null;
    text: String;
    textHtml: String;
    textRawDraftContentState: String | null;
    keyTextHtml: String;
    h2: String;
    unPublished: Boolean;
    notSearchable: Boolean;
    notInList: Boolean;
    orderNumber: Int | null;
    blogCategoryId: ID | null;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    existingArticleId: ID | null;
    existingArticle: Article | null;
    url: string | null;
    isCreatePage: Boolean;
    imageId: ID | null;
    image: Image | null;
    secondImageId: ID | null;
    secondImage: Image | null;
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
export namespace Site {
  export interface ContactEmailResponse {
    success: boolean;
    error?: string | null;
  }
}