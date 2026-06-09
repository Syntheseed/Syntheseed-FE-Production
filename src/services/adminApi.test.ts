import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { updateCareer, fetchAdminCareers } from './adminApi';

describe('adminApi careers', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('updateCareer sends a PATCH with is_active to the career endpoint', async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: 5, is_active: false }),
    });

    await updateCareer('tok', 5, { is_active: false });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('/api/admin/careers/5/');
    expect(options.method).toBe('PATCH');
    expect((options.headers as Record<string, string>).Authorization).toBe('Token tok');
    expect(JSON.parse(options.body as string)).toEqual({ is_active: false });
  });

  it('throws UNAUTHORIZED on a 401 so the caller can log out', async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue({ ok: false, status: 401, json: async () => ({}) });

    await expect(fetchAdminCareers('tok')).rejects.toThrow('UNAUTHORIZED');
  });
});
