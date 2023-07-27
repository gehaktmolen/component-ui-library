import * as React from 'react';
import { UseFormControlContextReturnValue } from './FormControl.types';
import FormControlContext from './FormControlContext';

/**
 *
 * API:
 *
 * - [useFormControlContext API](https://#use-form-control-context)
 */
export default function useFormControlContext(): UseFormControlContextReturnValue | undefined {
    return React.useContext(FormControlContext);
}
