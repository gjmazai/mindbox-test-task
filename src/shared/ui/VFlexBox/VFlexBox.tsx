import { Box, type BoxProps } from '@mui/material';
import { Property } from 'csstype';
import { styled } from 'styled-components';

type VFlexBoxProps = BoxProps & {
	align?: Property.AlignItems;
	justify?: Property.JustifyItems;
	gap?: number;
	reverse?: boolean;
};

export const VFlexBox = styled(Box)<VFlexBoxProps>(({ align, justify, gap, reverse }: VFlexBoxProps) => ({
	height: '100%',
	display: 'flex',
	flexDirection: reverse ? 'column-reverse' : 'column',
	alignItems: align,
	justifyItems: justify,
	gap,
}));
