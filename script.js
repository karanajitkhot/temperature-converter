document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const tempInput = document.getElementById('temperature');
    const scaleSelect = document.getElementById('scale');
    const convertBtn = document.getElementById('convert-btn');
    const resultSpan = document.getElementById('converted-value');
    const resultDiv = document.getElementById('result');

    // Input validation
    tempInput.addEventListener('input', (e) => {
        if (e.target.value === '') return;
        const value = parseFloat(e.target.value);
        if (isNaN(value)) {
            e.target.value = e.target.value.slice(0, -1);
        }
    });

    convertBtn.addEventListener('click', () => {
        const temperature = parseFloat(tempInput.value);
        const scale = scaleSelect.value;
        
        if (!temperature && temperature !== 0) {
            alert('Please enter a valid temperature');
            return;
        }

        const conversions = {
            celsius: {
                fahrenheit: (temp) => (temp * 9/5) + 32,
                kelvin: (temp) => temp + 273.15,
                celsius: (temp) => temp
            },
            fahrenheit: {
                celsius: (temp) => (temp - 32) * 5/9,
                kelvin: (temp) => ((temp - 32) * 5/9) + 273.15,
                fahrenheit: (temp) => temp
            },
            kelvin: {
                celsius: (temp) => temp - 273.15,
                fahrenheit: (temp) => ((temp - 273.15) * 9/5) + 32,
                kelvin: (temp) => temp
            }
        };

        const results = [];
        for (const targetScale in conversions[scale]) {
            if (targetScale !== scale) {
                const converted = conversions[scale][targetScale](temperature);
                const roundedValue = Math.round(converted * 100) / 100;
                results.push(`${roundedValue}°${targetScale.charAt(0).toUpperCase()}`);
            }
        }

        resultSpan.textContent = results.join(' or ');
        resultDiv.classList.add('has-value');
    });
});
