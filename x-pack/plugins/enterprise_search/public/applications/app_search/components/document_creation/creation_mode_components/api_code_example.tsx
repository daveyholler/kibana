/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { useValues, useActions } from 'kea';

import {
  EuiFlyoutHeader,
  EuiTitle,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiButtonEmpty,
  EuiText,
  EuiLink,
  EuiSpacer,
  EuiPanel,
  EuiBadge,
  EuiCode,
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';

import { CANCEL_BUTTON_LABEL } from '../../../../shared/constants';
import { getEnterpriseSearchUrl } from '../../../../shared/enterprise_search_url';
import { DOCS_PREFIX } from '../../../routes';
import { EngineLogic } from '../../engine';
import { EngineDetails } from '../../engine/types';

import { DOCUMENTS_API_JSON_EXAMPLE, FLYOUT_ARIA_LABEL_ID } from '../constants';
import { DocumentCreationLogic } from '../index';

export const ApiCodeExample: React.FC = () => (
  <>
    <FlyoutHeader />
    <FlyoutBody />
    <FlyoutFooter />
  </>
);

export const FlyoutHeader: React.FC = () => {
  return (
    <EuiFlyoutHeader hasBorder>
      <EuiTitle size="m">
        <h2 id={FLYOUT_ARIA_LABEL_ID}>
          {i18n.translate('xpack.enterpriseSearch.appSearch.documentCreation.api.title', {
            defaultMessage: 'Index from API',
          })}
        </h2>
      </EuiTitle>
    </EuiFlyoutHeader>
  );
};

export const FlyoutBody: React.FC = () => {
  const { engineName, engine } = useValues(EngineLogic);
  const { apiKey } = engine as EngineDetails;

  const documentsApiUrl = getEnterpriseSearchUrl(`/api/as/v1/engines/${engineName}/documents`);

  return (
    <EuiFlyoutBody>
      <EuiText color="subdued">
        <p>
          <FormattedMessage
            id="xpack.enterpriseSearch.appSearch.documentCreation.api.description"
            defaultMessage="Use the {documentsApiLink} to add, update, retrieve, and delete documents. The {clientLibrariesLink} can help you get started."
            values={{
              documentsApiLink: (
                <EuiLink target="_blank" href={`${DOCS_PREFIX}/indexing-documents-guide.html`}>
                  documents API
                </EuiLink>
              ),
              clientLibrariesLink: (
                <EuiLink target="_blank" href={`${DOCS_PREFIX}/api-clients.html`}>
                  client libraries
                </EuiLink>
              ),
            }}
          />
        </p>
        <p>
          {i18n.translate('xpack.enterpriseSearch.appSearch.documentCreation.api.example', {
            defaultMessage:
              'See the API in action. Experiment with this example request using a command line or client library.',
          })}
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiPanel hasBorder paddingSize="s" className="eui-textBreakAll">
        <EuiFlexGroup alignItems="center" responsive={false} gutterSize="none">
          <EuiFlexItem grow={false}>
            <EuiBadge color="primary">POST</EuiBadge>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiCode transparentBackground>{documentsApiUrl}</EuiCode>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
      <EuiCodeBlock language="bash" fontSize="m" isCopyable>
        {`\
curl -X POST '${documentsApiUrl}' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${apiKey}' \\
  -d '${DOCUMENTS_API_JSON_EXAMPLE}'
# Returns
# [
#   {
#     "id": "park_rocky-mountain",
#     "errors": []
#   },
#   {
#     "id": "park_saguaro",
#     "errors": []
#   }
# ]`}
      </EuiCodeBlock>
    </EuiFlyoutBody>
  );
};

export const FlyoutFooter: React.FC = () => {
  const { closeDocumentCreation } = useActions(DocumentCreationLogic);

  return (
    <EuiFlyoutFooter>
      <EuiButtonEmpty onClick={closeDocumentCreation}>{CANCEL_BUTTON_LABEL}</EuiButtonEmpty>
    </EuiFlyoutFooter>
  );
};
