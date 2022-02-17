import { createHmac } from 'crypto';

export const generateHash = (secret: string, identity: string) => {
    return createHmac('SHA256', secret).update(identity).digest('base64');
}
