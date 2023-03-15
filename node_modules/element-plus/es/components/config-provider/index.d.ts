export declare const ElConfigProvider: import("../../utils/types").SFCWithInstall<import("vue").DefineComponent<{
    readonly size: import("../../utils/props").BuildPropReturn<StringConstructor, unknown, unknown, "small" | "large" | "medium" | "mini", unknown>;
    readonly button: import("../../utils/props").BuildPropReturn<import("../../utils/props").PropWrapper<import("..").ButtonConfigContext>, unknown, unknown, unknown, unknown>;
    readonly locale: import("../../utils/props").BuildPropReturn<import("../../utils/props").PropWrapper<import("../../locale").Language>, unknown, unknown, unknown, unknown>;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    readonly size?: unknown;
    readonly button?: unknown;
    readonly locale?: unknown;
} & {} & {
    button?: import("..").ButtonConfigContext | undefined;
    size?: import("../../utils/props").BuildPropType<StringConstructor, "small" | "large" | "medium" | "mini", unknown> | undefined;
    locale?: import("../../locale").Language | undefined;
}>, {
    button: import("..").ButtonConfigContext;
    size: import("../../utils/props").BuildPropType<StringConstructor, "small" | "large" | "medium" | "mini", unknown>;
    locale: import("../../locale").Language;
}>> & Record<string, any>;
export default ElConfigProvider;
export * from './src/config-provider';
