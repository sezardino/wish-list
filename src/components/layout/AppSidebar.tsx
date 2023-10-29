"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { Brand } from "../base/Brand";
import { Icon, IconNames } from "../base/Icon";

export type AppSidebarItem = {
  label: string;
  to: string;
  onClick?: () => void;
  icon: IconNames;
};

export type AppSidebarProps = ComponentPropsWithoutRef<"aside"> & {
  lists: AppSidebarItem[][];
  brandHref: string;
};

export const AppSidebar: FC<AppSidebarProps> = (props) => {
  const { brandHref, lists, className, ...rest } = props;
  const t = useTranslations("layout.application.sidebar");

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <aside
      {...rest}
      className={twMerge(
        "relative h-screen flex flex-col transition-transform md:translate-x-0 border-r py-5 px-3",
        isOpen && "translate-x-0",
        !isOpen && "-translate-x-full",
        className
      )}
      aria-label={t("title")}
    >
      <Brand href={brandHref} isTextHidden={!isExpanded} />
      <div className="mt-5 overflow-y-auto h-full">
        {lists.map((items, index) => (
          <ul
            key={index}
            className={twMerge(
              index === 0
                ? "space-y-2"
                : "pt-5 mt-5 space-y-2 border-t border-gray-200"
            )}
          >
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.to}
                  className="flex items-center p-2 text-base font-medium rounded-lg hover:bg-gray-500 group"
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick;
                  }}
                >
                  <Icon name={item.icon} />
                  <span
                    className={twMerge(
                      "ml-3",
                      !isExpanded && !isOpen && "sr-only"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type="button"
        className="absolute bottom-7 right-0 translate-x-1/2 z-10 border rounded-full p-1 bg-gray-50 max-md:hidden"
        onClick={toggleExpanded}
      >
        <Icon
          name={!isExpanded ? "HiChevronDoubleRight" : "HiChevronDoubleLeft"}
          size={14}
        />
      </button>

      <button
        type="button"
        className="absolute bottom-7 left-full translate-x-3 z-10 border rounded-full p-2 md:hidden"
        onClick={toggleOpen}
        aria-label={isOpen ? t("close-sidebar") : t("open-sidebar")}
      >
        <Icon name={!isOpen ? "HiMenu" : "HiOutlineXCircle"} size={24} />
      </button>
    </aside>
  );
};
