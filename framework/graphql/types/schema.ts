export namespace Schema {
  export type ID = String | number;
  export type Int = number;
  export type Float = number;
  type String = string;
  export interface Image {
    imageId: ID;
    imgSrc: String;
    altText: String;
    height: Int;
    width: Int;
    orderNumber?: Int;
    originalWidth: Int;
    originalHeight: Int;
    pathOfOriginal: String;
    createdAt: String;
    updatedAt: String;
  }
  export interface ImageConnection {
    nodes: Image[];
  }
  export interface Breadcrumb {
    name: String;
    handle: String;
    type: String;
  }
  export interface CategoryId {
    id: ID;
  }
  export interface BlogArticle {
    articleId: ID;
    title: String;
    handle: String;
    text: String;
    textHtml: String;
    textRawDraftContentState: String | null;
    published: boolean;
    orderNumber: Int;
    blogCategoryId: ID;
    category: CategoryId;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    breadcrumbs: Breadcrumb[];
  }
  export interface ArticleDraftInput {
    id: ID | null;
    title: String;
    handle: String;
    autoHandleSlug: String;
    published: Boolean;
    orderNumber: Int;
    blogCategoryId: ID;
    existingArticleId: ID | null;
  }
  export interface ArticleTextDraftInput {
    id: ID | null;
    text: String;
    textHtml: String;
    textRawDraftContentState: String | null;
    existingArticleId: ID | null;
  }
  export interface ArticleDraft {
    id: ID | null;
    title: String;
    handle: String;
    autoHandleSlug: String;
    text: String;
    textHtml: String;
    textRawDraftContentState: String | null;
    published: boolean;
    orderNumber: Int;
    blogCategoryId: ID;
    category: CategoryId;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    existingArticleId: ID | null;
    existingArticle: BlogArticle | null;
  }
  export interface BlogArticlesConnection {
    nodes: BlogArticle[];
  }
  export namespace QueryResponse {
    export interface BlogArticles {
      blogArticles: BlogArticlesConnection;
    }
    export interface ArticleDraftResponse {
      articleDraft: ArticleDraft;
    }
    export interface Manager {
      id: ID;
      friendlyName: String;
      isManager: Boolean;
      isAdmin: Boolean;
      created: Date;
      updated: Date;
    }
    export interface VerifyManagementTokenResponse {
      verifyManagementToken: {
        success: Boolean;
        error: String | null;
        manager: Manager;
      };
    }
    export interface GetArticleDraftResponse {
      articleDraft: ArticleDraft;
    }
  }
}
