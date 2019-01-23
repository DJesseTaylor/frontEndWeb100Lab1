try {
    import { tipButtons, tipPercentSelected } from "../src/index";
} catch (error) {
    console.log(error);
}


describe('tipPercentSelected functionality', () => {
    it('clicked button disabled, others enabled', () => {
        tipButtons = document.querySelectorAll(".btn.btn-secondary");
        tipButtons.forEach(b => {
            b.addEventListener('click', tipPercentSelected);
        });
        tipButtons[0].click()

        expect(tipButtons[0].disabled).toBe(true);
        expect(tipButtons[1].disabled).toBe(false);
        expect(tipButtons[2].disabled).toBe(false);
    });
    
});