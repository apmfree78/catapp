export interface CatTributes {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface VoteProps {
  image_id: string;
  value: 1 | -1;
}
