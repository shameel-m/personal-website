const commands = {
    help: 'Available commands:\nhelp - Show this help message\nclear - Clear the terminal\nls - List directory contents\nabout - About me',
    clear: function() { document.getElementById('output').innerHTML = ''; },
    ls: 'projects.txt\nskills.txt\ncontact.txt',
    about: 'I am Mohammed Shameel, a passionate developer...',
};

const input = document.getElementById('input');
const output = document.getElementById('output');

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const inputText = input.value;
        const cmd = inputText.trim().toLowerCase();
        input.value = '';
        
        // Always display the command line
        const cmdLine = document.createElement('div');
        cmdLine.className = 'output';
        cmdLine.textContent = `mohammed@shameel $ ${inputText}`;
        output.appendChild(cmdLine);

        // Process command only if not empty
        if (cmd) {
            if (commands[cmd]) {
                const response = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
                if (response) {
                    const responseElement = document.createElement('div');
                    responseElement.className = 'output';
                    responseElement.textContent = response;
                    output.appendChild(responseElement);
                }
            } else {
                const error = document.createElement('div');
                error.className = 'output';
                error.textContent = `Command not found: ${cmd}`;
                output.appendChild(error);
            }
        }

        // Add new input line
        const newInputLine = document.createElement('div');
        newInputLine.className = 'input-line';
        newInputLine.innerHTML = `
            <span class="prompt">mohammed@shameel $</span>
            <input type="text" class="terminal-input" autofocus>
        `;

        output.parentElement.appendChild(newInputLine);
        
        // Move focus to new input
        const newInput = newInputLine.querySelector('.terminal-input');
        newInput.focus();
        
        // Remove old input
        input.parentElement.remove();

        // Update scroll position
        output.parentElement.scrollTop = output.parentElement.scrollHeight;
    }
});