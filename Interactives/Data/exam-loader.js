// Exam Data Loader and Generator
class ExamDataLoader {
    constructor() {
        this.examData = null;
        this.currentSubject = null;
    }

    async loadExamData(subject) {
        try {
            const filename = subject === 'matte' ? 'matte2026.json' : 'engelsk2026.json';
            const response = await fetch(`./Data/${filename}`);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            
            this.examData = await response.json();
            this.currentSubject = subject;
            return this.examData;
        } catch (error) {
            console.error('Error loading exam data:', error);
            alert('Kunne ikke laste eksamen. Sjekk at JSON-filen finnes i Data-mappen.');
            return null;
        }
    }

    generateTasksHTML(part) {
        if (!this.examData || !this.examData.sections[part]) {
            return '';
        }

        const section = this.examData.sections[part];
        let html = '';

        // Add section header
        html += `
            <div style="background: var(--bg-light); padding: 2rem; margin: 3rem 0 3rem 0; border-radius: 12px; border-left: 4px solid var(--success-green);">
                <h3 style="color: var(--success-green); margin-bottom: 0.5rem;">${section.title}</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">${section.description}</p>
            </div>
        `;

        // Generate tasks
        section.tasks.forEach((task, index) => {
            html += this.generateTaskHTML(task, index, part);
        });

        return html;
    }

    generateTaskHTML(task, index, part) {
        let html = `
            <div class="task" data-task="${task.id}" data-part="${task.id}" data-type="${task.type}">
                <div class="task-header">
                    <div class="task-number">${index + 1}</div>
                    <h3 class="task-title">${task.title}</h3>
                </div>
                <div class="task-content">
        `;

        // Render based on task type
        switch (task.type) {
            case 'multiple':
                html += this.renderMultipleChoice(task);
                break;
            case 'calculation':
                html += this.renderCalculation(task);
                break;
            case 'text':
                html += this.renderText(task);
                break;
            case 'sequence':
                html += this.renderSequence(task);
                break;
            case 'multipart':
                html += this.renderMultipart(task);
                break;
            case 'listening':
            case 'reading':
                html += this.renderListeningReading(task);
                break;
            case 'summary':
                html += this.renderSummary(task);
                break;
            case 'forum_response':
                html += this.renderForumResponse(task);
                break;
            case 'essay':
                html += this.renderEssay(task);
                break;
        }

        html += `
                </div>
            </div>
        `;

        return html;
    }

    renderMultipleChoice(task) {
        let html = '<div class="multiple-choice">';
        
        if (task.options && Array.isArray(task.options)) {
            task.options.forEach((option, i) => {
                const optionLetter = String.fromCharCode(65 + i);
                html += `
                    <div class="choice-option" onclick="selectChoice(this, '${optionLetter}')">
                        <input type="radio" name="task${task.id}" value="${optionLetter}" id="t${task.id}${optionLetter}">
                        <label for="t${task.id}${optionLetter}">${option.label}</label>
                    </div>
                `;
            });
        } else {
            html += '<p style="color: var(--text-secondary);">Ingen svar valg tilgjengelig.</p>';
        }

        html += '</div>';
        return html;
    }

    renderCalculation(task) {
        const label = task.label || 'Svar:';
        const placeholder = task.placeholder || 'Skriv ditt svar...';
        return `
            <div class="calculation-box">
                <label>${label}</label>
                <input type="number" class="calculation-input" id="task${task.id}-answer" placeholder="${placeholder}">
            </div>
        `;
    }

    renderText(task) {
        const placeholder = task.placeholder || 'Skriv ditt svar...';
        return `
            <div class="input-section">
                <textarea class="text-input-area" id="task${task.id}-answer" placeholder="${placeholder}"></textarea>
            </div>
        `;
    }

    renderSequence(task) {
        let html = '<div style="display: flex; gap: 1rem; flex-wrap: wrap;">';
        
        if (task.parts && Array.isArray(task.parts)) {
            task.parts.forEach((part, i) => {
                const label = part.label || `Del ${i + 1}`;
                const placeholder = part.placeholder || 'Skriv ditt svar...';
                html += `
                    <div class="calculation-box" style="margin: 0; flex: 1; min-width: 150px;">
                        <label>${label}</label>
                        <input type="number" class="calculation-input" id="task${task.id}${String.fromCharCode(97 + i)}-answer" placeholder="${placeholder}">
                    </div>
                `;
            });
        }

        html += '</div>';
        return html;
    }

    renderMultipart(task) {
        let html = '';
        
        if (task.parts && Array.isArray(task.parts)) {
            task.parts.forEach((part) => {
                const subtitle = part.subtitle || 'Delpunkt';
                html += `
                    <div class="task-subtitle">
                        <span class="material-icons">edit</span>
                        ${subtitle}
                    </div>
                `;

                if (part.type === 'text') {
                    const placeholder = part.placeholder || 'Skriv ditt svar...';
                    html += `
                        <div class="input-section">
                            <textarea class="text-input-area" id="task${part.id}-answer" placeholder="${placeholder}"></textarea>
                        </div>
                    `;
                } else if (part.type === 'calculation') {
                    const label = part.label || 'Svar:';
                    const placeholder = part.placeholder || 'Skriv ditt svar...';
                    html += `
                        <div class="calculation-box">
                            <label>${label}</label>
                            <input type="number" class="calculation-input" id="task${part.id}-answer" placeholder="${placeholder}">
                        </div>
                    `;
                }

                html += '<div style="margin-top: 2rem;"></div>';
            });
        }

        return html;
    }

    renderListeningReading(task) {
        let html = '';
        
        if (task.context) {
            html += `<div class="task-text" style="background: var(--bg-light); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;"><em>${task.context}</em></div>`;
        }

        html += '<div class="multiple-choice">';
        
        if (task.options) {
            task.options.forEach((option, i) => {
                const optionLetter = String.fromCharCode(65 + i);
                html += `
                    <div class="choice-option" onclick="selectChoice(this, '${optionLetter}')">
                        <input type="radio" name="task${task.id}" value="${optionLetter}" id="t${task.id}${optionLetter}">
                        <label for="t${task.id}${optionLetter}">${option.label}</label>
                    </div>
                `;
            });
        }

        html += '</div>';
        return html;
    }

    renderSummary(task) {
        const instruction = task.instruction || '';
        const placeholder = task.placeholder || 'Skriv ditt svar...';
        return `
            <div class="task-text">${instruction}</div>
            <div class="input-section">
                <textarea class="text-input-area" id="task${task.id}-answer" placeholder="${placeholder}"></textarea>
            </div>
        `;
    }

    renderForumResponse(task) {
        let html = '<div class="task-text">';
        
        if (task.posts && Array.isArray(task.posts)) {
            task.posts.forEach(post => {
                const author = post.author || 'Anonym';
                const role = post.role || '';
                const date = post.date || '';
                const content = post.content || '';
                html += `
                    <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--primary-red);">
                        <div style="font-weight: 600; color: var(--text-primary);">${author}</div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">${role}${date ? `, ${date}` : ''}</div>
                        <p style="margin-top: 0.75rem;">${content}</p>
                    </div>
                `;
            });
        }

        html += '</div>';
        const taskText = task.task || 'Skriv ditt svar';
        const placeholder = task.placeholder || 'Skriv ditt svar...';
        html += `
            <div class="task-subtitle">
                <span class="material-icons">edit</span>
                ${taskText}
            </div>
            <div class="input-section">
                <textarea class="text-input-area" id="task${task.id}-answer" placeholder="${placeholder}"></textarea>
            </div>
        `;

        return html;
    }

    renderEssay(task) {
        const instruction = task.instruction || 'Skriv ditt essay';
        const requirements = task.requirements || '';
        const wordCount = task.wordCount || '200-400';
        const placeholder = task.placeholder || 'Skriv ditt essay her...';
        
        let html = `
            <div class="task-text">
                <p><strong>${instruction}</strong></p>
        `;

        if (task.format && Array.isArray(task.format)) {
            html += `<p style="margin-top: 0.75rem;"><em>Sjanger: ${task.format.join(' eller ')}</em></p>`;
        }

        html += `
                <p style="margin-top: 0.75rem; color: var(--text-secondary);">${requirements}</p>
                <p style="margin-top: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">Ord: ${wordCount}</p>
            </div>
            <div class="input-section">
                <textarea class="text-input-area" id="task${task.id}-answer" placeholder="${placeholder}" style="min-height: 400px;"></textarea>
            </div>
        `;

        return html;
    }
}

// Global instance
const examLoader = new ExamDataLoader();

// Keep track of selected subject globally
let currentSelectedSubject = null;

// Override selectSubject to load JSON first
window.selectSubject = async function(subject) {
    if (subject === 'matte' || subject === 'engelsk') {
        currentSelectedSubject = subject;
        
        const data = await examLoader.loadExamData(subject);
        if (data) {
            // Update the UI
            document.querySelectorAll('.subject-card').forEach(card => {
                card.classList.remove('selected');
            });
            const cardId = subject === 'matte' ? 'card-matte' : 'card-engelsk';
            document.getElementById(cardId).classList.add('selected');
            document.getElementById('start-btn').disabled = false;
        }
    }
};

// Override startExam to generate tasks from JSON
window.startExam = function() {
    if (!currentSelectedSubject) return;
    
    // Show exam interface
    document.getElementById('subject-selection').style.display = 'none';
    document.getElementById('exam-interface').style.display = 'block';
    document.getElementById('exam-interface').classList.add('fade-in');
    
    document.getElementById('step-1').classList.remove('active');
    document.getElementById('step-1').classList.add('completed');
    document.getElementById('step-2').classList.add('active');
    
    // Load and generate exam content
    const examContent = document.querySelector('.exam-content');
    if (examContent && examLoader.examData && examLoader.currentSubject === currentSelectedSubject) {
        // Clear all old content
        examContent.innerHTML = '';
        
        // Add loading indicator
        examContent.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--text-secondary);"><span class="material-icons" style="font-size: 2.5rem; animation: spin 1s linear infinite; display: inline-block;">autorenew</span><p style="margin-top: 1rem;">Laster eksamen...</p></div>';
        
        // Small delay to show loading state
        setTimeout(() => {
            examContent.innerHTML = '';
            
            // Add subject title
            const subjectTitle = currentSelectedSubject === 'matte' ? 'Matematikk' : 'Engelsk';
            let tasksHtml = `<div style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 2px solid var(--border-light);"><h2 style="color: var(--primary-red); font-size: 2rem;">Eksamen i ${subjectTitle} 2026</h2><p style="color: var(--text-secondary); margin-top: 0.5rem;">Total tid: 5 timer</p></div>`;
            
            // Generate all tasks from JSON
            examLoader.examData.sections.forEach((section, sectionIndex) => {
                tasksHtml += examLoader.generateTasksHTML(sectionIndex);
            });
            
            examContent.innerHTML = tasksHtml;
            
            // Scroll to top
            document.querySelector('.exam-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
    
    setDeliveryTime();
};

// Add CSS animation for spinning icon
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
