import { TextEncoder, TextDecoder } from 'util';

export const stringToArrayBuffer = (string: string): ArrayBuffer  => {
    return new TextEncoder().encode(string);
}

export const arrayBufferToString = (buffer: ArrayBuffer): string => {
    return new TextDecoder().decode(buffer);
}
