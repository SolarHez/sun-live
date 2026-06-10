import * as LucideIconsNative from "lucide-react-native";
import * as TablerIconsNative from "@tabler/icons-react";
import { cssInterop } from "nativewind";

Object.values(LucideIconsNative).forEach((Icon: any) => {
  if (typeof Icon === "function" || typeof Icon === "object") {
    cssInterop(Icon, { className: "style" });
  }
});

Object.values(TablerIconsNative).forEach((Icon: any) => {
  if (typeof Icon === "function" || typeof Icon === "object") {
    cssInterop(Icon, { className: "style" });
  }
});

type LucideName = keyof typeof LucideIconsNative;
type TablerName = keyof typeof TablerIconsNative;

type PrefixedLucideName = `lucide:${LucideName}`;
type PrefixedTablerName = `tabler:${TablerName}`;

type IconName = PrefixedLucideName | PrefixedTablerName | LucideName;

interface UniversalIconProps {
  name: IconName;
  [key: string]: any; // 兼容两个库不同的 props 属性
}

export default function AppIcon({ name, ...props }: UniversalIconProps) {
  let IconComponent: React.ComponentType<any> | null = null;
  let finalName = name;

  if (name.includes(":")) {
    const [prefix, iconRealName] = name.split(":");
    finalName = iconRealName as IconName; // 实际的图标变量名

    if (prefix === "tabler") {
      IconComponent = TablerIconsNative[
        iconRealName as TablerName
      ] as React.ComponentType<any>;
    } else if (prefix === "lucide") {
      IconComponent = LucideIconsNative[
        iconRealName as LucideName
      ] as React.ComponentType<any>;
    }
  } else {
    // 如果没有冒号前缀，默认从 Lucide 库中查找
    IconComponent = LucideIconsNative[
      name as LucideName
    ] as React.ComponentType<any>;
  }

  if (!IconComponent) {
    console.warn(`[AppIcon] 找不到图标: "${name}"`);
    return null;
  }

  return <IconComponent {...props} />;
}
