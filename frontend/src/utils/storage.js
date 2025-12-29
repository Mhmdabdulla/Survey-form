const STORAGE_KEY = 'survey_submissions';

export const saveSubmission = (data) => {
    const submissions = getSubmissions();
    const newSubmission = {
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        ...data
    };
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    return newSubmission;
};

export const getSubmissions = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const clearSubmissions = () => {
    localStorage.removeItem(STORAGE_KEY);
};
