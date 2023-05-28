import { handlers } from "../setupTests";
import { setupWorker } from "msw";

export const worker = setupWorker(...handlers);