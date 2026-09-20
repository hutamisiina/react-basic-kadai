type Post = {
  id: number;          // id
  title: string;       // タイトル
  body: string;        // 本文
  published: boolean;  // 公開済みかどうか
};

// 編集中の投稿データ
type EditingPost = Partial<Post>;

// 一覧表示用の投稿データ
type PostListItem = Pick<Post, "id" | "title">;

// 公開済みの投稿データ
type PublishedPost = Readonly<Post>;
