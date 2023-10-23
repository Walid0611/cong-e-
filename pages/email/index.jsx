document.addEventListener('DOMContentLoaded', function () {
    const emailForm = document.getElementById('email-form');
    const toInput = document.getElementById('to');
    const subjectInput = document.getElementById('subject');
    const textInput = document.getElementById('text');
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', async () => {
        const to = toInput.value;
        const subject = subjectInput.value;
        const text = textInput.value;

        try {
            const response = await axios.post('send/email', { to, subject, text });
            console.log('Email sent successfully:', response.data);
        } catch (error) {
            console.error('Failed to send email:', error);
        } 
    });
});
