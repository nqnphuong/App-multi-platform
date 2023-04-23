interface IPost {
  postsId: number;
  caption: string;
  type: string;
  totalFeel: number;

  dateCreate: string;
  feel: boolean;
  postsUserList: [
    {
      postsUserId: number;
      userId: number;
      name: string;
      image: string;
      dateCreate: string;
    },
  ];
  postsCommentList: any[];
  postsFeelList: any[];
  postsImageList: [
    {
      postsImageId: number;
      image: string;
      dateCreate: string;
    },
  ];
}

export default IPost;
