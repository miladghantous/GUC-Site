export type AnnouncementResponse = {
  _id: string;
  title: string;
  details: string;
  createdAt: Date;
}
// Title, link, desc, deadline
export type FundResponse = {
  _id: string;
  title: string;
  link: string;
  description: string;
  deadline: Date |null;
}

//Title, link
export type ConferenceResponse = {
  _id: string;
  title: string;
  link: string;

}

//Subject, Link
export type FileLinkResponse = {
  _id: string;
  subject: string;
  link: string;
}