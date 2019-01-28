import { tipInfo } from "../src/index";

describe('import test', () => {
    it('testing exports', () => {
        expect(tipInfo).not.toBeUndefined();
    });
});