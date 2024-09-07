/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useRef, useState } from 'react';
import { Refresh } from '@kubed/icons';
import { useParams } from 'react-router-dom';
import { Button, LabeledValue, Select } from '@kubed/components';

import { AppDetail, AppList, AppListRefType, openpitrixStore } from '@ks-console/shared';

import { Header } from '../styles';
import { Toolbar, StyledLogo, SearchInput, StyledField } from './styles';

const { useRepoList, DEFAULT_QUERY_STATUS } = openpitrixStore;

type Props = {
  repo: any;
  onItemClick: (item: AppDetail, type: string) => void;
  workspace?: string;
};

function AppsContent({ onItemClick }: Props): JSX.Element {
  const appListRef = useRef<AppListRefType>(null);
  const { workspace } = useParams();
  const { data, isLoading } = useRepoList(
    { workspace },
    {
      autoFetch: !!workspace,
      params: { status: 'active' },
    },
  );
  const repoOptions: LabeledValue[] = useMemo(() => {
    if (isLoading || !data) {
      return [];
    }

    const options = data.map(({ name, repo_id }: any) => ({
      value: repo_id,
      label: name,
    }));

    options.unshift({
      value: null,
      label: t('CURRENT_WORKSPACE'),
    });

    return options;
  }, [data, isLoading]);
  const [keyword, setKeyword] = useState<string>('');
  const [currentRepo, setCurrentRepo] = useState<string>(repoOptions[0]?.value as string);
  const isFormWorkspace = useMemo(() => !currentRepo, [currentRepo]);

  return (
    <>
      <Header>
        <StyledLogo src="/assets/application.svg" alt="" />
        <StyledField value={t('APP_TEMPLATE_PL')} label={t('APP_TEMPLATES_MODAL_DESC')} />
      </Header>
      <Toolbar>
        <Select
          style={{ width: '216px' }}
          name="repo"
          className="selectRepos"
          placeholder={t('SELECT_APP_REPOSITORY')}
          options={repoOptions}
          value={currentRepo}
          onChange={setCurrentRepo}
        />
        <SearchInput simpleMode placeholder={t('SEARCH')} onChange={setKeyword} />
        <Button
          variant="text"
          className="btn-refresh"
          onClick={() => appListRef.current?.refresh()}
        >
          <Refresh />
        </Button>
      </Toolbar>
      <AppList
        ref={appListRef}
        workspace={workspace}
        style={{ height: 'calc(100vh - 224px)' }}
        parameter={{
          repo_id: currentRepo,
          keyword,
          status: isFormWorkspace ? DEFAULT_QUERY_STATUS : 'active',
        }}
        onAppItemClick={item => onItemClick(item, 'appDetail')}
      />
    </>
  );
}

export default AppsContent;
