import { Central } from './util';
import { domain } from '../constants';

interface LoginResponse {
  token: string;
}

export const Users = {
  async login(email: string, password: string): Promise<void> {
    const response = await Central.request(
      "/users/login",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }
    );

    if (response.ok) {
      const json: LoginResponse = await response.json();
      document.cookie = `token=${json.token}; domain=.${domain}; path=/`;
    } else {
      throw new Error('Access denied');
    }
  },

  token(): string {
    const tokens = document.cookie
      .replace(' ', '')
      .split(';')
      .filter(cookie => cookie.startsWith("token="));

    if (tokens.length > 0) {
      return tokens[0].split('=')[1];
    } else {
      return '';
    }
  }
}
