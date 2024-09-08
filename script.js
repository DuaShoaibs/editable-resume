function saveChanges(sectionId, content) {
    try {
        localStorage.setItem(sectionId, content);
    }
    catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}
function loadChanges() {
    try {
        document.querySelectorAll('.section').forEach(function (section) {
            var savedContent = localStorage.getItem(section.id);
            if (savedContent) {
                section.innerHTML = savedContent;
            }
        });
    }
    catch (error) {
        console.error("Error loading from localStorage:", error);
    }
}
document.querySelectorAll('.section').forEach(function (section) {
    section.addEventListener('click', function () {
        section.setAttribute('contenteditable', 'true');
        section.focus();
    });
    section.addEventListener('blur', function () {
        section.setAttribute('contenteditable', 'false');
        saveChanges(section.id, section.innerHTML);
    });
    section.addEventListener('input', function () {
        saveChanges(section.id, section.innerHTML);
    });
});
var profilePictureUpload = document.getElementById('profile-picture-upload');
var profilePicture = document.getElementById('profile-picture');
if (profilePictureUpload && profilePicture) {
    profilePictureUpload.addEventListener('change', function () {
        var _a;
        var file = (_a = profilePictureUpload.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                    profilePicture.src = e.target.result.toString();
                    saveChanges('profile-picture', profilePicture.src);
                }
            };
            reader.readAsDataURL(file);
        }
    });
}
var generateResumeButton = document.getElementById('generate-resume');
generateResumeButton === null || generateResumeButton === void 0 ? void 0 : generateResumeButton.addEventListener('click', function () {
    var _a;
    var resumeContent = (_a = document.getElementById('resume')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    if (resumeContent) {
        var doc = "\n      <!DOCTYPE html>\n      <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Generated Resume</title>\n        <style>\n          body { font-family: Arial, sans-serif; }\n          #resume { max-width: 800px; margin: 20px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }\n          .section { margin-bottom: 20px; padding-bottom: 10px; }\n          .section:not(:last-child) { border-bottom: 2px solid #ddd; }\n          .section h2 { margin: 0; color: neonblue; }\n          .section p { margin: 0; }\n          #profile-section { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #ddd; padding-bottom: 10px; }\n          #profile-picture { display: block; max-width: 150px; max-height: 150px; margin: 0 auto; border-radius: 50%; }\n        </style>\n      </head>\n      <body>\n        <div id=\"resume\">\n          ".concat(resumeContent, "\n        </div>\n      </body>\n      </html>\n    ");
        var blob = new Blob([doc], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'generated-resume.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    else {
        alert('Unable to generate resume. Content is missing.');
    }
});
window.addEventListener('DOMContentLoaded', loadChanges);
