export default interface ICreateBooksDTO {
  author_id: string;
  category_id: string;
  title: string;
  summary: string;
  contents: string;
  isbn: string;
  price: number;
  pages: number;
  date_publication: Date;
}
