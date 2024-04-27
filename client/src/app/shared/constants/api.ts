import { HttpHeaders } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const API_HOST = isDevMode() ? 'http://localhost:8080' : 'https://your.domain.com';

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
