import { port } from './index';

describe('test', () => {
  it('should pass', () => {
    const checkPort = port;
    expect(checkPort).toBe(3000);
  });
});
