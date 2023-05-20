import { JsonLike } from './JsonLike';

describe('parse', () => {
  it('should parse regular JSON', () => {
    const json = '{"name": "John", "age": 30}';
    const parsed = JsonLike.parse(json);
    expect(parsed).toEqual({ name: 'John', age: 30 });
  });

  it('should parse indented JSON-like string with unquoted keys', () => {
    const json = `{
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    }`;
    const parsed = JsonLike.parse(json);
    expect(parsed).toEqual({
      name: 'John',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA'
      }
    });
  });

  it('cant parse unquoted keys without indentation', () => {
    const json = `{name: "John", age: 30}`

    expect(() => JsonLike.parse(json)).toThrow()
  })
});