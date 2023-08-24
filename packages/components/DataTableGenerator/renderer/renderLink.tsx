import * as React from 'react';
import { GridRenderCellParams } from '../../DataTablePremium';

interface DemoLinkProps {
  href: string;
  children: string;
  tabIndex: number;
}

export const DemoLink = React.memo(function DemoLink(props: DemoLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <a className="text-ellipsis whitespace-nowrap overflow-hidden color-inherit" tabIndex={props.tabIndex} onClick={handleClick} href={props.href}>
      {props.children}
    </a>
  );
});

export function renderLink(params: GridRenderCellParams<any, string, any>) {
  if (params.value == null) {
    return '';
  }

  return (
    <DemoLink href={params.value} tabIndex={params.tabIndex}>
      {params.value}
    </DemoLink>
  );
}
