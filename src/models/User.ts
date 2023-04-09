interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  avatar: string;
  background: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  followStatus: true;
  numberOfPosts: number;
  numberOfFollower: number;
  numberOfFollowing: number;
  token: string;
  dateCreate: string;
  follow: number;
  userSender: string;
  userRecipient: string;
  postsList: string;
  songList: string;
  listSongInfoList: string;
}

export default IUser;
