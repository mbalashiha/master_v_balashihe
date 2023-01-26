declare namespace Schema {
  declare type ID = string | number;
  declare interface Image {
    imageId: ID;
    imgSrc: string;
    altText: string;
    height: number;
    width: number;
    orderNumber?: number;
    originalWidth: number;
    originalHeight: number;
    pathOfOriginal: string;
    createdAt: string;
    updatedAt: string;
  }
  declare interface ImageConnection {
    nodes: Image[];
  }
  declare interface Breadcrumb {
    name: string;
    handle: string;
    type: string;
  }
  declare interface BlogCategoryId {
    id: ID;
  }
  declare interface BlogArticle {
    articleId: ID;
    title: string;
    handle: string;
    description: string;
    descriptionHtml: string;
    published: boolean;
    orderNumber: number;
    category: BlogCategoryId;
    image: Image;
    images: ImageConnection;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    breadcrumbs: Breadcrumb[];
  }
  declare interface BlogArticlesConnection {
    nodes: BlogArticle[];
  }
  declare namespace QueryResponse {
    declare interface BlogArticles {
      blogArticles: BlogArticlesConnection;
    }
    declare interface Manager {
      id: ID
      friendlyName: String
      isManager: Boolean
      isAdmin: Boolean
      created: Date
      updated: Date
    }
    declare interface VerifyManagementTokenResponse {
      verifyManagementToken: {
        success: Boolean;
        error: string | null;
        manager: Manager;
      }
    }
  }
}
