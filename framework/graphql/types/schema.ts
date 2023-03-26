export type ID = string | number;
type Int = number;
type Float = number;
type Boolean = boolean;
type String = string;

export namespace Schema {
  export interface PathHandle {
    handle: String;
  }
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
    createdAt: Date;
    updatedAt: Date;
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
  export interface BlogArticleCard {
    id: ID;
    title: String;
    handle: String;
    createdAt: Date;
    score: Float | null;
    fragment: String | null;
  }
  export interface NavigationItem {
    title: String;
    handle: String;
    itIsloop: Boolean | null;
  }
  export interface BlogArticleNavigation {
    prev: NavigationItem | null;
    next: NavigationItem | null;
    nearestSiblings: NavigationItem[] | null;
  }
  export interface BlogArticle {
    id: ID;
    title: String;
    handle: String;
    absURL: String;
    text: String;
    textHtml: String;
    textRawDraftContentState: String | null;
    renderHtml: String;
    unPublished: Boolean;
    notSearchable: Boolean;
    notInList: Boolean;
    orderNumber: Int;
    blogCategoryId: ID;
    category: CategoryId;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    breadcrumbs: Breadcrumb[];
    navigation: BlogArticleNavigation | null;
    imageId: ID | null;
    image: Image | null;
  }
  export namespace Article {
    export interface ArticleInput {
      id: ID | null;
      title: String | null;
      handle: String | null;
      autoHandleSlug: String | null;
      text: String | null;
      textHtml: String | null;
      textRawDraftContentState: String | null;
      renderHtml: String;
      unPublished: Boolean;
      notSearchable: Boolean;
      notInList: Boolean;
      orderNumber: Int | null;
      blogCategoryId: ID | null;
      existingArticleId: ID | null;
      imageId: ID | null;
    }
    export interface ArticleDraftInput {
      id: ID | null;
      title: String | null;
      handle: String | null;
      autoHandleSlug: String | null;
      unPublished: Boolean;
      notSearchable: Boolean;
      notInList: Boolean;
      orderNumber?: Int | null;
      blogCategoryId: ID | null;
      existingArticleId: ID | null;
      imageId: ID | null;
    }
    export interface TextDraftInput {
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
      absURL: String | null;
      text: String;
      textHtml: String;
      textRawDraftContentState: String | null;
      unPublished: Boolean;
      notSearchable: Boolean;
      notInList: Boolean;
      orderNumber: Int;
      blogCategoryId: ID;
      category: CategoryId;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      existingArticleId: ID | null;
      existingArticle: BlogArticle | null;
      imageId: ID | null;
      image: Image | null;
    }
  }
  export interface BlogArticlesConnection {
    nodes: BlogArticle[];
  }
  export namespace Response {
    export interface BlogArticles {
      blogArticles: BlogArticlesConnection;
    }
    export interface ArticleDraftResponse {
      articleDraft: Article.ArticleDraft;
    }
    export interface ArticlesCardsConnection {
      articlesCards: {
        nodes: BlogArticleCard[];
      };
    }
    export interface ArticlesPathesResponse {
      articlesPathes: {
        nodes: PathHandle[];
      };
    }
    export interface ArticleByHandleResponse {
      articleByHandle: BlogArticle;
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
      articleDraft: Article.ArticleDraft;
    }
    export interface SaveArticleTextDraftResponse {
      saveArticleTextDraft: {
        message: String;
        updatedDraft: Article.ArticleDraft;
      };
    }
    export interface ManagementGetArticles {
      managementGetArticles: BlogArticle[];
    }
    export interface ManagementArticlesCards {
      managementArticlesCards: {
        search: String;
        nodes: BlogArticleCard[];
      };
    }
    export interface ManagementCheckArticle {
      managementCheckArticle: BlogArticle | undefined | null;
    }
    export interface SaveArtDraftPropsResponse {
      saveArticleDraft: {
        message: String;
        updatedDraft: Article.ArticleDraft;
      };
    }
    export interface DeleteArticleDraftResponse {
      deleteArticleDraft: {
        success: Boolean;
        message?: string | null;
        error?: string | null;
        updatedDraft?: Article.ArticleDraft;
      };
    }
    export interface DeleteArticleResponse {
      deleteArticle: {
        success: Boolean;
        message: String;
        error?: string | null;
        articleList: {
          search: String;
          nodes: BlogArticleCard[];
        };
      };
    }
    export interface SaveArticleResponse {
      saveArticle: {
        articleId: ID | null;
        success: Boolean;
        message: String;
        error?: string | null;
        articleDraft: Article.ArticleDraft;
      };
    }
  }
}
