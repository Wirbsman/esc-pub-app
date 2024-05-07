import { HttpHeaders } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const API_HOST = isDevMode() ? 'https://api.esc-pub.dev.azmedia-web.de' : 'https://api.esc-pub.dev.azmedia-web.de';

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
