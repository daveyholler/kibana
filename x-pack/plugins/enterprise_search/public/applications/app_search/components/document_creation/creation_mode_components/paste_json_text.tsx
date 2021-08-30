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
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
  EuiTextArea,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { CANCEL_BUTTON_LABEL, CONTINUE_BUTTON_LABEL } from '../../../../shared/constants';
import { AppLogic } from '../../../app_logic';

import { FLYOUT_ARIA_LABEL_ID } from '../constants';
import { Errors } from '../creation_response_components';
import { DocumentCreationLogic } from '../index';

import './paste_json_text.scss';

export const PasteJsonText: React.FC = () => (
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
          {i18n.translate('xpack.enterpriseSearch.appSearch.documentCreation.pasteJsonText.title', {
            defaultMessage: 'Create documents',
          })}
        </h2>
      </EuiTitle>
    </EuiFlyoutHeader>
  );
};

export const FlyoutBody: React.FC = () => {
  const {
    configuredLimits: {
      engine: { maxDocumentByteSize },
    },
  } = useValues(AppLogic);

  const { textInput, errors } = useValues(DocumentCreationLogic);
  const { setTextInput } = useActions(DocumentCreationLogic);

  return (
    <EuiFlyoutBody banner={<Errors />}>
      <EuiText color="subdued">
        <p>
          {i18n.translate(
            'xpack.enterpriseSearch.appSearch.documentCreation.pasteJsonText.description',
            {
              defaultMessage:
                'Enter an array of valid JSON documents.  Each document must be less than {maxDocumentByteSize} bytes.',
              values: { maxDocumentByteSize },
            }
          )}
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiTextArea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        isInvalid={errors.length > 0}
        aria-label={i18n.translate(
          'xpack.enterpriseSearch.appSearch.documentCreation.pasteJsonText.label',
          { defaultMessage: 'Paste JSON here' }
        )}
        className="pasteJsonTextArea"
        fullWidth
        rows={12}
      />
    </EuiFlyoutBody>
  );
};

export const FlyoutFooter: React.FC = () => {
  const { textInput, isUploading } = useValues(DocumentCreationLogic);
  const { onSubmitJson, closeDocumentCreation } = useActions(DocumentCreationLogic);

  return (
    <EuiFlyoutFooter>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty onClick={closeDocumentCreation}>{CANCEL_BUTTON_LABEL}</EuiButtonEmpty>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill onClick={onSubmitJson} isLoading={isUploading} isDisabled={!textInput}>
            {CONTINUE_BUTTON_LABEL}
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlyoutFooter>
  );
};
