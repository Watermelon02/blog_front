export class Tag {
    constructor(public name: string, public tagId: number) {
        this.name = name
        this.tagId = tagId
    }
}

export class Passage {
    passageId: number;
    title: string;
    subTitle: string;
    cover: string;
    tags: Array<Tag>;
    createTime: string;
    updateTime: string;
    content: string
    constructor(passageId: number, title: string,
        subTitle: string,
        cover: string,
        createTime: string,
        updateTime: string,
        tags: Array<Tag>, content: string) {
        this.passageId = passageId
        this.title = title
        this.subTitle = subTitle
        this.cover = cover
        this.createTime = createTime
        this.updateTime = updateTime
        this.tags = tags
        this.content = content
    }
}

export class Result<T>{
    status: number;
    total: number;
    data: T;
    constructor(status: number, total: number, data: T) {
        this.status = status;
        this.total = total;
        this.data = data
    }
}

export class User {
    userId: number;
    email: string;
    avatarUrl: string;
    name: string;
    blog: string;
    password: string;
    role: string;
    constructor(userId: number, email: string, avaterUrl: string, name: string, blog: string, password: string, role: string) {
        this.userId = userId;
        this.email = email;
        this.avatarUrl = avaterUrl;
        this.name = name;
        this.blog = blog;
        this.password = password;
        this.role = role;
    }
}

export class Comment {
    id: string;
    date: string;
    username: string;
    userId: string;
    avatarUrl: string;
    favour: string[];
    content: string;
    replyInfo: Reply[];

    constructor(
        id: string,
        date: string,
        username: string,
        userId: string,
        avatarUrl: string,
        favour: string[],
        content: string,
        replyInfo: Reply[]
    ) {
        this.id = id;
        this.date = date;
        this.username = username;
        this.userId = userId;
        this.avatarUrl = avatarUrl;
        this.favour = favour;
        this.content = content;
        this.replyInfo = replyInfo;
    }
}

export class Reply {
    id: string;
    date: string;
    replyName: string;
    username: string;
    userId: string;
    favour: string[];
    avatarUrl: string;
    content: string;

    constructor(
        id: string,
        date: string,
        replyName: string,
        username: string,
        userId: string,
        favour: string[],
        avatarUrl: string,
        content: string
    ) {
        this.id = id;
        this.date = date;
        this.replyName = replyName;
        this.username = username;
        this.userId = userId;
        this.favour = favour;
        this.avatarUrl = avatarUrl;
        this.content = content;
    }
}
//   评论区相关bean类
export class CommentData {
    comments: Comment[];
    context: string;
    replyContext: string;
    isShowSec: string;
    isClickId: string;
    userId: string;
    username: string;
    firstIdx: number;
    secIdx: number;
    avatarUrl: string;
    constructor(
        comments: Comment[],
        context: string,
        replyContext: string,
        isShowSec: string,
        isClickId: string,
        userId: string,
        username: string,
        firstIdx: number,
        secIdx: number,
        avatarUrl: string
    ) {
        this.comments = comments;
        this.context = context;
        this.replyContext = replyContext;
        this.isShowSec = isShowSec;
        this.isClickId = isClickId;
        this.userId = userId;
        this.username = username;
        this.firstIdx = firstIdx;
        this.secIdx = secIdx;
        this.avatarUrl = avatarUrl;
    }
}

