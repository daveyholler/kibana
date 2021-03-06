/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import * as t from 'io-ts';

import { rule_id, id } from '../common/schemas';

export const queryRulesSchema = t.exact(
  t.partial({
    rule_id,
    id,
  })
);

export type QueryRulesSchema = t.TypeOf<typeof queryRulesSchema>;
export type QueryRulesSchemaDecoded = QueryRulesSchema;
