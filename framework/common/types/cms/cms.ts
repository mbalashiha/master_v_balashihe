
export type ID = String | number;
export type Int = number;
export type Float = number;
type String = string;

export interface Breadcrumb {
  name: string;
  handle: string;
  type: string;
}
export interface Image {
  url: string;
  alt: string;
  height: number;
  width: number;
  orderNumber?: number;
  originalWidth: number;
  originalHeight: number;
  createdAt: string;
  updatedAt: string;
}
export namespace Blog {
  export type BlogCategory = any;
  export interface Article {
    articleId: ID;
    title: string;
    url: string;
    description: string;
    descriptionHtml: string;
    published: boolean;
    orderNumber: number;
    category: BlogCategory;
    image: Image;
    images: Image[];
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    breadcrumbs: Breadcrumb[];
  }
  export interface ArticleDraft {
    id: ID | null;
    title: String | null;
    handle: String | null;
    autoHandleSlug: String | null;
    text: String;
    textHtml: String;
    textRawDraftContentState: String | null;
    published: number | null;
    orderNumber: Int | null;
    blogCategoryId: ID | null;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    existingArticleId: ID | null;
    existingArticle: Article | null;
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
