import * as React from 'react';
import { UseFormControlContextReturnValue } from './FormControl.types';
import FormControlContext from './FormControlContext';

/**
 *
 * ## API
 * - [useFormControlContext API](?path=/docs/utils-formcontrol--docs#useformcontrolcontext-api)
 */
export default function useFormControlContext(): UseFormControlContextReturnValue | undefined {
    return React.useContext(FormControlContext);
}
