declare type ID = string | number;
declare namespace CMS {
  declare interface Breadcrumb {
    name: string;
    handle: string;
    type: string;
  }
}
declare namespace Blog {
  declare interface Article {
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
    breadcrumbs: CMS.Breadcrumb[];
  }
}
