import { notification } from "antd";

export function openNotificationSuccess(placement, msg) {
  notification.success({
    message: `Success !`,
    description: msg,
    placement,
  });
}

export function openNotificationError(placement, msg) {
  notification.error({
    message: `Failed `,
    description: msg,
    placement,
  });
}
