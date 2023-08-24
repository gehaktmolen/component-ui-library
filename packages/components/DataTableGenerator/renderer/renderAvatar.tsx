import * as React from 'react';
import { Avatar } from '../../Avatar';
import { GridRenderCellParams } from '../../DataTablePremium';

export function renderAvatar(
  params: GridRenderCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar style={{ backgroundColor: params.value.color }}>
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}
