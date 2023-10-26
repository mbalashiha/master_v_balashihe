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
  export interface OpenGraphDates {
    modified_time: String;
    published_time: String;
  }
  export interface CategoryId {
    id: ID;
  }
  export interface ArticleCard {
    id: ID;
    title: String;
    handle: String;
    displayingPageHandle: String;
    absURL: String;
    publishedAt: Date;
    score: Float | null;
    fragment: String | null;
    image: Image | null;
    secondImage: Image | null;
    viewed: number | null;
  }
  export interface NavigationItem {
    title: String;
    handle: String;
    itIsloop: Boolean | null;
    image: Image | null;
  }
  export interface ArticleNavigation {
    prev: NavigationItem | null;
    next: NavigationItem | null;
    nearestSiblings: NavigationItem[] | null;
  }
  export interface Article {
    id: ID | null;
    title: String;
    handle: String | null;
    autoHandleSlug: String | null;
    absURL: String | null;
    displayingPageHandle: String;
    text: String;
    textHtml: String;
    textRawDraftContentState: String | null;
    keyTextHtml: String | null;
    h2: String | null;
    renderHtml: String;
    unPublished: Boolean;
    notSearchable: Boolean;
    notInList: Boolean;
    orderNumber: Int;
    blogCategoryId: ID | null;
    category: CategoryId;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | String;
    breadcrumbs: Breadcrumb[];
    navigation: ArticleNavigation | null;
    imageId: ID | null;
    image: Image | null;
    randomImage?: Image;
    secondImageId: ID | null;
    secondImage: Image | null;
    viewed: number | null;
    templateId: ID | null;
    ogDates: OpenGraphDates;
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
      h2: String | null;
      keyTextHtml: String | null;
      renderHtml: String;
      unPublished: Boolean;
      notSearchable: Boolean;
      notInList: Boolean;
      orderNumber: Int | null;
      blogCategoryId: ID | null;
      existingArticleId: ID | null;
      imageId: ID | null;
      secondImageId: ID | null;
      templateId: ID | null;
    }
    export interface ArticleDraftInput {
      id: ID | null;
      title: String | null;
      handle: String | null;
      autoHandleSlug: String | null;
      h2: String | null;
      unPublished: Boolean;
      notSearchable: Boolean;
      notInList: Boolean;
      orderNumber?: Int | null;
      blogCategoryId: ID | null;
      existingArticleId: ID | null;
      imageId: ID | null;
      secondImageId: ID | null;
      templateId: ID | null;
    }
    export interface TextDraftInput {
      id: ID | null;
      text: String;
      textHtml: String;
      textRawDraftContentState: String | null;
      existingArticleId: ID | null;
    }
    export interface ArticleKeyTextDraftInput {
      id: ID | null;
      keyTextHtml: String;
      existingArticleId: ID | null;
    }
    export interface ArticleDraft extends Article {
      text: String;
      textRawDraftContentState: String | null;
      existingArticleId: ID | null;
      existingArticle: Article | null;
    }
  }
  export interface BlogArticlesConnection {
    nodes: Article[];
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
        nodes: ArticleCard[];
      };
    }
    export interface RecentArticlesConnection {
      recentArticles: {
        nodes: ArticleCard[];
      };
    }
    export interface ArticlesPathesResponse {
      articlesPathes: {
        nodes: PathHandle[];
      };
    }
    export interface ArticleByHandleResponse {
      articleByHandle: Article;
    }
    export interface ArticleByAbsUrlResponse {
      articleByAbsUrl: Article | null;
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
    export interface SaveArticleKeyTextDraftResponse {
      saveArticleKeyTextDraft: {
        message: String;
        error?: string | null;
        success?: boolean;
        updatedDraft: Article.ArticleDraft;
      };
    }
    export interface ManagementGetArticles {
      managementGetArticles: Article[];
    }
    export interface ArticleTemplate {
      templateId: ID;
      templateName: String;
      lastUsed: Int | null;
    }
    export interface ManagementArticleTemplates {
      managementArticleTemplates: ArticleTemplate[];
    }
    export interface ManagementArticlesCards {
      managementArticlesCards: {
        search: String;
        nodes: ArticleCard[];
      };
    }
    export interface ManagementCheckArticle {
      managementCheckArticle: Article | undefined | null;
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
          nodes: ArticleCard[];
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
