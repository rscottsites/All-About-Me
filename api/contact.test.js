import { describe, it, expect, vi } from 'vitest';
import handler from './contact';

function createMockReqRes(method = 'POST', body = {}) {
  const req = {
    method,
    body,
  };
  const res = {
    statusCode: 200,
    headers: {},
    setHeader(key, val) {
      this.headers[key] = val;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.responseData = data;
      return this;
    },
  };
  return { req, res };
}

describe('Serverless Handler api/contact.js', () => {
  it('rejects non-POST requests with 405 Method Not Allowed', async () => {
    const { req, res } = createMockReqRes('GET');
    await handler(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.responseData.error).toBe('Method Not Allowed');
  });

  it('silently traps spam bots when honeypot bot_field is populated', async () => {
    const { req, res } = createMockReqRes('POST', {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      websiteUrl: 'https://spam.com',
      bot_field: 'I am a bot',
    });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.responseData.success).toBe(true);
  });

  it('validates missing required name field with 400 status', async () => {
    const { req, res } = createMockReqRes('POST', {
      name: '',
      email: 'test@example.com',
      websiteUrl: 'https://example.com',
    });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.responseData.error).toContain('Name is required');
  });

  it('validates invalid email format with 400 status', async () => {
    const { req, res } = createMockReqRes('POST', {
      name: 'Jane Doe',
      email: 'not-an-email',
      websiteUrl: 'https://example.com',
    });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.responseData.error).toContain('Valid email address is required');
  });

  it('handles valid submission payload in dev mode when RESEND_API_KEY is unset', async () => {
    const { req, res } = createMockReqRes('POST', {
      name: 'Jane Doe',
      email: 'jane@company.com',
      websiteUrl: 'https://company.com',
      platform: 'web',
      selectedPackage: 'package-a',
    });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.responseData.success).toBe(true);
  });
});
