export type AnnouncementResponse = {
  _id: string;
  title: string;
  details: string;
}
// Title, link, desc, deadline
export type FundResponse = {
  _id: string;
  title: string;
  link: string;
  description: string;
  deadline: Date;
}