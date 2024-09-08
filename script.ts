function saveChanges(sectionId: string, content: string): void {
  try {
    localStorage.setItem(sectionId, content);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}
function loadChanges(): void {
  try {
    document.querySelectorAll('.section').forEach((section) => {
      const savedContent = localStorage.getItem(section.id);
      if (savedContent) {
        (section as HTMLElement).innerHTML = savedContent;
      }
    });
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
}
document.querySelectorAll('.section').forEach((section) => {
  section.addEventListener('click', () => {
    (section as HTMLElement).setAttribute('contenteditable', 'true');
    (section as HTMLElement).focus();
  });

  section.addEventListener('blur', () => {
    (section as HTMLElement).setAttribute('contenteditable', 'false');
    saveChanges(section.id, (section as HTMLElement).innerHTML);
  });

  section.addEventListener('input', () => {
    saveChanges(section.id, (section as HTMLElement).innerHTML);
  });
});
const profilePictureUpload = document.getElementById('profile-picture-upload') as HTMLInputElement;
const profilePicture = document.getElementById('profile-picture') as HTMLImageElement;

if (profilePictureUpload && profilePicture) {
  profilePictureUpload.addEventListener('change', () => {
    const file = profilePictureUpload.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          profilePicture.src = e.target.result.toString();
          saveChanges('profile-picture', profilePicture.src);
        }
      };
      reader.readAsDataURL(file);
    }
  });
}
const generateResumeButton = document.getElementById('generate-resume') as HTMLButtonElement;
generateResumeButton?.addEventListener('click', () => {
  const resumeContent = document.getElementById('resume')?.innerHTML;
  if (resumeContent) {
    const doc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated Resume</title>
        <style>
          body { font-family: Arial, sans-serif; }
          #resume { max-width: 800px; margin: 20px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .section { margin-bottom: 20px; padding-bottom: 10px; }
          .section:not(:last-child) { border-bottom: 2px solid #ddd; }
          .section h2 { margin: 0; color: neonblue; }
          .section p { margin: 0; }
          #profile-section { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
          #profile-picture { display: block; max-width: 150px; max-height: 150px; margin: 0 auto; border-radius: 50%; }
        </style>
      </head>
      <body>
        <div id="resume">
          ${resumeContent}
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([doc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else {
    alert('Unable to generate resume. Content is missing.');
  }
});

window.addEventListener('DOMContentLoaded', loadChanges);
