export class Message {
  public from: string;
  public to: string;
  public body: string;
  public sid: string;
  public direction: string;

  constructor({body, from, to, sid, direction}) {
    this.body = body;
    this.from = from;
    this.to = to;
    this.sid = sid;
    this.direction = direction;
  }
}
