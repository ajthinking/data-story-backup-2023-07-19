export class DataStoryItem {
  value: any;
  param: any;

  constructor(value: any, params: any[]) {
    this.value = value;
    this.param = new Proxy({}, {
      get: (_, prop: string) => {
        const param = params.find(param => param[prop]);
        if (!param) return undefined;

        const value = param[prop].replace(/\${(\w+)}/g, function(this: any, _: any, name: any) {
          return this.value[name];
        }.bind(this));
        return value;
      }
    });
  }
}

(async () => {
  const item = new DataStoryItem(
    { name: 'Bob' },
    [
      {
        greeting: 'Hello ${name}!',
      }
    ]
  )

  console.log(
    item.value,
    item.param.greeting,
  )
})();