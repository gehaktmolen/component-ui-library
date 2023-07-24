import * as React from 'react';
import { OverridableStringUnion } from '../../types';

export interface VariantPropOverrides {}

export type DefaultVariantProp = 'plain' | 'outlined' | 'soft' | 'solid';

export interface ColorPalettePropOverrides {}

export type DefaultColorPalette = 'primary' | 'neutral' | 'danger' | 'info' | 'success' | 'warning';

export type ColorPaletteProp = OverridableStringUnion<DefaultColorPalette, ColorPalettePropOverrides>;

export type VariantProp = OverridableStringUnion<DefaultVariantProp, VariantPropOverrides>;

export const ColorInversion = React.createContext<undefined | Array<VariantProp>>(undefined);

export const useColorInversion = (childVariant: VariantProp | undefined) => {
    const overridableVariants = React.useContext(ColorInversion);
    return {
        /**
         * Resolve the `color` value for the component.
         * @param {ColorPaletteProp | 'inherit' | undefined} instanceColorProp The color defined on the instance.
         * @param {ColorPaletteProp | 'inherit' | undefined} defaultColorProp The default color to use when variant inversion is not enabled.
         */
        getColor: (
            instanceColorProp: ColorPaletteProp | 'inherit' | undefined,
            defaultColorProp: ColorPaletteProp | 'inherit' | undefined
        ): ColorPaletteProp | 'context' | undefined => {
            if (overridableVariants && childVariant) {
                if (overridableVariants.includes(childVariant)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore internal logic
                    return instanceColorProp || 'context';
                }
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore internal logic
            return instanceColorProp || defaultColorProp;
        }
    };
};

interface ColorInversionProviderProps {
    children: React.ReactNode;
    variant?: VariantProp;
}

export interface ColorInversionConfig extends Partial<Record<VariantProp, Array<VariantProp> | undefined>> {}

export default function ColorInversionProvider({ children, variant }: ColorInversionProviderProps) {
    const colorInversionConfig: ColorInversionConfig = {
        soft: ['plain', 'outlined', 'soft', 'solid'],
        solid: ['plain', 'outlined', 'soft', 'solid']
    };

    return (
        <ColorInversion.Provider value={variant ? colorInversionConfig[variant] : undefined}>
            {children}
        </ColorInversion.Provider>
    );
}
