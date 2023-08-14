import PropTypes from 'prop-types';
import { exactProp } from '../../utils';
import { DropdownProps } from './Dropdown.types';
import { DropdownContext } from '../useDropdown';
import { useDropdown } from '../useDropdown';

/**
 *
 * ## Dropdown API
 * - [Dropdown API](#dropdown)
 */
function Dropdown(props: DropdownProps) {
    const { children, open, defaultOpen, onOpenChange } = props;

    const { contextValue } = useDropdown({
        defaultOpen,
        onOpenChange,
        open
    });

    return <DropdownContext.Provider value={contextValue}>{children}</DropdownContext.Provider>;
}

Dropdown.propTypes = {
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * If `true`, the dropdown is initially open.
     */
    defaultOpen: PropTypes.bool,
    /**
     * Callback fired when the component requests to be opened or closed.
     */
    onOpenChange: PropTypes.func,
    /**
     * Allows to control whether the dropdown is open.
     * This is a controlled counterpart of `defaultOpen`.
     */
    open: PropTypes.bool
} as any;

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    (Dropdown as any)['propTypes' + ''] = exactProp(Dropdown.propTypes);
}

export { Dropdown };
