import * as React from 'react';
import { GridRenderCellParams } from '../../DataTablePremium';
import { DemoLink } from './renderLink';

export function renderEmail(params: GridRenderCellParams<any, string, any>) {
  const email = params.value ?? '';

  return (
    <DemoLink href={`mailto:${email}`} tabIndex={params.tabIndex}>
      {email}
    </DemoLink>
  );
}
