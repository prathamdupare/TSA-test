document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const answer = item.querySelector('.faq-answer');
        const arrow = item.querySelector('svg');

        button.addEventListener('click', () => {
            const isOpen = answer.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherArrow = otherItem.querySelector('svg');
                
                otherAnswer.classList.remove('active');
                otherArrow.classList.remove('rotate-180');
            });

            // Toggle current item
            if (!isOpen) {
                answer.classList.add('active');
                arrow.classList.add('rotate-180');
            }
        });
    });
});