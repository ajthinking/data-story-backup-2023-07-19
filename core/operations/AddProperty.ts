export class AddProperty {
  constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly required: boolean,
  ) {}

  perform() {}
}

// by name
// by json
// by class
// by array

// ### purpose
// streamline item operations
// enable actions missing in gui in an early stage

// ### examples
// add property
// add properties
// remove property
// remove properties
// rename property
// rename properties
// keep properties
// prefix properties
// suffix properties
// promote property
// clone

// ### ui design
// dedicated section
// chains/grouping
// "exposing" properties

// ### thoughts
// hidden/private properties
// difference/relationship between feature type operations and parameters?
// Clone could be a default action
// What if, a computer requires a TOO unique operation? (e.g. a custom operation)