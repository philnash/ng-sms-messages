export class Message {
  public from: string;
  public to: string;
  public body: string;
  public sid: string;
  public isInbound: boolean;
  public isOutbound: boolean;

  constructor({body, from, to, sid, direction, isInbound, isOutbound}) {
    this.body = body;
    this.from = from;
    this.to = to;
    this.sid = sid;
    this.isInbound = isInbound;
    this.isOutbound = isOutbound;
  }

  direction() {
    return this.isInbound ? 'inbound' : 'outbound';
  }
}
