import { describe, it, vi, expect } from 'vitest';
import { BASE_URL } from './constants';
import { log } from 'console';

global.fetch = vi.fn()

describe('workspaces', async (test) => {
    it('should get all workspaces', async (expect) => {
        const response = await fetch(`${BASE_URL}/workspaces`);
        const workspaces = await response.json();

    });


    it('should create a workspace', async (expect) => {

    });
});