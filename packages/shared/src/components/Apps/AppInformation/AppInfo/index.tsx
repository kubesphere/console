/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import VersionTable from './VersionTable';
import Image from '../../../Image';
import type { AppDetail, AppVersion } from '../../../../types';
import { request } from '../../../../utils';

import { AppDetailWrapper, LabelText, ImageWrapper, ImageItem } from './styles';

type Props = {
  appDetail: AppDetail | null;
  versionDetail: AppVersion[];
};

export { LabelText };

async function getImage(id: string, workspace: string) {
  return new Promise(async resolve => {
    const data: any = await request.get(
      `/kapis/application.kubesphere.io/v2/workspaces/${workspace}/attachments/${id}`,
    );
    if (data) {
      resolve(data.attachment_content.raw);
    }
  });
}

export function AppInfo({ appDetail, versionDetail }: Props): JSX.Element {
  const screenshots = appDetail?.spec.attachments;
  const [filterImages, setFilterImages] = useState<string[]>([]);

  async function getList() {
    if (!appDetail) return;
    const { workspace } = appDetail;
    // @ts-ignore
    const list: string[] = await Promise.all(screenshots?.map(item => getImage(item, workspace)));
    setFilterImages(list);
  }

  useEffect(() => {
    if (screenshots) {
      getList();
    }
  }, [screenshots]);

  return (
    <AppDetailWrapper>
      <LabelText>{t('APP_INTRODUCTION')}</LabelText>
      <div className="mb32">
        {/*// TODO 临时注释 */}
        {appDetail?.spec.abstraction ? (
          <ReactMarkdown>{appDetail.spec.abstraction}</ReactMarkdown>
        ) : (
          t('NONE')
        )}
      </div>
      <LabelText>{t('APP_SCREENSHOTS')}</LabelText>
      <div className="mb32">
        {!filterImages.length ? (
          t('NONE')
        ) : (
          <ImageWrapper>
            {filterImages.map(item => (
              <ImageItem key={item}>
                <Image iconSize={200} src={item} isBase64Str={!!item} alt="" />
              </ImageItem>
            ))}
          </ImageWrapper>
        )}
      </div>
      <LabelText>{t('APP_VERSIONS_TITLE')}</LabelText>
      <VersionTable versions={versionDetail} />
    </AppDetailWrapper>
  );
}
