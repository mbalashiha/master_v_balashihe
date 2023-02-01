export namespace Schema {
  export type ID = string | number;
  export interface Image {
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
  export interface ImageConnection {
    nodes: Image[];
  }
  export interface Breadcrumb {
    name: string;
    handle: string;
    type: string;
  }
  export interface BlogCategoryId {
    id: ID;
  }
  export interface BlogArticle {
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
  export interface BlogArticlesConnection {
    nodes: BlogArticle[];
  }
  export namespace QueryResponse {
    export interface BlogArticles {
      blogArticles: BlogArticlesConnection;
    }
    export interface Manager {
      id: ID
      friendlyName: String
      isManager: Boolean
      isAdmin: Boolean
      created: Date
      updated: Date
    }
    export interface VerifyManagementTokenResponse {
      verifyManagementToken: {
        success: Boolean;
        error: string | null;
        manager: Manager;
      }
    }
  }
}
