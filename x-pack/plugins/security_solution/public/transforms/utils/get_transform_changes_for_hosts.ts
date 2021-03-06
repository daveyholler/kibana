/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { HostsQueries } from '../../../common/search_strategy';
import { createIndicesFromPrefix } from './create_indices_from_prefix';
import { GetTransformChanges } from './types';

export const getTransformChangesForHosts: GetTransformChanges = ({
  factoryQueryType,
  settings,
}) => {
  switch (factoryQueryType) {
    case HostsQueries.hosts: {
      return {
        indices: createIndicesFromPrefix({
          prefix: settings.prefix,
          transformIndices: ['host_ent*'],
        }),
        factoryQueryType: HostsQueries.hostsEntities,
      };
    }
    case HostsQueries.authentications: {
      return {
        indices: createIndicesFromPrefix({
          prefix: settings.prefix,
          transformIndices: ['user_ent*'],
        }),
        factoryQueryType: HostsQueries.authenticationsEntities,
      };
    }
    default: {
      return undefined;
    }
  }
};
