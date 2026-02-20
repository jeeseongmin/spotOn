import { setupWorker } from "msw/browser";

import { handlers } from "@/mocks/handlers";

export const worker = setupWorker(...handlers);

export const onStartWorker = async () => {
  return worker.start({
    onUnhandledRequest: "bypass", // 처리되지 않은 요청은 실제 서버로 전달
  });
};
