import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generalErrorHandling } from '../generalErrorHandling';

const { mockShow, mockToast } = vi.hoisted(() => ({
  mockShow: vi.fn(),
  mockToast: vi.fn(),
}));

vi.mock('UiKit/store/useGlobalAlert', () => ({
  useGlobalAlert: () => ({ show: mockShow }),
}));
vi.mock('UiKit/components/Base/VToast/use-toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

describe('generalErrorHandling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows global alert for 5xx and does not call toast', async () => {
    const response = new Response(JSON.stringify({ message: 'Database unavailable' }), {
      status: 500,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    await generalErrorHandling(response);

    expect(mockShow).toHaveBeenCalledTimes(1);
    const [callArg] = mockShow.mock.calls[0];
    expect(callArg.variant).toBe('error');
    expect(callArg.title).toContain('experiencing technical issues');
    expect(callArg.message).toContain('status 500');
    expect(callArg.message).toContain('Details: Database unavailable');
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('includes server message in global alert when present', async () => {
    const response = new Response(
      JSON.stringify({ __error__: 'Upstream gateway timeout' }),
      { status: 502, headers: new Headers({ 'Content-Type': 'application/json' }) }
    );

    await generalErrorHandling(response);

    expect(mockShow).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('Details: Upstream gateway timeout'),
      })
    );
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('shows toast for non-5xx and does not call global alert', async () => {
    const response = new Response(JSON.stringify({ message: 'Validation failed' }), {
      status: 422,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    await generalErrorHandling(response);

    expect(mockShow).not.toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledTimes(1);
  });

  it('handles 5xx with nested error.message and truncates long messages', async () => {
    const longMessage = 'x'.repeat(300);
    const response = new Response(
      JSON.stringify({ error: { message: longMessage } }),
      { status: 503, headers: new Headers({ 'Content-Type': 'application/json' }) }
    );

    await generalErrorHandling(response);

    expect(mockShow).toHaveBeenCalledTimes(1);
    const [callArg] = mockShow.mock.calls[0];
    expect(callArg.message).toContain('status 503');
    expect(callArg.message).toMatch(/Details: x{177}…$/);
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('falls back to banner without details when 5xx body is not JSON', async () => {
    const response = new Response('Internal error', {
      status: 500,
      headers: new Headers({ 'Content-Type': 'text/plain' }),
    });

    await generalErrorHandling(response);

    expect(mockShow).toHaveBeenCalledTimes(1);
    const [callArg] = mockShow.mock.calls[0];
    expect(callArg.message).toContain('status 500');
    expect(callArg.message).not.toContain('Details:');
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('skips toast for non-5xx when session_refresh_required is returned', async () => {
    const response = new Response(
      JSON.stringify({ error: { id: 'session_refresh_required' } }),
      { status: 401, headers: new Headers({ 'Content-Type': 'application/json' }) }
    );

    await generalErrorHandling(response);

    expect(mockShow).not.toHaveBeenCalled();
    expect(mockToast).not.toHaveBeenCalled();
  });
});
