/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiSideNavItemType } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import {
  APP_SEARCH_PLUGIN,
  ENTERPRISE_SEARCH_OVERVIEW_PLUGIN,
  WORKPLACE_SEARCH_PLUGIN,
} from '../../../../../common/constants';
import { generateNavLink } from '../../../shared/layout';

import {
  ROOT_PATH,
  INDICES_PATH,
  CONNECTOR_SETTINGS_PATH,
  CRAWLER_SETTINGS_PATH,
} from '../../routes';

import { useIndicesNav } from '../index_detail/index_nav';

export const useEnterpriseSearchContentNav = () => {
  const navItems: Array<EuiSideNavItemType<unknown>> = [
    {
      id: 'es_overview',
      emphasize: true,
      name: i18n.translate('xpack.enterpriseSearch.content.nav.enterpriseSearchOverviewTitle', {
        defaultMessage: 'Overview',
      }),
      ...generateNavLink({
        to: ENTERPRISE_SEARCH_OVERVIEW_PLUGIN.URL,
        shouldNotCreateHref: true,
      }),
    },
    {
      id: 'content',
      emphasize: true,
      name: i18n.translate('xpack.enterpriseSearch.content.nav.contentTitle', {
        defaultMessage: 'Content',
      }),
      ...generateNavLink({
        to: ROOT_PATH,
        isRoot: true,
        shouldShowActiveForSubroutes: false,
        items: [
          {
            id: 'indices',
            name: i18n.translate('xpack.enterpriseSearch.content.nav.indicesTitle', {
              defaultMessage: 'Indices',
            }),
            ...generateNavLink({
              to: INDICES_PATH,
              isRoot: true,
              shouldShowActiveForSubroutes: true,
              items: useIndicesNav(),
            }),
          },
          {
            id: 'connector_settings',
            name: i18n.translate('xpack.enterpriseSearch.content.nav.connectorSettingsTitle', {
              defaultMessage: 'Connector settings',
            }),
            ...generateNavLink({
              to: CONNECTOR_SETTINGS_PATH,
              isRoot: true,
            }),
          },
          {
            id: 'crawler_settings',
            name: i18n.translate('xpack.enterpriseSearch.content.nav.crawlerSettingsTitle', {
              defaultMessage: 'Web crawler settings',
            }),
            ...generateNavLink({
              to: CRAWLER_SETTINGS_PATH,
              isRoot: true,
            }),
          },
        ],
      }),
    },
    {
      id: 'app_search',
      emphasize: true,
      name: i18n.translate('xpack.enterpriseSearch.content.nav.appSearchTitle', {
        defaultMessage: 'App Search',
      }),
      ...generateNavLink({
        to: APP_SEARCH_PLUGIN.URL,
        shouldNotCreateHref: true,
      }),
    },
    {
      id: 'workplace_search',
      emphasize: true,
      name: i18n.translate('xpack.enterpriseSearch.content.nav.workplaceSearchTitle', {
        defaultMessage: 'Workplace Search',
      }),
      ...generateNavLink({
        to: WORKPLACE_SEARCH_PLUGIN.URL,
        shouldNotCreateHref: true,
      }),
    },
  ];

  return navItems;
};
