export type ID = string | number;

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
}
export namespace Management {
  export interface Manager {
    id: ID;
    friendlyName: String;
    isManager: Boolean;
    isAdmin: Boolean;
    created: Date;
    updated: Date;
  }
  export interface ManagerTokenResponse {
    success: Boolean;
    error: string | null;
    manager: Manager;
  }
}
