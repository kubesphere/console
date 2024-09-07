/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import { isEmpty, sortBy } from 'lodash';
import { Alert, Card, TypeSelect, Tag, Loading } from '@kubed/components';
import { DiffViewer } from '@kubed/diff-viewer';

import { Icon, useRevisionStore, formatTime, getCurrentRevision, yaml } from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';
import Text from '../Text';
import { YamlHeader, DiffWrapper } from './styles';

interface IProps {
  detailPropsName: string;
}

const RevisionControl = ({ detailPropsName }: IProps) => {
  const [props] = useStore(detailPropsName);
  const { detail, module, isLoading } = props;
  const [selectRevision, setSelectRevision] = useState<Number>(0);

  const { list, fetchList } = useRevisionStore({ module: module });

  const getCurRevision = ({ revisions }: { revisions: any }) => {
    return getCurrentRevision({ workloadDetail: detail, revisions, module: module });
  };

  const fetchData = async () => {
    if (isEmpty(detail)) {
      return;
    }

    const revisions = await fetchList(
      detail as { name: string; cluster: string; namespace: string; selector: string },
    );

    setSelectRevision(getCurRevision({ revisions }));
  };

  useEffect(() => {
    fetchData();
  }, [detail]);

  const getRevisions = ({ revisions }: { revisions: any }) => {
    const curRevision = getCurRevision({ revisions });
    if (!curRevision) {
      return [];
    }

    return sortBy(list, (item: Record<string, any>) => parseInt(item.revision, 10))
      .reverse()
      .map(item => {
        let label: any = `#${item.revision} (${item.name.replace(`${item.ownerName}-`, '')})`;
        if (item.revision === curRevision) {
          label = (
            <span>
              <span>{label}</span> <Tag color="success">{t('RUNNING')}</Tag>
            </span>
          );
        }
        const description = t('CREATED_TIME', {
          diff: formatTime(item.createTime),
        });
        return {
          label,
          description,
          icon: <Icon name="timed-task" size={40} />,
          value: item.revision,
        };
      });
  };

  const handleVersionChange = (version: number) => {
    setSelectRevision(version);
  };

  const renderDiff = () => {
    const lastRevision = Math.max(Number(selectRevision) - 1, 0);

    const newRevision = list.find((item: Record<string, any>) => item.revision === selectRevision);
    const oldRevision = list.find((item: Record<string, any>) => item.revision === lastRevision);

    const newYaml = newRevision ? yaml.getValue(newRevision._originData) : '';
    const oldYaml = oldRevision ? yaml.getValue(oldRevision._originData) : '';
    return (
      <DiffViewer
        oldValue={oldYaml}
        newValue={newYaml}
        title={t('CONFIG_FILE')}
        description={
          oldRevision
            ? t('COMPARE_WITH', {
                version: `#${lastRevision} (${oldRevision.name.replace(
                  `${oldRevision.ownerName}-`,
                  '',
                )})`,
              })
            : ''
        }
      />
    );
  };

  const revision = list.find((item: Record<string, any>) => item.revision === selectRevision);

  const renderSelect = () => {
    if (!list) {
      return null;
    }

    const options = getRevisions({ revisions: list });
    return (
      !isEmpty(options) && (
        <TypeSelect options={getRevisions({ revisions: list })} onChange={handleVersionChange} />
      )
    );
  };

  return isLoading ? (
    <Loading className="page-loading" />
  ) : (
    <>
      <Card sectionTitle={t('REVISION_RECORDS')}>
        <Alert className="mb12" showIcon={false}>
          {t('REVISION_RECORDS_DESC')}
        </Alert>
        {renderSelect()}
      </Card>
      {revision && (
        <Card className="mt12">
          <YamlHeader>
            <Text title={`#${revision.revision}`} description={t('SERIAL_NUMBER')} />
            <Text title={formatTime(revision.createTime)} description={t('CREATION_TIME')} />
          </YamlHeader>
          <DiffWrapper>{renderDiff()}</DiffWrapper>
        </Card>
      )}
    </>
  );
};

export default RevisionControl;
