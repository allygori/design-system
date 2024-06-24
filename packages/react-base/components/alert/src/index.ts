import { createAlertScope } from "./shared/context";
import Root, { type AlertRootProps } from "./root";
import Trigger, { type AlertTriggerProps } from "./trigger";
import Portal, { type AlertPortalProps } from "./portal";
import Overlay, { type AlertOverlayProps } from "./overlay";
import Content, { type AlertContentProps } from "./content";
import Action, { type AlertActionProps } from "./action";
import Cancel, { type AlertCancelProps } from "./cancel";
import Title, { type AlertTitleProps } from "./title";
import Description, { type AlertDescriptionProps } from "./description";
import DescriptionWarning, {
  type AlertDescriptionWarningProps,
} from "./description-warning";

const Alert = Root;

export type {
  AlertRootProps,
  AlertTriggerProps,
  AlertPortalProps,
  AlertOverlayProps,
  AlertContentProps,
  AlertActionProps,
  AlertCancelProps,
  AlertTitleProps,
  AlertDescriptionProps,
  AlertDescriptionWarningProps,
};
export {
  createAlertScope,
  //
  Alert,
  Trigger as AlertTrigger,
  Portal as AlertPortal,
  Overlay as AlertOverlay,
  Content as AlertContent,
  Action as AlertAction,
  Cancel as AlertCancel,
  Title as AlertTitle,
  Description as AlertDescription,
  DescriptionWarning as AlertDescriptionWarning,
  //
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Action,
  Cancel,
  Title,
  Description,
  DescriptionWarning,
};
