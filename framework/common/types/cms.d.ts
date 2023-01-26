declare type ID = string | number;
declare namespace CMS {
  declare interface Breadcrumb {
    name: string;
    handle: string;
    type: string;
  }
  declare interface Image {
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
}
declare namespace Blog {
  declare interface Article {
    articleId: ID;
    title: string;
    url: string;
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
    breadcrumbs: CMS.Breadcrumb[];
  }
}
declare namespace Management {
  declare interface Manager {
    id: ID;
    friendlyName: String;
    isManager: Boolean;
    isAdmin: Boolean;
    created: Date;
    updated: Date;
  }
  declare interface ManagerTokenResponse {
    success: Boolean;
    error: string | null;
    manager: Manager;
  }
}
