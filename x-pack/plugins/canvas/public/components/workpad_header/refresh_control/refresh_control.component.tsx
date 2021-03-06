/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { EuiButtonIcon, EuiToolTip } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { ToolTipShortcut } from '../../tool_tip_shortcut';

const strings = {
  getRefreshAriaLabel: () =>
    i18n.translate('xpack.canvas.workpadHeaderRefreshControlSettings.refreshAriaLabel', {
      defaultMessage: 'Refresh Elements',
    }),
  getRefreshTooltip: () =>
    i18n.translate('xpack.canvas.workpadHeaderRefreshControlSettings.refreshTooltip', {
      defaultMessage: 'Refresh data',
    }),
};

export interface Props {
  doRefresh: MouseEventHandler<HTMLButtonElement>;
  inFlight: boolean;
}

export const RefreshControl = ({ doRefresh, inFlight }: Props) => (
  <EuiToolTip
    position="bottom"
    content={
      <span>
        {strings.getRefreshTooltip()}
        <ToolTipShortcut namespace="EDITOR" action="REFRESH" />
      </span>
    }
  >
    <EuiButtonIcon
      disabled={inFlight}
      iconType="refresh"
      aria-label={strings.getRefreshAriaLabel()}
      onClick={doRefresh}
      data-test-subj="canvas-refresh-control"
    />
  </EuiToolTip>
);

RefreshControl.propTypes = {
  doRefresh: PropTypes.func.isRequired,
  inFlight: PropTypes.bool,
};
