import type { ComponentPropsWithoutRef } from "react";

const LINK_WRAP =
  "inline-block max-w-full hyphens-none [overflow-wrap:anywhere]";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href" | "children"> & {
  email: string;
};

/** Mailto anchor that wraps cleanly in narrow layouts (footer, cards). */
export default function MailtoLink({ email, className = "", ...rest }: Props) {
  return (
    <a href={`mailto:${email}`} className={`${LINK_WRAP} ${className}`.trim()} {...rest}>
      {email}
    </a>
  );
}
