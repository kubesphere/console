import { useState, useEffect } from 'react';

import { isHeaderLicenseTipHiddenStorage } from '../../utils';

export function useIsHeaderLicenseTipHidden() {
  const initialIsHeaderLicenseTipHidden = isHeaderLicenseTipHiddenStorage.get();
  const [isHeaderLicenseTipHiddenState, setIsHeaderLicenseTipHiddenState] = useState(
    initialIsHeaderLicenseTipHidden,
  );

  useEffect(() => {
    isHeaderLicenseTipHiddenStorage.onChange({
      callback: ({ isHeaderLicenseTipHidden }) =>
        setIsHeaderLicenseTipHiddenState(isHeaderLicenseTipHidden),
    });

    return () => {
      isHeaderLicenseTipHiddenStorage.offChange();
    };
  }, []);

  return { isHeaderLicenseTipHiddenState };
}
