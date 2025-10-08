import { PublicUser } from "@/app/data/user/types";
type postBase = {
    id: number;
    createdAt: string;
    author?: PublicUser;
}

type textOnlyPost = postBase & { text: string, type: "text" }
type documentOnlyPost = postBase & { document: string, type: "document" }
type pictureOnlyPost = postBase & { picture: string, type: "picture" }
type videoOnlyPost = postBase & { video: string, type: "video" }
type textAndPicturePost = postBase & { text: string, picture: string, type: "text+picture" }
type textAndVideoPost = postBase & { text: string, video: string, type: "text+video" }
type textAndDocumentPost = postBase & { text: string, document: string, type: "text+document" }

export type Post = textOnlyPost | pictureOnlyPost | videoOnlyPost | textAndPicturePost | textAndVideoPost | textAndDocumentPost | documentOnlyPost;



