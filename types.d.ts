export interface Video {
  _id: string;
  caption: string;
  comments: {
    _key: string;
    comment: string;
    postedBy: {
      image: string;
      userName: string;
      _id: string;
    };
  }[];
  likes: {
    _key: string;
    _ref: string;
    _type: string;
  }[];
  postedBy: {
    _id: string;
    image: string;
    userName: string;
  };
  video: {
    asset: {
      url: string;
      _id: string;
    };
  };
  userId: string;
}

export type User = {
  _id: string;
  _type: string;
  userName: string;
  image: string;
};
