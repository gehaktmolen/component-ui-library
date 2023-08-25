import * as React from 'react';

export function isElement(element: any, azrnNames: readonly string[]): boolean {
    return React.isValidElement(element) && azrnNames.indexOf((element.type as any).azrnName) !== -1;
}
