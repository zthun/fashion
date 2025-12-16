import { Router, type RouterProps } from "react-router-dom";

export interface IZRouterProps extends Omit<
  RouterProps,
  "unstable_useTransitions"
> {}

export function ZTestRouter(props: IZRouterProps) {
  return <Router {...props} unstable_useTransitions={false} />;
}
