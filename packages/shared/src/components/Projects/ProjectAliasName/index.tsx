/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useGetProjectAliasName } from '../../../utils';
export interface ProjectAliasNameProps {
  project: string | undefined;
  workspace?: string | undefined;
  withTitle?: boolean;
}

export default function ProjectAliasName({
  project,
  workspace,
  withTitle = true,
}: ProjectAliasNameProps) {
  if (!project) {
    return null;
  }
  const fullName = useGetProjectAliasName(project, workspace);

  return withTitle ? (
    <span style={{ cursor: 'pointer' }} title={fullName || project}>
      {fullName || project}
    </span>
  ) : (
    <span>{fullName || project}</span>
  );
}
