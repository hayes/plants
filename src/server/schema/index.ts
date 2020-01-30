import builder from '../builder';

import './note';
import './plant';
import './input';

builder.createQueryType({
  shape: t => ({}),
});

builder.createMutationType({
  shape: t => ({}),
});

const schema = builder.toSchema();

export default schema;
