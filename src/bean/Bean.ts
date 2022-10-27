export class Tag {
    constructor(public name: string, public tag_id: number) {
        this.name = name
        this.tag_id = tag_id
    }
}

export class Passage {
    passage_id: number;
    title: string;
    sub_title: string;
    cover: string;
    tags: Array<Tag>;
    create_time: string;
    update_time: string;
    content:string
    constructor(passage_id: number, title: string,
        sub_title: string,
        cover: string,
        create_time: string,
        update_time: string,
        tags: Array<Tag>,content:string) {
        this.passage_id = passage_id
        this.title = title
        this.sub_title = sub_title
        this.cover = cover
        this.create_time = create_time
        this.update_time = update_time
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

export class User{
    userId:number;
    email:string;
    avatarUrl:string;
    name:string;
    blog:string;
    password:string;
    role:string;
    constructor(userId:number,email:string,avaterUrl:string,name:string,blog:string,password:string,role:string){
        this.userId = userId;
        this.email = email;
        this.avatarUrl = avaterUrl;
        this.name = name;
        this.blog = blog;
        this.password = password;
        this.role = role;
    }
}