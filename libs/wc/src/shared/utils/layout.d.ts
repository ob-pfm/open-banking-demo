interface FlexDivProps {
    alignItems?: string;
    grow?: string;
    isVisible?: boolean;
    justifyContent?: string;
    margin?: string;
    padding?: string;
    wrap?: string;
    width?: string;
}
interface HeaderProps {
    marginBottom?: string;
    className?: string;
}
export declare const FlexRow: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, FlexDivProps, never>;
export declare const FlexColumn: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, FlexDivProps, never>;
export declare const Container: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, FlexDivProps & {
    fontFamily?: string | undefined;
}, never>;
export declare const AppContainer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, FlexDivProps, never>;
export declare const Header: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, FlexDivProps & {
    className: string;
} & HeaderProps, "className">;
export declare const Spacer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export declare const Divider: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export {};
