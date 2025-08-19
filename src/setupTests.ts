/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from "util";

if (!global.TextEncoder) {
  (global as any).TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  (global as any).TextDecoder = TextDecoder as any;
}