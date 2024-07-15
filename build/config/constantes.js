"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date = new Date();
const CONSTANTES = {
    PENDING: 'Pending',
    SENT: 'Sent',
    ERROR_SERVER: 'Oops, an unexpected error occurred on the server.',
    ERROR_REQUEST: 'Upps error in the request',
    SENT_LOG: 'sent',
    DATE_YEAR: `${date.getFullYear()}`,
    DATE_COMPLETE_: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    INCORRECT_VALUES: 'Unregistered user or incorrect fields',
    NOT_FOUND: 'Not found',
    RUTA_IMAGE_DEFAULT: './uploads/',
    IMAGE_USER: 'imagePerfil'
};
Object.freeze(CONSTANTES);
exports.default = CONSTANTES;
