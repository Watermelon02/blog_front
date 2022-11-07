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
    commentId: number;
    passageId: number;
    userId: number;
    content: string;
    createTime: string;
    name: string;
    avatarUrl: string;
    constructor(commentId: number, passageId: number, userId: number, content: string, createTime: string, name: string, avatarUrl: string) {
        this.commentId = commentId;
        this.passageId = passageId;
        this.userId = userId;
        this.content = content;
        this.createTime = createTime;
        this.name = name;
        this.avatarUrl = avatarUrl
    }
}