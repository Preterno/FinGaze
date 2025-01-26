import { toast } from "react-toastify";

export default function showToast(msg, options = {}) {
  toast(msg, {
    ...options,
  });
}
