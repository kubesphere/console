/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { RadioGroup, Radio, Entity, Field, Tooltip } from '@kubed/components';
import { Information } from '@kubed/icons';

import { RecommendedTag } from '../../../components/RecommendedTag';
import { Root, RangeWrapper, MismatchTag, RecommendedTagWrapper } from './ExtensionVersions.styles';

interface Option {
  value: string;
  label: string;
  k8sVersionRange: string;
  k8sVersion: string;
  isK8sSatisfied: boolean;

  ksVersionRange: string;
  ksVersion: string;
  isKsSatisfied: boolean;
  isRecommendedVersion: boolean;
  isDisabled: boolean;
}

interface ExtensionVersionsProps {
  options: Option[];
  defaultValue: string | undefined;
  isDisabled: boolean | undefined;
  onChange: (value: string) => void;
}

const VersionMismatch = ({ version }: { version: string }) => (
  <Tooltip content={t('CURRENT_VERSION_WITH_VERSION', { version })}>
    <MismatchTag>
      <Information size={16} />
      {t('VERSION_MISMATCH')}
    </MismatchTag>
  </Tooltip>
);

export function ExtensionVersions({
  options,
  defaultValue,
  isDisabled: isGroupDisabled,
  onChange,
}: ExtensionVersionsProps) {
  return (
    <Root>
      <RadioGroup defaultValue={defaultValue} disabled={isGroupDisabled} onChange={onChange}>
        {options.map(
          ({
            value,
            label,
            k8sVersionRange,
            k8sVersion,
            isK8sSatisfied,
            ksVersionRange,
            ksVersion,
            isKsSatisfied,
            isRecommendedVersion,
            isDisabled,
          }) => (
            <Entity key={value} hoverable={!isDisabled}>
              <Radio
                value={value}
                label={
                  <>
                    <Field label={label} value={value} />
                    <Field
                      label={t('KUBERNETES_VERSION_REQUIREMENTS')}
                      value={
                        <RangeWrapper>
                          <span>{k8sVersionRange}</span>
                          {!isK8sSatisfied && <VersionMismatch version={k8sVersion} />}
                        </RangeWrapper>
                      }
                    />
                    <Field
                      label={t('KUBESPHERE_VERSION_REQUIREMENTS')}
                      value={
                        <RangeWrapper>
                          <span>{ksVersionRange}</span>
                          {!isKsSatisfied && <VersionMismatch version={ksVersion} />}
                        </RangeWrapper>
                      }
                    />
                    <RecommendedTagWrapper>
                      {isRecommendedVersion && <RecommendedTag />}
                    </RecommendedTagWrapper>
                  </>
                }
                disabled={isDisabled}
              />
            </Entity>
          ),
        )}
      </RadioGroup>
    </Root>
  );
}
