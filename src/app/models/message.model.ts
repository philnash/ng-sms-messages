export class Message {
  public from: string;
  public to: string;
  public body: string;
  public sid: string;

  constructor({body, from, to, sid}) {
    this.body = body;
    this.from = from;
    this.to = to;
    this.sid = sid;
  }
}
