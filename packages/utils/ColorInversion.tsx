import * as React from 'react';
import { OverridableStringUnion } from '../types';

export interface VariantPropOverrides {}

export type DefaultVariantProp = 'soft' | 'solid';

export interface ColorPalettePropOverrides {}

export type DefaultColorPalette = 'primary' | 'neutral' | 'danger';

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
        ): ColorPaletteProp | undefined => {
            if (overridableVariants && childVariant) {
                if (overridableVariants.includes(childVariant)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore internal logic
                    return instanceColorProp;
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

export function ColorInversionProvider({ children, variant }: ColorInversionProviderProps) {
    const colorInversionConfig: ColorInversionConfig = {
        soft: ['soft', 'solid'],
        solid: ['soft', 'solid']
    };

    return (
        <ColorInversion.Provider value={variant ? colorInversionConfig[variant] : undefined}>
            {children}
        </ColorInversion.Provider>
    );
}
