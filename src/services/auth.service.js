import * as crypto from 'crypto';

export class AuthService {

    generateAuthToken() {
        return crypto.randomBytes(64).toString('hex');
    }
}

