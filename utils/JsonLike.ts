export const JsonLike = {
  parse(json: string) {
    // Check if the string is already valid JSON
    try {
      return JSON.parse(json);
    } catch (e) {}

    // Handle JSON-like string where keys may not have quotes
    const matchKey = /\s+(\w+)\s*:/g;
    const fixed = json.replace(matchKey, '"$1":');
    
    try {
      return JSON.parse(fixed);
    } catch (e) {
      throw new Error('Could not parse JSON-like string.');
    }
  },
};