import { Sleep } from "./core/computers/Sleep"

export {}

(async () => {
  function toJsSyntax(obj: any, indent = ''): any {
    if (Array.isArray(obj)) {
      return '[' + obj.map(val => toJsSyntax(val)).join(', ') + ']';
    } else if (typeof obj === 'object' && obj !== null) {
      let result = '{\n';
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = toJsSyntax(obj[key], indent + '  ');
        result += `${indent}${key}: ${value}`;
        if (i < keys.length - 1) {
          result += ',';
        }
        result += '\n';
      }
      result += `${indent.slice(0, -2)}}`;
      return result;
    } else if (typeof obj === 'string') {
      return `'${obj}'`;
    } else {
      return obj;
    }
  }
  
  const json = `{"name": {
    "first": "Johnny", "second": "Appleseed"}}`;
  const parsed = JSON.parse(json);
  
  const jsSyntax = toJsSyntax(parsed);
  console.log(jsSyntax);
})()