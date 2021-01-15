// effect 为 report 时仅能 update
interface Opt {
  action: 'insert'|'delete'|'update'
  effect: 'report'|'element'
  id: string,
  data: any
}

function readBeforeData (opts: Opt[]) {
  opts.map((item: Opt) => {
    let opt:Opt = {
      id: item.id,
      action: 'update',
      effect: item.effect,
      data: {}
    };
    switch (item.action) {
      case 'insert':
        opt.action = 'delete';
        break;
      case 'delete':
        opt.action = 'insert';
        break;
      case 'update':
        break;
    }
    return item;
  });
}

export default class OperationHistory {
  private step = -1
  private operationList: any[] = []

  private get total () {
    return this.operationList.length - 1
  }
  public do (opts: Opt[]) {
    let before = readBeforeData;
    let after = opts;
    this.operationList.push({ before, after });
    this.step = this.operationList.length - 1;
  }
  public redo () {
    return this.move(1);
  }
  public undo () {
    return this.move(-1);
  }
  private move (increment: -1|1) {
    let opt = null
    if (this.step < this.total) {
      this.step += increment
      opt = this.operationList[this.step];
    }
    return opt;
  }
  public reset () {
    this.step = -1
    this.operationList = []
  }
}
