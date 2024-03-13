import { ReactNode } from "react";
import { Button } from "react-bootstrap";

export default function ButtonLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Button as="a" href={href}>
      {children}
    </Button>
  );
}
