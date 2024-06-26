/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FC, PropsWithChildren } from 'react';
import { EuiLoadingSpinner, EuiText, EuiPageTemplate } from '@elastic/eui';

export const PageLoading: FC<PropsWithChildren> = ({ children }) => {
  return (
    <EuiPageTemplate.EmptyPrompt
      title={<EuiLoadingSpinner size="xl" />}
      body={<EuiText color="subdued">{children}</EuiText>}
      data-test-subj="sectionLoading"
    />
  );
};
