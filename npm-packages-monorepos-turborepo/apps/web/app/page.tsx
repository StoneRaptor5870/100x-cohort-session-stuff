import styles from "./page.module.css";
import { Button } from "@repo/ui/button";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <Button appName="Web App">
      Hi There
    </Button>
  );
}