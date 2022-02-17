export const numberToArrayBuffer = (value: number, length = 8): ArrayBuffer => {
    const view = new DataView(new ArrayBuffer(length));
    view.setBigUint64(0, BigInt(value));

    return view.buffer;
}

export const arrayBuffertoNumber = (array: ArrayBuffer, length = 8): number => {
    const view = new DataView(array);
    const bigIntvalue = view.getBigUint64(0);

    return Number(bigIntvalue);
}
