import React from "react";
import { cssInterop } from "nativewind";

interface UniversalIconProps {
  icon: React.ComponentType<any>;
  [key: string]: any;
}

// 必须缓存 cssInterop 返回的新组件，而不是原组件
const interopCache = new Map<any, React.ComponentType<any>>();

export default function AppIcon({
  icon: IconComponent,
  ...props
}: UniversalIconProps) {
  if (!IconComponent) return null;

  let ProcessedIcon = interopCache.get(IconComponent);

  if (!ProcessedIcon) {
    // 执行转换，并兼容返回值或原组件
    const InteropResult = cssInterop(IconComponent, { className: "style" });
    ProcessedIcon = (InteropResult ||
      IconComponent) as React.ComponentType<any>;

    // 确保缓存的是最终渲染的组件
    interopCache.set(IconComponent, ProcessedIcon);
  }

  return <ProcessedIcon {...props} />;
}
