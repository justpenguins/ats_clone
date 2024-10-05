const nlp = require('compromise')


const parseResume = (resumeText) => {
    const doc = nlp(resumeText);

    const skills = doc.match('#Skills').out("array") || [];

    return {
        skills: [...new Set(skills)],
        name: doc.match('#Person').first().text(),
        email: doc.match('#Email').first().text(),
        phone: doc.match('#PhoneNumber').first().text()
    }
}

const parseDescription = (jobText) => {
    const doc = nlp(jobText);

    const qualifications = nlp.match('#Qualifications').out('array') || [];

    return {
        qualifications: [... new Set(qualifications)],
        title: doc.match('#Noun').first().text()
    }
}

module.exports = {
    parseResume,
    parseDescription,
};